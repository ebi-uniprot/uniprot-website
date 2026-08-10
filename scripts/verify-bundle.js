/* eslint-disable no-console */
// Post-build guard: fail if a production/deploy bundle accidentally ships the
// React *development* JSX runtime (`react/jsx-dev-runtime` / `jsxDEV`). That is
// exactly what crashed production once before — `@babel/preset-react` was left
// without an explicit `development` option, so the `--mode development` Netlify
// build emitted the dev runtime into the deployed bundle.
//
// The unit tests run through babel.config.js, not webpack, so they can never
// catch this. Run this against the `build/` output in CI / before deploy:
//   yarn build:netlify && yarn verify:bundle
const fs = require('fs');
const path = require('path');

const buildDir = path.resolve(__dirname, '..', 'build');

const DEV_RUNTIME_MARKERS = ['jsx-dev-runtime', 'jsxDEV'];

const walk = (dir) => {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walk(full));
    } else if (entry.isFile() && full.endsWith('.js')) {
      out.push(full);
    }
  }
  return out;
};

if (!fs.existsSync(buildDir)) {
  console.error(
    `verify-bundle: no build/ directory at ${buildDir} — run a build first.`
  );
  process.exit(1);
}

const jsFiles = walk(buildDir);
if (jsFiles.length === 0) {
  console.error('verify-bundle: build/ contains no .js files — build failed?');
  process.exit(1);
}

const offenders = jsFiles.filter((file) => {
  const src = fs.readFileSync(file, 'utf8');
  return DEV_RUNTIME_MARKERS.some((marker) => src.includes(marker));
});

if (offenders.length > 0) {
  console.error(
    'verify-bundle: the React development JSX runtime leaked into the bundle ' +
      '(this crashes production). Offending files:'
  );
  for (const file of offenders) {
    console.error(`  - ${path.relative(buildDir, file)}`);
  }
  console.error(
    'Fix: ensure @babel/preset-react uses `development: false` for builds ' +
      '(webpack.config.js sets `development: isLiveReload`), and that the ' +
      'jest-only babel.config.js is not merged in (`configFile: false`).'
  );
  process.exit(1);
}

// Guard against the modern/legacy split shipping an index.html that does not
// reference the bundles that were actually built. The modern and legacy configs
// both emit build/index.html via a shared LegacyModuleSplitPlugin instance that
// snapshots the script list per compilation; if they ever stop being ordered
// (webpack.config.js sets `modernConfig.dependencies = ['legacy']`), the losing
// config's HTML can win and omit the other bundle's <script> tags. That once
// shipped an index.html with only `nomodule` tags, so nothing ran in a modern
// browser. Fail loudly here rather than deploying a blank page.
const indexHtmlPath = path.join(buildDir, 'index.html');
if (!fs.existsSync(indexHtmlPath)) {
  console.error(`verify-bundle: no index.html at ${indexHtmlPath}.`);
  process.exit(1);
}
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

const modernTags = indexHtml.match(
  /<script[^>]*type="module"[^>]*src="[^"]*modern\.[^"]*"/g
);
if (!modernTags) {
  console.error(
    'verify-bundle: index.html references no modern `type="module"` scripts — ' +
      'nothing would run in a modern browser.\n' +
      'Fix: the modern/legacy compilations are out of order; ensure ' +
      "webpack.config.js still sets `modernConfig.dependencies = ['legacy']` " +
      'so the modern build (which writes index.html last) sees both bundles.'
  );
  process.exit(1);
}

// Only require legacy tags when a legacy bundle was actually built —
// preview-production builds (PREVIEW_PRODUCTION=true) are modern-only.
const legacyBuilt = jsFiles.some((file) =>
  path.basename(file).startsWith('legacy.')
);
const legacyTags = indexHtml.match(
  /<script[^>]*nomodule[^>]*src="[^"]*legacy\.[^"]*"/g
);
if (legacyBuilt && !legacyTags) {
  console.error(
    'verify-bundle: a legacy bundle was built but index.html references no ' +
      '`nomodule` legacy scripts — old browsers would get nothing.\n' +
      'Fix: same modern/legacy ordering issue as above.'
  );
  process.exit(1);
}

console.log(
  `verify-bundle: OK — ${jsFiles.length} bundle files, no dev JSX runtime, ` +
    `${modernTags.length} modern + ${
      legacyTags ? legacyTags.length : 0
    } legacy script tags in index.html.`
);
