/* eslint-disable import/no-extraneous-dependencies */

/**
 * Playwright capture of the UniProtKB statistics page into a single,
 * fully self-contained HTML file.
 *
 * Playwright owns the browser so we can do robust, awaited page preparation:
 * force lazy D3 charts to render, expand collapsed tables, flatten the
 * Reviewed/Unreviewed tabs so no data stays hidden, then strip site chrome and
 * stale query links. Serialization is handed to SingleFile (single-file-cli's
 * injectable bundle), which inlines CSS, fonts and images as data URIs and
 * strips scripts, producing an artifact that renders offline with just a browser.
 *
 * Why flatten tabs: franklin-sites `Tabs` mount only the *active* panel into the
 * DOM (no `cache`), so a naive DOM freeze would drop the Reviewed & Unreviewed
 * tables. We click through each tab, capture its panel, and stack the panels as
 * static labelled sections.
 */

import { isIP } from 'node:net';

import { chromium } from 'playwright';
import { script as singleFileBundle } from 'single-file-cli/lib/single-file-bundle.js';

// SingleFile serialization options. Produces a static (no-JS) self-contained
// document with all resources inlined as data URIs.
const SINGLE_FILE_OPTIONS = {
  removeHiddenElements: true,
  removeUnusedStyles: true,
  removeUnusedFonts: true,
  removeImports: true,
  blockScripts: true,
  blockVideos: true,
  blockAudios: true,
  compressHTML: true, // minify the HTML markup
  compressCSS: true, // minify inlined stylesheets
  compressContent: false, // keep a plain, directly-openable .html (not a zip)
  saveFavicon: true,
  insertMetaCSP: true,
  insertSingleFileComment: true,
  loadDeferredImages: false, // lazy content is forced to render before capture
  removeAlternativeFonts: true,
  removeAlternativeMedias: true,
  removeAlternativeImages: true,
  groupDuplicateImages: true,
  maxResourceSize: 100,
  maxResourceSizeEnabled: false,
};

const noop = () => {};

// Cap for a single resource fetched via the Node fallback (bounds memory).
const MAX_RESOURCE_BYTES = 50 * 1024 * 1024;
const RESOURCE_FETCH_TIMEOUT_MS = 30_000;

const fetchFailure = (error) => ({ status: 0, headers: [], data: '', error });

/**
 * Range test for an IPv4 literal: "this host", loopback, private, link-local
 * (incl. cloud metadata) and CGNAT.
 * @param {string} host dotted-quad literal
 * @returns {boolean}
 */
function isSafeIPv4(host) {
  const [a, b] = host.split('.').map(Number);
  if (a === 0 || a === 127 || a === 10) {
    return false;
  }
  if (a === 169 && b === 254) {
    return false; // link-local + cloud metadata (169.254.169.254)
  }
  if (a === 192 && b === 168) {
    return false;
  }
  if (a === 172 && b >= 16 && b <= 31) {
    return false;
  }
  if (a === 100 && b >= 64 && b <= 127) {
    return false; // CGNAT (RFC 6598)
  }
  return true;
}

/**
 * SSRF guard for the Node-side resource fetch fallback: only http(s), and never
 * loopback / private / link-local / metadata address literals. This is
 * defence-in-depth — the tool targets the trusted public site — and does not
 * resolve DNS, so it does not defend against DNS-rebinding.
 * @param {string} rawUrl
 * @returns {boolean}
 */
