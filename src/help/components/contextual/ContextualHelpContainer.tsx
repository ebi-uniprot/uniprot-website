import { lazy, Suspense, useEffect, useRef } from 'react';
import { Loader, SlidingPanel } from 'franklin-sites';
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

import NavigationBar from './NavigationBar';
import CatchAll from './CatchAll';

import { LocationToPath, Location } from '../../../app/config/urls';

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
  }, [articleId, hash]);

  return (
    <SlidingPanel
      title={
        <NavigationBar
          localHistory={localHistoryRef.current}
          globalHistory={globalHistory}
        />
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
            <Route
              path="*"
              render={(props) => (
                <CatchAll globalHistory={globalHistory} {...props} />
              )}
            />
          </Switch>
        </Router>
      </Suspense>
    </SlidingPanel>
  );
};

export default ContextualHelpContainer;
