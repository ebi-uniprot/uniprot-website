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

// Match only the import specifier `react/jsx-dev-runtime`, which appears when
// APP code is compiled with the dev JSX transform (`@babel/preset-react`
// `development: true`) — the actual production-crashing bug this guard exists
// for. The bare `jsxDEV` identifier is intentionally NOT matched: it also
// occurs inside React's own `react-jsx-runtime.development.js`, which is
// legitimately bundled by any `--mode development` build (the Netlify preview
// deploys are dev-mode) and does not indicate the transform misconfiguration.
const DEV_RUNTIME_MARKERS = ['jsx-dev-runtime'];

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

console.log(
  `verify-bundle: OK — ${jsFiles.length} bundle files, no dev JSX runtime.`
);
