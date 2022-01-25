import { lazy, Suspense, useEffect, useState, useRef } from 'react';
import { Button, Loader, SlidingPanel } from 'franklin-sites';
import { createMemoryHistory, createPath, MemoryHistory } from 'history';
import {
  generatePath,
  Redirect,
  Route,
  RouteChildrenProps,
  Router,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import cn from 'classnames';

import {
  misspeltHelpTuple,
  redirectFromTo,
} from '../../../shared/components/error-pages/ResourceNotFoundPage';

import { LocationToPath, Location } from '../../../app/config/urls';

import helper from '../../../shared/styles/helper.module.scss';
import styles from './styles/contextual-help.module.scss';

// Help
const HelpEntryPage = lazy(
  () => import(/* webpackChunkName: "help-entry" */ '../entry/Entry')
);
const HelpResults = lazy(
  () => import(/* webpackChunkName: "help-results" */ '../results/Results')
);

type Props = {
  articlePath?: string;
  onClose: (reason: 'outside' | 'button' | 'navigation' | 'escape') => void;
};

const HistoryDebug = () => {
  const { pathname, search } = useLocation();
  return (
    <pre>
      {pathname}
      {search}
    </pre>
  );
};

const PanelTitle = ({ history }: { history: MemoryHistory }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setLocalLocation] = useState(history.location);
  // Trigger a render whenever the route changes
  useEffect(
    () =>
      history.listen((location) => {
        setLocalLocation(location);
      }),
    [history]
  );

  return (
    <>
      {/* All of this contains the "fake" browser navigation */}
      <Button
        variant="tertiary"
        className={cn({
          [helper.disabled]: !history.canGo(-1),
        })}
        disabled={!history.canGo(-1)}
        onClick={() => history.go(-1)}
      >
        ←
      </Button>{' '}
      Help{' '}
      <Button
        variant="tertiary"
        className={cn({
          [helper.disabled]: !history.canGo(1),
        })}
        disabled={!history.canGo(1)}
        onClick={() => history.go(1)}
      >
        →
      </Button>
    </>
  );
};

const ContextualHelpContainer = ({ articlePath, onClose }: Props) => {
  const [articleId, hash] = (articlePath || '').split('#');
  const globalHistory = useHistory();
  const localHistoryRef = useRef(createMemoryHistory());

  useEffect(() => {
    let action: 'push' | 'replace' = 'push';
    if (localHistoryRef.current.length === 1) {
      action = 'replace';
    }
    localHistoryRef.current[action](
      articleId
        ? createPath({
            pathname: generatePath(LocationToPath[Location.HelpEntry], {
              accession: articleId,
            }),
            hash,
          })
        : createPath({
            pathname: LocationToPath[Location.HelpResults],
            search: 'query=*',
          })
    );
  }, [articleId, hash]);

  return (
    <SlidingPanel
      title={<PanelTitle history={localHistoryRef.current} />}
      onClose={onClose}
      withCloseButton
      className={styles['contextual-help-panel']}
      size="small"
      position="right"
    >
      <Suspense fallback={<Loader />}>
        <Router history={localHistoryRef.current}>
          <HistoryDebug />
          <Switch>
            {/* Just here to handle initial empty location */}
            <Route path="/" exact />
            {/* Specific entries */}
            <Route path={LocationToPath[Location.HelpEntry]}>
              {(props: RouteChildrenProps<{ accession: string }>) => (
                <HelpEntryPage inPanel {...props} />
              )}
            </Route>
            {/* Will get content from page later, for now, star search */}
            <Route path={LocationToPath[Location.HelpResults]}>
              {(props) => <HelpResults inPanel {...props} />}
            </Route>
            {/* Catch-all handler -> Redirect (within or global history) */}
            <Route path="*">
              {({ location }) => {
                const newPathname = redirectFromTo(location.pathname, [
                  misspeltHelpTuple,
                ]);

                if (newPathname) {
                  // Redirect in the panel's context
                  return (
                    <Redirect to={{ ...location, pathname: newPathname }} />
                  );
                }

                // Reinject the global history context to redirect in the navigator
                return (
                  <Router history={globalHistory}>
                    <Redirect to={location} />
                  </Router>
                );
              }}
            </Route>
          </Switch>
        </Router>
      </Suspense>
    </SlidingPanel>
  );
};

export default ContextualHelpContainer;
