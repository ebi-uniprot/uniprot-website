import { Link, Router } from 'react-router';
import { CitedIcon, EnvelopeIcon, HelpIcon } from 'franklin-sites';
import { History } from 'history';

import ContactLink from '../../../contact/components/ContactLink';

import {
  LocationToPath,
  Location,
  getLocationEntryPath,
} from '../../../app/config/urls';

import styles from './styles/shortcuts.module.scss';

const iconWidth = '1.4em';

// All of these exit the panel, so put them in the global history context
const Shortcuts = ({ globalHistory }: { globalHistory: History }) => (
  <Router history={globalHistory}>
    <div className={styles.container}>
      <Link to={LocationToPath[Location.HelpResults]}>
        <HelpIcon width={iconWidth} />
        Help center
      </Link>
      {/* Blocked until we manage to get the contact page changes in main */}
      {/* eslint-disable-next-line */}
      <ContactLink>
        <EnvelopeIcon width={iconWidth} />
        Contact us
      </ContactLink>
      <Link to={getLocationEntryPath(Location.HelpEntry, 'publications')}>
        <CitedIcon width={iconWidth} />
        Cite us
      </Link>
    </div>
  </Router>
);

export default Shortcuts;
