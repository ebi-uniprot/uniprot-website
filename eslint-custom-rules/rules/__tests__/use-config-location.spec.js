const { RuleTester } = require('eslint');

const rule = require('../use-config-location');

/**
 * Note: filename needs to be specified with a .jsx or .tsx extension to trigger
 * correct parsing of JSX syntax.
 */

new RuleTester(require('./config')).run('use-config-location', rule, {
  valid: [
    {
      code: 'const a = 1;',
    },
    {
      // not using a link from 'react-router-dom' library
      code: `import { Link } from 'not-react-router-dom-definitely-not';

      export default Component = () => (
        <Link to="path">Link content</Link>
      );`,
      filename: 'index.tsx',
    },
    {
      // use location from config withing function
      code: `import { Link, generatePath } from 'react-router-dom';
      import { Location } from '../config/urls';

      export default Component = () => (
        <Link to={generatePath(Location.UniProtKB)}>Link content</Link>
      );`,
      filename: 'index.tsx',
    },
    {
      // use something else from config
      code: `import { Link, generatePath } from 'react-router-dom';
      import { someRandomMethod } from '../config/urls';

      export default Component = () => (
        <Link to={(loc) => generatePath(someRandomMethod(loc.pathname))}>Link content</Link>
      );`,
      filename: 'index.tsx',
    },
    {
      // use directly location from config
      code: `import { Link } from 'react-router-dom';
      import { Location } from '../config/urls';

      export default Component = () => (
        <Link to={Location.UniRef}>Link content</Link>
      );`,
      filename: 'index.tsx',
    },
    {
      // set variable with location from config before using
      code: `import { Link, generatePath } from 'react-router-dom';
      import { Location } from '../config/urls';

      export default Component = () => {
        const path = generatePath(Location.UniParc);
        return (
          <Link to={path}>Link content</Link>
        );
      };`,
      filename: 'index.tsx',
    },
    {
      // conditionally set variable with location from config before using
      code: `import { Link, generatePath } from 'react-router-dom';
      import { Location } from '../config/urls';

      export default Component = () => {
        let path;
        if (Math.random() > 0.5) {
          path = generatePath(Location.UniParc);
        }
        return (
          <Link to={path}>Link content</Link>
        );
      };`,
      filename: 'index.tsx',
    },
    {
      // rename imports before using
      code: `import { Link as L, generatePath as gp } from 'react-router-dom';
      import { Location as Loc } from '../config/urls';

      export default Component = () => (
        <L to={gp(Loc.UniProtKB)}>Link content</L>
      );`,
      filename: 'index.tsx',
    },
    {
      // to object with pathname
      code: `import { Link } from 'react-router-dom';
      import { Location } from '../config/urls';
      
      export default Component = ({ accession }) => (
        <Link to={{ pathname: Location.UniRef, search: 'query=glucose' }}>
          Link content
        </Link>
      );`,
      filename: 'index.tsx',
    },
    {
      // navigation with history object
      code: `import { useHistory } from 'react-router-dom';
      import { Location } from '../config/urls';

      export default Component = () => {
        const history = useHistory();

        useEffect(() => {
          history.push(Location.UniRef)
        }, [history]);

        return null;
      };`,
    },
  ],
  invalid: [
    {
      code: `import { Link } from 'react-router-dom';
      
      export default Component = () => (
        <Link to="path">Link content</Link>
      );`,
      filename: 'index.tsx',
      errors: [{ messageId: 'link' }],
    },
    {
      code: `import { Link } from 'react-router-dom';
      import { Location } from '../config/urls';
      
      export default Component = ({ accession }) => (
        <Link to={\`\${Location.UniProtKB}/\${accession}}\`}>Link content</Link>
      );`,
      filename: 'index.tsx',
      errors: [{ messageId: 'string' }],
    },
    {
      code: `import { useHistory } from 'react-router-dom';
      import { Location } from '../config/urls';

      export default Component = () => {
        const { push } = useHistory();

        useEffect(() => {
          push(Location.UniRef)
        }, [history]);

        return null;
      };`,
      errors: [{ messageId: 'destructureHistory' }],
    },
    {
      code: `import { useHistory } from 'react-router-dom';

      export default Component = () => {
        const history = useHistory();

        useEffect(() => {
          history.push('/uniprotkb/P00001')
        }, [history]);

        return null;
      };`,
      errors: [{ messageId: 'string' }],
    },
    {
      code: `import { useHistory } from 'react-router-dom';

      export default Component = () => {
        const history = useHistory();

        useEffect(() => {
          history.push((loc) => '/uniprotkb/P00001')
        }, [history]);

        return null;
      };`,
      errors: [{ messageId: 'navigation' }],
    },
    {
      code: `import { Link } from 'react-router-dom';
      import { Location } from '../config/urls';
      
      export default Component = ({ accession }) => (
        <Link to={{ search: 'query=glucose' }}>Link content</Link>
      );`,
      filename: 'index.tsx',
      errors: [{ messageId: 'noPathname' }],
    },
  ],
});
