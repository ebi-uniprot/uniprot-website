module.exports = {
  rules: {
    'use-generate-path': require('./rules/use-generate-path'),
    'return-on-new-line': require('./rules/return-on-new-line'),
  },
  configs: {
    recommended: {
      rules: {
        'uniprot-website/use-generate-path': 'warn',
        'uniprot-website/return-on-new-line': 'warn',
      },
    },
  },
};
