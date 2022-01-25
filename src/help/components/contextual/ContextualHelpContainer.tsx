import { lazy, Suspense, useEffect, useState, useRef } from 'react';
import { Button, Loader, SlidingPanel } from 'franklin-sites';
import { createMemoryHistory, createPath } from 'history';
import {
  generatePath,
  Route,
  RouteChildrenProps,
  Router,
  Switch,
  useHistory,
  useLocation,
} from 'react-router-dom';
import cn from 'classnames';

import CatchAll from './CatchAll';

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
  }, [articleId]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setLocalLocation] = useState(localHistoryRef.current.location);
  // Trigger a render whenever the route changes
  useEffect(
    () =>
      localHistoryRef.current.listen((location) => {
        setLocalLocation(location);
      }),
    []
  );

  return (
    <SlidingPanel
      title={
        <>
          {/* All of this contains the "fake" browser navigation */}
          <Button
            variant="tertiary"
            className={cn({
              [helper.disabled]: !localHistoryRef.current.canGo(-1),
            })}
            disabled={!localHistoryRef.current.canGo(-1)}
            onClick={() => localHistoryRef.current.go(-1)}
          >
            ←
          </Button>{' '}
          Help{' '}
          <Button
            variant="tertiary"
            className={cn({
              [helper.disabled]: !localHistoryRef.current.canGo(1),
            })}
            disabled={!localHistoryRef.current.canGo(1)}
            onClick={() => localHistoryRef.current.go(1)}
          >
            →
          </Button>
        </>
      }
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
              {(props) => <CatchAll globalHistory={globalHistory} {...props} />}
            </Route>
          </Switch>
        </Router>
      </Suspense>
    </SlidingPanel>
  );
};

export default ContextualHelpContainer;
