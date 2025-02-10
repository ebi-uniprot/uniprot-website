import { useCallback } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { Button } from 'franklin-sites';
import { sleep } from 'timing-functions';

import { LocationToPath, Location } from '../../../app/config/urls';

import useLocalStorage from '../../hooks/useLocalStorage';

import styles from './styles/gdpr.module.css';

const GDPR = () => {
  const [token, setToken] = useLocalStorage<null | boolean>('gdpr', null);

  const handleClick = useCallback(() => {
    setToken(true);

    // Make sure to wait a little bit to give a chance to set the localStorage
    sleep(100).then(() => {
      // Then reload the page
      window.location.reload();
    });
  }, [setToken]);

  if (token === true) {
    return null;
  }

  return (
    <div className={styles['gdpr-section']}>
      <p>
        We&apos;d like to inform you that we have updated our{' '}
        <Link
          to={generatePath(LocationToPath[Location.HelpEntry], {
            accession: 'privacy',
          })}
        >
          Privacy Notice
        </Link>{' '}
        to comply with Europe&apos;s General Data Protection Regulation
        (GDPR) that applies since 25 May 2018.
      </p>
      <p>
        UniProt uses Google Analytics, Hotjar and Sentry as third-party
        analytics services to collect information about website performance and
        how users navigate through and use our sites to help us design better
        interfaces. We do not use any of these services to track you
        individually or collect personal data.
      </p>
      <Button variant="secondary" onClick={handleClick}>
        Accept
      </Button>
    </div>
  );
};

export default GDPR;
