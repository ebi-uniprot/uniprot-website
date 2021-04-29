// https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md
module.exports = {
  ci: {
    collect: {
      settings: { chromeFlags: '--no-sandbox' },
      numberOfRuns: 5,
      url: [
        'https://beta.uniprot.org',
        'https://beta.uniprot.org/uniprotkb?query=%2A',
      ],
      // https://github.com/GoogleChrome/lighthouse/blob/575e29b8b6634bfb280bc820efea6795f3dd9017/types/externs.d.ts#L141-L186
      settings: {
        extends: 'lighthouse:desktop',
      },
    },
    upload: {
      target: 'temporary-public-storage',
      outputDir: './.lhci',
    },
  },
};
