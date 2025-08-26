import { CitedIcon, EnvelopeIcon, HelpIcon } from 'franklin-sites';
import { useContext } from 'react';

import {
  getLocationEntryPath,
  Location,
  LocationToPath,
} from '../../../app/config/urls';
import { ContextualHelpContext } from '../../../shared/contexts/ContextualHelp';
import styles from './styles/shortcuts.module.scss';

const iconWidth = '1.4em';

// All of these need to navigate in the main page and exit the panel
const Shortcuts = () => {
  const { globalPathname, globalNavigate } = useContext(ContextualHelpContext);
  return (
    <div className={styles.container}>
      <a
        href={LocationToPath[Location.HelpResults]}
        onClick={(event) => {
          if (!event.metaKey && !event.ctrlKey && !event.shiftKey) {
            event.preventDefault();
            globalNavigate(LocationToPath[Location.HelpResults]);
          }
        }}
      >
        <HelpIcon width={iconWidth} />
        Help center
      </a>
      <a
        href={LocationToPath[Location.ContactGeneric]}
        onClick={(event) => {
          if (!event.metaKey && !event.ctrlKey && !event.shiftKey) {
            event.preventDefault();
            globalNavigate(LocationToPath[Location.ContactGeneric], {
              state: { referrer: globalPathname },
            });
          }
        }}
      >
        <EnvelopeIcon width={iconWidth} />
        Contact us
      </a>
      <a
        href={getLocationEntryPath(Location.HelpEntry, 'publications')}
        onClick={(event) => {
          if (!event.metaKey && !event.ctrlKey && !event.shiftKey) {
            event.preventDefault();
            globalNavigate(
              getLocationEntryPath(Location.HelpEntry, 'publications')
            );
          }
        }}
      >
        <CitedIcon width={iconWidth} />
        Cite us
      </a>
    </div>
  );
};

export default Shortcuts;
