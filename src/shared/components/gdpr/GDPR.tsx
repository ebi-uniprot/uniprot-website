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
      {`We'd like to inform you that we have updated our `}
      <Link
        to={generatePath(LocationToPath[Location.HelpEntry], {
          accession: 'privacy',
        })}
      >
        Privacy Notice
      </Link>
      {` to comply with Europe’s new General Data Protection Regulation (GDPR) that applies since 25 May 2018.`}
      <Button variant="secondary" onClick={() => setToken(true)}>
        Accept
      </Button>
    </div>
  );
};

export default GDPR;
