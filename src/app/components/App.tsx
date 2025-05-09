import 'franklin-sites/franklin.css';
import './styles/app.scss';

import {
  init as SentryInit,
  reactRouterV5BrowserTracingIntegration,
  setTag as sentrySetTag,
} from '@sentry/react';
import { Loader } from 'franklin-sites';
import { FC, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  generatePath,
  Redirect,
  Route,
  RouteChildrenProps,
  Switch,
} from 'react-router-dom';
import { sleep } from 'timing-functions';

import pkg from '../../../package.json';
import ErrorBoundary from '../../shared/components/error-component/ErrorBoundary';
import GDPR from '../../shared/components/gdpr/GDPR';
import BaseLayout from '../../shared/components/layouts/BaseLayout';
import { SingleColumnLayout } from '../../shared/components/layouts/SingleColumnLayout';
import useReloadApp from '../../shared/hooks/useReloadApp';
import useScrollToTop from '../../shared/hooks/useScrollToTop';
import useSupportsJobs from '../../shared/hooks/useSupportsJobs';
import { Namespace, SearchableNamespace } from '../../shared/types/namespaces';
import history from '../../shared/utils/browserHistory';
import { stringifyQuery, stringifyUrl } from '../../shared/utils/url';
import description from '../config/description';
import {
  allSearchResultLocations,
  Location,
  LocationToPath,
} from '../config/urls';
import Covid19RedirectWarning from './Covid19RedirectWarning';
import DevDeploymentWarning from './DevDeploymentWarning';

// This is hackery is to prevent define being repeatedly called for the same
// name. This has been observed in Variant viewer and Feature viewer tabs.
const originalDefine = customElements.define;
function newDefine(
  this: typeof customElements.define,
  name: string,
  constructor: CustomElementConstructor
) {
  if (!customElements.get(name)) {
    originalDefine.call(this, name, constructor);
  }
}
customElements.define = newDefine;

