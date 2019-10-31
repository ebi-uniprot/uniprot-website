import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { FranklinSite } from 'franklin-sites';
import * as Sentry from '@sentry/browser';
import HomePage from './pages/HomePage';
import BaseLayout from './layout/BaseLayout';
import ResultsPage from './pages/ResultsPage';
import EntryPage from './pages/EntryPage';
import AdvancedSearchPage from './pages/AdvancedSearchPage';
import CustomiseTablePage from './pages/CustomiseTablePage';
import './styles/App.scss';

declare const BASE_URL: string;

if (process.env.NODE_ENV !== 'development') {
  Sentry.init({
    dsn: 'https://be99e24b352b42019d5b9f53dd7b68c3@sentry.io/1770286',
  });
}

const App = () => (
  <FranklinSite>
    <Router basename={BASE_URL}>
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <BaseLayout isHomePage>
              <HomePage />
            </BaseLayout>
          )}
        />
        <Route
          path="/uniprotkb/:accession"
          render={() => (
            <BaseLayout>
              <EntryPage />
            </BaseLayout>
          )}
        />
        <Route
          path="/uniprotkb"
          render={() => (
            <BaseLayout>
              <ResultsPage />
            </BaseLayout>
          )}
        />
        <Route
          path="/customise-table"
          render={() => (
            <BaseLayout>
              <CustomiseTablePage />
            </BaseLayout>
          )}
        />
        <Route
          path="/advancedSearch"
          render={() => (
            <BaseLayout isSearchPage>
              <AdvancedSearchPage />
            </BaseLayout>
          )}
        />
      </Switch>
    </Router>
  </FranklinSite>
);

export default App;
