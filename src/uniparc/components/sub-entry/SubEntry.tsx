import '../../../shared/components/entry/styles/entry-page.scss';

import cn from 'classnames';
import {
  Button,
  Dropdown,
  ExternalLink,
  Loader,
  Message,
  Tab,
  Tabs,
} from 'franklin-sites';
import { use, useEffect, useMemo, useState } from 'react';
import { Link, Redirect, useRouteMatch } from 'react-router-dom';

import {
  getEntryPath,
  Location,
  LocationToPath,
} from '../../../app/config/urls';
import ContactLink from '../../../contact/components/ContactLink';
import { type SelectedTaxon } from '../../../jobs/types/jobsFormData';
import { deleteMessage } from '../../../messages/state/messagesActions';
import {
  type ProteomesAPIModel,
  type RelatedProteome,
} from '../../../proteomes/adapters/proteomesConverter';
import AddToBasketButton from '../../../shared/components/action-buttons/AddToBasket';
import BlastButton from '../../../shared/components/action-buttons/Blast';
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
import { BotDetectionContext } from '../../../shared/contexts/BotDetection';
import useDataApi, {
  type UseDataAPIState,
} from '../../../shared/hooks/useDataApi';
import useDatabaseInfoMaps from '../../../shared/hooks/useDatabaseInfoMaps';
import { useSmallScreen } from '../../../shared/hooks/useMatchMedia';
import useMessagesDispatch from '../../../shared/hooks/useMessagesDispatch';
import useStickyHeader from '../../../shared/hooks/useStickyHeader';
import sticky from '../../../shared/styles/sticky.module.scss';
import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../shared/types/namespaces';
import { type SearchResults } from '../../../shared/types/results';
import { pluralise } from '../../../shared/utils/utils';
import { type TaxonomyAPIModel } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { type UIModel } from '../../../uniprotkb/adapters/sectionConverter';
import {
  type UniProtkbAPIModel,
  type UniProtkbUIModel,
} from '../../../uniprotkb/adapters/uniProtkbConverter';
import { subcellularLocationSectionHasContent } from '../../../uniprotkb/components/entry/SubcellularLocationSection';
import uniprotkbUrls from '../../../uniprotkb/config/apiUrls/apiUrls';
import { UniProtKBColumn } from '../../../uniprotkb/types/columnTypes';
import UniProtKBEntrySection from '../../../uniprotkb/types/entrySection';
import { type UniSaveStatus } from '../../../uniprotkb/types/uniSave';
import { reUniProtKBAccession } from '../../../uniprotkb/utils/regexes';
import buildSubEntryAnnotations, {
  buildSubEntryAnnotationDownload,
  shouldRequestUniFire,
  type SubEntryAnnotationDownload,
} from '../../adapters/subEntryAnnotations';
import {
  type UniParcLiteAPIModel,
  type UniParcXRef,
} from '../../adapters/uniParcConverter';
import uniParcSubEntryConverter, {
  type UniFireModel,
} from '../../adapters/uniParcSubEntryConverter';
import uniparcApiUrls from '../../config/apiUrls';
import uniParcSubEntryConfig from '../../config/UniParcSubEntryConfig';
import { TabLocation } from '../../types/entry';
import { type UniParcPrecomputedModel } from '../../types/precomputed';
import SubEntrySection from '../../types/subEntrySection';
import {
  getSubEntryPath,
  getSubEntryProteomes,
  hasAnnotationContent,
} from '../../utils/subEntry';
import { getXrefId } from '../../utils/uniparcXref';
import UniParcFeaturesView from '../entry/UniParcFeaturesView';
import { type DataDBModel } from '../entry/XRefsSection';
import SubEntryContext from './SubEntryContext';
import { keywordsAndGOSectionHasContent } from './SubEntryKeywordsSection';
import SubEntryMain from './SubEntryMain';
import { namesAndTaxonomySectionHasContent } from './SubEntryNamesAndTaxonomySection';
import SubEntryOverview from './SubEntryOverview';
import { hasStructure } from './SubEntryStructureSection';

const getErrorStatus = (
  uniparcData: UseDataAPIState<UniParcLiteAPIModel>,
  subEntryData: UseDataAPIState<SearchResults<UniParcXRef>>,
  unisaveData: UseDataAPIState<UniSaveStatus>
) => {
  if (uniparcData.error) {
    return uniparcData.status;
  } else if (subEntryData.error) {
    return subEntryData.status;
  } else if (unisaveData.error) {
    return unisaveData.status;
  }
  return undefined;
};

