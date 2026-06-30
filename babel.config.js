// This file is for the tests

/* eslint-disable @typescript-eslint/no-require-imports */
// Pin the corejs3 polyfill plugin to the installed core-js version so the two
// can never drift; the plugin must not assume polyfills newer than what is
// actually installed.
const coreJsVersion = require('core-js/package.json').version;

// `onlyRemoveTypeImports: false` keeps Babel 7's behaviour of fully eliding
// type-only imports (e.g. from the types-only `type-fest`), instead of leaving
// a bare side-effect import behind.
const presetTypescript = [
  '@babel/preset-typescript',
  { onlyRemoveTypeImports: false },
];
const presetReact = ['@babel/preset-react', { runtime: 'automatic' }];

// eslint-disable-next-line func-names
module.exports = function (api) {
  api.cache(true);

  return {
    // `.ts` files can't contain JSX, so preset-react (which puts the parser in
    // JSX mode) is applied only to the other extensions. This lets Babel 8 parse
    // generic arrows like `<T>(x) => ...` in `.ts` files without a trailing-comma
    // disambiguation — which matters because Prettier strips that comma back out
    // in `.ts` files, so requiring it would make the build fight itself.
    overrides: [
      { test: /\.ts$/, presets: ['@babel/preset-env', presetTypescript] },
      {
        exclude: /\.ts$/,
        presets: ['@babel/preset-env', presetReact, presetTypescript],
      },
    ],
    // Babel 8 removed preset-env's `useBuiltIns`/`corejs` options; the corejs3
    // polyfill plugin is the documented replacement (`usage-global` is the
    // equivalent of the old `useBuiltIns: 'usage'`).
    plugins: [
      [
        'polyfill-corejs3',
        { method: 'usage-global', version: coreJsVersion, proposals: true },
      ],
    ],
  };
};
