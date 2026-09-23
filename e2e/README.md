# Browser tests

How the website behaves when the API fails, checked in a real browser:
retries, the error page, its bounded auto-reload, and the head tags a crawler
sees. Run by Playwright in headless Chromium against the dev server. Each
test intercepts `rest.uniprot.org` in the browser with `page.route`, which
gives it its own knobs (status, `Retry-After`, how many requests to fail)
without anything to restart. Everything else is real: the dev build, the
reload, `sessionStorage` surviving it, and the timers -- the backoffs are
measured, not faked, which is why the suite takes a couple of minutes.

Playwright installs with the app (`@playwright/test`, at the same version as
the root's `playwright` dependency), and the config is `playwright.config.ts`
at the repository root. The suite is its own script and is not part of
`pnpm test`, lint or the type check.

## One-off setup

```bash
pnpm test:e2e-install-browser    # headless Chromium, ~150 MB, cached per machine
```

The browser lands in Playwright's per-machine cache
(`~/Library/Caches/ms-playwright` on macOS), shared across projects, and is
only downloaded again when the pinned Playwright version changes.

## Run

From the repository root:

```bash
pnpm test:e2e                 # starts the app's dev server itself, on :27831
pnpm test:e2e --headed        # watch it happen
pnpm test:e2e -g "B\."        # one scenario
```

The suite starts its own `webpack serve` on port 27831, pointed at the real
API, and reuses one already on 27831. It deliberately ignores :8080, so a
`pnpm start` you have running cannot be picked up by mistake. If test `0.`
fails, something else is on 27831: check what is listening there.

A failing test leaves a trace in `test-results/` at the root; open it with
`pnpm exec playwright show-trace <file>`.

## Scenarios

- **A.** A transient 503 is retried once and the page recovers, with no
  `noindex` at any point.
- **B.** A persistent 5xx shows the error page, reloads after 5–10 s and
  again after 20–40 s, then stops; the count is jittered across clients,
  survives a reload by hand, and expires after five minutes.
- **C.** The reload count is per page.
- **D.** A failing inline widget (503 or 429) never reloads the whole page.
- **E.** A 429 without `Retry-After` behaves like a 503; a results-page 503
  shows the same error page with no head tags.
- **F–H.** `Retry-After` is honoured in-request when short, deferred to the
  reload when longer, and left to the user when longer than a minute.
- **I.** A network error is retried and then reloads; offline schedules no
  reload.
- **J.** A permanent error still gets the 404 page and a `noindex`.
- **K.** Head tags: live entries canonicalise to the production `/entry`
  URL whatever the address bar says; filtered results canonicalise to the
  unfiltered URL; obsolete entries are `noindex` with no canonical and no
  JSON-LD; an entry name or versioned accession redirects to the same entry
  and is not treated as obsolete; a merged accession's history is.

## Worth knowing

- Pass-through requests go to the real `rest.uniprot.org`, so the suite needs
  network access and a live API.
- "Offline" fakes `navigator.onLine`, which is what the code reads, rather
  than cutting the network -- cutting it would stop the app itself loading.
- **`Retry-After` from the real API.** F–H work here because the intercepted
  responses send `Access-Control-Expose-Headers: retry-after`. At the time of
  writing the real API does not:

  ```
  $ curl -sI https://rest.uniprot.org/uniprotkb/P05067 | grep -i expose
  access-control-expose-headers: Link, X-Total-Results, X-UniProt-Release, X-UniProt-Release-Date, X-API-Deployment-Date
  ```

  Cross-origin, the browser hides any header not in that list, so against
  production a `Retry-After` on a 429 is invisible to the client and E is
  what users get. The client is right; the header needs exposing on the API
  side before F–H apply for real. (Checked on a `200`; a `429` may come from
  a different layer with its own CORS headers, worth confirming with the API
  team.)