const reUniProtKBAccessionWithBounds = new RegExp(
  `(?<!\\w)(?:${reUniProtKBAccession.source})(?!\\w)`,
  'i'
);

// Taxonomy roots for non-biological sequences. Any organism whose lineage
// passes through one of these (synthetic constructs, cloning vectors,
// unidentified/unclassified, …) shouldn't offer an organism-restricted BLAST.
const NON_BIOLOGICAL_TAXON_IDS = new Set([
  2787854, // other entries
  28384, // other sequences
  81077, // artificial sequences
  2787823, // unclassified entries
  12908, // unclassified sequences
]);

type ExternalXrefLinkProps = { xref: UniParcXRef; dataDB: DataDBModel };

const ExternalXrefLink = ({ xref, dataDB }: ExternalXrefLinkProps) => {
  let { id } = xref;
  if (!id || !xref.database) {
    return null;
  }
  const template = dataDB.find(
    ({ displayName }) => displayName === xref.database
  )?.uriLink;
  if (!template) {
    return null;
  }
  id = getXrefId(id, xref.database);
  return (
    <ExternalLink url={template.replace('%id', id)}>
      {`${xref.database}:${xref.id}`}
      {xref.chain && ` (chain ${xref.chain})`}
    </ExternalLink>
  );
};

