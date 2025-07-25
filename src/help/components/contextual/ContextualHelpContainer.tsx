import { SlidingPanel } from 'franklin-sites';
import { createMemoryHistory, createPath, History } from 'history';
import { Route, Router, Switch, useHistory, useLocation } from 'react-router';

import {
  getLocationEntryPath,
  Location,
  LocationToPath,
} from '../../../app/config/urls';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';
import helpURL from '../../config/apiUrls';
import { HelpSearchResponse } from '../../types/apiModel';
import CatchAll from './CatchAll';
import HelpEntryPage from './Entry';
import HelpLandingPage from './Landing';
import NavigationBar from './NavigationBar';
import HelpResultsPage from './Results';
import SearchBar from './SearchBar';
import Shortcuts from './Shortcuts';
import styles from './styles/contextual-help.module.scss';

const ContextualHelpRouterContent = ({
  globalHistory,
}: {
  globalHistory: History;
}) => {
  const location = useLocation();

  const sp = new URLSearchParams(location.search);
  const query = sp.get('query');
  const dataObject = useDataApiWithStale<HelpSearchResponse>(
    query && helpURL.search({ query })
  );

  return (
    <>
      <SearchBar isLoading={dataObject.loading} />
      <Switch>
        {/* Just here to handle initial empty location */}
        <Route path="/" exact />
        {/* Specific entries */}
        <Route
          path={LocationToPath[Location.HelpEntry]}
          component={HelpEntryPage}
        />
        {/* Will get content from page later, for now, star search */}
        <Route
          path={LocationToPath[Location.HelpResults]}
          render={(props) => {
            if (props.location.search) {
              return <HelpResultsPage {...dataObject} />;
            }
            return (
              <>
                <Shortcuts globalHistory={globalHistory} />
                <HelpLandingPage />
              </>
            );
          }}
        />
        {/* Catch-all handler -> Redirect (within or global history) */}
        <Route
          path="*"
          render={(props) => (
            <CatchAll globalHistory={globalHistory} {...props} />
          )}
        />
      </Switch>
    </>
  );
};

type Props = {
  articlePath?: string;
  onClose: (reason: 'outside' | 'x-button' | 'navigation' | 'escape') => void;
};

const ContextualHelpContainer = ({ articlePath, onClose }: Props) => {
  const [articleId, hash] = (articlePath || '').split('#');
  const globalHistory = useHistory();
  const { pathname } = useLocation();
  const localHistoryRef = useRef(createMemoryHistory());

  useEffect(() => {
    let action: 'push' | 'replace' = 'push';
    if (localHistoryRef.current.length === 1) {
      action = 'replace';
    }
    localHistoryRef.current[action](
      articleId
        ? createPath({
            pathname: getLocationEntryPath(Location.HelpEntry, articleId),
            hash,
          })
        : LocationToPath[Location.HelpResults]
    );
  }, [articleId, hash]);

  return (
    <SlidingPanel
      title={<NavigationBar localHistory={localHistoryRef.current} />}
      onClose={onClose}
      className={styles['contextual-help-panel']}
      size="small"
      position="right"
      pathname={pathname}
    >
      <ErrorBoundary>
        <Router history={localHistoryRef.current}>
          <ContextualHelpRouterContent globalHistory={globalHistory} />
        </Router>
      </ErrorBoundary>
    </SlidingPanel>
  );
};

export default ContextualHelpContainer;
