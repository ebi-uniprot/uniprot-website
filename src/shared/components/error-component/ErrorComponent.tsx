import { Message } from 'franklin-sites';

import ExternalLink from '../ExternalLink';

import styles from './styles/error-component.module.scss';

const ErrorComponent = () => (
  <div className={styles['error-component']}>
    <Message level="failure">
      <h5>An unexpected issue occurred</h5>
      <p>
        You can try to reload the page, use the rest of this page, or go back to
        the previous page.
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
          legacy version of the website is available here
        </ExternalLink>{' '}
        until the 2022_02 release.
      </p>
    </Message>
  </div>
);

export default ErrorComponent;
