import '../../../shared/components/entry/styles/entry-page.scss';

import cn from 'classnames';
import { Chip, Loader, LongNumber, Tab, Tabs } from 'franklin-sites';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router';

// import { frame } from 'timing-functions';
import {
  getEntryPath,
  Location,
  LocationToPath,
} from '../../../app/config/urls';
import BasketStatus from '../../../basket/BasketStatus';
import ContactLink from '../../../contact/components/ContactLink';
// import { addMessage } from '../../../messages/state/messagesActions';
// import {
//   MessageFormat,
//   MessageLevel,
//   MessageTag,
// } from '../../../messages/types/messagesTypes';
import AddToBasketButton from '../../../shared/components/action-buttons/AddToBasket';
import AlignButton from '../../../shared/components/action-buttons/Align';
import ToolsDropdown from '../../../shared/components/action-buttons/ToolsDropdown';
import EntryDownloadButton from '../../../shared/components/entry/EntryDownloadButton';
import EntryDownloadPanel from '../../../shared/components/entry/EntryDownloadPanel';
import EntryTitle from '../../../shared/components/entry/EntryTitle';
import { EntryType } from '../../../shared/components/entry/EntryTypeIcon';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import HTMLHead from '../../../shared/components/HTMLHead';
import InPageNav from '../../../shared/components/InPageNav';
import { SidebarLayout } from '../../../shared/components/layouts/SideBarLayout';
import sidebarStyles from '../../../shared/components/layouts/styles/sidebar-layout.module.scss';
// import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import externalUrls from '../../../shared/config/externalUrls';
import { AFDBOutOfSyncContext } from '../../../shared/contexts/AFDBOutOfSync';
// import useDataApi from '../../../shared/hooks/useDataApi';
import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';
import {
  useMediumScreen,
  useSmallScreen,
} from '../../../shared/hooks/useMatchMedia';
// import useMessagesDispatch from '../../../shared/hooks/useMessagesDispatch';
import useStructuredData from '../../../shared/hooks/useStructuredData';
import helper from '../../../shared/styles/helper.module.scss';
import sticky from '../../../shared/styles/sticky.module.scss';
import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../shared/types/namespaces';
// import { SearchResults } from '../../../shared/types/results';
import lazy from '../../../shared/utils/lazy';
import { stringifyQuery } from '../../../shared/utils/url';
import { hasContent } from '../../../shared/utils/utils';
import {
  // CitationsAPIModel,
  Reference,
} from '../../../supporting-data/citations/adapters/citationsConverter';
import { extractIsoformNames } from '../../adapters/extractIsoformsConverter';
import generatePageTitle from '../../adapters/generatePageTitle';
import uniProtKbConverter, {
  UniProtkbAPIModel,
  UniProtkbUIModel,
} from '../../adapters/uniProtkbConverter';
// import uniprotkbApiUrls from '../../config/apiUrls/apiUrls';
import UniProtKBEntryConfig from '../../config/UniProtEntryConfig';
import { FreeTextComment } from '../../types/commentTypes';
import { DatabaseCategory } from '../../types/databaseRefs';
import { TabLocation } from '../../types/entry';
import EntrySection, {
  entrySectionToCommunityAnnotationField,
} from '../../types/entrySection';
import { getListOfIsoformAccessions } from '../../utils';
import { getEntrySectionNameAndId } from '../../utils/entrySection';
import ProteinOverview from '../protein-data-views/ProteinOverviewView';
import CommunityAnnotationLink from './CommunityAnnotationLink';
import dataToSchema from './entry.structured';
import EntryMain from './EntryMain';
import EntryPublicationsFacets from './EntryPublicationsFacets';
import { subcellularLocationSectionHasContent } from './SubcellularLocationSection';
import SummaryTab from './tabs/Summary';

const VariationViewerTab = lazy(
  () =>
    import(
      /* webpackChunkName: "uniprotkb-entry-variation-viewer" */ './tabs/variation-viewer/VariationViewer'
    )
);

const FeatureViewerTab = lazy(
  () =>
    import(
      /* webpackChunkName: "uniprotkb-entry-feature-viewer" */ './tabs/FeatureViewer'
    )
);

