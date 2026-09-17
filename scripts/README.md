# Scripts Directory

This directory contains utility scripts that automate various development and operational tasks for the project. Each script is designed to perform specific functions and can be run independently.

## What's here

| Script                | Run with                                            | What it does                                                                                                |
| --------------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `update-mocks.mjs`    | `pnpm update-mocks`                                 | Refreshes `__mocks__` fixtures in place from the source URLs recorded in their comments.                    |
| `verify-bundle.js`    | `pnpm verify:bundle`                                | Post-build guard against two regressions that have shipped before.                                          |
| `archive-statistics/` | `pnpm archive:statistics`, `pnpm verify:statistics` | Captures the UniProtKB statistics page as one self-contained HTML file, behind a fail-closed data verifier. |

## Testing

Scripts are tested with Node's built-in test runner, not jest — jest's `testRegex` is
scoped to `src/` and never picks up files here. Put tests next to the code they cover
as `<name>.test.mjs` (or `.test.js`) and they are collected automatically:

```sh
pnpm test:scripts-unit        # every test under scripts/
```

This is deliberately **not** part of `pnpm test`, which stays scoped to `src`
(`test:lint`, `test:types`, `test:unit`). Someone working on the app should not have to
think about these. Run it when you change something under `scripts/`.

Most of these tests are offline and deterministic, but a few are not, and they are kept
in separate files so it is obvious which is which:

| File                                  | Needs                                |
| ------------------------------------- | ------------------------------------ |
| `archive-statistics/verify.test.mjs`  | nothing                              |
| `archive-statistics/index.test.mjs`   | nothing                              |
| `archive-statistics/archive.test.mjs` | the live API, and `archive/` on disk |

`archive.test.mjs` asks the live API which release is current and fails if that release
has not been archived yet. It also fails if the API cannot be reached at all — "I could
not check" must not be reported the same way as "I checked and it is fine" — so this file
needs working network, not just a populated `archive/`.

## `update-mocks`

The `update-mocks` script automates the process of updating TypeScript mock data files based on JSON payloads fetched from specified URLs. It parses files to find specific comments that indicate a source URL and updates the associated mock data variables with fresh data retrieved from these URLs.

The script reads TypeScript files, locates variables associated with a "Source:" and "Retrieved:" comment, fetches the corresponding JSON data from the source URL, and updates the variable's value with the new data. It also updates the "Retrieved:" comment with the current date to track when the mock was last updated.

If URLs do not have an origin, the script will assumed that they need to use the UniProt website API and the corresponding base will be prepended. For URLs that are not on the website API, the URLs should be complete with scheme and origin.

### Recognised patterns

Here are some examples of patterns recognised by this script:

```ts
// Source: <URL>
// Retrieved: <date>
const mock = { field: 'data' };

export mock;
```

```ts
// Source: <URL>
// Retrieved: <date>
export const myMock = [{ field: 'data' }, { field: 'content' }];
```

```ts
// Source: <URL>
// Retrieved: <date>
export const serverData: MockType = { key: { complex: 'value' } };
```

```ts
// Source: <URL>
// Retrieved: <date>
export default { content: 'ATCG' };
```

Note that if there are multiple mocks within the same file, it will update all of them.

### Caveats

This script will not allow to have a type casting directly on the mock (using `as`):

```ts
// Source: <URL>
// Retrieved: <date>
export const mock = { field: 'data' } as MockType; // will not work!
```

If a typecasting is needed, it should be somewhere else:

```ts
// Source: <URL>
// Retrieved: <date>
const mock = { field: 'data' } as any;

export default mock as any;
```

### Usage

The script should be called through `package.json` script, for example using `pnpm run update-mocks`. It supports several command-line options to customize its behavior:

#### CLI Options

- **`--glob` (`-g`)**: This option allows you to specify a glob pattern to select the TypeScript files to process. The default is `'**/__mocks__/**/*.ts'`, which targets TypeScript files in any `__mocks__` directories. Make sure to quote the pattern to prevent glob expansion at the command line.

- **`--dev` (`-d`)**: When set, the script uses the development base URL for fetching the data (`https://wwwdev.ebi.ac.uk/uniprot/api/`) instead of the default which is the production base URL (`https://rest.uniprot.org/`).

- **`--dry`**: Enables a dry run, where the script will not write any changes to the files.

## `verify-bundle`

A post-build guard, run against `build/` once a build exists:

```sh
pnpm build:netlify && pnpm verify:bundle
```

It checks two things, both of which have gone wrong in production before:

- **The React _development_ JSX runtime leaking into a deployed bundle** (`jsx-dev-runtime` /
  `jsxDEV`). This crashed production once, when `@babel/preset-react` was left without an
  explicit `development` option and the `--mode development` Netlify build emitted the dev
  runtime. The unit tests run through `babel.config.js` rather than webpack, so they can never
  catch it.
- **`index.html` not referencing the bundles that were actually built.** The modern and legacy
  compilations both emit `build/index.html`; when they ran out of order, the losing one won and
  shipped an `index.html` with only `nomodule` tags, so nothing ran in a modern browser. Legacy
  tags are only required when a legacy bundle was built — preview-production builds are
  modern-only.

On failure it exits non-zero, names the offending files and suggests the fix.

## `archive-statistics`

Captures the [UniProtKB statistics page](https://www.uniprot.org/uniprotkb/statistics) as a
single self-contained HTML file — CSS, fonts and images inlined, JavaScript stripped, and the raw
REST API JSON embedded in a non-executable `<script type="application/json">` block so the file
is shareable on its own.

```sh
pnpm archive:statistics                  # writes archive/uniprotkb-statistics-<release>.html
pnpm verify:statistics <file.html>       # re-check an existing archive, offline
```

It is **fail-closed**: before writing, a verifier compares the values rendered in the archive
against the source JSON and refuses to write the file on any mismatch (`--no-verify` overrides).
`verify:statistics` re-runs those checks on any archived file against its own embedded data, so
an archive stays checkable long after the release it captured.

Requires Node 22+ and a Chromium for Playwright. See
[`archive-statistics/README.md`](./archive-statistics/README.md) for the options, how the capture
flattens tabs and charts, and what the verifier does and does not cover.
