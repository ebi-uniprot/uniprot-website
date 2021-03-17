import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'franklin-sites';

import { useUserPreference } from '../../contexts/UserPreferences';

import './styles/gdpr.scss';

const GDPR: FC = () => {
  const [token, setToken] = useUserPreference<boolean>('gdpr', false);

  if (token === true) {
    return null;
  }

  return (
    <div className="gdpr-section">
      {`We'd like to inform you that we have updated our `}
      <Link to="/help/privacy">Privacy Notice</Link>
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
