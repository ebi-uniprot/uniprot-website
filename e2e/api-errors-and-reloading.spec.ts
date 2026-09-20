import { expect, type Page, type Request, test } from '@playwright/test';

/*
 * The automated twin of scripts/fake-api/README.md: same scenarios, same
 * letters. Where the walkthrough runs a fake API on :5555, this intercepts
 * rest.uniprot.org in the browser with page.route, which gives each test its
 * own knobs without a process to restart. Everything else is real: the dev
 * server, the reload, sessionStorage surviving it, the timers.
 */

const ENTRY = '/uniprotkb/P05067/entry';
// The h1 is accession and entry name, and the name only comes from the data
const ENTRY_TITLE = 'A4_HUMAN';
const API = 'https://rest.uniprot.org';
const KEY = 'retry-index';

const UNAVAILABLE = 'This service is currently unavailable!';
const WILL_RELOAD = 'We will reload this page for you shortly';
const ASKED_TO_WAIT = 'The service asked us to wait before trying again';
const OFFLINE = 'You appear to be offline';
const NOT_FOUND = "Sorry, this page can't be found!";

// Mirrors the fake API's CORS: without these a fulfilled cross-origin
// response is blocked by the browser, and Retry-After stays hidden
const CORS = {
  'access-control-allow-origin': '*',
  'access-control-expose-headers': 'retry-after, link, x-total-results',
};

// The entry endpoint: /uniprotkb/P05067?fields=... but not search or stream
const isEntryRequest = (url: URL) =>
  url.origin === API &&
  /^\/uniprotkb\/(?!search|stream)[A-Z0-9]+$/i.test(url.pathname);

const isPublicationsRequest = (url: URL) =>
  url.origin === API &&
  /^\/uniprotkb\/[A-Z0-9]+\/publications/i.test(url.pathname);

type FailOptions = {
  status?: number;
  retryAfter?: string;
  /** Fail this many matching requests, then let them through */
  failFirst?: number;
  match?: (url: URL) => boolean;
  /** Abort instead of answering: a network error, no status */
  abort?: boolean;
};

/**
 * Records when each matching request arrived, so a test can count attempts
 * and measure the gaps between them. Requests the page itself abandoned are
 * left out: in development React's StrictMode mounts everything twice, and
 * useDataApi cancels the request from the first mount straight away. That
 * one reaches the interceptor, but it is not an attempt the page made.
 */
const trackAttempts = (page: Page, match: (url: URL) => boolean) => {
  const seen: { at: number; request: Request }[] = [];
  const aborted = new Set<Request>();
  page.on('requestfailed', (request) => {
    if (request.failure()?.errorText === 'net::ERR_ABORTED') {
      aborted.add(request);
    }
  });
  const attempts = () =>
    seen.filter(({ request }) => !aborted.has(request)).map(({ at }) => at);
  return {
    match,
    /** Call from a route handler. Resolves false if the page has already
     *  abandoned the request, which takes a moment to be reported. */
    record: async (request: Request) => {
      const entry = { at: Date.now(), request };
      seen.push(entry);
      await page.waitForTimeout(50);
      return !aborted.has(request);
    },
    attempts,
  };
};

/**
 * Fails matching API requests on purpose. Returns the attempts the page made,
 * as timestamps, via a function: read it when asserting, not before.
 */
const failApi = async (
  page: Page,
  {
    status = 503,
    retryAfter,
    failFirst = Infinity,
    match = isEntryRequest,
    abort = false,
  }: FailOptions = {}
) => {
  const tracker = trackAttempts(page, match);
  let failed = 0;
  await page.route(
    (url) => match(url),
    async (route) => {
      if (!(await tracker.record(route.request()))) {
        return undefined; // gone already, nothing to answer
      }
      try {
        if (failed >= failFirst) {
          return await route.continue();
        }
        failed += 1;
        if (abort) {
          return await route.abort('failed');
        }
        return await route.fulfill({
          status,
          headers: {
            ...CORS,
            ...(retryAfter && { 'retry-after': retryAfter }),
          },
          body: '',
        });
      } catch {
        return undefined; // abandoned while we were answering
      }
    }
  );
  return tracker.attempts;
};

const gaps = (times: number[]) =>
  times.slice(1).map((time, i) => time - times[i]);

/**
 * The reload delays ServiceUnavailable currently has scheduled, read from the
 * page: wrap setTimeout and keep the timers whose callback reloads the
 * document, and forget them again on clearTimeout -- StrictMode runs the
 * effect twice in development and clears the first timer. Installed before
 * every document, so it survives a reload (and starts empty again, which is
 * what we want).
 */
