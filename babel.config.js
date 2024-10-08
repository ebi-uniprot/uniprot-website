// This file is for the tests

// eslint-disable-next-line func-names
module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: { version: '3', proposals: true },
        },
      ],
      ['@babel/preset-react', { runtime: 'automatic' }],
      '@babel/preset-typescript',
    ],
  };
};
