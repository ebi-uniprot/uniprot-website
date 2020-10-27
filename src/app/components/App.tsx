import React, { lazy, Suspense } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { FranklinSite, Loader } from 'franklin-sites';

import BaseLayout from '../../shared/components/layouts/BaseLayout';
import ErrorBoundary from '../../shared/components/error-component/ErrorBoundary';
import GDPR from '../../shared/components/gdpr/GDPR';

import history from '../../shared/utils/browserHistory';

import { Location, LocationToPath } from '../config/urls';

import './styles/app.scss';
import SingleColumnLayout from '../../shared/components/layouts/SingleColumnLayout';

if (process.env.NODE_ENV !== 'development') {
  import(/* webpackChunkName: "sentry" */ '@sentry/browser').then((module) => {
    module.init({
      dsn: 'https://be99e24b352b42019d5b9f53dd7b68c3@sentry.io/1770286',
    });
  });
}

// Async loading of page components
const HomePage = lazy(
  () => import(/* webpackChunkName: "home-page" */ './HomePage')
);
const UniProtKBResultsPage = lazy(
  () =>
    import(
      /* webpackChunkName: "uniprotkb-results" */ '../../uniprotkb/components/results/ResultsContainer'
    )
);
const UniProtKBEntryPage = lazy(
  () =>
    import(
      /* webpackChunkName: "uniprotkb-entry" */ '../../uniprotkb/components/entry/Entry'
    )
);
const AdvancedSearchPage = lazy(
  () =>
    import(
      /* webpackChunkName: "advanced-search" */ '../../query-builder/components/AdvancedSearch'
    )
);
const CustomiseTablePage = lazy(
  () =>
    import(
      /* webpackChunkName: "customise-table" */ '../../uniprotkb/components/customise-table/CustomiseTableContainer'
    )
);
const UniRefResultsPage = lazy(
  () =>
    import(
      /* webpackChunkName: "uniref-results" */ '../../uniref/components/results/ResultsContainer'
    )
);
const UniRefEntryPage = lazy(
  () =>
    import(
      /* webpackChunkName: "uniref-entry" */ '../../uniref/components/entry/Entry'
    )
);
const BlastResult = lazy(
  () =>
    import(
      /* webpackChunkName: "blast-result" */ '../../tools/blast/components/results/BlastResult'
    )
);
const BlastForm = lazy(
  () =>
    import(
      /* webpackChunkName: "blast-form" */ '../../tools/blast/components/BlastForm'
    )
);
const AlignResult = lazy(
  () =>
    import(
      /* webpackChunkName: "align-result" */ '../../tools/align/components/results/AlignResult'
    )
);
const AlignForm = lazy(
  () =>
    import(
      /* webpackChunkName: "align-form" */ '../../tools/align/components/AlignForm'
    )
);
const Dashboard = lazy(
  () =>
    import(
      /* webpackChunkName: "dashboard" */ '../../tools/dashboard/components/Dashboard'
    )
);
const ResourceNotFoundPage = lazy(
  () =>
    import(
      /* webpackChunkName: "resource-not-found" */ '../../shared/components/error-pages/ResourceNotFoundPage'
    )
);

const reportBugLinkStyles: React.CSSProperties = {
  fontSize: '.8rem',
  lineHeight: '1.5rem',
  display: 'block',
  padding: '.5rem 0',
  color: '#FFF',
  backgroundColor: 'red',
  position: 'fixed',
  bottom: '4rem',
  right: 0,
  writingMode: 'vertical-rl',
  textOrientation: 'sideways',
  zIndex: 99,
};

const App = () => (
  <FranklinSite>
    <Router history={history}>
      <BaseLayout>
        <Suspense fallback={<Loader />}>
          <Switch>
            {/* Home */}
            <Route
              path={LocationToPath[Location.Home]}
              exact
              component={HomePage}
            />
            {/* Main namespaces */}
            <Route
              path={LocationToPath[Location.UniProtKBEntry]}
              component={UniProtKBEntryPage}
            />
            <Route
              path={LocationToPath[Location.UniProtKBResults]}
              component={UniProtKBResultsPage}
            />
            <Route
              path={LocationToPath[Location.UniRefEntry]}
              component={UniRefEntryPage}
            />
            <Route
              path={LocationToPath[Location.UniRefResults]}
              component={UniRefResultsPage}
            />
            <Route
              path={LocationToPath[Location.UniProtKBCustomiseTable]}
              render={() => (
                <SingleColumnLayout>
                  <CustomiseTablePage />
                </SingleColumnLayout>
              )}
            />
            {/* Tools */}
            <Route
              path={LocationToPath[Location.BlastResult]}
              component={BlastResult}
            />
            <Route
              path={LocationToPath[Location.Blast]}
              render={() => (
                <SingleColumnLayout>
                  <BlastForm />
                </SingleColumnLayout>
              )}
            />
            <Route
              path={LocationToPath[Location.AlignResult]}
              component={AlignResult}
            />
            <Route
              path={LocationToPath[Location.Align]}
              render={() => (
                <SingleColumnLayout>
                  <AlignForm />
                </SingleColumnLayout>
              )}
            />
            <Route
              path={LocationToPath[Location.Dashboard]}
              render={() => (
                <SingleColumnLayout>
                  <Dashboard />
                </SingleColumnLayout>
              )}
            />
            {/* Query builder */}
            <Route
              path={LocationToPath[Location.UniProtKBQueryBuilder]}
              render={() => (
                <SingleColumnLayout>
                  <AdvancedSearchPage />
                </SingleColumnLayout>
              )}
            />
            {/* Catch-all handler -> Not found */}
            <Route
              component={() => (
                <SingleColumnLayout>
                  <ResourceNotFoundPage />
                </SingleColumnLayout>
              )}
            />
          </Switch>
        </Suspense>
      </BaseLayout>
      <ErrorBoundary fallback={null}>
        <GDPR />
      </ErrorBoundary>
    </Router>
    <a
      style={reportBugLinkStyles}
      target="_blank"
      href="https://goo.gl/forms/VrAGbqg2XFg6Mpbh1"
      rel="noopener noreferrer"
    >
      Report bug
    </a>
  </FranklinSite>
);

export default App;