export function isSafeResourceUrl(rawUrl) {
  let parsed;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return false;
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return false;
  }
  const host = parsed.hostname.toLowerCase().replace(/^\[|\]$/g, '');
  if (host === 'localhost' || host.endsWith('.localhost')) {
    return false;
  }
  // Address rules apply only to actual IP literals — gating on isIP() keeps a
  // legitimate hostname (fdn.example.com, fc-assets.example.org) from matching
  // the fc/fd unique-local prefixes and losing that resource from the archive.
  const family = isIP(host);
  if (family === 6) {
    if (host === '::1' || host === '::') {
      return false;
    }
    if (/^(fe80|fc|fd)/.test(host)) {
      return false; // link-local / unique-local
    }
    if (host.startsWith('::ffff:')) {
      // IPv4-mapped: apply the IPv4 rules to the dotted form, and refuse the
      // hex form (::ffff:7f00:1) rather than let it through unchecked.
      const mapped = host.slice('::ffff:'.length);
      return isIP(mapped) === 4 ? isSafeIPv4(mapped) : false;
    }
    return true;
  }
  if (family === 4) {
    return isSafeIPv4(host);
  }
  return true; // a DNS name — not resolved here (see the doc comment)
}

/**
 * Try to dismiss a cookie/consent banner if one is present (best-effort).
 * @param {import('playwright').Page} page
 */
async function dismissCookieBanner(page) {
  try {
    const button = page.getByRole('button', {
      name: /accept|agree|got it|i understand/i,
    });
    if (await button.count()) {
      await button.first().click({ timeout: 2000 });
    }
  } catch {
    // ignore — the banner is optional
  }
}

/**
 * Strip site chrome and live-only affordances so the snapshot stands alone:
 * remove the header toolbar and footer, unwrap links that point to (now stale)
 * UniProt queries, remove the inert expand/collapse buttons (the page is
 * static), and prepend a short explanation with a single link to uniprot.org.
 * @param {import('playwright').Page} page
 * @param {{ release?: string, releaseDate?: string, canonicalUrl: string }} info
 */
async function tidyForArchive(page, info) {
  await page.evaluate(({ release, releaseDate, canonicalUrl }) => {
    // 1. Remove the site header toolbar and footer. Scope to those outside
    //    <main> so any header/footer inside the content (e.g. card headers,
    //    which franklin renders as <header>) is preserved.
    document.querySelectorAll('header, footer').forEach((el) => {
      if (!el.closest('main')) {
        el.remove();
      }
    });

    // 2. Fix chart layout for the static archive. Inline styles override the
    //    class rules and survive serialization.
    //    (a) Neutralise position:sticky on figures — a live-scroll affordance
    //        that makes the stacked charts overlap.
    document.querySelectorAll('figure').forEach((figure) => {
      figure.style.position = 'static';
    });
    //    (b) Add a gap between each table and its chart(s): the .side-by-side
    //        grid places them in adjacent columns with no space. Memoise the
    //        computed-display lookup so shared ancestors aren't re-probed.
    const isGrid = (() => {
      const cache = new Map();
      return (element) => {
        if (!cache.has(element)) {
          cache.set(element, getComputedStyle(element).display === 'grid');
        }
        return cache.get(element);
      };
    })();
    document.querySelectorAll('figure, .archived-charts').forEach((el) => {
      for (
        let a = el.parentElement;
        a && a !== document.body;
        a = a.parentElement
      ) {
        if (isGrid(a)) {
          a.style.gap = '2rem';
          break;
        }
      }
    });

    // 3. Unwrap links that point to UniProt queries — they go stale and don't
    //    work offline. Covers HTML <a> and SVG <a> (e.g. pie-chart slices);
    //    keeps in-page anchors (#section) and any external links.
    document.querySelectorAll('a').forEach((anchor) => {
      const href =
        anchor.getAttribute('href') || anchor.getAttribute('xlink:href') || '';
      if (/query=/i.test(href)) {
        while (anchor.firstChild) {
          anchor.parentNode.insertBefore(anchor.firstChild, anchor);
        }
        anchor.remove();
      }
    });

    // 4. Remove the now-inert expand/collapse buttons (JavaScript is stripped
    //    from the archive and the tables are already fully expanded).
    document.querySelectorAll('button').forEach((button) => {
      if (/expand table|collapse table/i.test(button.textContent || '')) {
        button.remove();
      }
    });

    // 5. Prepend a short explanation with a single link to the live page.
    const main = document.querySelector('main') || document.body;
    const note = document.createElement('section');
    note.setAttribute(
      'style',
      'margin:1rem 0;padding:1rem 1.25rem;border:1px solid #d0d0d0;border-radius:4px;background:#f6f8fa;font-family:sans-serif;line-height:1.5;'
    );
    const heading = document.createElement('h2');
    heading.style.marginTop = '0';
    heading.textContent = release
      ? `Archived UniProtKB statistics for release ${release}`
      : 'Archived UniProtKB statistics';
    const forRelease = release
      ? ` for release ${release}${releaseDate ? ` (${releaseDate})` : ''}`
      : '';
    const intro = document.createElement('p');
    intro.textContent =
      `This is a static, self-contained snapshot of the UniProtKB statistics page${forRelease}, ` +
      'kept for long-term reference. It is not interactive: charts are fixed images and links to ' +
      'live searches have been removed. The underlying data is embedded in this file (in the ' +
      '"archived-statistics-data" script block) so it can be shared on its own.';
    const live = document.createElement('p');
    live.append('For the current, live statistics visit ');
    const link = document.createElement('a');
    link.href = canonicalUrl;
    link.textContent = canonicalUrl;
    live.append(link, '.');
    note.append(heading, intro, live);
    main.insertBefore(note, main.firstChild);
  }, info);
}

