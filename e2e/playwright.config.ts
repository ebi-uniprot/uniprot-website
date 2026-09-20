import { defineConfig } from '@playwright/test';

// Browser-level checks that the unit tests cannot make: real reloads, real
// sessionStorage across them, real timers. Slow by nature (the reload backoff
// is 5-40 s and is measured for real), so it is not part of `yarn test`.
// Run from this directory; see README.md.
export default defineConfig({
  testDir: '.',
  fullyParallel: true,
  // A test that waits through two real reloads needs about a minute
  timeout: 120_000,
  expect: { timeout: 15_000 },
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:27831',
    // The dev build registers one; it must not answer from cache
    serviceWorkers: 'block',
    trace: 'retain-on-failure',
  },
  webServer: {
    // The app's own dev server, from the repo root. On a port nothing else is
    // likely to use (not 8xxx), so that a `yarn start` left running -- possibly
    // pointed at the fake API from the manual walkthrough -- is never mistaken
    // for it.
    command:
      'npx webpack serve --env API_PREFIX=https://rest.uniprot.org --mode development --no-open --port 27831',
    cwd: '..',
    url: 'http://localhost:27831',
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
