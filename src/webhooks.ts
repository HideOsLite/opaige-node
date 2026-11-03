import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Checks that a webhook came from Opaige and was not replayed. Pass the raw request body, exactly as received (not parsed and
 * re-serialised), the Opaige-Signature header and your endpoint's signing secret. Returns the event, or throws.
 *
 *   Opaige-Signature: t=<unix seconds>,v1=<hex HMAC-SHA256 of "<t>.<raw body>">
 */
export type WebhookEvent = { id: string; event: string; created_at: string; data: Record<string, any> };

export function verifyWebhook(rawBody: string | Uint8Array, signature: string | null | undefined, secret: string, toleranceSeconds = 300, now = Date.now()): WebhookEvent {
  const body = typeof rawBody === 'string' ? rawBody : Buffer.from(rawBody).toString('utf8');
  const parts = Object.fromEntries(String(signature ?? '').split(',').map((p) => p.trim().split('=') as [string, string]));
  const t = Number(parts.t), v1 = parts.v1;
  if (!Number.isFinite(t) || !v1) throw new Error('Opaige-Signature is missing or malformed.');
  if (Math.abs(now / 1000 - t) > toleranceSeconds) throw new Error('Opaige-Signature is too old: a replay, or a clock far off.');
  const want = Buffer.from(createHmac('sha256', secret).update(`${t}.${body}`).digest('hex'));
  const got = Buffer.from(v1);
  if (want.length !== got.length || !timingSafeEqual(want, got)) throw new Error('Opaige-Signature does not match this body and secret.');
  return JSON.parse(body) as WebhookEvent;
}
