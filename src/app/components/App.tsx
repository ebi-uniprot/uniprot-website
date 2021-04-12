import { lazy, Suspense, CSSProperties } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { FranklinSite, Loader } from 'franklin-sites';

import BaseLayout from '../../shared/components/layouts/BaseLayout';
import SingleColumnLayout from '../../shared/components/layouts/SingleColumnLayout';
import ErrorBoundary from '../../shared/components/error-component/ErrorBoundary';
import GDPR from '../../shared/components/gdpr/GDPR';

import history from '../../shared/utils/browserHistory';

import useScrollToTop from '../../shared/hooks/useScrollToTop';

import {
  allSearchResultLocations,
  Location,
  LocationToPath,
} from '../config/urls';

import './styles/app.scss';

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
const GenericResultsPage = lazy(
  () =>
    import(
      /* webpackChunkName: "generic-results" */ '../../shared/components/results/ResultsContainer'
    )
);
// Main namespaces
const UniProtKBEntryPage = lazy(
  () =>
    import(
      /* webpackChunkName: "uniprotkb-entry" */ '../../uniprotkb/components/entry/Entry'
    )
);
const UniRefEntryPage = lazy(
  () =>
    import(
      /* webpackChunkName: "uniref-entry" */ '../../uniref/components/entry/Entry'
    )
);
const UniParcEntryPage = lazy(
  () =>
    import(
      /* webpackChunkName: "uniparc-entry" */ '../../uniparc/components/entry/Entry'
    )
);
const ProteomesEntryPage = lazy(
  () =>
    import(
      /* webpackChunkName: "proteomes-entry" */ '../../proteomes/components/entry/Entry'
    )
);
const TaxonomyEntryPage = lazy(
  () =>
    import(
      /* webpackChunkName: "taxonomy-entry" */ '../../supporting-data/taxonomy/components/entry/Entry'
    )
);
const KeywordsEntryPage = lazy(
  () =>
    import(
      /* webpackChunkName: "keywords-entry" */ '../../supporting-data/keywords/components/entry/Entry'
    )
);
const CitationsEntryPage = lazy(
  () =>
    import(
      /* webpackChunkName: "citations-entry" */ '../../supporting-data/citations/components/entry/Entry'
    )
);
const DiseasesEntryPage = lazy(
  () =>
    import(
      /* webpackChunkName: "diseases-entry" */ '../../supporting-data/diseases/components/entry/Entry'
    )
);
const DatabaseEntryPage = lazy(
  () =>
    import(
      /* webpackChunkName: "database-entry" */ '../../supporting-data/database/components/entry/Entry'
    )
);
const LocationsEntryPage = lazy(
  () =>
    import(
      /* webpackChunkName: "locations-entry" */ '../../supporting-data/locations/components/entry/Entry'
    )
);
// Tools
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

// const IDMappingResult = lazy(
//   () =>
//     import(
//       /* webpackChunkName: "id-mapping-result" */ '../../tools/id-mapping/components/results/IDMappingResult'
//     )
// );

const IDMappingForm = lazy(
  () =>
    import(
      /* webpackChunkName: "id-mapping-form" */ '../../tools/id-mapping/components/IDMappingForm'
    )
);

// const PeptideSearchResult = lazy(
//   () =>
//     import(
//       /* webpackChunkName: "peptide-search-result" */ '../../tools/peptide-search/components/results/PeptideSearchResult'
//     )
// )

const PeptideSearchForm = lazy(
  () =>
    import(
      /* webpackChunkName: "peptide-search-form" */ '../../tools/peptide-search/components/PeptideSearchForm'
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

const reportBugLinkStyles: CSSProperties = {
  fontSize: '.8rem',
  lineHeight: '1.5rem',
  display: 'block',
  padding: '.5rem 0',
  color: '#FFF',
  backgroundColor: 'darkred',
  position: 'fixed',
  bottom: '4rem',
  right: 0,
  writingMode: 'vertical-rl',
  textOrientation: 'sideways',
  zIndex: 99,
};

const App = () => {
  useScrollToTop(history);

  return (
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
              {/* Entry pages */}
              {/* Main namespaces */}
              <Route
                path={LocationToPath[Location.UniProtKBEntry]}
                component={UniProtKBEntryPage}
              />
              <Route
                path={LocationToPath[Location.UniRefEntry]}
                component={UniRefEntryPage}
              />
              <Route
                path={LocationToPath[Location.UniParcEntry]}
                component={UniParcEntryPage}
              />
              <Route
                path={LocationToPath[Location.ProteomesEntry]}
                component={ProteomesEntryPage}
              />
              {/* Supporting data */}
              <Route
                path={LocationToPath[Location.TaxonomyEntry]}
                component={TaxonomyEntryPage}
              />
              <Route
                path={LocationToPath[Location.KeywordsEntry]}
                component={KeywordsEntryPage}
              />
              <Route
                path={LocationToPath[Location.CitationsEntry]}
                component={CitationsEntryPage}
              />
              <Route
                path={LocationToPath[Location.DiseasesEntry]}
                component={DiseasesEntryPage}
              />
              <Route
                path={LocationToPath[Location.DatabaseEntry]}
                component={DatabaseEntryPage}
              />
              <Route
                path={LocationToPath[Location.LocationsEntry]}
                component={LocationsEntryPage}
              />
              {/* Result pages */}
              <Route
                path={allSearchResultLocations}
                component={GenericResultsPage}
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
              {/* <Route
              path={LocationToPath[Location.PeptideSearchResult]}
              component={PeptideSearchResult}
            /> */}
              <Route
                path={LocationToPath[Location.PeptideSearch]}
                render={() => (
                  <SingleColumnLayout>
                    <PeptideSearchForm />
                  </SingleColumnLayout>
                )}
              />
              {/* <Route
              path={LocationToPath[Location.IDMappingResult]}
              component={IDMappingResult}
            /> */}
              <Route
                path={LocationToPath[Location.IDMapping]}
                render={() => (
                  <SingleColumnLayout>
                    <IDMappingForm />
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
              {/* Catch-all handler -> Redirect or not found */}
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
};

export default App;