const SubEntry = () => {
  const smallScreen = useSmallScreen();
  const dispatch = useMessagesDispatch();
  const match = useRouteMatch<{
    accession: string;
    subPage: string;
    xrefId: string;
  }>(LocationToPath[Location.UniParcSubEntry]);
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);
  const [isStuck, setFullHeaderRef] = useStickyHeader();

  const { accession, xrefId, subPage } = match?.params || {};
  let subEntryId = xrefId;

  let sourceDatabase: string | undefined;
  if (xrefId?.includes(':')) {
    const colonIndex = xrefId.indexOf(':');
    sourceDatabase = xrefId.slice(0, colonIndex);
    subEntryId = xrefId.slice(colonIndex + 1);
  }
  const isUniProtKB = reUniProtKBAccessionWithBounds.test(subEntryId || '');

  const baseURL = `${apiUrls.entry.entry(
    subEntryId && accession,
    Namespace.uniparc
  )}/light`;
  const xrefIdURL = accession
    ? uniparcApiUrls.databases(accession, subEntryId, true)
    : '';

  const uniparcData = useDataApi<UniParcLiteAPIModel>(baseURL);
  const subEntryData = useDataApi<SearchResults<UniParcXRef>>(xrefIdURL);
  const unisaveData = useDataApi<UniSaveStatus>(
    isUniProtKB ? uniprotkbUrls.unisave.status(subEntryId as string) : undefined
  );
  // The authoritative active/inactive signal for a UniProtKB xref: its
  // `entryType`. The UniParc xref `active` flag and the unisave status events
  // can't reliably tell a deleted entry from an active one, so we ask UniProtKB
  // directly (minimal fields) before deciding whether to redirect there.
  const uniProtKBEntryData = useDataApi<
    Pick<UniProtkbAPIModel, 'entryType' | 'inactiveReason'>
  >(
    isUniProtKB && subEntryId && accession
      ? apiUrls.entry.entry(subEntryId, Namespace.uniprotkb, [
          UniProtKBColumn.accession,
        ])
      : undefined
  );
  const dbData = useDataApi<DataDBModel>(
    !isUniProtKB ? apiUrls.configure.allDatabases(Namespace.uniparc) : undefined
  );

  const subEntryDataPerDatabase =
    // If it is a UniProtKB entry, we want to get the xref data from the first database
    // e.g. in case of TrEMBL that are merged into SP, there will be two entries (SP and TrEMBL), and we want to redirect to the active SP page
    (subEntryData?.data?.results.length &&
      isUniProtKB &&
      subEntryData.data.results[0]) ||
    (sourceDatabase &&
      subEntryData.data?.results?.find(
        (xref) => xref.database === sourceDatabase
      )) ||
    undefined;

  const subEntryTaxId = subEntryDataPerDatabase?.organism?.taxonId;
  const canLoadAnnotations =
    subEntryTaxId && accession && subEntryDataPerDatabase;
  // UniFire *runs* the annotation pipeline, so we only let likely-human
  // visitors trigger it. Precompute is a cheap lookup — bots can hit it freely.
  const isHuman = use(BotDetectionContext) === 'human';

  // Precomputed annotations are preferred — they already exist, so this is a
  // cheap fetch. UniFire (which *runs* the annotation pipeline) is the fallback,
  // used only when there is no precomputed data for this entry (HTTP 404).
  const precomputedData = useDataApi<UniParcPrecomputedModel>(
    canLoadAnnotations
      ? uniparcApiUrls.precomputedAnnotation(accession, `${subEntryTaxId}`)
      : null
  );

  const proteomeComponentObject = useMemo<Record<string, string>>(
    () => ({
      ...getSubEntryProteomes(subEntryDataPerDatabase?.properties),
      ...Object.fromEntries(
        subEntryDataPerDatabase?.proteomes?.map(({ id, component }) => [
          id,
          component,
        ]) ?? []
      ),
    }),
    [subEntryDataPerDatabase?.properties, subEntryDataPerDatabase?.proteomes]
  );

  const proteomeIds = useMemo(
    () => Object.keys(proteomeComponentObject),
    [proteomeComponentObject]
  );

  const lineageData = useDataApi<TaxonomyAPIModel>(
    subEntryDataPerDatabase?.organism
      ? apiUrls.entry.entry(`${subEntryTaxId}`, Namespace.taxonomy)
      : null
  );

  const proteomesSearchData = useDataApi<SearchResults<ProteomesAPIModel>>(
    proteomeIds.length
      ? apiUrls.search.search({
          namespace: Namespace.proteomes,
          query: proteomeIds
            .map((proteomeId) => `upid:${proteomeId}`)
            .join(' OR '),
          size: proteomeIds.length,
          facets: null,
        })
      : null
  );

  /*
  Restrict the "find similar proteins" BLAST to the organism's species (e.g. a
  subspecies/strain like Canis lupus familiaris restricts to Canis lupus). When
  there is no species in the lineage, fall back to the entry's own organism (the
  one shown in the page header) — e.g. an organism only resolved to genus.
  Non-biological organisms (synthetic constructs, unidentified, cloning vectors,
  …) sit under "other sequences" or "unclassified sequences" in the taxonomy —
  restricting a BLAST to those isn't meaningful, so we skip the option for them.
  */
  const organismTaxon = useMemo<SelectedTaxon | undefined>(() => {
    const organism = subEntryDataPerDatabase?.organism;
    if (!organism?.taxonId) {
      return undefined;
    }
    const taxonIds = [
      organism.taxonId,
      ...(lineageData.data?.lineage?.map((item) => item.taxonId) ?? []),
    ];
    if (taxonIds.some((taxonId) => NON_BIOLOGICAL_TAXON_IDS.has(taxonId))) {
      return undefined;
    }
    const speciesTaxon =
      lineageData.data?.rank === 'species'
        ? lineageData.data
        : [...(lineageData.data?.lineage ?? [])]
            .reverse()
            .find((item) => item.rank === 'species');
    const target = speciesTaxon ?? organism;
    return {
      id: String(target.taxonId),
      label: target.scientificName ?? String(target.taxonId),
    };
  }, [subEntryDataPerDatabase?.organism, lineageData.data]);

  const relatedProteomeTaxons = useMemo<SelectedTaxon[] | undefined>(() => {
    const allRelated =
      proteomesSearchData.data?.results?.flatMap(
        (proteome) => proteome.relatedProteomes ?? []
      ) ?? [];
    const uniqueTaxonIds = [
      ...new Set(allRelated.map((r: RelatedProteome) => r.taxonomy.taxonId)),
    ];
    if (!uniqueTaxonIds.length) {
      return undefined;
    }
    return uniqueTaxonIds.map((taxonId) => ({
      id: String(taxonId),
      label: String(taxonId),
    }));
  }, [proteomesSearchData.data]);

  const hasPrecomputed =
    precomputedData.status === 200 && Boolean(precomputedData.data);
  // "Settled" means the request has completed (or never fired because
  // `canLoadAnnotations` was falsy — useDataApi resolves null URLs immediately
  // with loading:false). In both cases UniFire may proceed once this is true.
  const precomputedResolved = !precomputedData.loading;

  const uniFireData = useDataApi<UniFireModel>(
    canLoadAnnotations &&
      isHuman &&
      shouldRequestUniFire({ precomputedResolved, hasPrecomputed })
      ? uniparcApiUrls.unifire(accession, `${subEntryTaxId}`)
      : null
  );

  const databaseInfoMaps = useDatabaseInfoMaps();
  // Build the annotations UIModel the sub-entry sections render. Precomputed is
  // preferred; UniFire is the fallback — see `buildSubEntryAnnotations`.
  const annotations: UniProtkbUIModel | undefined = useMemo(
    () =>
      buildSubEntryAnnotations({
        databaseInfoMaps,
        precomputed: hasPrecomputed ? precomputedData.data : undefined,
        uniFire: uniFireData.data || undefined,
        // The xref organism carries only taxonId + name; splice in the full
        // taxonomic lineage (fetched separately) so the Subcellular Location
        // viz can classify the organism and pick a body diagram.
        xrefOrganism: subEntryDataPerDatabase?.organism
          ? {
              ...subEntryDataPerDatabase.organism,
              lineage: lineageData.data?.lineage,
            }
          : undefined,
        accession,
      }),
    [
      accession,
      databaseInfoMaps,
      subEntryDataPerDatabase?.organism,
      lineageData.data?.lineage,
      hasPrecomputed,
      precomputedData.data,
      uniFireData.data,
    ]
  );

  // The sub-entry's annotations, offered as a JSON download in the Download
  // panel — see `buildSubEntryAnnotationDownload`.
  const subEntryAnnotationDownload: SubEntryAnnotationDownload | undefined =
    useMemo(
      () =>
        buildSubEntryAnnotationDownload({
          hasPrecomputed,
          uniFire: uniFireData.data || undefined,
          accession,
          taxId: subEntryTaxId,
        }),
      [hasPrecomputed, uniFireData.data, accession, subEntryTaxId]
    );

  // A migrated annotation section's in-page-nav item is enabled when the
  // resolved `annotations` (precomputed or UniFire, whichever populated the
  // page) has content for it — mirrors how Entry.tsx drives its nav.
  const annotationSectionHasContent = (
    section: UniProtKBEntrySection
  ): boolean => {
    if (!annotations) {
      return false;
    }
    if (section === UniProtKBEntrySection.SubCellularLocation) {
      return subcellularLocationSectionHasContent(annotations[section]);
    }
    return hasAnnotationContent(annotations[section] as Partial<UIModel>);
  };

  useEffect(() => {
    // Delete the message when user navigates away from the sub-entry page
    return () => dispatch(deleteMessage('deleted-entry'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (
    dbData.loading ||
    uniparcData.loading ||
    subEntryData.loading ||
    unisaveData.loading ||
    uniProtKBEntryData.loading
  ) {
    return (
      <Loader
        progress={
          uniparcData.loading ? uniparcData.progress : subEntryData.progress
        }
      />
    );
  }

  if (
    uniparcData.error ||
    !uniparcData.data ||
    subEntryData.error ||
    !subEntryData.data ||
    unisaveData.error ||
    !match ||
    !accession ||
    !subEntryId
  ) {
    return (
      <ErrorHandler
        status={getErrorStatus(uniparcData, subEntryData, unisaveData)}
        error={uniparcData.error || subEntryData.error || unisaveData.error}
        fullPage
      />
    );
  }

  const transformedData = uniParcSubEntryConverter(
    uniparcData.data,
    subEntryDataPerDatabase as UniParcXRef,
    unisaveData.data,
    // `uniParcSubEntryConverter` is pure, so the raw UniFire object can be
    // passed straight through. `|| undefined` because `uniFireData.data` is ''
    // when there is no UniFire response.
    uniFireData.data || undefined
  );

  if (!transformedData) {
    return (
      <Redirect
        to={{
          pathname: LocationToPath[Location.UniParcResults],
          search: `query=(dbid:${subEntryId})`,
        }}
      />
    );
  }

  // Merged/demerged is detected from the unisave `merged` events, NOT from the
  // entry's `inactiveReason`: fetching the entry follows a 303 to the merged-into
  // accession, so the merge information is lost from `uniProtKBEntryData`.
  const isUniProtKBMergedOrDemerged = Boolean(
    isUniProtKB &&
    unisaveData.data?.events?.some((event) => event.eventType === 'merged')
  );

  const uniProtKBEntryType = getEntryTypeFromString(
    uniProtKBEntryData.data?.entryType
  );
  // Only treat the xref as an active UniProtKB entry once we've confirmed a
  // non-inactive `entryType` (and it isn't a merged/demerged accession, whose
  // entry lookup resolves to the active merged-into entry). If the lookup errored
  // or returned nothing, we stay on the sub-entry page rather than redirecting
  // into a possible loop.
  const isUniProtKBActive =
    isUniProtKB &&
    !isUniProtKBMergedOrDemerged &&
    uniProtKBEntryType !== undefined &&
    uniProtKBEntryType !== EntryType.INACTIVE;

  const handleToggleDownload = () =>
    setDisplayDownloadPanel(!displayDownloadPanel);

  // Nav `disabled` for the two hybrid sections must mirror their components'
  // render conditions — entry-intrinsic data OR annotation content.
  const familyAndDomainsHasContent =
    Boolean(
      transformedData.entry.sequenceFeatures?.length &&
      transformedData.entry.sequence?.value
    ) || annotationSectionHasContent(UniProtKBEntrySection.FamilyAndDomains);
  const namesAndTaxonomyHasContent = namesAndTaxonomySectionHasContent(
    transformedData,
    annotations
  );

  const sidebar = subPage === TabLocation.Entry && (
    <InPageNav
      sections={Object.values(uniParcSubEntryConfig).map((section) => ({
        ...section,
        disabled:
          (section.id === SubEntrySection.Structure &&
            !hasStructure(transformedData)) ||
          (section.id === SubEntrySection.NamesAndTaxonomy &&
            !namesAndTaxonomyHasContent) ||
          // Annotation sections — enabled when the resolved `annotations`
          // (precomputed or UniFire) has content for that section.
          (section.id === SubEntrySection.Function &&
            !annotationSectionHasContent(UniProtKBEntrySection.Function)) ||
          (section.id === SubEntrySection.SubcellularLocation &&
            !annotationSectionHasContent(
              UniProtKBEntrySection.SubCellularLocation
            )) ||
          (section.id === SubEntrySection.Expression &&
            !annotationSectionHasContent(UniProtKBEntrySection.Expression)) ||
          (section.id === SubEntrySection.ProteinProcessing &&
            !annotationSectionHasContent(
              UniProtKBEntrySection.ProteinProcessing
            )) ||
          (section.id === SubEntrySection.Interaction &&
            !annotationSectionHasContent(UniProtKBEntrySection.Interaction)) ||
          (section.id === SubEntrySection.FamilyAndDomains &&
            !familyAndDomainsHasContent) ||
          (section.id === SubEntrySection.KeywordsAndGO &&
            !keywordsAndGOSectionHasContent(
              transformedData.unifire,
              annotations
            )),
      }))}
      rootElement={`.${sidebarStyles.content}`}
    />
  );

  const entryTitle = (
    <EntryTitle
      mainTitle="UniParc"
      optionalTitle={
        <>
          <Link
            to={getEntryPath(Namespace.uniparc, accession, TabLocation.Entry)}
          >
            {accession}
          </Link>
          {`  · `}
          {!isUniProtKB && dbData.data ? (
            <ExternalXrefLink
              xref={transformedData.subEntry}
              dataDB={dbData.data}
            />
          ) : (
            subEntryId
          )}
        </>
      }
    />
  );

  // Tools row, lifted out of the Entry tab so it sits on every tab and so the
  // compact sticky header can render the same buttons on the right.
  const toolsRow = (
    <div className="button-group">
      <Dropdown
        visibleElement={(onClick: () => unknown) => (
          <Button variant="tertiary" onClick={onClick}>
            BLAST
          </Button>
        )}
      >
        <ul className="no-bullet">
          <li>
            <BlastButton
              selectedEntries={[accession]}
              label="Find similar proteins in UniProtKB"
            />
          </li>
          {organismTaxon && (
            <li>
              <BlastButton
                selectedEntries={[accession]}
                label={
                  <>
                    Find similar proteins in UniProtKB restricted by{' '}
                    <em>{organismTaxon.label}</em>
                  </>
                }
                taxons={[organismTaxon]}
              />
            </li>
          )}
          {relatedProteomeTaxons && (
            <li>
              <BlastButton
                selectedEntries={[accession]}
                label={`Find similar proteins in UniProtKB restricted by related proteome ${pluralise(
                  'taxonomy',
                  relatedProteomeTaxons.length,
                  'taxonomies'
                )} (${relatedProteomeTaxons.length})`}
                taxons={relatedProteomeTaxons}
              />
            </li>
          )}
        </ul>
      </Dropdown>
      <EntryDownloadButton handleToggle={handleToggleDownload} />
      <AddToBasketButton selectedEntries={accession} />
    </div>
  );

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
      <ErrorBoundary>
        <HTMLHead
          title={[
            subEntryId,
            accession,
            searchableNamespaceLabels[Namespace.uniparc],
          ]}
        />
        <div
          ref={setFullHeaderRef}
          className={stickyHeaderStyles['full-header']}
          inert={isStuck}
        >
          <h1>{entryTitle}</h1>
          <SubEntryOverview uniparcData={transformedData} />
          {toolsRow}
        </div>

        <SubEntryContext
          uniparcId={accession}
          subEntry={transformedData.subEntry}
          isUniProtKBActive={isUniProtKBActive}
          isUniProtKBMergedOrDemerged={isUniProtKBMergedOrDemerged}
          uniProtKBInactiveReason={uniProtKBEntryData.data?.inactiveReason}
          canLoadAnnotations={!!canLoadAnnotations}
          annotationsLoading={precomputedData.loading || uniFireData.loading}
          hasAnnotations={
            hasPrecomputed || Boolean(uniFireData.data?.accession)
          }
        />
        <Message level="info">
          This page is currently in beta. Please{' '}
          <ContactLink>provide feedback through our contact form</ContactLink>.
        </Message>
      </ErrorBoundary>
      {/* TODO: eventually remove nResults prop (see note in EntryDownload) */}
      {displayDownloadPanel && (
        <EntryDownloadPanel
          handleToggle={handleToggleDownload}
          nResults={uniparcData.data?.crossReferenceCount}
          subEntryAnnotationDownload={subEntryAnnotationDownload}
        />
      )}
      {isStuck && (
        <div className={stickyHeaderStyles['compact-bar']}>
          <span className={stickyHeaderStyles['compact-title']}>
            {entryTitle}
          </span>
          <div className={stickyHeaderStyles['compact-tools']}>{toolsRow}</div>
        </div>
      )}
      <Tabs active={subPage}>
        <Tab
          title={
            <EntryTabLink
              to={getSubEntryPath(
                accession,
                xrefId as string,
                TabLocation.Entry
              )}
            >
              Entry
            </EntryTabLink>
          }
          id={TabLocation.Entry}
        >
          <SubEntryMain
            uniparcData={transformedData}
            annotations={annotations}
            lineageData={lineageData.data}
            proteomeComponentObject={proteomeComponentObject}
          />
        </Tab>
        <Tab
          title={
            smallScreen ? null : (
              <EntryTabLink
                to={getSubEntryPath(
                  accession,
                  xrefId as string,
                  TabLocation.FeatureViewer
                )}
              >
                Feature viewer
              </EntryTabLink>
            )
          }
          id={TabLocation.FeatureViewer}
        >
          {smallScreen ? (
            <Redirect
              to={getSubEntryPath(
                accession,
                xrefId as string,
                TabLocation.Entry
              )}
            />
          ) : (
            <>
              <HTMLHead
                title={[
                  transformedData.entry.uniParcId,
                  'Feature viewer',
                  searchableNamespaceLabels[Namespace.uniparc],
                ]}
              />

              {transformedData.entry.sequenceFeatures &&
              transformedData.entry.sequence?.value ? (
                <div className="wider-tab-content">
                  <UniParcFeaturesView
                    data={transformedData.entry.sequenceFeatures}
                    sequence={transformedData.entry.sequence?.value}
                  />
                </div>
              ) : (
                'No features available'
              )}
            </>
          )}
        </Tab>
      </Tabs>
    </SidebarLayout>
  );
};

export default SubEntry;
