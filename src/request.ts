/**
 * How every call is made: the key, the JSON or the file, retries and errors. Written by hand; the API methods beside it
 * (operations.ts) are generated from the API description. No dependencies: Node 18 or later has fetch.
 */
export type RequestOptions = {
  query?: Record<string, string | number | undefined>;
  body?: unknown;
  file?: Blob | Uint8Array;
  filename?: string;
  fields?: Record<string, string>;
  idempotencyKey?: string;
};
export type ClientOptions = {
  /** Default https://opaige.com/api/company/v1. */
  baseUrl?: string;
  /** Per call, in milliseconds. Default 120000: a File Review of a long file takes time. */
  timeoutMs?: number;
  /** Tries again after 429 and 5xx answers, for reads and for writes sent with an idempotency key. Default 2. */
  maxRetries?: number;
};

export class OpaigeError extends Error {
  constructor(message: string, readonly status: number, readonly code: string | null, readonly requestId: string | null, readonly details: unknown = null) {
    super(message);
    this.name = 'OpaigeError';
  }
}

export const VERSION = '1.0.1';
const RETRY = new Set([429, 500, 502, 503, 504]);
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export class Requester {
  private readonly base: string;
  private readonly timeout: number;
  private readonly retries: number;
  constructor(private readonly key: string, o: ClientOptions = {}) {
    if (!key) throw new Error('An Opaige API key is required: create one in the portal under Developers.');
    this.base = (o.baseUrl ?? 'https://opaige.com/api/company/v1').replace(/\/$/, '');
    this.timeout = o.timeoutMs ?? 120_000;
    this.retries = o.maxRetries ?? 2;
  }

  async request(method: string, path: string, o: RequestOptions = {}): Promise<any> {
    const url = new URL(this.base + path);
    for (const [k, v] of Object.entries(o.query ?? {})) if (v !== undefined && v !== null && v !== '') url.searchParams.set(k, String(v));
    const headers: Record<string, string> = { Authorization: `Bearer ${this.key}`, 'User-Agent': `opaige-node/${VERSION}`, Accept: 'application/json' };
    if (o.idempotencyKey) headers['Idempotency-Key'] = o.idempotencyKey;
    const body = (): BodyInit | undefined => {
      if (o.file) {
        const form = new FormData();
        let blob: Blob;
        if (o.file instanceof Uint8Array) { const ab = new ArrayBuffer(o.file.byteLength); new Uint8Array(ab).set(o.file); blob = new Blob([ab], { type: 'application/pdf' }); }
        else blob = o.file;
        form.append('file', blob, o.filename ?? 'file.pdf');
        for (const [k, v] of Object.entries(o.fields ?? {})) form.append(k, v);
        return form;
      }
      if (o.body !== undefined) { headers['Content-Type'] = 'application/json'; return JSON.stringify(o.body); }
      return undefined;
    };
    const retryable = method === 'GET' || !!o.idempotencyKey;
    for (let attempt = 0; ; attempt++) {
      let res: Response;
      try {
        res = await fetch(url, { method, headers, body: body(), signal: AbortSignal.timeout(this.timeout) });
      } catch (e) {
        if (retryable && attempt < this.retries) { await sleep(500 * 2 ** attempt); continue; }
        throw new OpaigeError(`Could not reach Opaige: ${(e as Error).message}`, 0, 'network_error', null);
      }
      if (RETRY.has(res.status) && retryable && attempt < this.retries) {
        const wait = Number(res.headers.get('Retry-After'));
        await sleep(Number.isFinite(wait) && wait > 0 ? Math.min(wait, 30) * 1000 : 500 * 2 ** attempt);
        continue;
      }
      const requestId = res.headers.get('Opaige-Request-Id');
      const type = res.headers.get('Content-Type') ?? '';
      if (res.ok && type.includes('application/pdf')) return new Uint8Array(await res.arrayBuffer());
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new OpaigeError(data.error ?? `Opaige answered ${res.status}`, res.status, data.code ?? null, requestId, data.details ?? null);
      return data;
    }
  }
}
