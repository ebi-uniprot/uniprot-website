import { CodeBlock } from 'franklin-sites';
import { type ComponentType, lazy, Suspense } from 'react';
import {
  Navigate,
  Outlet,
  redirect,
  type RouteObject,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router';

import ErrorComponent from '../../shared/components/error-component/ErrorComponent';
import { SingleColumnLayout } from '../../shared/components/layouts/SingleColumnLayout';
import useSupportsJobs from '../../shared/hooks/useSupportsJobs';
import {
  Namespace,
  type SearchableNamespace,
} from '../../shared/types/namespaces';
import App from '../components/App';
import GlobalContext from '../contexts/Global';

const HomePage = lazy(
  () =>
    import(
      /* webpackChunkName: "home-page" */ '../components/home-page/HomePage'
    )
);
// Statistics pages
const UniProtKBStatisticsPage = lazy(
  () =>
    import(
      /* webpackChunkName: "uniprotkb-statistics" */ '../../uniprotkb/components/statistics/StatisticsPage'
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
// Search results
const GenericResultsPage = lazy(
  () =>
    import(
      /* webpackChunkName: "generic-results" */ '../../shared/components/results/Results'
    )
);
//Entry pages
const UniProtKBEntryPage = lazy(
  () =>
    import(
      /* webpackChunkName: "uniprotkb-entry" */ '../../uniprotkb/components/entry/Entry'
    )
);
const ProteomesEntryPage = lazy(
  () =>
    import(
      /* webpackChunkName: "proteomes-entry" */ '../../proteomes/components/entry/Entry'
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
const UniParcSubEntryPage = lazy(
  () =>
    import(
      /* webpackChunkName: "uniparc-entry" */ '../../uniparc/components/sub-entry/SubEntry'
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
// Jobs
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

const Empty = () => {
  const location = useLocation();
  const params = useParams();

  return (
    <section>
      <h1>Empty page to be implemented</h1>
      <CodeBlock>{JSON.stringify({ location, params }, null, 2)}</CodeBlock>
    </section>
  );
};

// Helper component to render a landing page or the results page depending on
// the presence of absence of a query and of a corresponding landing page
const resultsOrLanding =
  (ResultsPage: ComponentType, LandingPage?: ComponentType) => () => {
    const [searchParams] = useSearchParams();
    // If there is a query is the URL
    if (searchParams.has('query')) {
      // ...and the query has a value
      if (searchParams.get('query')) {
        return <ResultsPage />;
      }
      // otherwise, if empty query value, redirect to star search
      return <Navigate to="?query=*" replace />;
    }
    // If no query at all, redirect to a landing page if it exists
    if (LandingPage) {
      return <LandingPage />;
    }
    // Otherwise, if no landing page, redirect to star search
    return <Navigate to="?query=*" replace />;
  };

const redirectToEntryRoute = {
  index: true,
  loader: () => redirect('entry'),
};

const redirectToOverviewRoute = {
  index: true,
  loader: () => redirect('overview'),
};

const redirectToUPKBRoute = {
  index: true,
  loader: () => redirect('uniprotkb'),
};

const IfSupportsJobs = () => {
  const supportsJobs = useSupportsJobs();
  return (
    <Suspense>{supportsJobs ? <Outlet /> : <JobsNotSupportedPage />}</Suspense>
  );
};

export const routes: RouteObject[] = [
  {
    element: (
      <GlobalContext>
        <App />
      </GlobalContext>
    ),
    errorElement: <ErrorComponent />,
    children: [
      {
        index: true,
        path: '/',
        Component: HomePage,
      },
      {
        path: 'uniprotkb',
        children: [
          {
            index: true,
            Component: resultsOrLanding(
              GenericResultsPage,
              UniProtKBLandingPage
            ),
          },
          {
            path: 'statistics',
            Component: UniProtKBStatisticsPage,
          },
          {
            path: ':accession',
            children: [
              redirectToEntryRoute,
              {
                path: ':subPage',
                Component: UniProtKBEntryPage,
              },
            ],
          },
        ],
      },
      {
        path: 'proteomes',
        children: [
          {
            index: true,
            Component: resultsOrLanding(
              GenericResultsPage,
              ProteomesLandingPage
            ),
          },
          {
            path: ':accession',
            Component: ProteomesEntryPage,
          },
        ],
      },
      {
        path: 'uniref',
        children: [
          {
            index: true,
            Component: resultsOrLanding(GenericResultsPage, UniRefLandingPage),
          },
          {
            path: ':accession',
            Component: UniRefEntryPage,
          },
        ],
      },
      {
        path: 'uniparc',
        children: [
          {
            index: true,
            Component: resultsOrLanding(GenericResultsPage, UniParcLandingPage),
          },
          {
            path: ':accession',
            children: [
              redirectToEntryRoute,
              {
                path: ':subPage',
                children: [
                  {
                    index: true,
                    Component: UniParcEntryPage,
                  },
                  {
                    path: ':subEntryId',
                    Component: UniParcSubEntryPage,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'taxonomy',
        children: [
          {
            index: true,
            Component: resultsOrLanding(GenericResultsPage),
          },
          {
            path: ':accession',
            Component: TaxonomyEntryPage,
          },
        ],
      },
      {
        path: 'keywords',
        children: [
          {
            index: true,
            Component: resultsOrLanding(GenericResultsPage),
          },
          {
            path: ':accession',
            Component: KeywordsEntryPage,
          },
        ],
      },
      {
        path: 'citations',
        children: [
          {
            index: true,
            Component: resultsOrLanding(GenericResultsPage),
          },
          {
            path: ':accession',
            Component: CitationsEntryPage,
          },
        ],
      },
      {
        path: 'diseases',
        children: [
          {
            index: true,
            Component: resultsOrLanding(GenericResultsPage),
          },
          {
            path: ':accession',
            Component: DiseasesEntryPage,
          },
        ],
      },
      {
        path: 'database',
        children: [
          {
            index: true,
            Component: resultsOrLanding(GenericResultsPage),
          },
          {
            path: ':accession',
            Component: DatabaseEntryPage,
          },
        ],
      },
      {
        path: 'locations',
        children: [
          {
            index: true,
            Component: resultsOrLanding(GenericResultsPage),
          },
          {
            path: ':accession',
            Component: LocationsEntryPage,
          },
        ],
      },
      {
        path: 'unirule',
        children: [
          {
            index: true,
            Component: resultsOrLanding(GenericResultsPage),
          },
          {
            path: ':accession',
            Component: UniRuleEntryPage,
          },
        ],
      },
      {
        path: 'arba',
        children: [
          {
            index: true,
            Component: resultsOrLanding(GenericResultsPage),
          },
          {
            path: ':accession',
            Component: ARBAEntryPage,
          },
        ],
      },
      {
        path: 'blast',
        Component: IfSupportsJobs,
        children: [
          {
            index: true,
            element: (
              <SingleColumnLayout>
                <BlastForm />
              </SingleColumnLayout>
            ),
          },
          {
            path: ':namespace/:id',
            children: [
              redirectToOverviewRoute,
              {
                path: ':subPage',
                Component: BlastResult,
              },
            ],
          },
        ],
      },
      {
        path: 'align',
        Component: IfSupportsJobs,
        children: [
          {
            index: true,
            element: (
              <SingleColumnLayout>
                <AlignForm />
              </SingleColumnLayout>
            ),
          },
          {
            path: ':id',
            children: [
              redirectToOverviewRoute,
              {
                path: ':subPage',
                Component: AlignResult,
              },
            ],
          },
        ],
      },
      {
        path: 'id-mapping',
        Component: IfSupportsJobs,
        children: [
          {
            index: true,
            element: (
              <SingleColumnLayout>
                <IDMappingForm />
              </SingleColumnLayout>
            ),
          },
          ...['uniprotkb', 'uniref', 'uniparc'].map((ns) => ({
            path: `${ns}/:id`,
            children: [
              redirectToOverviewRoute,
              {
                path: ':subPage',
                Component: IDMappingResult,
              },
            ],
          })),
          {
            path: ':id',
            children: [
              redirectToOverviewRoute,
              {
                path: ':subPage',
                Component: IDMappingResult,
              },
            ],
          },
        ],
      },
      {
        path: 'peptide-search',
        Component: IfSupportsJobs,
        children: [
          {
            index: true,
            element: (
              <SingleColumnLayout>
                <PeptideSearchForm />
              </SingleColumnLayout>
            ),
          },
          {
            path: ':id',
            children: [
              redirectToOverviewRoute,
              {
                path: ':subPage',
                Component: PeptideSearchResult,
              },
            ],
          },
        ],
      },
      {
        path: 'tool-dashboard',
        Component: IfSupportsJobs,
        children: [
          {
            index: true,
            Component: Dashboard,
          },
        ],
      },
      {
        path: 'basket',
        children: [
          redirectToUPKBRoute,
          {
            path: ':namespace',
            Component: BasketFullView,
          },
        ],
      },
      {
        path: 'help',
        children: [
          {
            index: true,
            Component: resultsOrLanding(HelpResults, HelpLandingPage),
          },
          { path: '_preview', Component: HelpEntryPreviewPage },
          { path: ':accession', Component: HelpEntryPage },
        ],
      },
      {
        path: 'release-notes',
        children: [
          { index: true, Component: HelpResults },
          { path: '_preview', Component: HelpEntryPreviewPage },
          { path: ':accession', Component: HelpEntryPage },
        ],
      },
      {
        path: 'api-documentation',
        children: [
          redirectToUPKBRoute,
          { path: ':definition', Component: ApiDocumentationPage },
        ],
      },
      {
        path: 'contact',
        Component: Empty,
      },
      {
        path: 'update',
        Component: Empty,
      },
      {
        path: '*',
        Component: ResourceNotFoundPage,
      },
    ],
  },
];
