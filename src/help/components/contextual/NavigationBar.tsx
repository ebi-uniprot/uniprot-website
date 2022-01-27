import { useEffect, useState } from 'react';
import { History, MemoryHistory } from 'history';
import { Button, ExternalLinkIcon } from 'franklin-sites';
import cn from 'classnames';

import { LocationToPath, Location } from '../../../app/config/urls';

import helper from '../../../shared/styles/helper.module.scss';
import styles from './styles/navigation-bar.module.scss';

type Props = {
  localHistory: MemoryHistory;
  globalHistory: History;
};

const NavigationBar = ({ localHistory, globalHistory }: Props) => {
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
        className={cn({
          [helper.disabled]: !localHistory.canGo(-1),
        })}
        disabled={!localHistory.canGo(-1)}
        onClick={() => localHistory.go(-1)}
      >
        ←
      </Button>{' '}
      <Button
        variant="tertiary"
        onClick={() => localHistory.push(LocationToPath[Location.HelpResults])}
      >
        Help
      </Button>{' '}
      <Button
        variant="tertiary"
        className={cn({
          [helper.disabled]: !localHistory.canGo(1),
        })}
        disabled={!localHistory.canGo(1)}
        onClick={() => localHistory.go(1)}
      >
        →
      </Button>
      <Button
        variant="tertiary"
        // the panel's location will be passed to the global history
        onClick={() => globalHistory.push(localHistory.location)}
      >
        <ExternalLinkIcon />
      </Button>
    </div>
  );
};

export default NavigationBar;
