// https://github.com/GoogleChrome/lighthouse-ci/blob/main/docs/configuration.md
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      // Replace with correct URLs depending on context
      url: [
        'https://beta.uniprot.org',
        'https://beta.uniprot.org/uniprotkb?query=%2A',
        // Entry page with most user landings according to Google Analytics
        'https://beta.uniprot.org/uniprotkb/P0DTC2',
        // 2nd in landing pages according to Google Analytics
        'https://beta.uniprot.org/blast',
      ],
      // https://github.com/GoogleChrome/lighthouse/blob/575e29b8b6634bfb280bc820efea6795f3dd9017/types/externs.d.ts#L141-L186
      settings: {
        extends: 'lighthouse:desktop',
        preset: 'desktop',
      },
    },
    // When we're ready to fail CI because of Lighthouse scores
    // assert: {
    //   preset: 'lighthouse:recommended',
    // },
    upload: {
      target: 'temporary-public-storage',
      outputDir: './.lhci',
    },
  },
};