const GenomicCoordinatesTab = lazy(
  () =>
    import(
      /* webpackChunkName: "uniprotkb-entry-genomic-coordinates" */ './tabs/genomic-coordinates/GenomicCoordinates'
    )
);

const PublicationsTab = lazy(
  () =>
    import(
      /* webpackChunkName: "uniprotkb-entry-publications" */ './tabs/Publications'
    )
);

const ExternalLinksTab = lazy(
  () =>
    import(
      /* webpackChunkName: "uniprotkb-entry-external-links" */ './tabs/ExternalLinks'
    )
);

const HistoryTab = lazy(
  () =>
    import(
      /* webpackChunkName: "uniprotkb-entry-history" */ './tabs/history/History'
    )
);

// Watch out, hardcoded!
// Currently, just a bit before 2021_04
const AFDB_CUTOFF_DATE = new Date('2021-09-20');

const hasExternalLinks = (transformedData: UniProtkbUIModel) =>
  UniProtKBEntryConfig.some(({ id }) => {
    const data = transformedData[id];
    return Boolean('xrefData' in data && data.xrefData?.length);
  });

type Props = {
  data: UniProtkbAPIModel;
  importedVariants: number;
  hasGenomicCoordinates: boolean;
  communityReferences: Reference[];
  aiSummary?: FreeTextComment[];
};

