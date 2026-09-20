# Browser tests

The automated twin of the manual walkthrough in `scripts/fake-api/README.md`:
the same scenarios, with the same letters, run by Playwright in headless
Chromium against the dev server. Where the walkthrough uses a fake API on
:5555, these intercept `rest.uniprot.org` in the browser with `page.route`,
so each test has its own knobs and nothing needs restarting. Everything else
is real: the dev build, the reload, `sessionStorage` surviving it, and the
timers -- the backoffs are measured, not faked, which is why the suite takes
a couple of minutes.

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
`pnpm start` you have running -- or the walkthrough's server pointed at the
fake API -- cannot be picked up by mistake. If test `0.` fails, that is
what happened anyway: check what is listening on 27831.

A failing test leaves a trace in `test-results/` at the root; open it with
`pnpm exec playwright show-trace <file>`.

## What is and isn't covered

Covered: A–K from the walkthrough. Not covered, and worth knowing:

- Pass-through requests go to the real `rest.uniprot.org`, so the suite needs
  network access and a live API, like the walkthrough does.
- `Retry-After` reaches the client here because the intercepted responses
  expose it. The real API does not (see the walkthrough's "Known limitation"),
  so scenarios F–H prove the client, not production.
- "Offline" fakes `navigator.onLine`, which is what the code reads, rather
  than cutting the network -- cutting it would stop the app itself loading.
