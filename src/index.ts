import { Operations } from './operations.js';
import { Requester, type ClientOptions } from './request.js';

/**
 * The Opaige API for Node (2026-11-03). Every method is one API call, named as in the API reference (opaige.com/developers):
 *
 *   import { Opaige } from '@opaige/node';
 *   const opaige = new Opaige(process.env.OPAIGE_KEY!);
 *   const answer = await opaige.checkRequirements({ passport: 'IN', destination: 'FR' });
 *   await opaige.sendBookings({ body: { bookings: [...] } });
 *
 * A sandbox key answers in the same shape and saves and bills nothing.
 */
export class Opaige extends Operations {
  constructor(key: string, options: ClientOptions = {}) {
    super(new Requester(key, options));
  }
}
export { OpaigeError, VERSION, type ClientOptions } from './request.js';
export { verifyWebhook, type WebhookEvent } from './webhooks.js';
