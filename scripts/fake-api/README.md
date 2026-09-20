# Manual test: API errors, retries and auto-reload

A walkthrough for checking, in a real browser, how the website behaves when
`rest.uniprot.org` misbehaves. It covers the behaviour introduced by the
"Stop deindexing live UniProtKB entries" work:

- `useDataApi` retries transient failures (`src/shared/utils/withRetry.ts`)
- only permanent errors emit `noindex` (`src/shared/utils/httpStatus.ts`,
  `ErrorHandler.tsx`)
- `ServiceUnavailable` auto-reloads the page with a jittered backoff, honours
  `Retry-After`, and never reloads for an inline widget
- canonical URLs, `robots` tags and JSON-LD on entry pages

Unit tests cover the logic; this is for the things they cannot see -- the
real network layer, a real reload, the service worker -- and for getting a
feel for what users actually experience. Budget about 30 minutes.

## Why a fake API rather than DevTools alone

DevTools can block a request or take you offline, but it cannot answer a
request with a `429` or a `Retry-After` header, and those are the cases that
matter most here. So the walkthrough runs the app against a tiny local
stand-in that fails the requests you choose and passes everything else
through to the real API. DevTools is still used to _observe_: the Network
tab for attempts, the Application tab for storage, Elements for `<head>`.

## Setup

### 1. The fake API

It is `fake-api.mjs` in this directory and needs Node 18+. The four
constants at the top are the only knobs:

```js
const STATUS = 503; // 429 or 503
const RETRY_AFTER = ''; // seconds; '' to send no Retry-After header
const FAIL_FIRST = Infinity; // fail this many matching requests, then pass through
// Which requests to fail: the entry endpoint, e.g. /uniprotkb/P05067?fields=...
const SHOULD_FAIL = (url) =>
  /^\/uniprotkb\/(?!search|stream)[A-Z0-9]+(\?|$)/i.test(url);
```

Each scenario below says what to set them to. Don't commit your edits.

### 2. Run it, and the app against it

In one terminal:

```bash
node --watch scripts/fake-api/fake-api.mjs
```

`--watch` restarts the script every time you save it, so switching scenario
is just editing the constants and saving. Each restart is a fresh process,
which also resets the `failed` counter. (Node 22+; on 18/20 it works with a
warning.)

In another, from the repo root:

```bash
npx webpack serve --env API_PREFIX=http://localhost:5555 --mode development
```

(`yarn start` hardcodes the real API; the command above is `start:prod` with
the prefix swapped.)

### 3. Prepare the browser

A normal window is fine; incognito is not needed. Use it only if you run an
extension (ad blocker, privacy tool) that interferes with `localhost`
requests, since extensions are off there by default. Open the app with
DevTools already open, then:

- **Network** tab: tick _Preserve log_ (a reload otherwise clears the list)
  and _Disable cache_ (belt and braces: the fake already sends `no-store`),
  and filter on `localhost:5555` so only API calls show.
- **Application → Service Workers**: tick _Bypass for network_. Otherwise the
  service worker can answer from cache and you are not testing the network.
- **Application → Session storage → `http://localhost:8080`**: keep this open;
  the key `retry-index` is what carries the reload count across reloads.

**About `noindex`.** Every dev build ships a static
`<meta name="robots" content="noindex" />` in its HTML (`index.ejs`, for any
build that is not public production), so you will always see one near the
top of `<head>`. That is not the one this walkthrough is about. The one that
matters is the tag the app adds at runtime on a permanent error. Under React
19 it is hoisted into `<head>` as a plain `<meta>`, with nothing to tell it
apart from the static one, so count them:

```js
document.querySelectorAll('meta[name="robots"][content="noindex"]').length;
```

`1` is the build's own tag and nothing else; `2` means the app added one.
Keep that line handy in the console -- wherever a check below says "no
runtime `noindex`", `1` is the pass.

Sanity check before starting: with the script's defaults (`503`, always fail)
visit `http://localhost:8080/uniprotkb?query=insulin`. The results page must
load normally -- search is passed through, only entry pages are failed.

## Scenarios

Each scenario starts by editing the constants and saving (the script
restarts itself), then clearing the `retry-index` key in Session storage if
it is there.

