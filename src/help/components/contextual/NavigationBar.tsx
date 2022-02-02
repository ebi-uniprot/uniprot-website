import { useEffect, useState } from 'react';
import { MemoryHistory } from 'history';
import { Link } from 'react-router-dom';
import { Button, ExternalLinkIcon } from 'franklin-sites';
import cn from 'classnames';

import { LocationToPath, Location } from '../../../app/config/urls';

import helper from '../../../shared/styles/helper.module.scss';
import styles from './styles/navigation-bar.module.scss';

const NavigationBar = ({ localHistory }: { localHistory: MemoryHistory }) => {
  // This state is to trigger a render when updated, the location is not
  // actually used, but the state setter is called on every location change
  // We need that because history is mutated, its reference doesn't change
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setLocalLocation] = useState(localHistory.location);
  // Trigger a render whenever the route changes
  useEffect(
    () =>
      localHistory.listen((location) => {
        setLocalLocation(location);
      }),
    [localHistory]
  );

  return (
    <div className={styles.container}>
      {/* All of this contains the "fake" browser navigation */}
      <Button
        variant="tertiary"
        className={cn('medium', {
          [helper.disabled]: !localHistory.canGo(-1),
        })}
        disabled={!localHistory.canGo(-1)}
        onClick={() => localHistory.go(-1)}
        title="Back button"
      >
        ←
      </Button>{' '}
      <Link
        to={LocationToPath[Location.HelpResults]}
        onClick={(event) => {
          if (!event.metaKey && !event.ctrlKey) {
            event.preventDefault();
            localHistory.push(LocationToPath[Location.HelpResults]);
          }
        }}
      >
        <h1 className="medium">Help</h1>
      </Link>
      <Link
        // the panel's current location will be passed to the global history
        // eslint-disable-next-line uniprot-website/use-config-location
        to={localHistory.location}
        title="Open current content in full page"
      >
        <ExternalLinkIcon width="0.8em" />
      </Link>
    </div>
  );
};

export default NavigationBar;
