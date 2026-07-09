# archive-statistics

Generate a **single, completely standalone** archival snapshot of the UniProtKB
statistics page (<https://www.uniprot.org/uniprotkb/statistics>) — one HTML file
that is trivial to host or share. Run it **once per release**.

Each run produces one file:

```
archive/uniprotkb-statistics-<release>.html
```

It inlines all CSS, fonts and images as data URIs and has JavaScript removed, so it
renders in any browser with no network access — the goal being that it is still
readable in ~10 years. It also **embeds the raw JSON** in a non-executable
`<script type="application/json" id="archived-statistics-data">` block, so the
machine-readable data survives even if the rendered page ever fails. Read it back
with:

```js
JSON.parse(document.getElementById('archived-statistics-data').textContent);
// -> { metadata, databases, statistics: { combined, reviewed, unreviewed }, history }
```

## How it works

The statistics page is a React SPA with no server-side rendering, so the script
drives a real browser (Playwright/Chromium):

1. **Raw JSON** is fetched straight from the REST API (the current release is read
   from the `x-uniprot-release` header on `configure/uniprotkb/allDatabases`).
2. **HTML capture** loads the page and prepares the DOM: it forces the lazy-rendered
   D3 charts to render (by stubbing `IntersectionObserver`), expands every collapsible
   table, flattens the `UniProtKB / Reviewed / Unreviewed` tabs into stacked static
   sections (those tabs mount only the active panel, so a naive freeze would drop
   two-thirds of the data), splits the dropdown-driven taxonomy pie charts into
   separate labelled charts, and strips the site header/footer and stale query links.
   [SingleFile](https://github.com/gildas-lormeau/SingleFile) then serializes the
   prepared DOM into one self-contained file, into which the raw JSON is embedded.
3. **Verification** (`verify.mjs`) re-parses the finished HTML and checks that every
   value it displays matches the embedded source JSON before the file is written —
   a fail-closed gate, so a bad capture is never shipped.

## Verification

Every capture is verified against its own data before the file is written; on any
mismatch the run fails (exit 1) and **no file is produced** (pass `--no-verify` to
override). The check is browser-free (jsdom + the embedded JSON as ground truth), so
any archived file can also be re-checked later, offline:

```bash
yarn verify:statistics archive/uniprotkb-statistics-2026_02.html
```

It cross-checks, per dataset (UniProtKB / Reviewed / Unreviewed):

- **Tables** — every source raw value (count / entryCount / totalCount), formatted
  exactly as the page formats it, must be present, and row counts must match the
  source item counts. Catches dropped/duplicated rows, wrong values and dataset
  swaps. Derived cells (percentages, per-entry averages) are recomputed but only
  reported as warnings (they depend on reproducing D3/rounding).
- **Charts** — the sequence-length and history line plots hold data that appears in
  no table, so their y-axis scale is checked against the source max; a y-axis scaled
  to a fraction of the real max means the chart was frozen mid-D3-transition (the bug
  this whole check was built to catch). Pie slice counts/names are checked too.

The verifier deliberately anchors only on capture-owned markup (`.archived-tabs`,
`.archived-charts`, `data-key`, axis classes, `<thead>` headers, section headings) and
a small heading→category registry, never on SingleFile's hashed CSS-module class
names. If the statistics UI is restructured, update the registry / anchors in
`verify.mjs`. Tests: `node --test scripts/archive-statistics/`.

## Prerequisites

- Node 18+ (uses global `fetch`).
- Dev dependencies: `playwright` and `single-file-cli` (added to `package.json`).
- A Chromium for Playwright. Either:
  - `npx playwright install chromium` (downloads Playwright's browser), **or**
  - point at an existing browser with `--channel chrome` or
    `--browser-path /path/to/chromium`.

> In a network-restricted sandbox the Playwright browser download may be blocked.
> Run where `npx playwright install chromium` can reach the CDN, or pass a system
> browser via `--channel`/`--browser-path`.

## Usage

```bash
# Archive the current release to archive/uniprotkb-statistics-<release>.html
node scripts/archive-statistics/index.mjs

# …or via the package script
yarn archive:statistics

# Use an installed Chrome instead of Playwright's bundled browser, into ./public
node scripts/archive-statistics/index.mjs --channel chrome --out ./public
```

### Options

| Option                         | Default                    | Description                                                              |
| ------------------------------ | -------------------------- | ------------------------------------------------------------------------ |
| `--release <current\|version>` | `current`                  | Release to archive. `current` reads the live `x-uniprot-release` header. |
| `--url <url>`                  | production statistics page | Page to capture.                                                         |
| `--api <base>`                 | `https://rest.uniprot.org` | REST API base for the raw JSON.                                          |
| `--out <dir>`                  | `./archive`                | Output directory for the `.html` file.                                   |
| `--browser-path <path>`        | —                          | Chrome/Chromium executable for Playwright.                               |
| `--channel <name>`             | —                          | Playwright browser channel (e.g. `chrome`, `msedge`).                    |

## Caveats

- **Current release only.** The live page has no release selector, so only the
  current release can be captured — run the script at each release. Passing a
  `--release` that differs from what the live site serves fails with an error
  rather than producing a mislabeled file.
- **Static snapshot.** Charts become static SVG and interactivity (hover tooltips,
  live tab switching) is frozen. All data remains present.
- **Selector drift.** Capture depends on the page's DOM (the tab roles, the
  "Expand table" button text, the taxonomy `<select>`, and the chart `<svg>`
  structure). If the statistics UI is restructured the capture fails loudly (empty
  panels and missing charts throw rather than silently shipping) — update the
  selectors in `capture.mjs`.