Throughout, "attempts" means rows in the Network tab for the same URL, and
the timings are read from the Waterfall column or the _Time_ between rows.

### A. Transient failure is retried and recovers

`STATUS = 503`, `RETRY_AFTER = ''`, `FAIL_FIRST = 2`

Visit `/uniprotkb/P05067/entry`.

- [ ] Network shows **3** requests to `/uniprotkb/P05067?fields=…`: two `503`,
      then a `200`. Gaps of roughly 150–300 ms and 300–600 ms.
- [ ] The entry page renders normally. The user never sees an error.
- [ ] No runtime `noindex` at any point: the console line above says `1`.

### B. Persistent 5xx: error page, then bounded auto-reload

`STATUS = 503`, `RETRY_AFTER = ''`, `FAIL_FIRST = Infinity`

Visit `/uniprotkb/P05067/entry`.

- [ ] 2 attempts inside ~1 s, both `503`, then the page
      "This service is currently unavailable!" with the line
      "We will reload this page for you shortly".
- [ ] No runtime `noindex` (console line says `1`). This is the whole point
      of the change: an API blip must not deindex the entry.
- [ ] Between **5 and 10 s** later the page reloads by itself. Session storage
      now has `retry-index` = `{"index":1,"page":"/uniprotkb/P05067/entry","at":…}`.
- [ ] After the reload: 2 more attempts, the error page again, and a second
      reload between **20 and 40 s** later. `index` becomes `2`.
- [ ] After the second reload: error page, but the "We will reload" line is
      **gone** and nothing further happens. Two reloads is the limit.
- [ ] Reload by hand once more: because `retry-index` is still `2` and fresh,
      still no auto-reload. Wait 60 s, reload by hand: the sequence starts
      over (5–10 s). The stored index expires.

Do the timing check twice in two tabs opened a second apart: the two reload
delays must differ. The jitter is what stops every client that failed
together from reloading together.

### C. The retry count is per page

Continue from B with `retry-index` at `1` or `2`, within 60 s.

- [ ] Navigate to `/uniprotkb/P12345/entry` (a different entry, also failed).
      The first auto-reload comes after **5–10 s**, not 20–40: another page's
      count does not apply here.

### D. Inline widget failure never reloads the page

`STATUS = 503`, `FAIL_FIRST = Infinity`, and change the matcher to fail the
publications endpoint instead of the entry:

```js
const SHOULD_FAIL = (url) => /^\/uniprotkb\/[A-Z0-9]+\/publications/i.test(url);
```

Visit `/uniprotkb/P05067/publications`.

- [ ] The entry header and tabs render; the publications tab shows the
      "service unavailable" panel **inside** the page.
- [ ] The panel has no "We will reload" line, and the page never reloads
      (wait a full minute). `retry-index` is never written.
- [ ] Same for a 429 (`STATUS = 429`): still no reload. A reload would
      re-request everything the page needs, including whatever rate-limited us.

Restore the original `SHOULD_FAIL` afterwards.

### E. 429 without Retry-After behaves like a 503

`STATUS = 429`, `RETRY_AFTER = ''`, `FAIL_FIRST = Infinity`

Visit `/uniprotkb/P05067/entry`.

- [ ] Identical to B: 2 attempts, unavailable page (not the 404 page), no
      `noindex`, reloads at 5–10 s then 20–40 s.

### F. 429 with a short Retry-After is honoured in-request

`STATUS = 429`, `RETRY_AFTER = '2'`, `FAIL_FIRST = 1`

- [ ] 2 attempts, with a gap of roughly **2.2–2.3 s** (the header, plus the
      usual jittered backoff on top), then a `200` and the page renders.

### G. 429 with a Retry-After too long to wait for in-request

`STATUS = 429`, `RETRY_AFTER = '30'`, `FAIL_FIRST = Infinity`

- [ ] Only **1** attempt: the client does not sit on a 30 s wait inside a page
      load, it gives up and shows the unavailable page straight away.
- [ ] "We will reload this page for you shortly" is shown, and the reload
      comes between **30 and 60 s** later -- not 5–10. The reload respects the
      header the in-request retry could not.

### H. 429 asking for longer than anyone will wait

`STATUS = 429`, `RETRY_AFTER = '120'`, `FAIL_FIRST = Infinity`

