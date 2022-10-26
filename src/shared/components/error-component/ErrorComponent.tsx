import { Message } from 'franklin-sites';
import { Link } from 'react-router-dom';

import ExternalLink from '../ExternalLink';

import { getLocationEntryPath, Location } from '../../../app/config/urls';

import styles from './styles/error-component.module.scss';

const ErrorComponent = () => (
  <div className={styles['error-component']}>
    <Message level="failure">
      <h5>An unexpected issue occurred</h5>
      <p>
        You can try to reload the page, use the rest of this page, or go back to
        the previous page.
        <br />
        Make sure that{' '}
        <Link to={getLocationEntryPath(Location.HelpEntry, 'browser_support')}>
          your browser is up to date
        </Link>{' '}
        as older versions might not work with the new website.
      </p>
      <p>
        If the error persists, please{' '}
        <a
          target="_blank"
          href="https://goo.gl/forms/VrAGbqg2XFg6Mpbh1"
          rel="noopener noreferrer"
        >
          report this bug here
        </a>
        .
      </p>
      <p>
        If you still need it, the{' '}
        <ExternalLink url="https://legacy.uniprot.org" rel="nofollow" noIcon>
          legacy version of the website
        </ExternalLink>{' '}
        is available until the 2022_05 release.
      </p>
    </Message>
  </div>
);

export default ErrorComponent;
