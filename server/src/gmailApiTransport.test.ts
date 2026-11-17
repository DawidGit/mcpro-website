import { describe, expect, it } from 'vitest';
import { createGmailApiTransport, GMAIL_SEND_SCOPE } from './gmailApiTransport.js';

/** Scripted fetch: each call must match the next expected URL and gets its canned reply. */
function scriptedFetch(script: Array<{ url: string; status: number; body: unknown }>) {
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const fetchFn = (async (url: string | URL, init?: RequestInit) => {
    const step = script[calls.length];
    calls.push({ url: String(url), init: init ?? {} });
    if (!step) throw new Error(`unexpected fetch #${calls.length}: ${String(url)}`);
    expect(String(url)).toBe(step.url);
    return new Response(JSON.stringify(step.body), { status: step.status });
  }) as typeof fetch;
  return { fetchFn, calls, done: () => calls.length === script.length };
}

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SEND_URL = 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send';

describe('Gmail API transport', () => {
  it('refreshes the token once, sends the composed message and reuses the token', async () => {
    const { fetchFn, calls, done } = scriptedFetch([
      { url: TOKEN_URL, status: 200, body: { access_token: 'tok-1', expires_in: 3599, scope: GMAIL_SEND_SCOPE } },
      { url: SEND_URL, status: 200, body: { id: 'msg-1' } },
      { url: SEND_URL, status: 200, body: { id: 'msg-2' } },
    ]);
    const gmail = createGmailApiTransport({
      clientId: 'cid',
      clientSecret: 'secret',
      refreshToken: 'refresh',
      fetch: fetchFn,
    });
    const mail = {
      from: 'Consultation Request <office@mcprogc.com>',
      to: 'office@mcprogc.com',
      replyTo: 'client@example.com',
      subject: 'New consultation request',
      text: 'Hello',
      html: '<p>Hello</p>',
      headers: { 'X-Contact-Form': 'mcprogc.com', 'X-Project-Type': 'restaurant', 'Auto-Submitted': 'auto-generated' },
    };

    await expect(gmail.sendMail(mail)).resolves.toEqual({ messageId: 'msg-1' });
    await expect(gmail.sendMail(mail)).resolves.toEqual({ messageId: 'msg-2' });
    expect(done()).toBe(true); // one token refresh for two sends

    const tokenForm = new URLSearchParams(String(calls[0].init.body));
    expect(Object.fromEntries(tokenForm)).toEqual({
      client_id: 'cid',
      client_secret: 'secret',
      refresh_token: 'refresh',
      grant_type: 'refresh_token',
    });

    const send = calls[1];
    expect((send.init.headers as Record<string, string>).Authorization).toBe('Bearer tok-1');
    const raw = Buffer.from(JSON.parse(String(send.init.body)).raw, 'base64url').toString('utf8');
    expect(raw).toContain('From: Consultation Request <office@mcprogc.com>');
    expect(raw).toContain('To: office@mcprogc.com');
    expect(raw).toContain('Reply-To: client@example.com');
    expect(raw).toContain('Subject: New consultation request');
    expect(raw).toContain('X-Project-Type: restaurant');
  });
});