- [ ] 1 attempt, unavailable page, and the line reads
      "The service asked us to wait before trying again".
- [ ] No auto-reload, ever (wait two minutes to be sure). Reloading is left
      to the user.

### I. Network error and offline (DevTools only, no fake API needed)

Point the app at the real API (`yarn start`).

- [ ] Network tab → right-click the `/uniprotkb/P05067?fields=…` row →
      _Block request URL_ → reload. 2 attempts (both `(blocked)`), then the
      unavailable page and the 5–10 s reload as in B. Unblock to recover.
- [ ] Network throttling → _Offline_ → reload. The page shows "You appear to
      be offline…" and **does not** schedule a reload. Set it back to
      _No throttling_.

### J. Permanent errors still get a real 404

Real API, no fake needed.

- [ ] `/uniprotkb/NOTANACCESSION/entry`: "Sorry, this page can't be found!",
      and the console line now says `2`: the app added its own `noindex`.
      Only 1 attempt in Network -- a 404 is an answer, not a failure.

### K. Head tags on entry pages

Real API. In Elements, expand `<head>` and look at `<link rel="canonical">`,
`<meta name="robots">` and `<script type="application/ld+json">`. Or from
the console:

```js
[
  document.querySelector('link[rel=canonical]')?.href,
  document.querySelectorAll('meta[name="robots"][content="noindex"]').length,
  JSON.parse(
    document.querySelector('script[type="application/ld+json"]')?.textContent ||
      'null'
  )?.url,
];
```

- [ ] `/uniprotkb/P05067`, `/uniprotkb/P05067/entry`,
      `/uniprotkb/p05067/entry?foo=1`: all three give canonical
      `https://www.uniprot.org/uniprotkb/P05067/entry`, no runtime robots tag, and the
      JSON-LD `url` equal to the canonical. Production, even on localhost --
      that is deliberate.
- [ ] `/uniprotkb?query=insulin&facets=reviewed:true`: canonical
      `https://www.uniprot.org/uniprotkb?query=*`.
- [ ] `/uniprotkb/P29358/entry` (a demerged, obsolete entry): title ends in
      "Obsolete entry", a runtime robots `noindex`, **no** canonical, JSON-LD script
      present but **empty**.
- [ ] A merged entry's history under its old accession: search
      `active:false` in UniProtKB, open an entry whose reason is "merged
      into …", follow the link to the old accession's history. Same treatment
      as the line above. (Demerged entries such as P29358 don't redirect, so
      they don't exercise this path.)
- [ ] `/diseases/DI-00001` (or any keyword/location entry): canonical is the
      production entry URL built from the entry's own id, not from the address
      bar.

## Known limitation: Retry-After from the real API

Scenarios F–H work against the fake because it sends
`Access-Control-Expose-Headers: retry-after`. At the time of writing the real
API does not:

```
$ curl -sI https://rest.uniprot.org/uniprotkb/P05067 | grep -i expose
access-control-expose-headers: Link, X-Total-Results, X-UniProt-Release, X-UniProt-Release-Date, X-API-Deployment-Date
```

Cross-origin, the browser hides any header not in that list, so against
production a `Retry-After` on a 429 is invisible to the client and E is what
users get. The code is right; the header needs exposing on the API side
before F–H apply for real. (That was checked on a `200`; a `429` may come
from a different layer with its own CORS headers -- worth confirming with
whoever owns the rate limiter.)

## Troubleshooting

- **Everything is 429/503, including search.** The `SHOULD_FAIL` regex is
  matching too much. The default one excludes `search` and `stream`; if you
  edited it, check it against the URL in the Network tab.
- **The reload comes at 20–40 s on a fresh test.** A `retry-index` is left
  over from the previous scenario. Clear it in Session storage (or wait 5 min).
- **No retries at all, straight to the error page.** Check the request
  method: only GET/HEAD/OPTIONS are retried. And check it is a transient
  status (408, 425, 429, 5xx, or no status): anything else is treated as an
  answer.
- **The page loads even though the script says it failed.** The service
  worker answered from cache. _Bypass for network_ in Application → Service
  Workers, then reload.
- **`fetch failed` in the script's terminal.** It cannot reach
  `rest.uniprot.org` (proxy/VPN). The failure cases still work; pass-through
  does not.