/**
 * Flatten every franklin-sites Tabs group (UniProtKB / Reviewed / Unreviewed)
 * into stacked, labelled static sections so all three datasets are preserved.
 * These tabs hold both collapsible StatsTables and D3 charts (e.g. the
 * sequence-length line plots), and only the active panel is mounted — so for
 * each tab we click it, expand its tables, wait for the panel to finish
 * rendering/animating, snapshot it, then replace the group with the stacked HTML.
 * @param {import('playwright').Page} page
 */
async function flattenTabs(page) {
  return page.evaluate(async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // Click every "Expand table" button in a panel so full tables are captured.
    // Each click must be awaited until React has committed the expansion:
    // StatsTable's handler *collapses* when it is already expanded, so finding
    // the same stale "Expand table" button and clicking again would toggle the
    // table shut and leave a truncated (10-row) capture.
    const expandPanel = async (panel) => {
      for (let guard = 0; guard < 100; guard += 1) {
        const button = Array.from(panel.querySelectorAll('button')).find((b) =>
          /expand table/i.test(b.textContent || '')
        );
        if (!button) {
          return;
        }
        button.click();
        // Committed = the button detached, or its label flipped to "Collapse
        // table". Polling beats a fixed sleep: a large table (TOP_ORGANISM,
        // CROSS_REFERENCE) can take well over 50ms to re-render under load.
        let committed = false;
        for (let i = 0; i < 40; i += 1) {
          await sleep(50);
          if (
            !button.isConnected ||
            !/expand table/i.test(button.textContent || '')
          ) {
            committed = true;
            break;
          }
        }
        if (!committed) {
          throw new Error(
            'Table did not expand: the "Expand table" button never changed state'
          );
        }
      }
      throw new Error(
        'More than 100 "Expand table" buttons in one panel — aborting rather than capturing partial tables'
      );
    };

    const tablists = Array.from(document.querySelectorAll('[role="tablist"]'));
    let flattened = 0;
    for (const tablist of tablists) {
      // The franklin Tabs container wraps the tablist and the tabpanel.
      const container = tablist.closest('.tabs') || tablist.parentElement;
      if (!container) {
        continue;
      }
      const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
      const panels = [];
      // HTML of the panel captured for the previous tab — the tabpanel element
      // is reused across tabs, so this is what a freshly-clicked tab must
      // differ from before we believe it has rendered.
      let previousHtml = null;
      for (const tab of tabs) {
        const title = (tab.textContent || '').trim();
        tab.click();
        // Poll for the newly-activated panel to mount with content rather than
        // guessing a fixed delay; fail loudly if it never renders so we never
        // ship an empty labelled section as success.
        let panel = null;
        for (let i = 0; i < 30; i += 1) {
          await sleep(100);
          panel = container.querySelector('[role="tabpanel"]');
          if (panel && panel.textContent.trim()) {
            break;
          }
        }
        if (!panel || !panel.textContent.trim()) {
          throw new Error(`Tab panel "${title}" did not render any content`);
        }
        // Wait until the panel stops changing before snapshotting. A chart panel
        // (e.g. the sequence-length line plots, which live in these tabs) is
        // non-empty immediately from its static axis labels, but its D3 line and
        // axes draw over a ~1s transition — capturing early freezes a
        // mid-animation chart with a wrong (interpolated) y-axis scale. Poll the
        // panel's HTML until it is unchanged across two reads AND differs from
        // the previous tab's panel: "stable" on its own is also true of the
        // previous dataset still sitting in the reused tabpanel, which would
        // file dataset N-1's numbers under dataset N's label (same `changed`
        // guard as waitStableSvg in flattenSelectCharts).
        let lastPoll = null;
        let settled = panel;
        let stable = false;
        for (let i = 0; i < 60; i += 1) {
          await sleep(100);
          settled = container.querySelector('[role="tabpanel"]') || settled;
          const html = settled.innerHTML;
          const changed = previousHtml === null || html !== previousHtml;
          if (html === lastPoll && changed) {
            stable = true;
            break;
          }
          lastPoll = html;
        }
        if (!stable) {
          throw new Error(
            `Tab panel "${title}" never rendered content distinct from the previous tab`
          );
        }
        // Expand only once this tab's own panel is on screen — expanding before
        // the wait would expand whichever panel was still mounted, and the
        // re-render would drop it.
        await expandPanel(settled);
        previousHtml = settled.innerHTML;
        panels.push({ title, html: previousHtml });
      }
      const wrapper = document.createElement('div');
      wrapper.className = 'archived-tabs';
      for (const { title, html } of panels) {
        const heading = document.createElement('h4');
        heading.className = 'archived-tabs__label';
        heading.textContent = title;
        const body = document.createElement('div');
        body.className = 'archived-tabs__panel';
        body.innerHTML = html;
        wrapper.append(heading, body);
      }
      container.replaceWith(wrapper);
      flattened += 1;
    }
    return flattened;
  });
}

