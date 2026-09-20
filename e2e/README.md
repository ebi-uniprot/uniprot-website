# Browser tests

The automated twin of the manual walkthrough in `scripts/fake-api/README.md`:
the same scenarios, with the same letters, run by Playwright in headless
Chromium against the dev server. Where the walkthrough uses a fake API on
:5555, these intercept `rest.uniprot.org` in the browser with `page.route`,
so each test has its own knobs and nothing needs restarting. Everything else
is real: the dev build, the reload, `sessionStorage` surviving it, and the
timers -- the backoffs are measured, not faked, which is why the suite takes
a couple of minutes.

This directory is its own package, on purpose. These tests are run by hand,
occasionally, so Playwright is not part of the app's `yarn install` and never
touches the root lockfile. Nothing here is installed until you ask for it.

## One-off setup

```bash
cd e2e
pnpm install            # Playwright itself, a few MB, into e2e/node_modules
pnpm install-browser    # headless Chromium, ~150 MB, cached per machine
```

This package uses pnpm (`packageManager` in its `package.json`; `corepack
enable` gets you the right version). The root project's package manager is
not involved.

The browser lands in Playwright's per-machine cache
(`~/Library/Caches/ms-playwright` on macOS), shared across projects, and is
only downloaded again when the pinned Playwright version changes.

## Run

From `e2e/`:

```bash
pnpm test                 # starts the app's dev server itself, on :27831
pnpm test --headed        # watch it happen
pnpm test -g "B\."        # one scenario
```

The suite starts its own `webpack serve` on port 27831, pointed at the real
API, and reuses one already on 27831. It deliberately ignores :8080, so a
`yarn start` you have running -- or the walkthrough's server pointed at the
fake API -- cannot be picked up by mistake. If test `0.` fails, that is
what happened anyway: check what is listening on 27831.

A failing test leaves a trace in `e2e/test-results/`; open it with
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
