const { RuleTester } = require('eslint');

const rule = require('../use-generate-path');

// TODO: fix config to accept jsx syntax
// This is failing for now
new RuleTester(require('./config')).run('use-generate-path', rule, {
  valid: [
    {
      code: 'const a = 1;',
    },
    {
      code: `import { Link } from 'not-react-router-dom-definitely-not';

      export default Component = () => (
        <Link to={'path'}>Link content</Link>
      );`,
    },
    {
      code: `import { Link, generatePath } from 'react-router-dom';

      export default Component = () => (
        <Link to={generatePath('path')}>Link content</Link>
      );`,
    },
    {
      code: `import { Link, generatePath } from 'react-router-dom';

      export default Component = () => {
        const path = generatePath('path');
        return (
          <Link to={path}>Link content</Link>
        );
      };`,
    },
    {
      code: `import { Link as L, generatePath as gp } from 'react-router-dom';

      export default Component = () => (
        <L to={gp('path')}>Link content</L>
      );`,
    },
  ],
  invalid: [
    {
      code: `import { Link } from 'react-router-dom';
      
      export default Component = () => (
        <Link to="path">Link content</Link>
      );`,
      errors: [{ messageId: 'issue' }],
    },
  ],
});