/**
 * The taxonomy pie charts use a <select> to switch dataset (UniProtKB /
 * reviewed / unreviewed) and render only one at a time — the <select> is dead in
 * a static archive. Render each option and stack them as separate labelled
 * figures, then drop the <select>.
 * @param {import('playwright').Page} page
 */
async function flattenSelectCharts(page) {
  return page.evaluate(async () => {
    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    // Drive a React-controlled <select> from the DOM: set via the native value
    // setter, then dispatch a change event so React's onChange fires.
    const valueDescriptor = Object.getOwnPropertyDescriptor(
      window.HTMLSelectElement.prototype,
      'value'
    );
    const setSelectValue = (select, value) => {
      if (valueDescriptor && valueDescriptor.set) {
        valueDescriptor.set.call(select, value);
      } else {
        select.value = value;
      }
      select.dispatchEvent(new Event('change', { bubbles: true }));
    };

    const figures = Array.from(document.querySelectorAll('figure')).filter(
      (figure) => figure.querySelector('select')
    );
    let flattened = 0;
    for (const figure of figures) {
      const select = figure.querySelector('select');
      const caption = figure.querySelector('figcaption');
      // Descriptive text before the <select>, e.g. "Taxonomic distribution for".
      let prefix = '';
      if (caption) {
        for (const node of caption.childNodes) {
          if (node === select) {
            break;
          }
          prefix += node.textContent;
        }
      }
      prefix = prefix.replace(/\bfor\b\s*$/i, '').trim();

      const options = Array.from(select.options).map((option) => ({
        value: option.value,
        label: (option.textContent || option.value).trim(),
      }));

      const readSvg = () => {
        const svg = figure.querySelector('svg');
        return svg ? svg.outerHTML : '';
      };
      // Wait until the pie has re-rendered and its D3 transition has settled:
      // the SVG markup differs from the previous option's final SVG and is
      // stable across two polls. Avoids the fragility of a fixed sleep (which
      // could snapshot the previous/mid-transition chart).
      const waitStableSvg = async (previous, label) => {
        let last = null;
        for (let i = 0; i < 50; i += 1) {
          await sleep(100);
          const current = readSvg();
          const changed = previous === null || current !== previous;
          if (current && current === last && changed) {
            return current;
          }
          last = current;
        }
        // Never fall back to whatever is on screen: that is the *previous*
        // option's chart, which would be stacked under this option's label and
        // file dataset N-1's numbers as dataset N. The data verifier cannot
        // catch that (it compares slice names, not per-dataset values), so this
        // has to fail the capture — same contract as flattenTabs above.
        throw new Error(
          `Chart for "${label}" never rendered content distinct from the previous option`
        );
      };

      const rendered = [];
      let previous = null;
      for (const option of options) {
        setSelectValue(select, option.value);
        const svg = await waitStableSvg(previous, option.label);
        previous = svg;
        rendered.push({ label: option.label, svg });
      }

      const wrapper = document.createElement('div');
      wrapper.className = 'archived-charts';
      wrapper.setAttribute('style', 'margin:1.5rem 0;');
      // One heading for the shared prefix (e.g. "Taxonomic distribution").
      if (prefix) {
        const groupHeading = document.createElement('h4');
        groupHeading.textContent = prefix;
        groupHeading.setAttribute('style', 'margin:0 0 0.75rem;');
        wrapper.appendChild(groupHeading);
      }
      // Charts side by side (wrapping), each labelled directly above its chart
      // and boxed, so it is unambiguous which label belongs to which chart.
      const row = document.createElement('div');
      row.setAttribute(
        'style',
        'display:flex;flex-wrap:wrap;gap:1.5rem;align-items:flex-start;'
      );
      for (const { label, svg } of rendered) {
        const fig = document.createElement('figure');
        fig.setAttribute(
          'style',
          'position:static;margin:0;display:flex;flex-direction:column;align-items:center;border:1px solid #e0e0e0;border-radius:4px;padding:0.5rem 0.75rem;'
        );
        const cap = document.createElement('figcaption');
        cap.textContent = label;
        cap.setAttribute(
          'style',
          'font-weight:600;margin-bottom:0.25rem;text-align:center;'
        );
        const body = document.createElement('div');
        body.innerHTML = svg;
        // Caption first so the label sits above its chart.
        fig.append(cap, body);
        row.appendChild(fig);
      }
      wrapper.appendChild(row);
      figure.replaceWith(wrapper);
      flattened += 1;
    }
    return flattened;
  });
}

