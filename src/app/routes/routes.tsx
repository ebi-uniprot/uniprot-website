import { lazy } from 'react';
import { type RouteObject } from 'react-router';

import { TabLocation as AlignTabLocation } from '../../jobs/align/types/alignResults';
import { TabLocation as BlastTabLocation } from '../../jobs/blast/types/blastResults';
import { TabLocation as IDMappingTabLocation } from '../../jobs/id-mapping/types/idMappingSearchResults';
import { TabLocation as PeptideSearchTabLocation } from '../../jobs/peptide-search/types/peptideSearchResults';
import ErrorComponent from '../../shared/components/error-component/ErrorComponent';
import { SingleColumnLayout } from '../../shared/components/layouts/SingleColumnLayout';
import { Namespace } from '../../shared/types/namespaces';
import { TabLocation as UniParcTabLocation } from '../../uniparc/types/entry';
import { TabLocation as UPKBTabLocation } from '../../uniprotkb/types/entry';
import App from '../components/App';
import GlobalContext from '../contexts/Global';
import IfSupportsJobs from './helpers/IfSupportJobs';
import {
  redirectToEntryRoute,
  redirectToOverviewRoute,
  redirectToUPKBRoute,
} from './helpers/redirectLoaders';
import resultsOrLanding from './helpers/resultOrLanding';
import {
  catchAll,
  cleanAccession,
  getNumberWithPrefixAccession,
  getSubPages,
  uppercaseAccession,
} from './loaders/composable-helpers';

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
      /* webpackChunkName: "proteomes-landing" */ '../../proteomes/components/landing-page/LandingPage'
    )
);
const UniRefLandingPage = lazy(
  () =>
    import(
      /* webpackChunkName: "uniref-landing" */ '../../uniref/components/landing-page/LandingPage'
    )
);
const SupportingDataLandingPage = lazy(
  () =>
    import(
      /* webpackChunkName: "supporting-data-landing" */ '../../supporting-data/landing-page/LandingPage'
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

// loaders
const proteomesNumberAccession = getNumberWithPrefixAccession('UP', 9);
const uniparcNumberAccession = getNumberWithPrefixAccession('UPI', 10);
const keywordsNumberAccession = getNumberWithPrefixAccession('KW-', 4);
const diseasesNumberAccession = getNumberWithPrefixAccession('DI-', 5);
const xrefsNumberAccession = getNumberWithPrefixAccession('DB-', 4);
const subcellNumberAccession = getNumberWithPrefixAccession('SL-', 5);
const uniruleNumberAccession = getNumberWithPrefixAccession('UR', 9);
const arbaNumberAccession = getNumberWithPrefixAccession('ARBA', 8);
const uniprotkbSubPages = getSubPages(
  new Set(Object.values(UPKBTabLocation)),
  UPKBTabLocation.Entry,
  new Map([
    ['protvista', UPKBTabLocation.FeatureViewer],
    ['features-viewer', UPKBTabLocation.FeatureViewer],
    ['variants-viewer', UPKBTabLocation.VariantViewer],
  ])
);
const uniparcSubPages = getSubPages(
  new Set(Object.values(UniParcTabLocation)),
  UniParcTabLocation.Entry,
  new Map([['protvista', UniParcTabLocation.FeatureViewer]])
);
const blastSubPages = getSubPages(
  new Set(Object.values(BlastTabLocation)),
  BlastTabLocation.Overview
);
const alignSubPages = getSubPages(
  new Set(Object.values(AlignTabLocation)),
  AlignTabLocation.Overview
);
const idMappingSubPages = getSubPages(
  new Set(Object.values(IDMappingTabLocation)),
  IDMappingTabLocation.Overview
);
const peptideSearchSubPages = getSubPages(
  new Set(Object.values(PeptideSearchTabLocation)),
  PeptideSearchTabLocation.Overview
);

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
        index: true, // Check is this needed here?
        path: '/',
        Component: HomePage,
      },
      {
        path: Namespace.uniprotkb,
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
            loader: (args) => {
              cleanAccession(args);
              uppercaseAccession(args);
            },
            children: [
              redirectToEntryRoute,
              {
                path: ':subPage',
                Component: UniProtKBEntryPage,
                loader: (args) => {
                  uniprotkbSubPages(args);
                },
              },
            ],
          },
        ],
      },
      {
        path: Namespace.proteomes,
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
            loader: (args) => {
              cleanAccession(args);
              uppercaseAccession(args);
              proteomesNumberAccession(args);
            },
            Component: ProteomesEntryPage,
          },
        ],
      },
      {
        path: Namespace.uniref,
        children: [
          {
            index: true,
            Component: resultsOrLanding(GenericResultsPage, UniRefLandingPage),
          },
          {
            path: ':accession',
            loader: (args) => {
              cleanAccession(args);
            },
            Component: UniRefEntryPage,
          },
        ],
      },
      {
        path: Namespace.uniparc,
        children: [
          {
            index: true,
            Component: resultsOrLanding(GenericResultsPage, UniParcLandingPage),
          },
          {
            path: ':accession',
            loader: (args) => {
              cleanAccession(args);
              uppercaseAccession(args);
              uniparcNumberAccession(args);
            },
            children: [
              redirectToEntryRoute,
              {
                path: ':subPage',
                loader: (args) => {
                  uniparcSubPages(args);
                },
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
        path: 'supporting-data',
        element: (
          <SingleColumnLayout>
            <SupportingDataLandingPage />
          </SingleColumnLayout>
        ),
      },
      {
        path: Namespace.taxonomy,
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
        path: Namespace.keywords,
        children: [
          {
            index: true,
            Component: resultsOrLanding(GenericResultsPage),
          },
          {
            path: ':accession',
            Component: KeywordsEntryPage,
            loader: (args) => {
              keywordsNumberAccession(args);
            },
          },
        ],
      },
      {
        path: Namespace.citations,
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
        path: Namespace.diseases,
        children: [
          {
            index: true,
            Component: resultsOrLanding(GenericResultsPage),
          },
          {
            path: ':accession',
            Component: DiseasesEntryPage,
            loader: (args) => {
              diseasesNumberAccession(args);
            },
          },
        ],
      },
      {
        path: Namespace.database,
        children: [
          {
            index: true,
            Component: resultsOrLanding(GenericResultsPage),
          },
          {
            path: ':accession',
            Component: DatabaseEntryPage,
            loader: (args) => {
              xrefsNumberAccession(args);
            },
          },
        ],
      },
      {
        path: Namespace.locations,
        children: [
          {
            index: true,
            Component: resultsOrLanding(GenericResultsPage),
          },
          {
            path: ':accession',
            Component: LocationsEntryPage,
            loader: (args) => {
              subcellNumberAccession(args);
            },
          },
        ],
      },
      {
        path: Namespace.unirule,
        children: [
          {
            index: true,
            Component: resultsOrLanding(GenericResultsPage),
          },
          {
            path: ':accession',
            Component: UniRuleEntryPage,
            loader: (args) => {
              uniruleNumberAccession(args);
            },
          },
        ],
      },
      {
        path: Namespace.arba,
        children: [
          {
            index: true,
            Component: resultsOrLanding(GenericResultsPage),
          },
          {
            path: ':accession',
            Component: ARBAEntryPage,
            loader: (args) => {
              arbaNumberAccession(args);
            },
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
                loader: (args) => {
                  blastSubPages(args);
                },
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
                loader: (args) => {
                  alignSubPages(args);
                },
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
          ...[Namespace.uniprotkb, Namespace.uniref, Namespace.uniparc].map(
            (ns) =>
              ({
                path: `${ns}/:id`,
                children: [
                  redirectToOverviewRoute,
                  {
                    path: ':subPage',
                    Component: IDMappingResult,
                    loader: (args) => {
                      idMappingSubPages(args);
                    },
                  },
                ],
              }) satisfies RouteObject
          ),
          {
            path: ':id',
            children: [
              redirectToOverviewRoute,
              {
                path: ':subPage',
                Component: IDMappingResult,
                loader: (args) => {
                  idMappingSubPages(args);
                },
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
                loader: (args) => {
                  peptideSearchSubPages(args);
                },
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
        element: (
          <SingleColumnLayout>
            <ContactForm />
          </SingleColumnLayout>
        ),
      },
      {
        path: 'update',
        element: (
          <SingleColumnLayout>
            <ContactForm />
          </SingleColumnLayout>
        ),
      },
      {
        path: '*',
        Component: ResourceNotFoundPage,
        loader: (args) => {
          catchAll(args);
        },
      },
    ],
  },
];
