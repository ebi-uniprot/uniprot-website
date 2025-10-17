import '../../../shared/components/entry/styles/entry-page.scss';

import cn from 'classnames';
import { Button, Chip, Loader, LongNumber, Tab, Tabs } from 'franklin-sites';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { frame } from 'timing-functions';

import {
  getEntryPath,
  Location,
  LocationToPath,
} from '../../../app/config/urls';
import BasketStatus from '../../../basket/BasketStatus';
import ContactLink from '../../../contact/components/ContactLink';
import { addMessage } from '../../../messages/state/messagesActions';
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
import { EntryType } from '../../../shared/components/entry/EntryTypeIcon';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import HTMLHead from '../../../shared/components/HTMLHead';
import InPageNav from '../../../shared/components/InPageNav';
import { SidebarLayout } from '../../../shared/components/layouts/SideBarLayout';
import sidebarStyles from '../../../shared/components/layouts/styles/sidebar-layout.module.scss';
import {
  biologicallyRelevant,
  CheckMoveResponse,
  checkMoveUrl,
  getProteomes,
  RefProtMoveUniProtKBEntryMessage,
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
import { SearchResults } from '../../../shared/types/results';
import lazy from '../../../shared/utils/lazy';
import { stringifyQuery, stringifyUrl } from '../../../shared/utils/url';
import { hasContent } from '../../../shared/utils/utils';
import {
  CitationsAPIModel,
  Reference,
} from '../../../supporting-data/citations/adapters/citationsConverter';
import { extractIsoformNames } from '../../adapters/extractIsoformsConverter';
import generatePageTitle from '../../adapters/generatePageTitle';
import uniProtKbConverter, {
  UniProtkbAPIModel,
  UniProtkbUIModel,
} from '../../adapters/uniProtkbConverter';
import uniprotkbApiUrls from '../../config/apiUrls/apiUrls';
import UniProtKBEntryConfig from '../../config/UniProtEntryConfig';
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
// Currently, just a bit before 2025_03
const AFDB_CUTOFF_DATE = new Date('2025-06-01');

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
  const smallScreen = useSmallScreen();
  const mediumScreen = useMediumScreen();
  const [isLikelyHuman, setIsLikelyHuman] = useState(
    Boolean(window.botChallenge)
  );

  const { loading, data, status, error, redirectedTo, progress } =
    useDataApi<UniProtkbAPIModel>(
      isLikelyHuman
        ? apiUrls.entry.entry(match?.params.accession, Namespace.uniprotkb)
        : null
    );

  const variantsHeadPayload = useDataApi(
    isLikelyHuman && match?.params.accession
      ? apiUrls.proteinsApi.variation(match?.params.accession)
      : null,
    { method: 'HEAD' }
  );

  const coordinatesHeadPayload = useDataApi(
    isLikelyHuman && match?.params.accession
      ? apiUrls.proteinsApi.coordinates(match?.params.accession)
      : null,
    { method: 'HEAD' }
  );

  const communityCuratedPayload = useDataApi<SearchResults<CitationsAPIModel>>(
    isLikelyHuman && match?.params.accession
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

  const [upids, isBiologicallyRelevant] = useMemo(() => {
    if (!data) {
      return [];
    }
    return [getProteomes(data), biologicallyRelevant(data)];
  }, [data]);

  const refprotmoveData = useDataApi<CheckMoveResponse>(
    isLikelyHuman && upids?.length && !isBiologicallyRelevant
      ? stringifyUrl(checkMoveUrl, { upids })
      : null
  );

  const willBeKept = useMemo(() => {
    if (isBiologicallyRelevant) {
      return true;
    }
    if (!upids?.length) {
      return false;
    }
    if (!refprotmoveData.data) {
      return true;
    }
    return Boolean(refprotmoveData.data.stay?.length);
  }, [upids, isBiologicallyRelevant, refprotmoveData.data]);

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
    // eslint-disable-next-line reactHooks/exhaustive-deps
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

  // Redirect to history when obsolete and not merged into a single new one
  useEffect(() => {
    if (
      isObsolete &&
      match?.params.accession &&
      match?.params.subPage !== TabLocation.History
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
    }
    // (I hope) I know what I'm doing here, I want to stick with whatever value
    // match?.params.subPage had when the component was mounted.
    // eslint-disable-next-line reactHooks/exhaustive-deps
  }, [isObsolete]);

  const structuredData = useMemo(() => dataToSchema(data), [data]);
  useStructuredData(structuredData);

  useEffect(() => {
    if (isLikelyHuman) {
      return;
    }
    const handler = () => {
      window.botChallenge = true;
      sessionStorage.setItem('botChallenge', 'true');
      setIsLikelyHuman(true);
    };
    document.documentElement.addEventListener('mousemove', handler);
    document.documentElement.addEventListener('mouseenter', handler);
    document.documentElement.addEventListener('pointermove', handler, {
      once: true,
    });
    document.documentElement.addEventListener('pointerdown', handler, {
      once: true,
    });
    document.documentElement.addEventListener('pointerover', handler, {
      once: true,
    });
    return () => {
      document.documentElement.removeEventListener('mousemove', handler);
      document.documentElement.removeEventListener('mouseenter', handler);
      document.documentElement.removeEventListener('pointermove', handler);
      document.documentElement.removeEventListener('pointerdown', handler);
      document.documentElement.removeEventListener('pointerover', handler);
    };
  }, [isLikelyHuman]);

  if (!isLikelyHuman) {
    // bot challenge
    return (
      <>
        {/* 🍯 */}
        <Button onClick={() => {}} style={{ transform: 'translateX(-200%)' }}>
          Click me
        </Button>
        <div style={{ padding: '3em 0', width: '100%', display: 'flex' }}>
          <div style={{ marginInline: 'auto' }}>
            Please click this button to confirm that you are a real user <br />
            <Button onClick={() => setIsLikelyHuman(true)}>
              Click to load the page
            </Button>
          </div>
        </div>
      </>
    );
  }

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
          {willBeKept ? null : (
            <RefProtMoveUniProtKBEntryMessage
              accession={data.primaryAccession}
              upids={upids}
              organism={data.organism}
            />
          )}
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
        <Tabs active={match.params.subPage}>
          <Tab
            disabled={isObsolete}
            title={
              <Link
                className={isObsolete ? helper.disabled : undefined}
                tabIndex={isObsolete ? -1 : undefined}
                to={getEntryPath(
                  Namespace.uniprotkb,
                  accession,
                  TabLocation.Entry
                )}
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
            disabled={importedVariants === 'loading' || !importedVariants}
            title={
              <Link
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
                  to={getEntryPath(
                    Namespace.uniprotkb,
                    accession,
                    TabLocation.FeatureViewer
                  )}
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
              <Link
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
                to={getEntryPath(
                  Namespace.uniprotkb,
                  accession,
                  TabLocation.Publications
                )}
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
                to={getEntryPath(
                  Namespace.uniprotkb,
                  accession,
                  TabLocation.ExternalLinks
                )}
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
            title={
              match.params.subPage === TabLocation.History ? (
                'History'
              ) : (
                <Link
                  to={getEntryPath(
                    Namespace.uniprotkb,
                    accession,
                    TabLocation.History
                  )}
                >
                  History
                </Link>
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
