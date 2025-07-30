import { CodeBlock } from 'franklin-sites';
import { type ComponentType, lazy } from 'react';
import {
  Navigate,
  type RouteObject,
  useLocation,
  useParams,
  useSearchParams,
} from 'react-router';

import ErrorComponent from '../../shared/components/error-component/ErrorComponent';
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
// const GenericResultsPage = lazy(
//   () =>
//     import(
//       /* webpackChunkName: "generic-results" */ '../../shared/components/results/Results'
//     )
// );
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

const ResourceNotFoundPage = lazy(
  () =>
    import(
      /* webpackChunkName: "resource-not-found" */ '../../shared/components/error-pages/ResourceNotFound'
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

const LandingPages = new Map<SearchableNamespace, ComponentType>([
  [Namespace.uniprotkb, UniProtKBLandingPage],
  [Namespace.uniparc, UniParcLandingPage],
  [Namespace.proteomes, ProteomesLandingPage],
  [Namespace.uniref, UniRefLandingPage],
]);

// Helper component to render a landing page or the results page depending on
// the presence of absence of a query and of a corresponding landing page
const resultsOrLanding =
  (ResultsPage: ComponentType, LandingPage?: ComponentType) => () => {
    const [searchParams, setSearchParams] = useSearchParams();
    // If there is a query is the URL
    if (searchParams.has('query')) {
      // ...and the query has a value
      if (searchParams.get('query')) {
        return <ResultsPage />;
      }
      // otherwise, if empty query value, redirect to star search
      setSearchParams((searchParams) => {
        searchParams.set('query', '*');
        return searchParams;
      });
      return null;
    }
    // If no query at all, redirect to a landing page if it exists
    if (LandingPage) {
      return <LandingPage />;
    }
    // Otherwise, if no landing page, redirect to star search
    setSearchParams((searchParams) => {
      searchParams.set('query', '*');
      return searchParams;
    });
  };

const redirectToEntryRoute = {
  index: true,
  element: <Navigate replace to="./entry" />,
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
              // TODO
              Empty,
              LandingPages.get(Namespace.uniprotkb)
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
              // TODO
              Empty,
              LandingPages.get(Namespace.proteomes)
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
            Component: resultsOrLanding(
              // TODO
              Empty,
              LandingPages.get(Namespace.uniref)
            ),
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
            Component: resultsOrLanding(
              // TODO
              Empty,
              LandingPages.get(Namespace.uniparc)
            ),
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
            // TODO
            Component: resultsOrLanding(Empty),
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
            // TODO
            Component: resultsOrLanding(Empty),
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
            // TODO
            Component: resultsOrLanding(Empty),
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
            // TODO
            Component: resultsOrLanding(Empty),
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
            // TODO
            Component: resultsOrLanding(Empty),
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
            // TODO
            Component: resultsOrLanding(Empty),
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
            // TODO
            Component: resultsOrLanding(Empty),
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
            // TODO
            Component: resultsOrLanding(Empty),
          },
          {
            path: ':accession',
            Component: ARBAEntryPage,
          },
        ],
      },
      {
        path: '*',
        Component: ResourceNotFoundPage,
      },
    ],
  },
];