const Entry = ({
  data,
  importedVariants,
  hasGenomicCoordinates,
  communityReferences,
  aiSummary,
}: Props) => {
  // const dispatch = useMessagesDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);
  const smallScreen = useSmallScreen();
  const mediumScreen = useMediumScreen();

  // const { loading, data, status, error, redirectedTo, progress } =
  //   useDataApi<UniProtkbAPIModel>(
  //     apiUrls.entry.entry(params.accession, Namespace.uniprotkb)
  //   );

  // const variantsHeadPayload = useDataApi(
  //   params.accession && apiUrls.proteinsApi.variation(params.accession),
  //   { method: 'HEAD' }
  // );

  // const coordinatesHeadPayload = useDataApi(
  //   params.accession && apiUrls.proteinsApi.coordinates(params.accession),
  //   { method: 'HEAD' }
  // );

  // const communityCuratedPayload = useDataApi<SearchResults<CitationsAPIModel>>(
  //   params.accession &&
  //     uniprotkbApiUrls.publications.entryPublications({
  //       accession: params.accession,
  //       selectedFacets: [
  //         {
  //           name: 'types',
  //           value: '0',
  //         },
  //       ],
  //     })
  // );

  // const communityReferences: Reference[] = useMemo(() => {
  //   const filteredReferences = communityCuratedPayload.data?.results?.flatMap(
  //     ({ references }) =>
  //       references?.filter((reference) => reference.source?.name === 'ORCID')
  //   );
  //   return filteredReferences?.filter((r): r is Reference => Boolean(r)) || [];
  // }, [communityCuratedPayload.data]);

  const databaseInfoMaps = useDatabaseInfoMaps();

  const [transformedData, pageTitle] = useMemo(() => {
    if (!data || !databaseInfoMaps) {
      return [];
    }
    const transformedData = uniProtKbConverter(data, databaseInfoMaps);
    return [transformedData, generatePageTitle(transformedData)];
  }, [data, databaseInfoMaps]);

  const sections = useMemo(() => {
    if (transformedData) {
      const taxId =
        transformedData[EntrySection.NamesAndTaxonomy].organismData?.taxonId;
      const numberOfIsoforms =
        transformedData[EntrySection.Sequence].alternativeProducts?.isoforms
          .length;
      return UniProtKBEntryConfig.map((section) => {
        const nameAndId = getEntrySectionNameAndId(
          section.id,
          taxId,
          numberOfIsoforms
        );
        let disabled = true;
        switch (nameAndId.id) {
          case EntrySection.ExternalLinks:
            disabled = !hasExternalLinks(transformedData);
            break;
          case EntrySection.SimilarProteins:
            disabled = false;
            break;
          case EntrySection.SubCellularLocation:
            disabled = !subcellularLocationSectionHasContent(
              transformedData[EntrySection.SubCellularLocation]
            );
            break;
          default:
            disabled =
              !hasContent(transformedData[nameAndId.id]) &&
              !communityReferences.some((reference) => {
                if (
                  reference.communityAnnotation &&
                  !!entrySectionToCommunityAnnotationField.get(nameAndId.id)
                ) {
                  return (
                    (entrySectionToCommunityAnnotationField.get(nameAndId.id) ||
                      '') in reference.communityAnnotation
                  );
                }
                return false;
              });
        }
        return {
          label: nameAndId.name,
          id: nameAndId.id,
          disabled,
        };
      });
    }
    return [];
  }, [transformedData, communityReferences]);

  const listOfIsoformAccessions = useMemo(
    () => getListOfIsoformAccessions(data),
    [data]
  );

  const listOfIsoformNames = useMemo(() => extractIsoformNames(data), [data]);

  // Redirect to new entry when obsolete and merged into one
  // useEffect(() => {
  //   if (
  //     redirectedTo &&
  //     params.accession &&
  //     params.subPage !== TabLocation.History
  //   ) {
  //     const split = new URL(redirectedTo).pathname.split('/');
  //     const newEntry = split[split.length - 1];
  //     // If the redirection is because of ID or version in which case, the following message doesn't make sense
  //     if (!params.accession.includes('_') && !params.accession.includes('.')) {
  //       dispatch(
  //         addMessage({
  //           id: 'accession-merge',
  //           content: (
  //             <>
  //               {params.accession} has been merged into {newEntry}. You have
  //               automatically been redirected. To see {params.accession}
  //               &apos;s history,{' '}
  //               <Link
  //                 to={getEntryPath(
  //                   Namespace.uniprotkb,
  //                   params.accession,
  //                   TabLocation.History
  //                 )}
  //               >
  //                 click here
  //               </Link>
  //               .
  //             </>
  //           ),
  //           format: MessageFormat.IN_PAGE,
  //           level: MessageLevel.SUCCESS,
  //           tag: MessageTag.REDIRECT,
  //         })
  //       );
  //     }
  //     frame().then(() => {
  //       // If accession contains version, it should be redirected to History tab
  //       const activeTab = params.accession?.includes('.')
  //         ? TabLocation.History
  //         : TabLocation.Entry;
  //       navigate(getEntryPath(Namespace.uniprotkb, newEntry, activeTab), {
  //         replace: true,
  //       });
  //     });
  //   }
  //   // (I hope) I know what I'm doing here, I want to stick with whatever value
  //   // params.accession and params.subPage had when the component was mounted.
  //   // eslint-disable-next-line reactHooks/exhaustive-deps
  // }, [dispatch, redirectedTo]);

  useEffect(() => {
    if (params.accession?.includes('-')) {
      const [accession] = params.accession.split('-');
      navigate(
        {
          pathname: getEntryPath(
            Namespace.uniprotkb,
            accession,
            TabLocation.Entry
          ),
          hash: params.accession,
        },
        { replace: true }
      );
    }
  }, [navigate, params.accession]);

  // let isObsolete = Boolean(
  const isObsolete = Boolean(
    transformedData?.entryType === EntryType.INACTIVE &&
      transformedData.inactiveReason
  );

  const structuredData = useMemo(() => dataToSchema(data), [data]);
  useStructuredData(structuredData);

  // Redirect to history when obsolete and not merged into a single new one
  if (
    isObsolete &&
    params.accession &&
    params.subPage !== TabLocation.History
  ) {
    return (
      <Navigate
        replace
        to={getEntryPath(
          Namespace.uniprotkb,
          params.accession,
          TabLocation.History
        )}
      />
    );
  }

  // if (
  //   loading ||
  //   !data ||
  //   // if we're gonna redirect, show loading in the meantime
  //   (redirectedTo && params.subPage !== TabLocation.History)
  // ) {
  //   if (error) {
  //     return <ErrorHandler status={status} error={error} fullPage />;
  //   }
  //   return <Loader progress={progress} />;
  // }

  // // If there is redirection in place (might be an obsolete entry or an ID link), use the primary accession instead of match params
  // const accession = redirectedTo
  //   ? data.primaryAccession
  //   : params.accession || '';
  const accession = data.primaryAccession;

  // let importedVariants: number | 'loading' = 0;
  // if (variantsHeadPayload.loading) {
  //   importedVariants = 'loading';
  // } else {
  //   const count = +(variantsHeadPayload.headers?.['x-feature-records'] ?? 0);
  //   if (variantsHeadPayload.status === 200 && !Number.isNaN(count)) {
  //     importedVariants = count;
  //   }
  // }

  // let hasGenomicCoordinates: boolean | 'loading' = false;
  // if (coordinatesHeadPayload.loading) {
  //   hasGenomicCoordinates = 'loading';
  // } else {
  //   hasGenomicCoordinates = coordinatesHeadPayload.status === 200;
  // }

  const isAFDBOutOfSync =
    new Date(
      transformedData?.sequences.entryAudit?.lastSequenceUpdateDate ||
        '2000-01-01'
    ) > AFDB_CUTOFF_DATE;

  if (!transformedData) {
    return <ErrorHandler fullPage />;
  }

  const entrySidebar = (
    <InPageNav sections={sections} rootElement={`.${sidebarStyles.content}`} />
  );

  const publicationsSideBar = <EntryPublicationsFacets accession={accession} />;

  // If there is redirection and the accession in the path do not match the data's primary accession (it happens when the user chooses to see a
  // merged entry's history), the user is viewing content of an obsolete entry
  // isObsolete = (redirectedTo && accession !== params.accession) || isObsolete;

  let sidebar = null;
  if (!isObsolete) {
    if (params.subPage === TabLocation.Publications) {
      sidebar = publicationsSideBar;
    } else if (params.subPage === TabLocation.Entry) {
      sidebar = entrySidebar;
    }
  }

  const handleToggleDownload = () =>
    setDisplayDownloadPanel(!displayDownloadPanel);

  return (
    <SidebarLayout
      sidebar={sidebar}
      noOverflow
      className={cn('entry-page', sticky['sticky-tabs-container'])}
    >
      <HTMLHead>
        {typeof window !== 'undefined' && (
          <link rel="canonical" href={window.location.href} />
        )}
      </HTMLHead>
      {isObsolete ? (
        <h1>{params.accession}</h1>
      ) : (
        <ErrorBoundary>
          <HTMLHead
            title={[pageTitle, searchableNamespaceLabels[Namespace.uniprotkb]]}
          >
            {/** Below: experiment with OpenGraph and related */}
            {/* @ts-expect-error og tags */}
            <meta name="twitter:label1" value="Protein Name" />
            <meta
              name="twitter:data1"
              // @ts-expect-error og tags
              value={data.proteinDescription?.recommendedName?.fullName.value}
            />
            {/* @ts-expect-error og tags */}
            <meta name="twitter:label2" value="Gene Name" />
            <meta
              name="twitter:data1"
              // @ts-expect-error og tags
              value={data.genes?.[0]?.geneName?.value}
            />
          </HTMLHead>
          <h1>
            <EntryTitle
              mainTitle={data.primaryAccession}
              optionalTitle={data.uniProtkbId}
              entryType={data.entryType}
            />
            <BasketStatus id={data.primaryAccession} className="small" />
          </h1>
          <ProteinOverview data={data} />
        </ErrorBoundary>
      )}
      <AFDBOutOfSyncContext.Provider value={isAFDBOutOfSync}>
        <Tabs active={params.subPage}>
          <Tab
            title={
              <Link
                className={isObsolete ? helper.disabled : undefined}
                tabIndex={isObsolete ? -1 : undefined}
                to={`../${TabLocation.Summary}?force`}
              >
                ✨ AI summary ✨
              </Link>
            }
            id={TabLocation.Summary}
          >
            <ErrorBoundary>
              <SummaryTab accession={accession} comments={aiSummary} />
            </ErrorBoundary>
          </Tab>
          <Tab
            disabled={isObsolete}
            title={
              <Link
                className={isObsolete ? helper.disabled : undefined}
                tabIndex={isObsolete ? -1 : undefined}
                to={`../${TabLocation.Entry}?force`}
              >
                Entry
              </Link>
            }
            id={TabLocation.Entry}
          >
            {!isObsolete && data.sequence && (
              <>
                {displayDownloadPanel && (
                  <EntryDownloadPanel
                    handleToggle={handleToggleDownload}
                    isoformsAvailable={Boolean(listOfIsoformAccessions.length)}
                    sequence={data.sequence.value}
                  />
                )}
                <div className="button-group">
                  <ToolsDropdown
                    selectedEntries={[accession]}
                    blast
                    align={
                      listOfIsoformAccessions.length > 1 && (
                        <AlignButton
                          selectedEntries={listOfIsoformAccessions}
                          textSuffix="isoforms"
                        />
                      )
                    }
                    mapID
                  />
                  <EntryDownloadButton handleToggle={handleToggleDownload} />
                  <AddToBasketButton selectedEntries={accession} />
                  <CommunityAnnotationLink accession={accession} />
                  <a
                    href={externalUrls.CommunityCuratedAdd(accession)}
                    className="button tertiary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Add a publication
                  </a>
                  <ContactLink
                    to={{
                      pathname: LocationToPath[Location.ContactUpdate],
                      search: stringifyQuery({
                        entry: accession,
                        entryType:
                          transformedData?.entryType === EntryType.REVIEWED
                            ? 'Reviewed (Swiss-Prot)'
                            : 'Unreviewed (TrEMBL)',
                      }),
                    }}
                    className="button tertiary"
                  >
                    Entry feedback
                  </ContactLink>
                </div>
                <EntryMain
                  transformedData={transformedData}
                  importedVariants={importedVariants}
                  communityReferences={communityReferences}
                  isoforms={listOfIsoformNames}
                />
              </>
            )}
          </Tab>
          <Tab
            disabled={!importedVariants}
            title={
              <Link
                className={cn({
                  [helper.disabled]: !importedVariants,
                })}
                tabIndex={importedVariants ? undefined : -1}
                to={`../${
                  !importedVariants
                    ? TabLocation.Entry
                    : TabLocation.VariantViewer
                }`}
              >
                Variant viewer
                {data.sequence && !mediumScreen && importedVariants > 0 && (
                  <>
                    {' '}
                    <Chip compact>
                      <LongNumber>{importedVariants}</LongNumber>
                    </Chip>
                  </>
                )}
              </Link>
            }
            id={TabLocation.VariantViewer}
            onPointerOver={VariationViewerTab.preload}
            onFocus={VariationViewerTab.preload}
          >
            <Suspense fallback={<Loader />}>
              <ErrorBoundary>
                <HTMLHead
                  title={[
                    pageTitle,
                    'Variants viewer',
                    searchableNamespaceLabels[Namespace.uniprotkb],
                  ]}
                />
                {data.sequence && (
                  <VariationViewerTab
                    importedVariants={importedVariants}
                    primaryAccession={accession}
                    title="Variants"
                  />
                )}
              </ErrorBoundary>
            </Suspense>
          </Tab>
          <Tab
            disabled={isObsolete}
            title={
              smallScreen ? null : (
                <Link
                  className={isObsolete ? helper.disabled : undefined}
                  tabIndex={isObsolete ? -1 : undefined}
                  to={`../${TabLocation.FeatureViewer}`}
                >
                  Feature viewer
                </Link>
              )
            }
            id={TabLocation.FeatureViewer}
            onPointerOver={FeatureViewerTab.preload}
            onFocus={FeatureViewerTab.preload}
          >
            {smallScreen ? (
              <Navigate replace to={`../${TabLocation.Entry}`} />
            ) : (
              <Suspense fallback={<Loader />}>
                <ErrorBoundary>
                  <HTMLHead
                    title={[
                      pageTitle,
                      'Feature viewer',
                      searchableNamespaceLabels[Namespace.uniprotkb],
                    ]}
                  />
                  {data.sequence && (
                    <FeatureViewerTab
                      accession={accession}
                      importedVariants={importedVariants}
                      sequence={data.sequence.value}
                    />
                  )}
                </ErrorBoundary>
              </Suspense>
            )}
          </Tab>
          <Tab
            disabled={!hasGenomicCoordinates}
            title={
              <Link
                className={cn({
                  [helper.disabled]: !hasGenomicCoordinates,
                })}
                tabIndex={hasGenomicCoordinates ? undefined : -1}
                to={`../${
                  !hasGenomicCoordinates
                    ? TabLocation.Entry
                    : TabLocation.GenomicCoordinates
                }`}
              >
                Genomic coordinates
              </Link>
            }
            id={TabLocation.GenomicCoordinates}
            onPointerOver={GenomicCoordinatesTab.preload}
            onFocus={GenomicCoordinatesTab.preload}
          >
            <Suspense fallback={<Loader />}>
              <ErrorBoundary>
                <HTMLHead
                  title={[
                    pageTitle,
                    'Genomic coordinates',
                    searchableNamespaceLabels[Namespace.uniprotkb],
                  ]}
                />
                <GenomicCoordinatesTab
                  primaryAccession={accession}
                  isoforms={
                    transformedData[EntrySection.Sequence].alternativeProducts
                      ?.isoforms
                  }
                  maneSelect={
                    // Get all unique unversioned MANE-Select IDs
                    new Set(
                      transformedData[EntrySection.Sequence].xrefData
                        ?.find(
                          (xrefDatum) =>
                            xrefDatum.category === DatabaseCategory.GENOME
                        )
                        ?.databases.find(
                          (database) => database.database === 'MANE-Select'
                        )
                        ?.xrefs.map((xref) => xref.id?.split('.')[0])
                        .filter((id: string | undefined): id is string =>
                          Boolean(id)
                        )
                    )
                  }
                  title={
                    <span data-article-id="genomic-coordinates">
                      Genomic coordinates
                    </span>
                  }
                />
              </ErrorBoundary>
            </Suspense>
          </Tab>
          <Tab
            disabled={isObsolete}
            title={
              <Link
                className={isObsolete ? helper.disabled : undefined}
                tabIndex={isObsolete ? -1 : undefined}
                to={`../${TabLocation.Publications}`}
              >
                Publications
              </Link>
            }
            id={TabLocation.Publications}
            onPointerOver={PublicationsTab.preload}
            onFocus={PublicationsTab.preload}
          >
            <Suspense fallback={<Loader />}>
              <ErrorBoundary>
                <div className="button-group">
                  <CommunityAnnotationLink accession={accession} />
                  <a
                    href={externalUrls.CommunityCuratedAdd(accession)}
                    className="button tertiary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Add a publication
                  </a>
                </div>
                <HTMLHead
                  title={[
                    pageTitle,
                    'Publications',
                    searchableNamespaceLabels[Namespace.uniprotkb],
                  ]}
                />
                <PublicationsTab accession={accession} />
              </ErrorBoundary>
            </Suspense>
          </Tab>
          <Tab
            disabled={isObsolete}
            title={
              <Link
                className={isObsolete ? helper.disabled : undefined}
                tabIndex={isObsolete ? -1 : undefined}
                to={`../${TabLocation.ExternalLinks}`}
              >
                External links
              </Link>
            }
            id={TabLocation.ExternalLinks}
            onPointerOver={ExternalLinksTab.preload}
            onFocus={ExternalLinksTab.preload}
          >
            <Suspense fallback={<Loader />}>
              <ErrorBoundary>
                <HTMLHead
                  title={[
                    pageTitle,
                    'External links',
                    searchableNamespaceLabels[Namespace.uniprotkb],
                  ]}
                />
                <ExternalLinksTab transformedData={transformedData} />
              </ErrorBoundary>
            </Suspense>
          </Tab>
          <Tab
            title={<Link to={`../${TabLocation.History}`}>History</Link>}
            id={TabLocation.History}
            onPointerOver={HistoryTab.preload}
            onFocus={HistoryTab.preload}
          >
            <Suspense fallback={<Loader />}>
              <ErrorBoundary>
                <HTMLHead
                  title={[
                    isObsolete ? accession : pageTitle,
                    'History',
                    searchableNamespaceLabels[Namespace.uniprotkb],
                  ]}
                />
                <HistoryTab
                  // accession={isObsolete ? params.accession : accession}
                  accession={accession}
                  lastVersion={data.entryAudit?.entryVersion}
                  uniparc={data.extraAttributes?.uniParcId}
                  reason={data.inactiveReason}
                />
              </ErrorBoundary>
            </Suspense>
          </Tab>
        </Tabs>
      </AFDBOutOfSyncContext.Provider>
    </SidebarLayout>
  );
};

export default Entry;
