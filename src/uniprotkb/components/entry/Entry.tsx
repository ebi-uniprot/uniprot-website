/* eslint-disable react-hooks/exhaustive-deps */
import '../../../shared/components/entry/styles/entry-page.scss';
import './styles/protnlm.scss';

import cn from 'classnames';
import {
  AiAnnotationsIcon,
  Button,
  Chip,
  Dropdown,
  Loader,
  LongNumber,
  Tab,
  Tabs,
  ToggleSwitch,
} from 'franklin-sites';
import { Suspense, useEffect, useMemo, useState } from 'react';
import { generatePath, Link, Redirect, useHistory } from 'react-router-dom';
import { frame } from 'timing-functions';

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
import BlastButton from '../../../shared/components/action-buttons/Blast';
import MapIDButton from '../../../shared/components/action-buttons/MapID';
import ToolsDropdown from '../../../shared/components/action-buttons/ToolsDropdown';
import { Dataset } from '../../../shared/components/entry/EntryDownload';
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
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import externalUrls from '../../../shared/config/externalUrls';
import { AFDBOutOfSyncContext } from '../../../shared/contexts/AFDBOutOfSync';
import useDataApi from '../../../shared/hooks/useDataApi';
import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';
import useLocalStorage from '../../../shared/hooks/useLocalStorage';
import useMatchMedia, {
  useMediumScreen,
  useSmallScreen,
} from '../../../shared/hooks/useMatchMedia';
import useMatchWithRedirect from '../../../shared/hooks/useMatchWithRedirect';
import useMessagesDispatch from '../../../shared/hooks/useMessagesDispatch';
import useStickyHeader from '../../../shared/hooks/useStickyHeader';
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
import {
  augmentAPIDataWithProtnlmPredictions,
  augmentUIDataWithProtnlmPredictions,
} from '../../adapters/protnlmConverter';
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
import { type UniProtKBProtNLMAPIModel } from '../../types/protNLMAPIModel';
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

