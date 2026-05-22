import cn from 'classnames';
import { ExternalLink, Loader, Message, Tab, Tabs } from 'franklin-sites';
import { use, useEffect, useMemo, useState } from 'react';
import { Link, Redirect, useRouteMatch } from 'react-router-dom';

import {
  getEntryPath,
  Location,
  LocationToPath,
} from '../../../app/config/urls';
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
import BlastButton from '../../../shared/components/action-buttons/Blast';
import EntryDownloadButton from '../../../shared/components/entry/EntryDownloadButton';
import EntryDownloadPanel from '../../../shared/components/entry/EntryDownloadPanel';
import EntryTitle from '../../../shared/components/entry/EntryTitle';
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
import sticky from '../../../shared/styles/sticky.module.scss';
import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../shared/types/namespaces';
import { type SearchResults } from '../../../shared/types/results';
import * as logging from '../../../shared/utils/logging';
import { hasContent } from '../../../shared/utils/utils';
import { type UIModel } from '../../../uniprotkb/adapters/sectionConverter';
import uniProtKbConverter, {
  type UniProtkbAPIModel,
  type UniProtkbUIModel,
} from '../../../uniprotkb/adapters/uniProtkbConverter';
import { subcellularLocationSectionHasContent } from '../../../uniprotkb/components/entry/SubcellularLocationSection';
import uniprotkbUrls from '../../../uniprotkb/config/apiUrls/apiUrls';
import UniProtKBEntrySection from '../../../uniprotkb/types/entrySection';
import { type UniSaveStatus } from '../../../uniprotkb/types/uniSave';
import { reUniProtKBAccession } from '../../../uniprotkb/utils/regexes';
import precomputedToUniProtkbConverter from '../../adapters/precomputedToUniProtkbConverter';
import uniFireToUniProtkbConverter from '../../adapters/uniFireToUniProtkbConverter';
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
import { getSubEntryPath } from '../../utils/subEntry';
import { getXrefId } from '../../utils/uniparcXref';
import UniParcFeaturesView from '../entry/UniParcFeaturesView';
import { type DataDBModel } from '../entry/XRefsSection';
import SubEntryContext from './SubEntryContext';
import {
  getFallbackKeywords,
  keywordsAndGOSectionHasContent,
} from './SubEntryKeywordsSection';
import SubEntryMain from './SubEntryMain';
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
  const [runUniFire, setRunUniFire] = useState(
    // Only do an automatic request to UniFire if the user is likely human
    // In case of this page being a first load and not a navigation, it might
    // only detect that the user is human _after_ this logic has run (if the
    // page loaded really fast), so the button might still be presented to the
    // user, but that's fine
    use(BotDetectionContext) === 'human'
  );

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
  const canLoadUniFire = subEntryTaxId && accession && subEntryDataPerDatabase;

  // Precomputed annotations are preferred — they already exist, so this is a
  // cheap fetch. UniFire (which *runs* the annotation pipeline) is the fallback,
  // used only when there is no precomputed data for this entry (HTTP 404).
  const precomputedData = useDataApi<UniParcPrecomputedModel>(
    canLoadUniFire
      ? apiUrls.precomputed.precomputedUniParcAnnotation(
          accession,
          `${subEntryTaxId}`
        )
      : null
  );
  const hasPrecomputed =
    precomputedData.status === 200 && Boolean(precomputedData.data);
  const precomputedResolved = !precomputedData.loading;

  const uniFireData = useDataApi<UniFireModel>(
    canLoadUniFire && runUniFire && precomputedResolved && !hasPrecomputed
      ? apiUrls.unifire.unifire(accession, `${subEntryTaxId}`)
      : null
  );

  const databaseInfoMaps = useDatabaseInfoMaps();
  // Build the annotations UIModel the sub-entry sections render. Precomputed is
  // preferred; UniFire is the fallback.
  const annotations: UniProtkbUIModel | undefined = useMemo(() => {
    if (!databaseInfoMaps) {
      return undefined;
    }
    // Supplement organism from the UniParc cross-reference — the
    // SubcellularLocation viz renders nothing without `organism.lineage`. The
    // xref carries a TaxonomyDatum with rich Lineage objects; flatten it to the
    // string[] lineage that UniProtkbAPIModel.organism expects.
    const withOrganism = (apiModel: UniProtkbAPIModel): UniProtkbAPIModel => {
      const xrefOrganism = subEntryDataPerDatabase?.organism;
      return xrefOrganism
        ? {
            ...apiModel,
            organism: {
              ...xrefOrganism,
              lineage: (xrefOrganism.lineage ?? [])
                .map((node) => node.scientificName)
                .filter((name): name is string => Boolean(name)),
            },
          }
        : apiModel;
    };
    try {
      if (hasPrecomputed && precomputedData.data) {
        const converted = uniProtKbConverter(
          withOrganism(precomputedToUniProtkbConverter(precomputedData.data)),
          databaseInfoMaps
        );
        // Keywords whose category has no dedicated sub-entry section fall back
        // to the generic Keywords & GO section (SubEntryKeywordsSection) — they
        // are still shown, but warn so a dedicated section can be considered if
        // a category ever turns up here.
        const fallbackKeywords = getFallbackKeywords(converted);
        if (fallbackKeywords.length) {
          logging.warn(
            `Precomputed keywords shown in the generic Keywords section — no dedicated sub-entry section for: ${fallbackKeywords
              .map((keyword) => keyword.category)
              .join(', ')}`,
            { extra: { accession } }
          );
        }
        return converted;
      }
      if (uniFireData.data) {
        return uniProtKbConverter(
          withOrganism(uniFireToUniProtkbConverter(uniFireData.data)),
          databaseInfoMaps
        );
      }
      return undefined;
    } catch (error) {
      // Degrade to no annotations rather than crashing the page — but never
      // silently. `uniProtKbConverter` runs inside this try too and, unlike the
      // `*ToUniProtkbConverter` functions, does not log on throw, so without
      // this an exception here would vanish with zero telemetry.
      logging.error(
        `Failed to build UniParc sub-entry annotations: ${
          error instanceof Error ? error.message : String(error)
        }`,
        {
          extra: {
            accession,
            source: hasPrecomputed ? 'precomputed' : 'unifire',
          },
        }
      );
      return undefined;
    }
  }, [
    accession,
    databaseInfoMaps,
    subEntryDataPerDatabase,
    hasPrecomputed,
    precomputedData.data,
    uniFireData.data,
  ]);

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
    // `hasContent` on the whole UIModel is fooled by metadata fields some
    // converters set (e.g. functionConverter's `entryType`) — check only the
    // renderable content fields.
    const sectionData = annotations[section] as Partial<UIModel>;
    return hasContent({
      commentsData: sectionData.commentsData,
      featuresData: sectionData.featuresData,
      keywordData: sectionData.keywordData,
      xrefData: sectionData.xrefData,
    });
  };

  useEffect(() => {
    if (uniFireData.status === 200 && uniFireData.data) {
      dispatch(
        addMessage({
          id: 'load-AA-annotations',
          content: <>Predictions by automatic annotation rules are loaded</>,
          format: MessageFormat.POP_UP,
          level: MessageLevel.SUCCESS,
          tag: MessageTag.JOB,
        })
      );
    } else if (uniFireData.status === 204) {
      dispatch(
        addMessage({
          id: 'load-AA-annotations',
          content: <>No predictions generated</>,
          format: MessageFormat.POP_UP,
          level: MessageLevel.SUCCESS,
          tag: MessageTag.JOB,
        })
      );
    } else if (uniFireData.error) {
      logging.error(uniFireData.error);
      dispatch(
        addMessage({
          id: 'load-AA-annotations',
          content: <>Encountered error in running the service</>,
          format: MessageFormat.POP_UP,
          level: MessageLevel.FAILURE,
          tag: MessageTag.JOB,
        })
      );
    }
  }, [dispatch, uniFireData.data, uniFireData.error, uniFireData.status]);

  useEffect(() => {
    // Delete the message when user navigates away from the sub-entry page
    return () => dispatch(deleteMessage('deleted-entry'));
    // eslint-disable-next-line reactHooks/exhaustive-deps
  }, []);

  if (
    dbData.loading ||
    uniparcData.loading ||
    subEntryData.loading ||
    unisaveData.loading
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

  const handleToggleDownload = () =>
    setDisplayDownloadPanel(!displayDownloadPanel);

  // Nav `disabled` for the two hybrid sections must mirror their components'
  // render conditions — entry-intrinsic data OR annotation content.
  const familyAndDomainsHasContent =
    Boolean(
      transformedData.entry.sequenceFeatures?.length &&
      transformedData.entry.sequence?.value
    ) || annotationSectionHasContent(UniProtKBEntrySection.FamilyAndDomains);
  const namesAndTaxonomyHasContent = Boolean(
    transformedData.subEntry.proteinName ||
    transformedData.subEntry.geneName ||
    transformedData.subEntry.organism
  );

  const sidebar = subPage === TabLocation.Entry && (
    <InPageNav
      sections={Object.values(uniParcSubEntryConfig).map((section) => ({
        ...section,
        disabled:
          (section.id === SubEntrySection.Structure &&
            !hasStructure(transformedData.subEntry)) ||
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

  return (
    <SidebarLayout
      sidebar={sidebar}
      noOverflow
      className={cn('entry-page', sticky['sticky-tabs-container'])}
    >
      <ErrorBoundary>
        <HTMLHead
          title={[
            subEntryId,
            accession,
            searchableNamespaceLabels[Namespace.uniparc],
          ]}
        >
          {/* Keep until 2026_02 is released */}
          <meta name="robots" content="noindex" />
        </HTMLHead>
        <h1>
          <EntryTitle
            mainTitle="UniParc"
            optionalTitle={
              <>
                <Link
                  to={getEntryPath(
                    Namespace.uniparc,
                    accession,
                    TabLocation.Entry
                  )}
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
        </h1>
        <SubEntryOverview data={transformedData} />
        <Message level="info">
          These pages are in beta version, please{' '}
          <ContactLink>
            provide feedback about them through our contact form
          </ContactLink>
          .
        </Message>
        <SubEntryContext
          uniparcId={accession}
          subEntry={transformedData.subEntry}
          data={unisaveData?.data}
          showUniFireOption={
            !!canLoadUniFire && precomputedResolved && !hasPrecomputed
          }
          uniFireData={uniFireData.data}
          uniFireLoading={uniFireData.loading}
          runUniFire={runUniFire}
          setRunUniFire={setRunUniFire}
        />
      </ErrorBoundary>
      <Tabs active={subPage}>
        <Tab
          title={
            <Link
              to={getSubEntryPath(
                accession,
                xrefId as string,
                TabLocation.Entry
              )}
            >
              Entry
            </Link>
          }
          id={TabLocation.Entry}
        >
          {/* TODO: evenutally remove nResults prop (see note in EntryDownload) */}
          {displayDownloadPanel && (
            <EntryDownloadPanel
              handleToggle={handleToggleDownload}
              nResults={uniparcData.data?.crossReferenceCount}
            />
          )}
          <div className="button-group">
            <BlastButton selectedEntries={[accession]} />
            <EntryDownloadButton handleToggle={handleToggleDownload} />
            <AddToBasketButton selectedEntries={accession} />
          </div>
          <SubEntryMain
            transformedData={transformedData}
            annotations={annotations}
          />
        </Tab>
        <Tab
          title={
            smallScreen ? null : (
              <Link
                to={getSubEntryPath(
                  accession,
                  xrefId as string,
                  TabLocation.FeatureViewer
                )}
              >
                Feature viewer
              </Link>
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
