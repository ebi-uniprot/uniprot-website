module.exports = {
  rules: {
    'use-config-location': require('./rules/use-config-location'),
    'return-on-new-line': require('./rules/return-on-new-line'),
  },
  configs: {
    recommended: {
      rules: {
        'uniprot-website/use-config-location': 'warn',
        'uniprot-website/return-on-new-line': 'warn',
      },
    },
  },
};
