/* eslint-disable reactHooks/exhaustive-deps */
import '../../../shared/components/entry/styles/entry-page.scss';

import cn from 'classnames';
import { Chip, Loader, LongNumber, Tab, Tabs } from 'franklin-sites';
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { generatePath, Link, Redirect, useHistory } from 'react-router-dom';
import { frame } from 'timing-functions';
import joinUrl from 'url-join';

import {
  getEntryPath,
  Location,
  LocationToPath,
} from '../../../app/config/urls';
import BasketStatus from '../../../basket/BasketStatus';
import ContactLink from '../../../contact/components/ContactLink';
import {
  addMessage,
  deleteMessage,
} from '../../../messages/state/messagesActions';
import {
  MessageFormat,
  MessageLevel,
  MessageTag,
} from '../../../messages/types/messagesTypes';
import AddToBasketButton from '../../../shared/components/action-buttons/AddToBasket';
import AlignButton from '../../../shared/components/action-buttons/Align';
import ToolsDropdown from '../../../shared/components/action-buttons/ToolsDropdown';
import EntryDownloadButton from '../../../shared/components/entry/EntryDownloadButton';
import EntryDownloadPanel from '../../../shared/components/entry/EntryDownloadPanel';
import EntryTitle from '../../../shared/components/entry/EntryTitle';
import {
  EntryType,
  getEntryTypeFromString,
} from '../../../shared/components/entry/EntryTypeIcon';
import stickyHeaderStyles from '../../../shared/components/entry/styles/entry-sticky-header.module.scss';
import EntryTabLink from '../../../shared/components/EntryTabLink';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import HTMLHead from '../../../shared/components/HTMLHead';
import InPageNav from '../../../shared/components/InPageNav';
import { SidebarLayout } from '../../../shared/components/layouts/SideBarLayout';
import sidebarStyles from '../../../shared/components/layouts/styles/sidebar-layout.module.scss';
import {
  checkMoveUrl,
  getProteomes,
  RefProtMoveUniProtKBEntryMessage,
  type UniProtKBCheckMoveResponse,
} from '../../../shared/components/RefProtMoveMessages';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import externalUrls from '../../../shared/config/externalUrls';
import { AFDBOutOfSyncContext } from '../../../shared/contexts/AFDBOutOfSync';
import useDataApi from '../../../shared/hooks/useDataApi';
import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';
import {
  useMediumScreen,
  useSmallScreen,
} from '../../../shared/hooks/useMatchMedia';
import useMatchWithRedirect from '../../../shared/hooks/useMatchWithRedirect';
import useMessagesDispatch from '../../../shared/hooks/useMessagesDispatch';
import useStructuredData from '../../../shared/hooks/useStructuredData';
import helper from '../../../shared/styles/helper.module.scss';
import sticky from '../../../shared/styles/sticky.module.scss';
import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../shared/types/namespaces';
import { type SearchResults } from '../../../shared/types/results';
import lazy from '../../../shared/utils/lazy';
import { stringifyQuery } from '../../../shared/utils/url';
import { hasContent } from '../../../shared/utils/utils';
import {
  type CitationsAPIModel,
  type Reference,
} from '../../../supporting-data/citations/adapters/citationsConverter';
import { TabLocation as UniParcTabLocation } from '../../../uniparc/types/entry';
import { extractIsoformNames } from '../../adapters/extractIsoformsConverter';
import generatePageTitle from '../../adapters/generatePageTitle';
import uniProtKbConverter, {
  type UniProtkbAPIModel,
  type UniProtkbUIModel,
} from '../../adapters/uniProtkbConverter';
import uniprotkbApiUrls from '../../config/apiUrls/apiUrls';
import UniProtKBEntryConfig from '../../config/UniProtEntryConfig';
import { DatabaseCategory } from '../../types/databaseRefs';
import { TabLocation } from '../../types/entry';
import EntrySection, {
  entrySectionToCommunityAnnotationField,
} from '../../types/entrySection';
import { type UniSaveAccession } from '../../types/uniSave';
import { getListOfIsoformAccessions } from '../../utils';
import { getEntrySectionNameAndId } from '../../utils/entrySection';
import ProteinOverview from '../protein-data-views/ProteinOverviewView';
import CommunityAnnotationLink from './CommunityAnnotationLink';
import dataToSchema from './entry.structured';
import EntryMain from './EntryMain';
import EntryPublicationsFacets from './EntryPublicationsFacets';
import { subcellularLocationSectionHasContent } from './SubcellularLocationSection';