if (process.env.NODE_ENV !== 'development') {
  SentryInit({
    // Key
    dsn: 'https://474bb7c44e8b4a99ba4e408b5a64569b@o308327.ingest.sentry.io/5996901',
    // Release name in order to track which version is causing which report
    release: `${pkg.name}@${pkg.version}#${GIT_COMMIT_HASH}`,
    //
    integrations: [reactRouterV5BrowserTracingIntegration({ history })],
    maxBreadcrumbs: 50,
    // Proportion of sessions being used to track performance
    // Adjust to a low value when we start getting enough data
    // tracesSampleRate: 0.01, // Not able to use this data yet, so don't track
    // Proportion of errors being reported
    // Adjust, higher if we fix errors and end up not maxing out our quota
    sampleRate: 0.02,
    // errors to be ignored completely
    ignoreErrors: [
      'chrome-extension://', // errors caused by an extension
      'chrome-extensions://', // errors caused by an extension
      'Request aborted', // aborted network requests, expected to happen
    ],
    denyUrls: [
      /didyoumean=true/i, // errors caused by Did You Mean requests
    ],
    // Programmatically filter out errors from Sentry
    // beforeSend(event, hint){
    //   if (/* condition to discard error */) {
    //     return null;
    //   }
    //   return event;
    // },
  });
  sentrySetTag('bundle', MODERN_BUNDLE ? 'modern' : 'legacy');
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
// Landing pages
const UniProtKBLandingPage = lazy(
  () =>
    import(
      /* webpackChunkName: "uniprotkb-landing" */ '../../uniprotkb/components/landing-page/LandingPage'
    )
);
const UniParcLandingPage = lazy(
  () =>
    import(
      /* webpackChunkName: "uniparc-landing" */ '../../uniparc/components/landing-page/LandingPage'
    )
);
const ProteomesLandingPage = lazy(
  () =>
    import(
      /* webpackChunkName: "uniprotkb-landing" */ '../../proteomes/components/landing-page/LandingPage'
    )
);
const UniRefLandingPage = lazy(
  () =>
    import(
      /* webpackChunkName: "uniprotkb-landing" */ '../../uniref/components/landing-page/LandingPage'
    )
);
// Statistics pages
const UniProtKBStatisticsPage = lazy(
  () =>
    import(
      /* webpackChunkName: "uniprotkb-statistics" */ '../../uniprotkb/components/statistics/StatisticsPage'
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
const UniParcSubEntryPage = lazy(
  () =>
    import(
      /* webpackChunkName: "uniparc-entry" */ '../../uniparc/components/sub-entry/SubEntry'
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
      /* webpackChunkName: "blast-result" */ '../../jobs/blast/components/results/BlastResult'
    )
);
const BlastForm = lazy(
  () =>
    import(
      /* webpackChunkName: "blast-form" */ '../../jobs/blast/components/BlastForm'
    )
);
const AlignResult = lazy(
  () =>
    import(
      /* webpackChunkName: "align-result" */ '../../jobs/align/components/results/AlignResult'
    )
);
const AlignForm = lazy(
  () =>
    import(
      /* webpackChunkName: "align-form" */ '../../jobs/align/components/AlignForm'
    )
);
const IDMappingResult = lazy(
  () =>
    import(
      /* webpackChunkName: "id-mapping-result" */ '../../jobs/id-mapping/components/results/IDMappingResult'
    )
);
const IDMappingForm = lazy(
  () =>
    import(
      /* webpackChunkName: "id-mapping-form" */ '../../jobs/id-mapping/components/IDMappingForm'
    )
);
const PeptideSearchResult = lazy(
  () =>
    import(
      /* webpackChunkName: "peptide-search-result" */ '../../jobs/peptide-search/components/results/PeptideSearchResult'
    )
);
const PeptideSearchForm = lazy(
  () =>
    import(
      /* webpackChunkName: "peptide-search-form" */ '../../jobs/peptide-search/components/PeptideSearchForm'
    )
);

const Dashboard = lazy(
  () =>
    import(
      /* webpackChunkName: "dashboard" */ '../../jobs/dashboard/components/Dashboard'
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
const HelpEntryPreviewPage = lazy(
  () =>
    import(
      /* webpackChunkName: "help-entry-preview.noprecache" */ '../../help/components/entry/EntryPreview'
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
const ApiDocumentationPage = lazy(
  () =>
    import(
      /* webpackChunkName: "documentation" */ '../../help/components/entry/ApiDocumentation'
    )
);

// Contact
const ContactForm = lazy(
  () =>
    import(
      /* webpackChunkName: "contact-form" */ '../../contact/components/ContactForm'
    )
);

const ResourceNotFoundPage = lazy(
  () =>
    import(
      /* webpackChunkName: "resource-not-found" */ '../../shared/components/error-pages/ResourceNotFound'
    )
);

const JobsNotSupportedPage = lazy(
  () =>
    import(
      /* webpackChunkName: "jobs-not-supported" */ '../../shared/components/error-pages/JobsNotSupported'
    )
);

const ContextualHelp = lazy(() =>
  sleep(1000).then(
    () =>
      import(
        /* webpackChunkName: "contextual-help" */ '../../help/components/contextual/ContextualHelp'
      )
  )
);

const BackToTheTop = lazy(() =>
  sleep(1000).then(
    () =>
      import(
        /* webpackChunkName: "back-to-the-top" */ '../../shared/components/BackToTheTop'
      )
  )
);

// Helper component to render a landing page or the results page depending on
// the presence of absence of a query
const ResultsOrLanding =
  (
    ResultsPage: FC<
      React.PropsWithChildren<
        RouteChildrenProps<{ namespace: SearchableNamespace }>
      >
    >,
    LandingPage: FC<
      React.PropsWithChildren<
        RouteChildrenProps<{ namespace: SearchableNamespace }>
      >
    >
  ) =>
  (props: RouteChildrenProps<{ namespace: SearchableNamespace }>) => {
    if (props.location.search) {
      const params = Object.fromEntries(
        new URLSearchParams(props.location.search)
      );
      if (!params.query) {
        return (
          <Redirect
            to={stringifyUrl(props.location.pathname, {
              ...params,
              query: '*',
            })}
          />
        );
      }
      return <ResultsPage {...props} />;
    }
    // If no query, redirect to landing page
    return <LandingPage {...props} />;
  };

const RedirectToStarSearch = (
  props: RouteChildrenProps<{ namespace: SearchableNamespace }>
) => {
  const namespace = props.match?.params.namespace;
  let LandingPage;
  switch (namespace) {
    case Namespace.uniprotkb:
      LandingPage = UniProtKBLandingPage;
      break;
    case Namespace.uniparc:
      LandingPage = UniParcLandingPage;
      break;
    case Namespace.proteomes:
      LandingPage = ProteomesLandingPage;
      break;
    case Namespace.uniref:
      LandingPage = UniRefLandingPage;
      break;
    default:
      return (
        <Redirect
          to={{ ...props.location, search: stringifyQuery({ query: '*' }) }}
        />
      );
  }
  return (
    <SingleColumnLayout>
      <LandingPage />
    </SingleColumnLayout>
  );
};

const IfSupportsJobs = ({ children }: React.PropsWithChildren) => {
  const supportsJobs = useSupportsJobs();
  return <>{supportsJobs ? children : <JobsNotSupportedPage />}</>;
};

const App = () => {
  useScrollToTop(history);
  useReloadApp(history);

  return (
    <>
      <Helmet titleTemplate="%s | UniProt" defaultTitle="UniProt">
        <meta
          name="description"
          // default description, to override wherever needed
          content={description}
        />
      </Helmet>
      <DevDeploymentWarning />
      <Covid19RedirectWarning />
      <BaseLayout>
        <Suspense fallback={<Loader />}>
          <Switch>
            {/* Home */}
            <Route
              path={LocationToPath[Location.Home]}
              exact
              component={HomePage}
            />
            {/* Special pages */}
            <Route
              path={LocationToPath[Location.UniProtKBStatistics]}
              component={UniProtKBStatisticsPage}
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
              path={LocationToPath[Location.UniParcSubEntry]}
              component={UniParcSubEntryPage}
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
              component={ResultsOrLanding(
                GenericResultsPage,
                RedirectToStarSearch
              )}
            />
            {/* Tools */}
            <Route
              path={LocationToPath[Location.BlastResult]}
              render={() => (
                <IfSupportsJobs>
                  <BlastResult />
                </IfSupportsJobs>
              )}
            />
            <Route
              path={LocationToPath[Location.Blast]}
              render={() => (
                <IfSupportsJobs>
                  <SingleColumnLayout>
                    <BlastForm />
                  </SingleColumnLayout>
                </IfSupportsJobs>
              )}
            />
            <Route
              path={LocationToPath[Location.AlignResult]}
              render={() => (
                <IfSupportsJobs>
                  <AlignResult />
                </IfSupportsJobs>
              )}
            />
            <Route
              path={LocationToPath[Location.Align]}
              render={() => (
                <IfSupportsJobs>
                  <SingleColumnLayout>
                    <AlignForm />
                  </SingleColumnLayout>
                </IfSupportsJobs>
              )}
            />
            <Route
              path={LocationToPath[Location.PeptideSearchResult]}
              render={() => (
                <IfSupportsJobs>
                  <PeptideSearchResult />
                </IfSupportsJobs>
              )}
            />
            <Route
              path={LocationToPath[Location.PeptideSearch]}
              render={() => (
                <IfSupportsJobs>
                  <SingleColumnLayout>
                    <PeptideSearchForm />
                  </SingleColumnLayout>
                </IfSupportsJobs>
              )}
            />
            <Route
              path={LocationToPath[Location.IDMappingResult]}
              render={() => (
                <IfSupportsJobs>
                  <IDMappingResult />
                </IfSupportsJobs>
              )}
            />
            <Route
              path={LocationToPath[Location.IDMapping]}
              render={() => (
                <IfSupportsJobs>
                  <SingleColumnLayout>
                    <IDMappingForm />
                  </SingleColumnLayout>
                </IfSupportsJobs>
              )}
            />
            <Route
              path={LocationToPath[Location.Dashboard]}
              render={() => (
                <IfSupportsJobs>
                  <SingleColumnLayout>
                    <Dashboard />
                  </SingleColumnLayout>
                </IfSupportsJobs>
              )}
            />
            {/* Basket */}
            <Route
              path={LocationToPath[Location.Basket]}
              component={BasketFullView}
            />
            {/* Help */}
            <Route
              path={generatePath(LocationToPath[Location.HelpEntry], {
                accession: '_preview',
              })}
              component={HelpEntryPreviewPage}
            />
            <Route
              path={LocationToPath[Location.HelpEntry]}
              component={HelpEntryPage}
            />
            <Route
              path={LocationToPath[Location.HelpResults]}
              component={ResultsOrLanding(HelpResults, HelpLandingPage)}
            />
            {/* Release notes */}
            <Route
              path={generatePath(LocationToPath[Location.ReleaseNotesEntry], {
                accession: '_preview',
              })}
              component={HelpEntryPreviewPage}
            />
            <Route
              path={LocationToPath[Location.ReleaseNotesEntry]}
              component={HelpEntryPage}
            />
            <Route
              path={LocationToPath[Location.ReleaseNotesResults]}
              component={HelpResults}
            />
            <Route
              path={LocationToPath[Location.Documentation]}
              component={ApiDocumentationPage}
            />
            {/* Contact */}
            <Route
              path={LocationToPath[Location.ContactGeneric]}
              render={() => (
                <SingleColumnLayout>
                  <ContactForm />
                </SingleColumnLayout>
              )}
            />
            <Route
              path={LocationToPath[Location.ContactUpdate]}
              render={() => (
                <SingleColumnLayout>
                  <ContactForm />
                </SingleColumnLayout>
              )}
            />
            {/* Catch-all handler -> Redirect or not found use ResourceNotFoundPage */}
            <Route path="*" component={ResourceNotFoundPage} />
          </Switch>
        </Suspense>
      </BaseLayout>
      <ErrorBoundary fallback={null}>
        <GDPR />
      </ErrorBoundary>
      <Suspense fallback={null}>
        <ErrorBoundary fallback={null}>
          <ContextualHelp />
        </ErrorBoundary>
      </Suspense>
      <Suspense fallback={null}>
        <ErrorBoundary fallback={null}>
          <BackToTheTop />
        </ErrorBoundary>
      </Suspense>
    </>
  );
};

export default App;
