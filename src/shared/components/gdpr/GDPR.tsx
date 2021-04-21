// import { Link } from 'react-router-dom';
import { Button, ExternalLink } from 'franklin-sites';

import useUserPreferences from '../../hooks/useUserPreferences';

import './styles/gdpr.scss';

const GDPR = () => {
  const [token, setToken] = useUserPreferences<null | boolean>('gdpr', null);

  if (token === true) {
    return null;
  }

  return (
    <div className="gdpr-section">
      {`We'd like to inform you that we have updated our `}
      <ExternalLink noIcon url="https://www.uniprot.org/help/privacy">
        Privacy Notice
      </ExternalLink>
      {` to
      comply with Europe’s new General Data Protection Regulation (GDPR) that
      applies since 25 May 2018.`}
      <Button variant="secondary" onClick={() => setToken(true)}>
        Accept
      </Button>
    </div>
  );
};

export default GDPR;
