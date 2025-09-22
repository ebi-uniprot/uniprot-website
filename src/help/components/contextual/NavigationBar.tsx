import cn from 'classnames';
import { Button, ExternalLinkIcon } from 'franklin-sites';
import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';

import { Location, LocationToPath } from '../../../app/config/urls';
import { ContextualHelpContext } from '../../../shared/contexts/ContextualHelp';
import helper from '../../../shared/styles/helper.module.scss';
import styles from './styles/navigation-bar.module.scss';

const NavigationBar = () => {
  // // This state is to trigger a render when updated, the location is not
  // // actually used, but the state setter is called on every location change
  // // We need that because history is mutated, its reference doesn't change
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [_, setLocalLocation] = useState<MemoryHistory['location']>();
  // // Trigger a render whenever the route changes
  // useEffect(
  //   () =>
  //     localHistory?.listen((update) => {
  //       setLocalLocation(update.location);
  //     }),
  //   [localHistory]
  // );

  // console.warn(localHistory);

  // if (!localHistory) {
  //   return null;
  // }

  const { pathname, search, hash, state } = useLocation();
  console.warn({ pathname, search, hash });
  const navigate = useNavigate();
  // const { globalPathname, globalNavigate } = useContext(ContextualHelpContext);

  return (
    <div className={styles.container}>
      {/* All of this contains the "fake" browser navigation */}
      <Button
        variant="tertiary"
        className={cn('medium', {
          [helper.disabled]: state?.initial,
        })}
        disabled={state?.initial}
        onClick={() => !state?.initial && navigate(-1)}
        title="Back button"
      >
        ←
      </Button>
      <Link
        to={LocationToPath[Location.HelpResults]}
        target="external_help"
        onClick={(event) => {
          if (!event.metaKey && !event.ctrlKey && !event.shiftKey) {
            event.preventDefault();
            navigate(LocationToPath[Location.HelpResults]);
          }
        }}
      >
        <h1 className="medium">Help</h1>
      </Link>
      <Link
        to={{ pathname, search, hash }}
        target="external_help"
        title="Open current content in full page"
      >
        <ExternalLinkIcon width="0.8em" />
      </Link>
    </div>
  );
};

export default NavigationBar;
