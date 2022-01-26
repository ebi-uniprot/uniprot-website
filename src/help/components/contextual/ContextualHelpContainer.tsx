import { useEffect, useRef } from 'react';
import { SlidingPanel } from 'franklin-sites';
import { createMemoryHistory, createPath } from 'history';
import { Route, Router, Switch, useHistory } from 'react-router-dom';

import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import NavigationBar from './NavigationBar';
import SearchBar from './SearchBar';
import Shortcuts from './Shortcuts';

import CatchAll from './CatchAll';
import HelpEntryPage from './Entry';
import HelpResultsPage from './Results';
import HelpLandingPage from './Landing';

import {
  LocationToPath,
  Location,
  getLocationEntryPath,
} from '../../../app/config/urls';

import styles from './styles/contextual-help.module.scss';

type Props = {
  articlePath?: string;
  onClose: (reason: 'outside' | 'button' | 'navigation' | 'escape') => void;
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
            pathname: getLocationEntryPath(Location.HelpEntry, articleId),
            hash,
          })
        : LocationToPath[Location.HelpResults]
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
      <ErrorBoundary>
        <Router history={localHistoryRef.current}>
          <SearchBar />
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
                  return <HelpResultsPage {...props} />;
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
        </Router>
      </ErrorBoundary>
    </SlidingPanel>
  );
};

export default ContextualHelpContainer;
