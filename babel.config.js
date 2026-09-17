// This file is for the tests

// eslint-disable-next-line func-names
module.exports = function (api) {
  api.cache(true);

  return {
    // `.ts` files can't contain JSX, so preset-react (which puts the parser
    // in JSX mode) is applied only to the other extensions. This lets Babel 8
    // parse generic arrows like `<T>(x) => ...` in `.ts` files without a
    // trailing comma.
    overrides: [
      {
        test: /\.ts$/,
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          ['@babel/preset-typescript', { onlyRemoveTypeImports: false }],
        ],
      },
      {
        exclude: /\.ts$/,
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          ['@babel/preset-react', { runtime: 'automatic' }],
          ['@babel/preset-typescript', { onlyRemoveTypeImports: false }],
        ],
      },
    ],
  };
};