const legacyToNewSubPages = {
  protvista: TabLocation.FeatureViewer,
  'features-viewer': TabLocation.FeatureViewer,
  'variants-viewer': TabLocation.VariantViewer,
};

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
// Currently, just a bit before 2025_04 (latest AFDB release based on 2025_03)
const AFDB_CUTOFF_DATE = new Date('2025-10-01');

const hasExternalLinks = (transformedData: UniProtkbUIModel) =>
  UniProtKBEntryConfig.some(({ id }) => {
    const data = transformedData[id];
    return Boolean('xrefData' in data && data.xrefData?.length);
  });

const Entry = () => {
  const dispatch = useMessagesDispatch();
  const history = useHistory();
  const match = useMatchWithRedirect<{
    accession: string;
    subPage?: TabLocation;
  }>(
    Location.UniProtKBEntry,
    TabLocation,
    TabLocation.Entry,
    legacyToNewSubPages
  );
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);
  const [isStuck, setIsStuck] = useState(false);
  const smallScreen = useSmallScreen();
  const mediumScreen = useMediumScreen();

  // Ref callback so we observe the header the moment it attaches and stop
  // observing when it detaches. Avoids the initial-mount race where
  // useRef.current is null when the <header> is conditionally rendered
  // (obsolete-entry branch, or before data loads).
  const observerRef = useRef<IntersectionObserver | null>(null);
  const setFullHeaderRef = useCallback((node: HTMLElement | null) => {
    observerRef.current?.disconnect();
    observerRef.current = null;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setIsStuck(false);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(node);
    observerRef.current = observer;
  }, []);
  useEffect(() => () => observerRef.current?.disconnect(), []);

  const { loading, data, status, error, redirectedTo, progress } =
    useDataApi<UniProtkbAPIModel>(
      apiUrls.entry.entry(match?.params.accession, Namespace.uniprotkb)
    );

  const { data: uniSaveData } = useDataApi<UniSaveAccession>(
    match?.params.accession &&
      getEntryTypeFromString(data?.entryType) === EntryType.INACTIVE &&
      data?.inactiveReason
      ? uniprotkbApiUrls.unisave.entry(match?.params.accession)
      : null
  );

  const variantsHeadPayload = useDataApi(
    match?.params.accession
      ? apiUrls.proteinsApi.variation(match?.params.accession)
      : null,
    { method: 'HEAD' }
  );

  const coordinatesHeadPayload = useDataApi(
    match?.params.accession
      ? apiUrls.proteinsApi.coordinates(match?.params.accession)
      : null,
    { method: 'HEAD' }
  );

  const communityCuratedPayload = useDataApi<SearchResults<CitationsAPIModel>>(
    match?.params.accession
      ? uniprotkbApiUrls.publications.entryPublications({
          accession: match.params.accession,
          selectedFacets: [
            {
              name: 'types',
              value: '0',
            },
          ],
        })
      : null
  );

  const refprotmoveData = useDataApi<UniProtKBCheckMoveResponse>(
    match?.params.accession
      ? joinUrl(checkMoveUrl, 'uniprotkb', match?.params.accession)
      : null
  );
  const upids = useMemo(() => data && getProteomes(data), [data]);

  const willBeRemoved = refprotmoveData.data?.status === 'remove';

  const communityReferences: Reference[] = useMemo(() => {
    const filteredReferences = communityCuratedPayload.data?.results?.flatMap(
      ({ references }) =>
        references?.filter((reference) => reference.source?.name === 'ORCID')
    );
    return filteredReferences?.filter((r): r is Reference => Boolean(r)) || [];
  }, [communityCuratedPayload.data]);

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
          case EntrySection.Homologs:
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

  const hasPhylogenomicXrefs = Boolean(
    // Don't count AGR which has ORG category
    transformedData?.[EntrySection.Homologs]?.xrefs?.filter(
      (xref) => xref.category !== 'ORG'
    ).length
  );

  // Redirect to new entry when obsolete and merged into one
  useEffect(() => {
    if (
      redirectedTo &&
      match?.params.accession &&
      match?.params.subPage !== TabLocation.History
    ) {
      const split = new URL(redirectedTo).pathname.split('/');
      const newEntry = split[split.length - 1];
      // If the redirection is because of ID or version in which case, the following message doesn't make sense
      if (
        !match?.params.accession.includes('_') &&
        !match?.params.accession.includes('.')
      ) {
        // Note: Delete Message is called in unmount logic of component it is redirected to.
        // 'Strict' mode calls unmount twice and hence you won't see the message in dev mode.
        dispatch(
          addMessage({
            id: 'accession-merge',
            content: (
              <>
                {match.params.accession} has been merged into {newEntry}. You
                have automatically been redirected. To see{' '}
                {match.params.accession}
                &apos;s history,{' '}
                <Link
                  to={getEntryPath(
                    Namespace.uniprotkb,
                    match.params.accession,
                    TabLocation.History
                  )}
                >
                  click here
                </Link>
                .
              </>
            ),
            format: MessageFormat.IN_PAGE,
            level: MessageLevel.SUCCESS,
            tag: MessageTag.REDIRECT,
          })
        );
      }
      frame().then(() => {
        // If accession contains version, it should be redirected to History tab
        const activeTab = match?.params.accession.includes('.')
          ? TabLocation.History
          : TabLocation.Entry;
        history.replace(getEntryPath(Namespace.uniprotkb, newEntry, activeTab));
      });
    }
    // (I hope) I know what I'm doing here, I want to stick with whatever value
    // match?.params.subPage had when the component was mounted.
  }, [dispatch, redirectedTo]);

  useEffect(() => {
    if (match?.params.accession.includes('-')) {
      const [accession] = match.params.accession.split('-');
      history.replace({
        pathname: getEntryPath(
          Namespace.uniprotkb,
          accession,
          TabLocation.Entry
        ),
        hash: match.params.accession,
      });
    }
  }, [history, match?.params.accession]);

  let isObsolete = Boolean(
    transformedData?.entryType === EntryType.INACTIVE &&
    transformedData.inactiveReason
  );

  // Redirect to history when demerged and to UniParc when deleted
  useEffect(() => {
    if (
      isObsolete &&
      !redirectedTo &&
      match?.params.accession &&
      match?.params.subPage !== TabLocation.History &&
      uniSaveData?.results?.length
    ) {
      if (
        transformedData?.inactiveReason?.inactiveReasonType === 'DEMERGED' ||
        (transformedData?.inactiveReason?.inactiveReasonType === 'DELETED' &&
          // Sometimes there is no reason provided for Swiss-Prot deletions probably old ones
          ((uniSaveData?.results?.[0]?.database &&
            getEntryTypeFromString(uniSaveData.results[0].database) ===
              EntryType.REVIEWED) ||
            transformedData?.inactiveReason?.deletedReason ===
              'Deleted from Swiss-Prot'))
      ) {
        frame().then(() => {
          history.replace(
            getEntryPath(
              Namespace.uniprotkb,
              match?.params.accession,
              TabLocation.History
            )
          );
        });
      } else {
        // Note: Delete Message is called in unmount logic of component it is redirected to.
        // 'Strict' mode calls unmount twice and hence you won't see the message in dev mode.
        dispatch(
          addMessage({
            id: 'deleted-entry',
            content: (
              <>
                You’ve been redirected to UniParc because{' '}
                {match?.params.accession} is no longer available in UniProtKB.
              </>
            ),
            format: MessageFormat.IN_PAGE,
            level: MessageLevel.INFO,
            tag: MessageTag.REDIRECT,
          })
        );

        const uniparcId = transformedData?.extraAttributes?.uniParcId;
        if (uniparcId) {
          frame().then(() => {
            history.replace({
              pathname: generatePath(LocationToPath[Location.UniParcSubEntry], {
                accession: uniparcId,
                subPage: UniParcTabLocation.Entry,
                xrefId: match?.params.accession,
              }),
            });
          });
        } else {
          frame().then(() => {
            history.replace({
              pathname: generatePath(LocationToPath[Location.UniParcResults]),
              search: stringifyQuery({
                query: `dbid:${match?.params.accession}`,
              }),
            });
          });
        }
      }
    }
    // (I hope) I know what I'm doing here, I want to stick with whatever value
    // match?.params.subPage had when the component was mounted.
  }, [uniSaveData]);

  useEffect(() => {
    return () => dispatch(deleteMessage('accession-merge'));
  }, []);

  const structuredData = useMemo(() => dataToSchema(data), [data]);
  useStructuredData(structuredData);

  if (
    loading ||
    !data ||
    // if we're gonna redirect, show loading in the meantime
    (redirectedTo && match?.params.subPage !== TabLocation.History) ||
    refprotmoveData.loading
  ) {
    if (error) {
      return <ErrorHandler status={status} error={error} fullPage />;
    }
    return <Loader progress={progress} />;
  }

  // If there is redirection in place (might be an obsolete entry or an ID link), use the primary accession instead of match params
  const accession = redirectedTo
    ? data.primaryAccession
    : match?.params.accession || '';

  let importedVariants: number | 'loading' = 0;
  if (variantsHeadPayload.loading) {
    importedVariants = 'loading';
  } else {
    const count = +(variantsHeadPayload.headers?.['x-feature-records'] ?? 0);
    if (variantsHeadPayload.status === 200 && !Number.isNaN(count)) {
      importedVariants = count;
    }
  }

  let hasGenomicCoordinates: boolean | 'loading' = false;
  if (coordinatesHeadPayload.loading) {
    hasGenomicCoordinates = 'loading';
  } else {
    hasGenomicCoordinates = coordinatesHeadPayload.status === 200;
  }

  const isAFDBOutOfSync =
    new Date(
      transformedData?.sequences.entryAudit?.lastSequenceUpdateDate ||
        '2000-01-01'
    ) > AFDB_CUTOFF_DATE;

  if (error || !match?.params.accession || !transformedData) {
    return <ErrorHandler status={status} error={error} fullPage />;
  }

  const entrySidebar = (
    <InPageNav sections={sections} rootElement={`.${sidebarStyles.content}`} />
  );

  const publicationsSideBar = <EntryPublicationsFacets accession={accession} />;

  // If there is redirection and the accession in the path do not match the data's primary accession (it happens when the user chooses to see a
  // merged entry's history), the user is viewing content of an obsolete entry
  isObsolete =
    (redirectedTo && accession !== match.params.accession) || isObsolete;

  let sidebar = null;
  if (!isObsolete) {
    if (match.params.subPage === TabLocation.Publications) {
      sidebar = publicationsSideBar;
    } else if (match.params.subPage === TabLocation.Entry) {
      sidebar = entrySidebar;
    }
  }

  const handleToggleDownload = () =>
    setDisplayDownloadPanel(!displayDownloadPanel);

  // Tools row, lifted out of the Entry tab so it sits on every tab and so the
  // compact sticky header can render the same buttons on the right.
  const toolsRow =
    !isObsolete && data?.sequence ? (
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
    ) : null;

  return (
    <SidebarLayout
      sidebar={sidebar}
      noOverflow
      className={cn(
        'entry-page',
        sticky['sticky-tabs-container'],
        stickyHeaderStyles.container,
        {
          [stickyHeaderStyles.stuck]: isStuck,
          [stickyHeaderStyles['no-sidebar']]: !sidebar,
        }
      )}
    >
      <HTMLHead>
        {typeof window !== 'undefined' && (
          <link rel="canonical" href={window.location.href} />
        )}
      </HTMLHead>
      {isObsolete ? (
        <h1>{match.params.accession}</h1>
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
          {willBeRemoved ? (
            <RefProtMoveUniProtKBEntryMessage
              accession={data.primaryAccession}
              upids={upids}
              organism={data.organism}
            />
          ) : null}
          <div
            ref={setFullHeaderRef}
            className={stickyHeaderStyles['full-header']}
          >
            <div className={stickyHeaderStyles['title-row']}>
              <h1>
                <EntryTitle
                  mainTitle={data.primaryAccession}
                  optionalTitle={data.uniProtkbId}
                  entryType={data.entryType}
                />
                <BasketStatus id={data.primaryAccession} className="small" />
              </h1>
              {toolsRow}
            </div>
            <ProteinOverview data={data} />
          </div>
        </ErrorBoundary>
      )}
      {!isObsolete && data?.sequence && displayDownloadPanel && (
        <EntryDownloadPanel
          handleToggle={handleToggleDownload}
          isoformsAvailable={Boolean(listOfIsoformAccessions.length)}
          sequence={data.sequence.value}
        />
      )}
      {isStuck && !isObsolete && data && (
        <div className={stickyHeaderStyles['compact-bar']}>
          <span className={stickyHeaderStyles['compact-title']}>
            <EntryTitle
              mainTitle={data.primaryAccession}
              optionalTitle={data.uniProtkbId}
              entryType={data.entryType}
            />
          </span>
          <div className={stickyHeaderStyles['compact-tools']}>{toolsRow}</div>
        </div>
      )}
      <AFDBOutOfSyncContext.Provider value={isAFDBOutOfSync}>
        <Tabs active={match.params.subPage}>
          <Tab
            disabled={isObsolete}
            title={
              <EntryTabLink
                className={isObsolete ? helper.disabled : undefined}
                tabIndex={isObsolete ? -1 : undefined}
                to={getEntryPath(
                  Namespace.uniprotkb,
                  accession,
                  TabLocation.Entry
                )}
              >
                Entry
              </EntryTabLink>
            }
            id={TabLocation.Entry}
          >
            {!isObsolete && data.sequence && (
              <EntryMain
                transformedData={transformedData}
                importedVariants={importedVariants}
                communityReferences={communityReferences}
                isoforms={listOfIsoformNames}
                hasPhylogenomicXrefs={hasPhylogenomicXrefs}
              />
            )}
          </Tab>
          <Tab
            disabled={importedVariants === 'loading' || !importedVariants}
            title={
              <EntryTabLink
                className={cn({
                  [helper.disabled]:
                    importedVariants === 'loading' || !importedVariants,
                  loading: importedVariants === 'loading',
                })}
                tabIndex={
                  importedVariants !== 'loading' && importedVariants
                    ? undefined
                    : -1
                }
                to={getEntryPath(
                  Namespace.uniprotkb,
                  accession,
                  importedVariants === 'loading' || !importedVariants
                    ? TabLocation.Entry
                    : TabLocation.VariantViewer
                )}
              >
                Variant viewer
                {data.sequence &&
                  !mediumScreen &&
                  importedVariants !== 'loading' &&
                  importedVariants > 0 && (
                    <>
                      {' '}
                      <Chip compact>
                        <LongNumber>{importedVariants}</LongNumber>
                      </Chip>
                    </>
                  )}
              </EntryTabLink>
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
                <EntryTabLink
                  className={isObsolete ? helper.disabled : undefined}
                  tabIndex={isObsolete ? -1 : undefined}
                  to={getEntryPath(
                    Namespace.uniprotkb,
                    accession,
                    TabLocation.FeatureViewer
                  )}
                >
                  Feature viewer
                </EntryTabLink>
              )
            }
            id={TabLocation.FeatureViewer}
            onPointerOver={FeatureViewerTab.preload}
            onFocus={FeatureViewerTab.preload}
          >
            {smallScreen ? (
              <Redirect
                to={getEntryPath(
                  Namespace.uniprotkb,
                  accession,
                  TabLocation.Entry
                )}
              />
            ) : (
              <Suspense fallback={<Loader />}>
                <ErrorBoundary>
                  <HTMLHead
                    title={[
                      pageTitle,
                      'Feature viewer',
                      searchableNamespaceLabels[Namespace.uniprotkb],
                    ]}
                  >
                    <meta name="robots" content="noindex" />
                  </HTMLHead>
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
            disabled={
              hasGenomicCoordinates === 'loading' || !hasGenomicCoordinates
            }
            title={
              <EntryTabLink
                className={cn({
                  [helper.disabled]:
                    hasGenomicCoordinates === 'loading' ||
                    !hasGenomicCoordinates,
                  loading: hasGenomicCoordinates === 'loading',
                })}
                tabIndex={
                  hasGenomicCoordinates !== 'loading' && hasGenomicCoordinates
                    ? undefined
                    : -1
                }
                to={getEntryPath(
                  Namespace.uniprotkb,
                  accession,
                  hasGenomicCoordinates === 'loading' || !hasGenomicCoordinates
                    ? TabLocation.Entry
                    : TabLocation.GenomicCoordinates
                )}
              >
                Genomic coordinates
              </EntryTabLink>
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
              <EntryTabLink
                className={isObsolete ? helper.disabled : undefined}
                tabIndex={isObsolete ? -1 : undefined}
                to={getEntryPath(
                  Namespace.uniprotkb,
                  accession,
                  TabLocation.Publications
                )}
              >
                Publications
              </EntryTabLink>
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
              <EntryTabLink
                className={isObsolete ? helper.disabled : undefined}
                tabIndex={isObsolete ? -1 : undefined}
                to={getEntryPath(
                  Namespace.uniprotkb,
                  accession,
                  TabLocation.ExternalLinks
                )}
              >
                External links
              </EntryTabLink>
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
            title={
              match.params.subPage === TabLocation.History ? (
                'History'
              ) : (
                <EntryTabLink
                  to={getEntryPath(
                    Namespace.uniprotkb,
                    accession,
                    TabLocation.History
                  )}
                >
                  History
                </EntryTabLink>
              )
            }
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
                  accession={isObsolete ? match.params.accession : accession}
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