const recordReloadDelays = (page: Page) =>
  page.addInitScript(() => {
    const live = new Map<number, number>();
    (window as unknown as { __reloadDelays: () => number[] }).__reloadDelays =
      () => [...live.values()];
    const originalSet = window.setTimeout;
    const originalClear = window.clearTimeout;
    window.setTimeout = ((
      handler: TimerHandler,
      delay?: number,
      ...args: unknown[]
    ) => {
      const id = originalSet(handler, delay, ...args);
      if (
        typeof delay === 'number' &&
        typeof handler === 'function' &&
        handler.toString().includes('.reload(')
      ) {
        live.set(id, delay);
      }
      return id;
    }) as typeof window.setTimeout;
    window.clearTimeout = ((id?: number) => {
      if (id !== undefined) {
        live.delete(id);
      }
      return originalClear(id);
    }) as typeof window.clearTimeout;
  });

const reloadDelays = (page: Page) =>
  page.evaluate(() =>
    (window as unknown as { __reloadDelays: () => number[] }).__reloadDelays()
  );

// Every dev build carries one static noindex in its HTML (index.ejs). The app
// adds a second one, hoisted into <head> by React 19, on a permanent error --
// with no attribute to tell it apart, so it is told apart by counting.
const noindexTags = (page: Page) =>
  page.locator('meta[name="robots"][content="noindex"]');
const BUILD_NOINDEX = 1;

const storedRetry = (page: Page) =>
  page.evaluate((key) => {
    const raw = sessionStorage.getItem(key);
    return raw
      ? (JSON.parse(raw) as { index: number; page: string; at: number })
      : null;
  }, KEY);

// Keyed by pathname + search, as the app writes it: the origin and the hash
// are not part of which page an outage belongs to
const pageKey = (page: Page) => {
  const { pathname, search } = new URL(page.url());
  return pathname + search;
};

const storeRetry = (page: Page, index: number, at = Date.now()) =>
  page.evaluate(([key, value]) => sessionStorage.setItem(key, value), [
    KEY,
    JSON.stringify({ index, page: pageKey(page), at }),
  ] as const);

test.beforeEach(async ({ page }) => {
  await recordReloadDelays(page);
});

// If this one fails, so does everything else, for the same reason: the app
// under test is not talking to rest.uniprot.org. Usually a dev server left
// running from the manual walkthrough, pointed at the fake API.
test('0. the app under test talks to the real API', async ({ page }) => {
  const origins = new Set<string>();
  page.on('request', (request) => origins.add(new URL(request.url()).origin));

  await page.goto(ENTRY);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    ENTRY_TITLE
  );
  expect(
    origins,
    `API requests went to ${[...origins].join(', ')} -- is a dev server pointed at the fake API still running?`
  ).toContain(API);
});

test('A. transient failure is retried and recovers', async ({ page }) => {
  const attempts = await failApi(page, { status: 503, failFirst: 2 });

  await page.goto(ENTRY);

  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    ENTRY_TITLE
  );
  await expect.poll(attempts).toHaveLength(3);
  const [first, second] = gaps(attempts());
  expect(first).toBeGreaterThanOrEqual(150);
  expect(first).toBeLessThan(800);
  expect(second).toBeGreaterThanOrEqual(300);
  expect(second).toBeLessThan(1_100);
  await expect(noindexTags(page)).toHaveCount(BUILD_NOINDEX);
});

test('B. persistent 5xx: error page, two bounded reloads, then expiry', async ({
  page,
}) => {
  const attempts = await failApi(page, { status: 503 });

  await page.goto(ENTRY);
  await expect(page.getByText(UNAVAILABLE)).toBeVisible();
  await expect(page.getByText(WILL_RELOAD)).toBeVisible();
  await expect.poll(attempts).toHaveLength(3);
  await expect(noindexTags(page)).toHaveCount(BUILD_NOINDEX);

  let [delay] = await reloadDelays(page);
  expect(delay).toBeGreaterThanOrEqual(5_000);
  expect(delay).toBeLessThan(10_000);

  // First reload, for real
  await page.waitForEvent('load', { timeout: delay + 5_000 });
  await expect(page.getByText(UNAVAILABLE)).toBeVisible();
  await expect.poll(attempts).toHaveLength(6);
  expect(await storedRetry(page)).toMatchObject({
    index: 1,
    page: pageKey(page),
  });

  [delay] = await reloadDelays(page);
  expect(delay).toBeGreaterThanOrEqual(20_000);
  expect(delay).toBeLessThan(40_000);

  // Second reload, for real
  await page.waitForEvent('load', { timeout: delay + 5_000 });
  await expect(page.getByText(UNAVAILABLE)).toBeVisible();
  await expect.poll(attempts).toHaveLength(9);
  expect(await storedRetry(page)).toMatchObject({ index: 2 });

  // That was the last one
  await expect(page.getByText(WILL_RELOAD)).toHaveCount(0);
  expect(await reloadDelays(page)).toEqual([]);

  // A count older than the stale window (five minutes: long enough for a
  // slow-failing reload to finish loading) is left over from a previous outage
  await storeRetry(page, 2, Date.now() - 6 * 60_000);
  await page.reload();
  await expect(page.getByText(WILL_RELOAD)).toBeVisible();
  [delay] = await reloadDelays(page);
  expect(delay).toBeGreaterThanOrEqual(5_000);
  expect(delay).toBeLessThan(10_000);
});

