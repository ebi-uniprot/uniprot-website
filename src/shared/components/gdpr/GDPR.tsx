import React, { FC } from 'react';

import useLocalStorage from '../../hooks/useLocalStorage';

import './styles/gdpr.scss';

const UP_COVID_GDPR = 'UP_COVID_GDPR';

const GDPR: FC = () => {
  const [token, setToken] = useLocalStorage(UP_COVID_GDPR, false);

  if (token) return null;

  return (
    <div className="gdpr-section">
      {`We'd like to inform you that we have updated our `}
      <a href="https://www.uniprot.org/help/privacy">Privacy Notice</a>
      {` to
      comply with Europe’s new General Data Protection Regulation (GDPR) that
      applies since 25 May 2018.`}
      <button
        type="button"
        className="button secondary"
        onClick={() => setToken(true)}
      >
        Accept
      </button>
    </div>
  );
};

export default GDPR;
