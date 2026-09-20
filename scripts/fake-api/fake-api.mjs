#!/usr/bin/env node
/* eslint-disable no-console */
// A stand-in for rest.uniprot.org that fails chosen requests on purpose.
// Everything else is passed through to the real API. Walkthrough and the
// scenarios to set the knobs below for: README.md alongside this file
import http from 'node:http';

const UPSTREAM = 'https://rest.uniprot.org';
const PORT = 5555;

// ---- What to fail, and how. Edit and restart between scenarios. ----
const STATUS = 503; // 429 or 503
const RETRY_AFTER = ''; // seconds; '' to send no Retry-After header
const FAIL_FIRST = Infinity; // fail this many matching requests, then pass through
// Which requests to fail: the entry endpoint, e.g. /uniprotkb/P05067?fields=...
const SHOULD_FAIL = (url) =>
  /^\/uniprotkb\/(?!search|stream)[A-Z0-9]+(\?|$)/i.test(url);

const CORS = {
  'access-control-allow-origin': '*',
  'access-control-allow-headers': '*',
  'access-control-expose-headers': 'retry-after, link, x-total-results',
  // The real API sends max-age=43200 on entries. Cached, a 200 from one
  // scenario would answer the next one's request before it reaches us.
  'cache-control': 'no-store',
};

let failed = 0;

http
  .createServer(async (req, res) => {
    if (req.method === 'OPTIONS') {
      res.writeHead(204, CORS);
      return res.end();
    }
    if (SHOULD_FAIL(req.url) && failed < FAIL_FIRST) {
      failed += 1;
      console.log(`${STATUS} #${failed} ${req.method} ${req.url}`);
      res.writeHead(STATUS, {
        ...CORS,
        ...(RETRY_AFTER && { 'retry-after': RETRY_AFTER }),
      });
      return res.end();
    }
    // Resolved against the fixed upstream, then checked: the request may only
    // pick a path on that host, never another host (a proxy-style absolute
    // request line, say)
    const target = new URL(req.url, UPSTREAM);
    if (target.origin !== UPSTREAM) {
      res.writeHead(400, CORS);
      return res.end();
    }
    const upstream = await fetch(target, {
      method: req.method,
      headers: { accept: req.headers.accept ?? '*/*' },
    });
    const headers = Object.fromEntries(upstream.headers);
    // fetch already decompressed the body
    delete headers['content-encoding'];
    delete headers['content-length'];
    res.writeHead(upstream.status, { ...headers, ...CORS });
    return res.end(Buffer.from(await upstream.arrayBuffer()));
  })
  // Loopback only: this is a stand-in for one developer's browser, not a
  // proxy for the network
  .listen(PORT, '127.0.0.1', () =>
    console.log(`Fake API on http://localhost:${PORT}`)
  );