test('B. clients that failed together do not reload together', async ({
  browser,
}) => {
  const delays: number[] = [];
  for (let i = 0; i < 4; i += 1) {
    const page = await browser.newPage();
    await recordReloadDelays(page);
    await failApi(page, { status: 503 });
    await page.goto(ENTRY);
    await expect(page.getByText(WILL_RELOAD)).toBeVisible();
    delays.push(...(await reloadDelays(page)));
    await page.close();
  }
  expect(delays).toHaveLength(4);
  expect(new Set(delays).size).toBeGreaterThan(1);
});

test('C. the retry count is per page', async ({ page }) => {
  await failApi(page, { status: 503 });

  await page.goto(ENTRY);
  await expect(page.getByText(WILL_RELOAD)).toBeVisible();
  // As if this page had already reloaded once
  await storeRetry(page, 1);

  await page.goto('/uniprotkb/P12345/entry');
  await expect(page.getByText(WILL_RELOAD)).toBeVisible();
  const [delay] = await reloadDelays(page);
  expect(delay).toBeGreaterThanOrEqual(5_000);
  expect(delay).toBeLessThan(10_000);
});

for (const status of [503, 429]) {
  test(`D. inline widget failure (${status}) never reloads the page`, async ({
    page,
  }) => {
    await failApi(page, { status, match: isPublicationsRequest });

    await page.goto('/uniprotkb/P05067/publications');
    // The page itself is fine...
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      ENTRY_TITLE
    );
    // ...only the widgets that fetch publications failed: the tab's content
    // and the facets beside it, hence two panels
    await expect(page.getByText(UNAVAILABLE)).toHaveCount(2);
    await expect(page.getByText(WILL_RELOAD)).toHaveCount(0);
    expect(await reloadDelays(page)).toEqual([]);
    expect(await storedRetry(page)).toBeNull();
  });
}

test('E. 429 without Retry-After behaves like a 503', async ({ page }) => {
  const attempts = await failApi(page, { status: 429 });

  await page.goto(ENTRY);
  await expect(page.getByText(UNAVAILABLE)).toBeVisible();
  await expect(page.getByText(NOT_FOUND)).toHaveCount(0);
  await expect.poll(attempts).toHaveLength(3);
  await expect(noindexTags(page)).toHaveCount(BUILD_NOINDEX);
  const [delay] = await reloadDelays(page);
  expect(delay).toBeGreaterThanOrEqual(5_000);
  expect(delay).toBeLessThan(10_000);
});

test('F. 429 with a short Retry-After is honoured in-request', async ({
  page,
}) => {
  const attempts = await failApi(page, {
    status: 429,
    retryAfter: '2',
    failFirst: 2,
  });

  await page.goto(ENTRY);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    ENTRY_TITLE,
    { timeout: 30_000 }
  );
  await expect.poll(attempts).toHaveLength(3);
  const [first, second] = gaps(attempts());
  // Retry-After plus the usual jittered backoff on top
  expect(first).toBeGreaterThanOrEqual(2_150);
  expect(first).toBeLessThan(2_800);
  expect(second).toBeGreaterThanOrEqual(2_300);
  expect(second).toBeLessThan(3_100);
});

test('G. 429 with a Retry-After too long to wait for in-request', async ({
  page,
}) => {
  const attempts = await failApi(page, { status: 429, retryAfter: '30' });

  await page.goto(ENTRY);
  await expect(page.getByText(WILL_RELOAD)).toBeVisible();
  // Gave up straight away rather than sitting on a 30 s wait
  await expect.poll(attempts).toHaveLength(1);
  const [delay] = await reloadDelays(page);
  expect(delay).toBeGreaterThanOrEqual(30_000);
  expect(delay).toBeLessThan(60_000);
});

