// eslint-disable-next-line func-names
module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: { version: '3.25.1', proposals: true },
        },
      ],
      ['@babel/preset-react', { runtime: 'automatic' }],
      '@babel/preset-typescript',
    ],
    plugins: ['@babel/plugin-transform-runtime'],
  };
};