/**
 * Inject the SingleFile bundle and serialize the current (prepared) DOM into one
 * self-contained HTML string. A Node-side fetch fallback (exposed into the page)
 * lets SingleFile retrieve cross-origin resources that in-page fetch can't reach
 * because of CORS — mirroring single-file-cli's own CDP fetch fallback.
 * @param {import('playwright').Page} page
 * @returns {Promise<string>}
 */
async function serializeWithSingleFile(page) {
  // Resource-fetch fallback for SingleFile. Deliberately ignores the page-
  // supplied request options and issues a plain, bounded GET: the page drives
  // *which* URLs are fetched, so we constrain scheme/host/method/size/time to
  // limit that surface (see isSafeResourceUrl).
  await page.exposeFunction('__sfNodeFetch', async (url) => {
    if (!isSafeResourceUrl(url)) {
      return fetchFailure('blocked url');
    }
    const controller = new AbortController();
    try {
      const response = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: AbortSignal.any([
          AbortSignal.timeout(RESOURCE_FETCH_TIMEOUT_MS),
          controller.signal,
        ]),
      });
      // Enforce the cap *before* the body is materialised: reading it whole and
      // then measuring would let a huge response into memory first, which is
      // exactly what the cap exists to prevent. Trust a declared
      // content-length, then stream and abort once the running total passes it.
      const declared = Number(response.headers.get('content-length'));
      if (Number.isFinite(declared) && declared > MAX_RESOURCE_BYTES) {
        controller.abort();
        return fetchFailure('resource too large');
      }
      const chunks = [];
      let total = 0;
      let tooLarge = false;
      for await (const chunk of response.body ?? []) {
        total += chunk.byteLength;
        if (total > MAX_RESOURCE_BYTES) {
          tooLarge = true;
          break; // cancels the body stream
        }
        chunks.push(chunk);
      }
      if (tooLarge) {
        // Break first, abort after: aborting mid-iteration rejects the pending
        // read, and that error would mask the reason in the returned failure.
        controller.abort();
        return fetchFailure('resource too large');
      }
      return {
        status: response.status,
        headers: Array.from(response.headers.entries()),
        data: Buffer.concat(chunks).toString('base64'),
      };
    } catch (error) {
      return fetchFailure(String(error));
    }
  });

  // Define window.singlefile by injecting the bundle as a real inline <script>:
  // a top-level `var` reliably attaches to window, and the page sends no CSP.
  // Done after page prep so the document is fully ready.
  await page.addScriptTag({ content: singleFileBundle });
  const injected = await page.evaluate(
    () => typeof window.singlefile !== 'undefined'
  );
  if (!injected) {
    throw new Error(
      'SingleFile bundle did not initialise (window.singlefile is undefined)'
    );
  }

  // Wire the fetch fallback (native fetch first, Node fetch on failure) then
  // serialize.
  await page.evaluate(() => {
    const nativeFetch = globalThis.fetch.bind(globalThis);
    window.singlefile.init({
      fetch: async (url, options) => {
        try {
          const response = await nativeFetch(url, options);
          if (response.ok) {
            return response;
          }
          throw new Error(`status ${response.status}`);
        } catch {
          const { status, headers, data, error } = await window.__sfNodeFetch(
            url,
            options
          );
          // status 0 is the Node fallback's failure sentinel (blocked/timeout).
          // Reject so SingleFile handles it as a failed fetch (leaves/skips the
          // resource) instead of silently inlining an empty data URI.
          if (!status) {
            throw new Error(error || `resource fetch failed: ${url}`);
          }
          const binary = atob(data || '');
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i += 1) {
            bytes[i] = binary.charCodeAt(i);
          }
          // Return a real Response, not a look-alike: SingleFile reads `ok`
          // and calls `text()` on fetched stylesheets, and a bare object
          // missing those makes it drop the resource from the archive.
          const nullBody = status === 204 || status === 205 || status === 304;
          const response = new Response(nullBody ? null : bytes, {
            status,
            headers: new Headers(headers),
          });
          // `url` is read-only and always '' on a constructed Response, but
          // SingleFile resolves relative URLs inside fetched CSS against it.
          Object.defineProperty(response, 'url', { value: url });
          return response;
        }
      },
    });
  });

  const content = await page.evaluate(async (options) => {
    const pageData = await window.singlefile.getPageData(options);
    return typeof pageData.content === 'string' ? pageData.content : null;
  }, SINGLE_FILE_OPTIONS);

  if (!content) {
    throw new Error('SingleFile returned no HTML content');
  }
  return content;
}

