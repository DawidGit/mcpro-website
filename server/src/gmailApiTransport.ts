/**
 * Gmail API mailer — sends as the Workspace mailbox (office@mcprogc.com) over
 * HTTPS with an OAuth refresh token limited to the gmail.send scope.
 *
 * Why not SMTP: Gmail SMTP with OAuth needs the full https://mail.google.com/
 * scope (read + send), and an app password gives the same. gmail.send can only
 * send, so a leaked token cannot read the mailbox. The server is shared with
 * another site, so IP-based Workspace SMTP relay is not an option either.
 *
 * The refresh token is revoked when the mailbox password changes; verify()
 * runs at startup so that shows up in the logs instead of on a customer's form.
 */

import MailComposer from 'nodemailer/lib/mail-composer/index.js';
import type { MailMessage, MailTransport } from './devTransport.js';

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SEND_URL = 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send';
export const GMAIL_SEND_SCOPE = 'https://www.googleapis.com/auth/gmail.send';

/** Refresh the access token this long before Google says it expires. */
const EXPIRY_MARGIN_MS = 60_000;

export interface GmailApiConfig {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  /** Injected in tests; defaults to the global fetch. */
  fetch?: typeof fetch;
  now?: () => number;
}

export interface GmailApiTransport extends MailTransport {
  /** Exchanges the refresh token and checks the gmail.send scope. Sends nothing. */
  verify(): Promise<void>;
}

export function createGmailApiTransport(config: GmailApiConfig): GmailApiTransport {
  const doFetch = config.fetch ?? fetch;
  const now = config.now ?? Date.now;
  let cached: { token: string; expiresAt: number } | null = null;

  async function accessToken(): Promise<string> {
    if (cached && now() < cached.expiresAt) return cached.token;

    const response = await doFetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: config.clientId,
        client_secret: config.clientSecret,
        refresh_token: config.refreshToken,
        grant_type: 'refresh_token',
      }).toString(),
    });
    const data = (await response.json().catch(() => ({}))) as {
      access_token?: string;
      expires_in?: number;
      scope?: string;
      error?: string;
      error_description?: string;
    };
    if (!response.ok || !data.access_token) {
      // invalid_grant = token revoked or expired (e.g. mailbox password changed).
      throw new Error(
        `Gmail token refresh failed (${response.status} ${data.error ?? ''}): ${data.error_description ?? 'no details'}`
      );
    }
    if (!(data.scope ?? '').split(' ').includes(GMAIL_SEND_SCOPE)) {
      throw new Error(`Gmail token lacks the ${GMAIL_SEND_SCOPE} scope (got: ${data.scope ?? 'none'})`);
    }
    cached = {
      token: data.access_token,
      expiresAt: now() + (data.expires_in ?? 3600) * 1000 - EXPIRY_MARGIN_MS,
    };
    return cached.token;
  }

  return {
    async verify() {
      await accessToken();
    },

    async sendMail(mail: MailMessage) {
      const mime = await new MailComposer({
        from: mail.from,
        to: mail.to,
        replyTo: mail.replyTo,
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
        headers: mail.headers as Record<string, string> | undefined,
      })
        .compile()
        .build();

      const token = await accessToken();
      const response = await doFetch(SEND_URL, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ raw: mime.toString('base64url') }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        id?: string;
        error?: { message?: string };
      };
      if (!response.ok || !data.id) {
        if (response.status === 401) cached = null; // token rejected: refresh on the next send
        throw new Error(`Gmail send failed (${response.status}): ${data.error?.message ?? 'no details'}`);
      }
      return { messageId: data.id };
    },
  };
}
