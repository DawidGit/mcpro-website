import nodemailer, { type SentMessageInfo } from 'nodemailer';
import { createApp, type AppDependencies, type MailHeaders, type SendMailResult } from './app.js';
import { verifyTurnstileToken } from './turnstile.js';
import { createRateLimiter } from './rateLimiter.js';
import { createDevTransporter, type MailMessage, type MailTransport } from './devTransport.js';
import { createGmailApiTransport } from './gmailApiTransport.js';

interface GmailEnv {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}

interface ServerEnv {
  port: number;
  turnstileSecret: string;
  /** Set → send through the Gmail API (preferred). Unset → SMTP, or DEV mode without SMTP_PASS. */
  gmail: GmailEnv | null;
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPass: string;
  mailFrom: string;
  mailTo: string;
}

function readEnv(): ServerEnv {
  const gmailVars = ['GMAIL_CLIENT_ID', 'GMAIL_CLIENT_SECRET', 'GMAIL_REFRESH_TOKEN'];
  const useGmail = Boolean(process.env.GMAIL_REFRESH_TOKEN);
  const required = ['TURNSTILE_SECRET_KEY', 'MAIL_TO', ...(useGmail ? [...gmailVars, 'GMAIL_SENDER'] : ['SMTP_USER'])];
  const missing = required.filter((name) => !process.env[name]);
  if (missing.length > 0) {
    console.error(`Missing required environment variables: ${missing.join(', ')}`);
    process.exit(1);
  }

  return {
    port: Number(process.env.PORT ?? 3000),
    turnstileSecret: process.env.TURNSTILE_SECRET_KEY!,
    gmail: useGmail
      ? {
          clientId: process.env.GMAIL_CLIENT_ID!,
          clientSecret: process.env.GMAIL_CLIENT_SECRET!,
          refreshToken: process.env.GMAIL_REFRESH_TOKEN!,
        }
      : null,
    smtpHost: process.env.SMTP_HOST ?? 'smtp.gmail.com',
    smtpPort: Number(process.env.SMTP_PORT ?? 587),
    smtpUser: process.env.SMTP_USER ?? '',
    // Empty in dev mode → emails are logged instead of sent.
    smtpPass: process.env.SMTP_PASS ?? '',
    // The Gmail API always sends as the token's mailbox, so From must be that address.
    mailFrom: (useGmail ? process.env.GMAIL_SENDER : process.env.MAIL_FROM || process.env.SMTP_USER) ?? '',
    mailTo: process.env.MAIL_TO!,
  };
}

/** Log at startup whether email can actually be sent, so a broken credential shows up before a customer hits it. */
function checkDelivery(label: string, check: () => Promise<unknown>): void {
  check().then(
    () => console.log(`${label}: email delivery ready`),
    (error: unknown) =>
      console.error(
        `${label}: EMAIL DELIVERY IS BROKEN — contact form messages will fail. ${error instanceof Error ? error.message : String(error)}`
      )
  );
}

function createTransporter(env: ServerEnv): MailTransport {
  if (env.gmail) {
    const gmail = createGmailApiTransport(env.gmail);
    checkDelivery(`Gmail API (${env.mailFrom})`, () => gmail.verify());
    return gmail;
  }
  // No SMTP password → local dev mode: log emails instead of sending them.
  if (!env.smtpPass) {
    console.warn('No GMAIL_REFRESH_TOKEN or SMTP_PASS — running in DEV mode (emails are logged, not sent).');
    return createDevTransporter();
  }
  const transporter = nodemailer.createTransport({
    host: env.smtpHost,
    port: env.smtpPort,
    secure: env.smtpPort === 465,
    auth: { user: env.smtpUser, pass: env.smtpPass },
  });
  checkDelivery(`SMTP ${env.smtpHost} (${env.smtpUser})`, () => transporter.verify());
  // Adapter: nodemailer's callback-style overloads → our MailTransport shape.
  return {
    async sendMail(mail: MailMessage) {
      const info: SentMessageInfo = await transporter.sendMail({
        from: mail.from,
        to: mail.to,
        replyTo: mail.replyTo,
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
        headers: mail.headers as Record<string, string> | undefined,
      });
      return { messageId: info.messageId };
    },
  };
}

function main(): void {
  const env = readEnv();
  const transporter = createTransporter(env);

  const sendMail = async (
    subject: string,
    text: string,
    html: string,
    replyTo: string,
    headers: MailHeaders
  ): Promise<SendMailResult> => {
    try {
      await transporter.sendMail({
        // Display name is filter-friendly: Gmail filter "from:Consultation Request".
        from: `Consultation Request <${env.mailFrom}>`,
        to: env.mailTo,
        replyTo,
        subject,
        text,
        html,
        headers,
      });
      return { ok: true };
    } catch (error) {
      console.error('Email delivery failed:', error);
      return { ok: false };
    }
  };  const deps: AppDependencies = {
    turnstileSecret: env.turnstileSecret,
    verifyTurnstile: verifyTurnstileToken,
    sendMail,
    rateLimiter: createRateLimiter({ windowMs: 60_000, max: 5 }),
  };

  const app = createApp(deps);
  app.listen(env.port, '0.0.0.0', () => {
    console.log(`Contact API listening on port ${env.port}`);
  });
}

main();