// Tabs that download something other than the entry data itself. The main
// download button in the tools bar uses this to download the data relevant
// to the active tab. Tabs not listed here fall back to the default entry
// download (Dataset.uniprotData).
const tabToDownloadDataset: Partial<Record<TabLocation, Dataset>> = {
  [TabLocation.VariantViewer]: Dataset.variation,
  [TabLocation.FeatureViewer]: Dataset.features,
  [TabLocation.GenomicCoordinates]: Dataset.coordinates,
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

// Below this viewport width the sticky tools bar collapses into the "Menu"
// dropdown. Tuned by inspection — a bit before the expanded buttons start
// crowding the title/AI toggle.
const toolsCollapseMediaQuery = 'only screen and (min-width: 1350px)';

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
  const [isStuck, setFullHeaderRef] = useStickyHeader();
  const smallScreen = useSmallScreen();
  const mediumScreen = useMediumScreen();
  // When wide enough, show the full tools row; below it, collapse to the Menu.
  const wideScreen = useMatchMedia(toolsCollapseMediaQuery);
  const [loadProtNLM, setLoadProtNLM] = useLocalStorage<boolean>(
    'ai-annotations',
    false
  );

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

  // Probe whether a ProtNLM payload exists for this entry. We only need
  // this when the user has the toggle off — when they have it on, the
  // GET below tells us availability for free, so a HEAD would be a
  // duplicate request.
  const protnlmHeadPayload = useDataApi<UniProtKBProtNLMAPIModel>(
    match?.params.accession &&
      data &&
      data.entryType === 'UniProtKB unreviewed (TrEMBL)' &&
      !loadProtNLM
      ? uniprotkbApiUrls.protnlm.entry(match.params.accession)
      : null,
    { method: 'HEAD' }
  );

  const protnlmPayload = useDataApi<UniProtKBProtNLMAPIModel>(
    match?.params.accession &&
      data &&
      data.entryType === 'UniProtKB unreviewed (TrEMBL)' &&
      loadProtNLM
      ? uniprotkbApiUrls.protnlm.entry(match.params.accession)
      : null
  );

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

    // Augment UniProtKB data with ProtNLM data. Some augmentations
    // happen before transformations, and some after. Transform data
    // as soon as possible, ie even if the protnlm predictions are
    // still loading.
    const transformedData = protnlmPayload.data
      ? augmentUIDataWithProtnlmPredictions(
          protnlmPayload.data,
          uniProtKbConverter(
            augmentAPIDataWithProtnlmPredictions(protnlmPayload.data, data),
            databaseInfoMaps
          )
        )
      : uniProtKbConverter(data, databaseInfoMaps);

    return [transformedData, generatePageTitle(transformedData)];
  }, [data, databaseInfoMaps, protnlmPayload.data]);

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
        let disabled: boolean;
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
    (redirectedTo && match?.params.subPage !== TabLocation.History)
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

  let hasGenomicCoordinates: boolean | 'loading';
  if (coordinatesHeadPayload.loading) {
    hasGenomicCoordinates = 'loading';
  } else {
    hasGenomicCoordinates = coordinatesHeadPayload.status === 200;
  }

  // Toggle-off: read availability from the HEAD probe.
  // Toggle-on:  the GET is what's firing — treat "still loading" as
  //             available so we don't blink the toggle out while the
  //             user is opted in; once it resolves to non-200 we hide it.
  const hasProtnlm: boolean = loadProtNLM
    ? protnlmPayload.loading || protnlmPayload.status === 200
    : !protnlmHeadPayload.loading && protnlmHeadPayload.status === 200;

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

  // Individual tool nodes, shared between the expanded button row (full header
  // + roomy compact bar) and the collapsed "Menu" dropdown (cramped compact
  // bar). Reusing the same element descriptors keeps the two layouts in sync.
  const alignNode = listOfIsoformAccessions.length > 1 && (
    <AlignButton
      selectedEntries={listOfIsoformAccessions}
      textSuffix="isoforms"
    />
  );
  const downloadButton = (
    <EntryDownloadButton handleToggle={handleToggleDownload} />
  );
  const basketButton = <AddToBasketButton selectedEntries={accession} />;
  const communityAnnotationLink = (
    <CommunityAnnotationLink accession={accession} />
  );
  const addPublicationLink = (
    <a
      href={externalUrls.CommunityCuratedAdd(accession)}
      className="button tertiary"
      target="_blank"
      rel="noopener noreferrer"
    >
      Add a publication
    </a>
  );
  const entryFeedbackLink = (
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
  );

  // Expanded tools row, lifted out of the Entry tab so it sits on every tab and
  // so the compact sticky header can render the same buttons on the right.
  const toolsRow =
    !isObsolete && data?.sequence ? (
      <div className="button-group">
        <ToolsDropdown
          selectedEntries={[accession]}
          blast
          align={alignNode}
          mapID
        />
        {downloadButton}
        {basketButton}
        {communityAnnotationLink}
        {addPublicationLink}
        {entryFeedbackLink}
      </div>
    ) : null;

  // Flattened single overflow menu for the cramped compact bar: BLAST and Map
  // ID are listed directly (not nested in the Tools sub-dropdown), then the
  // remaining actions/links.
  const toolsMenu =
    !isObsolete && data?.sequence ? (
      <Dropdown
        visibleElement={(onClick: () => unknown) => (
          <Button variant="tertiary" onClick={onClick}>
            Menu
          </Button>
        )}
      >
        {() => (
          <ul className={cn('no-bullet', stickyHeaderStyles['menu-list'])}>
            <li>
              <BlastButton selectedEntries={[accession]} />
            </li>
            {alignNode && <li>{alignNode}</li>}
            <li>
              <MapIDButton
                selectedEntries={[accession]}
                namespace={Namespace.uniprotkb}
              />
            </li>
            <li>{downloadButton}</li>
            <li>{basketButton}</li>
            <li>{communityAnnotationLink}</li>
            <li>{addPublicationLink}</li>
            <li>{entryFeedbackLink}</li>
          </ul>
        )}
      </Dropdown>
    ) : null;

  const protnlmToggle = hasProtnlm ? (
    <ToggleSwitch
      header={protnlmPayload.loading ? 'Loading...' : 'AI Annotations'}
      statusOff="Click to enable"
      statusLoading="Loading AI predictions..."
      statusOn="Showing AI predictions"
      isLoading={protnlmPayload.loading}
      icon={<AiAnnotationsIcon />}
      checked={loadProtNLM}
      onChange={setLoadProtNLM}
      className="ai-annotation-entry-title-row__toggle"
    />
  ) : null;

  return (
    <SidebarLayout
      sidebar={sidebar}
      noOverflow
      // Only when an in-page nav sidebar is actually shown (Entry/Publications
      // tabs): drop it below ~768px so the sticky bar gets the full width
      // sooner. Other tabs have no sidebar and keep the default behaviour.
      collapseSidebarEarly={Boolean(sidebar)}
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
          <div
            ref={setFullHeaderRef}
            className={stickyHeaderStyles['full-header']}
          >
            <div className="ai-annotation-entry-title-row">
              <h1>
                <EntryTitle
                  mainTitle={data.primaryAccession}
                  optionalTitle={data.uniProtkbId}
                  entryType={data.entryType}
                />
                <BasketStatus id={data.primaryAccession} className="small" />
              </h1>
              {protnlmToggle}
            </div>
            <ProteinOverview data={data} />
            {toolsRow}
          </div>
        </ErrorBoundary>
      )}
      {!isObsolete && data?.sequence && displayDownloadPanel && (
        <EntryDownloadPanel
          handleToggle={handleToggleDownload}
          isoformsAvailable={Boolean(listOfIsoformAccessions.length)}
          sequence={data.sequence.value}
          dataset={
            match.params.subPage
              ? tabToDownloadDataset[match.params.subPage]
              : undefined
          }
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
          {protnlmToggle}
          <div className={stickyHeaderStyles['compact-tools']}>
            {wideScreen ? toolsRow : toolsMenu}
          </div>
        </div>
      )}
      <AFDBOutOfSyncContext.Provider value={isAFDBOutOfSync}>
        <Tabs active={match.params.subPage}>
          <Tab
            disabled={isObsolete}
            className={loadProtNLM && hasProtnlm ? 'entry-tab--ai' : undefined}
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
                {loadProtNLM && hasProtnlm && (
                  <>
                    <AiAnnotationsIcon
                      className="ai-annotation-entry-tab-icon"
                      aria-hidden="true"
                    />
                    <span className="visually-hidden">
                      {' '}
                      (AI annotations enabled)
                    </span>
                  </>
                )}
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
