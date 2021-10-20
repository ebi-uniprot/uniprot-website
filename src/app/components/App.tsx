import { lazy, Suspense, FC } from 'react';
import { Router, Route, Switch, RouteChildrenProps } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { FranklinSite, Loader } from 'franklin-sites';

import BaseLayout from '../../shared/components/layouts/BaseLayout';
import SingleColumnLayout from '../../shared/components/layouts/SingleColumnLayout';
import ErrorBoundary from '../../shared/components/error-component/ErrorBoundary';
import GDPR from '../../shared/components/gdpr/GDPR';

import history from '../../shared/utils/browserHistory';

import useScrollToTop from '../../shared/hooks/useScrollToTop';
import useReloadApp from '../../shared/hooks/useReloadApp';

import {
  allSearchResultLocations,
  Location,
  LocationToPath,
} from '../config/urls';

import './styles/app.scss';

if (process.env.NODE_ENV !== 'development') {
  import(/* webpackChunkName: "sentry" */ '@sentry/browser').then((module) => {
    module.init({
      dsn: 'https://474bb7c44e8b4a99ba4e408b5a64569b@o308327.ingest.sentry.io/5996901',
    });
  });
}

// Async loading of page components
const HomePage = lazy(
  () => import(/* webpackChunkName: "home-page" */ './home-page/HomePage')
);
const GenericResultsPage = lazy(
  () =>
    import(
      /* webpackChunkName: "generic-results" */ '../../shared/components/results/Results'
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
const UniRuleEntryPage = lazy(
  () =>
    import(
      /* webpackChunkName: "unirule-entry" */ '../../automatic-annotations/unirule/components/entry/Entry'
    )
);
const ARBAEntryPage = lazy(
  () =>
    import(
      /* webpackChunkName: "arba-entry" */ '../../automatic-annotations/arba/components/entry/Entry'
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
const IDMappingResult = lazy(
  () =>
    import(
      /* webpackChunkName: "id-mapping-result" */ '../../tools/id-mapping/components/results/IDMappingResult'
    )
);
const IDMappingForm = lazy(
  () =>
    import(
      /* webpackChunkName: "id-mapping-form" */ '../../tools/id-mapping/components/IDMappingForm'
    )
);
const PeptideSearchResult = lazy(
  () =>
    import(
      /* webpackChunkName: "peptide-search-result" */ '../../tools/peptide-search/components/results/PeptideSearchResult'
    )
);
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

const BasketFullView = lazy(
  () =>
    import(
      /* webpackChunkName: "basket-full-view" */ '../../basket/BasketFullView'
    )
);

// Help
const HelpLandingPage = lazy(
  () =>
    import(
      /* webpackChunkName: "help-entry" */ '../../help/components/landing/HelpLandingPage'
    )
);
const HelpEntryPage = lazy(
  () =>
    import(
      /* webpackChunkName: "help-entry" */ '../../help/components/entry/Entry'
    )
);
const HelpResults = lazy(
  () =>
    import(
      /* webpackChunkName: "help-results" */ '../../help/components/results/Results'
    )
);

const ResourceNotFoundPage = lazy(
  () =>
    import(
      /* webpackChunkName: "resource-not-found" */ '../../shared/components/error-pages/ResourceNotFoundPage'
    )
);

// Helper component to render a landing page or the results page depending on
// the presence of absence of a querystring
const ResultsOrLanding =
  (ResultsPage: FC<RouteChildrenProps>, LandingPage: FC<RouteChildrenProps>) =>
  (props: RouteChildrenProps) =>
    props.location.search ? (
      <ResultsPage {...props} />
    ) : (
      <LandingPage {...props} />
    );

const App = () => {
  useScrollToTop(history);
  useReloadApp(history);

  return (
    <FranklinSite>
      <Router history={history}>
        <Helmet titleTemplate="%s | UniProt" defaultTitle="UniProt">
          <meta
            name="description"
            // default description, to override wherever needed
            content="UniProt is the world’s leading high-quality, comprehensive and freely accessible resource of protein sequence and functional information."
          />
        </Helmet>
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
              {/* Annotations */}
              <Route
                path={LocationToPath[Location.UniRuleEntry]}
                component={UniRuleEntryPage}
              />
              <Route
                path={LocationToPath[Location.ARBAEntry]}
                component={ARBAEntryPage}
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
              <Route
                path={LocationToPath[Location.PeptideSearchResult]}
                component={PeptideSearchResult}
              />
              <Route
                path={LocationToPath[Location.PeptideSearch]}
                render={() => (
                  <SingleColumnLayout>
                    <PeptideSearchForm />
                  </SingleColumnLayout>
                )}
              />
              <Route
                path={LocationToPath[Location.IDMappingResult]}
                component={IDMappingResult}
              />
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
              <Route
                path={LocationToPath[Location.Basket]}
                component={BasketFullView}
              />
              <Route
                path={LocationToPath[Location.HelpEntry]}
                component={HelpEntryPage}
              />
              <Route
                path={LocationToPath[Location.HelpResults]}
                component={ResultsOrLanding(HelpResults, HelpLandingPage)}
              />
              {/* Catch-all handler -> Redirect or not found use ResourceNotFoundPage */}
              <Route
                path="*"
                render={() => (
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
    </FranklinSite>
  );
};

export default App;
