# Opaige for Node

The Opaige API from Node 18 or later. No dependencies.

```js
import { Opaige, OpaigeError, verifyWebhook } from '@opaige/node';

const opaige = new Opaige(process.env.OPAIGE_KEY);

const answer = await opaige.checkRequirements({ passport: 'IN', destination: 'FR' });

await opaige.sendBookings({ body: { bookings: [{
  ref: 'QX7K2M', flight: { number: 'OP412', destination: 'GB', depart_date: '2026-12-18' },
  passengers: [{ ref: 'QX7K2M-1', passport: 'IN', residence: 'AE' }],
}] } });

const review = await opaige.reviewFile({ file: pdfBytes, fields: { destination: 'FR', purpose: 'business' }, idempotencyKey: 'file-8841' });
```

Every method is one API call, named as in the [API reference](https://opaige.com/developers). Path values and query values are
named in camelCase; JSON goes in `body`; a PDF comes back as a `Uint8Array`.

**Errors** throw `OpaigeError` with `status`, `code`, `requestId` (quote it to support) and `details`.
**Retries:** reads, and writes sent with an `idempotencyKey`, are tried again after 429 and 5xx answers (`maxRetries`, default 2).
**Sandbox:** a sandbox key answers in the same shape, is never billed and never touches live data. Bookings, students and appointments it sends are kept as test data.

## Webhooks

```js
app.post('/opaige', express.raw({ type: 'application/json' }), (req, res) => {
  const event = verifyWebhook(req.body, req.get('Opaige-Signature'), process.env.OPAIGE_WEBHOOK_SECRET);
  // event.event, event.data
  res.sendStatus(200);
});
```

Pass the raw body: a parsed and re-serialised body no longer matches its signature.
