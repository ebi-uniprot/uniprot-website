import { generatePath, Link } from 'react-router-dom';
import { Button } from 'franklin-sites';

import { LocationToPath, Location } from '../../../app/config/urls';

import useLocalStorage from '../../hooks/useLocalStorage';

import './styles/gdpr.scss';

const GDPR = () => {
  const [token, setToken] = useLocalStorage<null | boolean>('gdpr', null);

  if (token === true) {
    return null;
  }

  return (
    <div className="gdpr-section">
      This website requires limited processing of your personal data in order to
      function. By using the site you are agreeing to this as outlined in our{' '}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'privacy',
        })}
      >
        Privacy Notice
      </Link>
      <Button variant="secondary" onClick={() => setToken(true)}>
        I understand
      </Button>
    </div>
  );
};

export default GDPR;
