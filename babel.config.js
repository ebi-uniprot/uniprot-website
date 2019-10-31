// eslint-disable-next-line func-names
module.exports = function(api) {
  api.cache(true);

  const presets = [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript',
  ];
  const plugins = [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ];

  return {
    presets,
    plugins,
  };
};