/**
 * Capture the statistics page as a single self-contained HTML string.
 * @param {object} opts
 * @param {string} opts.url                    Statistics page URL to capture.
 * @param {string} [opts.browserExecutablePath] Path to a Chrome/Chromium binary.
 * @param {string} [opts.channel]              Playwright browser channel (e.g. 'chrome').
 * @param {string} [opts.release]              Release number, shown in the explanation.
 * @param {string} [opts.releaseDate]          Release date, shown in the explanation.
 * @param {(msg: string) => void} [opts.log]   Progress logger.
 * @returns {Promise<string>} The self-contained HTML.
 */
export async function captureStatisticsPage({
  url,
  browserExecutablePath,
  channel,
  release,
  releaseDate,
  log = noop,
} = {}) {
  const launchOptions = { headless: true };
  if (browserExecutablePath) {
    launchOptions.executablePath = browserExecutablePath;
  }
  if (channel) {
    launchOptions.channel = channel;
  }

  log(`launching Chromium${channel ? ` (channel: ${channel})` : ''}`);
  const browser = await chromium.launch(launchOptions);
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1200 },
    });
    // Force every LazyComponent to render regardless of scroll by stubbing
    // IntersectionObserver to report all observed elements as intersecting
    // (see src/shared/components/LazyComponent.tsx). Without this the D3 charts
    // never mount and stay on their empty fallback.
    await context.addInitScript(() => {
      window.IntersectionObserver = class {
        constructor(callback) {
          this.callback = callback;
        }

        observe(element) {
          setTimeout(
            () =>
              this.callback(
                [
                  {
                    isIntersecting: true,
                    intersectionRatio: 1,
                    target: element,
                  },
                ],
                this
              ),
            0
          );
        }

        unobserve() {}

        disconnect() {}

        takeRecords() {
          return [];
        }
      };
    });
    // Drop analytics/telemetry so the page settles faster and captures stay clean.
    await context.route(
      /(google-analytics|googletagmanager|matomo|piwik|sentry|hotjar|doubleclick)\./i,
      (route) => route.abort()
    );
    const page = await context.newPage();

    log(`navigating to ${url}`);
    // 'domcontentloaded' rather than 'networkidle': the SPA keeps connections
    // open (service worker, telemetry) so networkidle can hang. Readiness is
    // asserted below by waiting for the rendered statistics content instead.
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90_000 });

    await dismissCookieBanner(page);

    // Wait for the statistics data to have loaded (Introduction section + a table).
    log('waiting for statistics data to render');
    await page.waitForSelector('#introduction', { timeout: 90_000 });
    await page.waitForSelector('#introduction table', { timeout: 90_000 });

    // Charts render eagerly (IntersectionObserver is stubbed above); wait for
    // their D3 <g> content to appear, then let transitions settle. Fail loudly
    // on timeout rather than shipping an archive with empty charts as success.
    log('waiting for charts to render');
    try {
      await page.waitForFunction(
        () => {
          // D3 charts draw into an inner <g>; this excludes plain icon <svg>s.
          const charts = Array.from(document.querySelectorAll('svg')).filter(
            (svg) => {
              const g = svg.querySelector('g');
              return g && g.querySelector('path, rect, line, circle, polyline');
            }
          );
          return charts.length >= 3;
        },
        { timeout: 30_000 }
      );
    } catch {
      throw new Error(
        'Charts did not render within 30s — refusing to produce an archive with empty charts. ' +
          'The statistics page structure may have changed; check the chart selectors in capture.mjs.'
      );
    }
    await page.waitForTimeout(1500); // let D3 transitions finish

    const flattened = await flattenTabs(page);
    log(`flattened ${flattened} tab group(s) into stacked sections`);

    const charts = await flattenSelectCharts(page);
    log(`split ${charts} dropdown chart(s) into separate charts`);

    log('tidying for archive (removing chrome, query links, buttons)');
    await tidyForArchive(page, { release, releaseDate, canonicalUrl: url });

    log('serializing to a single self-contained file (SingleFile)');
    const html = await serializeWithSingleFile(page);
    log(`serialized ${(html.length / 1024).toFixed(0)} KB of HTML`);

    return html;
  } finally {
    await browser.close();
  }
}

export default captureStatisticsPage;
