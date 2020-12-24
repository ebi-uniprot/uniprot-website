const { RuleTester } = require('eslint');

const rule = require('../return-on-new-line');

new RuleTester(require('./config')).run('return-on-new-line', rule, {
  valid: [
    { code: 'const a = 1;' },
    {
      code: `() => {
        if (true) {
          return 1;
        }
      };`,
    },
  ],
  invalid: [
    {
      code: '() => { if (true) return; };',
      errors: [{ messageId: 'issue' }],
    },
    {
      code: '() => { if (true) return 5; };',
      errors: [{ messageId: 'issue' }],
    },
    {
      code: `() => {
        if (true) return 5;
      };`,
      errors: [{ messageId: 'issue' }],
    },
    {
      code: `() => {
        if (true) { return 5; }
      };`,
      errors: [{ messageId: 'issue' }],
    },
    // TODO:
    // {
    //   code: `() => {
    //     if (true)
    //       return 5;
    //   };`,
    //   errors: [{ messageId: 'issue' }],
    // },
  ],
});