test('H. 429 asking for longer than anyone will wait', async ({ page }) => {
  const attempts = await failApi(page, { status: 429, retryAfter: '120' });

  await page.goto(ENTRY);
  await expect(page.getByText(ASKED_TO_WAIT)).toBeVisible();
  await expect(page.getByText(WILL_RELOAD)).toHaveCount(0);
  await expect.poll(attempts).toHaveLength(1);
  expect(await reloadDelays(page)).toEqual([]);
});

test('I. network error is retried, then reloads', async ({ page }) => {
  const attempts = await failApi(page, { abort: true });

  await page.goto(ENTRY);
  await expect(page.getByText(WILL_RELOAD)).toBeVisible();
  await expect.poll(attempts).toHaveLength(3);
  const [delay] = await reloadDelays(page);
  expect(delay).toBeGreaterThanOrEqual(5_000);
  expect(delay).toBeLessThan(10_000);
});

test('I. offline: no reload is scheduled', async ({ page }) => {
  // What the code reads is navigator.onLine. Faking that rather than cutting
  // the network lets the app itself still load.
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'onLine', { get: () => false });
  });
  await failApi(page, { abort: true });

  await page.goto(ENTRY);
  await expect(page.getByText(OFFLINE)).toBeVisible();
  await expect(page.getByText(WILL_RELOAD)).toHaveCount(0);
  expect(await reloadDelays(page)).toEqual([]);
});

test('J. a permanent error still gets a real 404 and noindex', async ({
  page,
}) => {
  const notAnAccession = (url: URL) =>
    isEntryRequest(url) && url.pathname.includes('NOTANACCESSION');
  const tracker = trackAttempts(page, notAnAccession);
  await page.route(notAnAccession, async (route) => {
    if (await tracker.record(route.request())) {
      await route.continue().catch(() => undefined);
    }
  });

  await page.goto('/uniprotkb/NOTANACCESSION/entry');
  await expect(page.getByText(NOT_FOUND)).toBeVisible();
  await expect(noindexTags(page)).toHaveCount(BUILD_NOINDEX + 1);
  // A 404 is an answer, not a failure: asked once
  await expect.poll(tracker.attempts).toHaveLength(1);
});

test.describe('K. head tags', () => {
  // The header injects an Organization schema too; the entry's is the one
  // with a mainEntity. useStructuredData always mounts its script tag, and
  // leaves it empty when it has nothing to say.
  const jsonLd = (page: Page) =>
    page.evaluate(() => {
      const scripts = Array.from(
        document.querySelectorAll('script[type="application/ld+json"]')
      );
      const parsed = scripts.map((script) => {
        try {
          return JSON.parse(script.textContent || '') as {
            url?: string;
            mainEntity?: unknown;
          };
        } catch {
          return null;
        }
      });
      return {
        entryUrl: parsed.find((json) => json?.mainEntity)?.url ?? null,
        empty: scripts.filter((script) => !script.textContent).length,
      };
    });

  for (const path of [
    '/uniprotkb/P05067',
    '/uniprotkb/P05067/entry',
    '/uniprotkb/p05067/entry?foo=1',
  ]) {
    test(`a live entry at ${path} canonicalises to production`, async ({
      page,
    }) => {
      await page.goto(path);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        'https://www.uniprot.org/uniprotkb/P05067/entry'
      );
      await expect(noindexTags(page)).toHaveCount(BUILD_NOINDEX);
      await expect
        .poll(async () => (await jsonLd(page)).entryUrl)
        .toBe('https://www.uniprot.org/uniprotkb/P05067/entry');
    });
  }

  test('a filtered results page canonicalises to the unfiltered one', async ({
    page,
  }) => {
    await page.goto('/uniprotkb?query=insulin&facets=reviewed:true');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://www.uniprot.org/uniprotkb?query=*'
    );
  });

  test('an obsolete entry is noindex, with no canonical and empty JSON-LD', async ({
    page,
  }) => {
    await page.goto('/uniprotkb/P29358/entry');
    await expect(page).toHaveTitle(/Obsolete entry/);
    await expect(noindexTags(page)).toHaveCount(BUILD_NOINDEX + 1);
    // Not getAttribute: that auto-waits for an element that must never appear
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    // Past useStructuredData's throttle, or this passes before it could write
    await page.waitForTimeout(500);
    expect(await jsonLd(page)).toMatchObject({ entryUrl: null, empty: 1 });
  });

  test("a supporting-data entry's canonical comes from its id, not the address bar", async ({
    page,
  }) => {
    await page.goto('/diseases/DI-00001?x=1');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://www.uniprot.org/diseases/DI-00001'
    );
  });
});
