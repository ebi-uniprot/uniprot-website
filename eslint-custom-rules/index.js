module.exports = {
  rules: {
    'use-config-location': require('./rules/use-config-location'),
  },
  configs: {
    recommended: {
      rules: {
        'uniprot-website/use-config-location': 'warn',
      },
    },
  },
};
