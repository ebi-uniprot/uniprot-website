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
import { use, useEffect, useState } from 'react';
import { Link, Redirect, useRouteMatch } from 'react-router-dom';

import {
  getEntryPath,
  Location,
  LocationToPath,
} from '../../../app/config/urls';
import ContactLink from '../../../contact/components/ContactLink';
import { type SelectedTaxon } from '../../../jobs/types/jobsFormData';
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
import { useSmallScreen } from '../../../shared/hooks/useMatchMedia';
import useMessagesDispatch from '../../../shared/hooks/useMessagesDispatch';
import sticky from '../../../shared/styles/sticky.module.scss';
import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../shared/types/namespaces';
import { type SearchResults } from '../../../shared/types/results';
import * as logging from '../../../shared/utils/logging';
import { type TaxonomyAPIModel } from '../../../supporting-data/taxonomy/adapters/taxonomyConverter';
import uniprotkbUrls from '../../../uniprotkb/config/apiUrls/apiUrls';
import { type UniSaveStatus } from '../../../uniprotkb/types/uniSave';
import { reUniProtKBAccession } from '../../../uniprotkb/utils/regexes';
import {
  type UniParcLiteAPIModel,
  type UniParcXRef,
} from '../../adapters/uniParcConverter';
import uniParcSubEntryConverter, {
  type UniFireModel,
} from '../../adapters/uniParcSubEntryConverter';
import uniparcApiUrls from '../../config/apiUrls';
import { groupTypesBySection } from '../../config/UniFireAnnotationTypeToSection';
import uniParcSubEntryConfig from '../../config/UniParcSubEntryConfig';
import { TabLocation } from '../../types/entry';
import SubEntrySection from '../../types/subEntrySection';
import { getSubEntryPath } from '../../utils/subEntry';
import { getXrefId } from '../../utils/uniparcXref';
import UniParcFeaturesView from '../entry/UniParcFeaturesView';
import { type DataDBModel } from '../entry/XRefsSection';
import SubEntryContext from './SubEntryContext';
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

  const lineageData = useDataApi<TaxonomyAPIModel>(
    subEntryDataPerDatabase?.organism
      ? apiUrls.entry.entry(`${subEntryTaxId}`, Namespace.taxonomy)
      : null
  );

  /*
  If the current taxon has a rank of “species”, it should be used as taxonId.
  Or use the lineage information to go back to either the first parent with the
  rank of “species”, or the first non-hidden parent if no “species” parent exist
  */
  let speciesTaxon: { taxonId: number; scientificName?: string } | undefined;
  if (lineageData.data?.rank === 'species') {
    speciesTaxon = lineageData.data;
  } else if (lineageData.data?.lineage) {
    const reverseLineage = [...lineageData.data.lineage].reverse();
    speciesTaxon =
      reverseLineage.find((item) => item.rank === 'species') ??
      reverseLineage.find((item) => !item.hidden);
  }

  const speciesTaxons: SelectedTaxon[] | undefined = speciesTaxon
    ? [
        {
          id: String(speciesTaxon.taxonId),
          label: speciesTaxon.scientificName
            ? `${speciesTaxon.scientificName} [${speciesTaxon.taxonId}]`
            : String(speciesTaxon.taxonId),
        },
      ]
    : undefined;

  const uniFireData = useDataApi<UniFireModel>(
    canLoadUniFire && runUniFire
      ? apiUrls.unifire.unifire(accession, `${subEntryTaxId}`)
      : null
  );

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
    // If no data, it would be an empty string
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

  const sidebar = subPage === TabLocation.Entry && (
    <InPageNav
      sections={Object.values(uniParcSubEntryConfig).map((section) => ({
        ...section,
        disabled:
          (section.id === SubEntrySection.Structure &&
            !hasStructure(transformedData.subEntry)) ||
          (section.id === SubEntrySection.NamesAndTaxonomy &&
            !transformedData.subEntry.proteinName) ||
          (section.id === SubEntrySection.Function &&
            !transformedData.unifire?.predictions.some((p) =>
              groupTypesBySection(SubEntrySection.Function).includes(
                p.annotationType
              )
            )) ||
          (section.id === SubEntrySection.SubcellularLocation &&
            !transformedData.unifire?.predictions.some((p) =>
              groupTypesBySection(SubEntrySection.SubcellularLocation).includes(
                p.annotationType
              )
            )) ||
          (section.id === SubEntrySection.Expression &&
            !transformedData.unifire?.predictions.some((p) =>
              groupTypesBySection(SubEntrySection.Expression).includes(
                p.annotationType
              )
            )) ||
          (section.id === SubEntrySection.ProteinProcessing &&
            !transformedData.unifire?.predictions.some((p) =>
              groupTypesBySection(SubEntrySection.ProteinProcessing).includes(
                p.annotationType
              )
            )) ||
          (section.id === SubEntrySection.Interaction &&
            !transformedData.unifire?.predictions.some((p) =>
              groupTypesBySection(SubEntrySection.Interaction).includes(
                p.annotationType
              )
            )) ||
          (section.id === SubEntrySection.FamilyAndDomains &&
            !transformedData.unifire?.predictions.some((p) =>
              groupTypesBySection(SubEntrySection.FamilyAndDomains).includes(
                p.annotationType
              )
            ) &&
            !transformedData.entry.sequenceFeatures) ||
          (section.id === SubEntrySection.KeywordsAndGO &&
            !transformedData.unifire?.predictions.some(
              (p) =>
                p.annotationType === 'keyword' || p.annotationType === 'xref.GO'
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
          showUniFireOption={!!canLoadUniFire}
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
            <Dropdown
              // eslint-disable-next-line react/no-unstable-nested-components
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
                    textSuffix="this sequence"
                  />
                </li>
                {speciesTaxons && (
                  <li>
                    <BlastButton
                      selectedEntries={[accession]}
                      textSuffix="against this species"
                      taxons={speciesTaxons}
                    />
                  </li>
                )}
              </ul>
            </Dropdown>
            <EntryDownloadButton handleToggle={handleToggleDownload} />
            <AddToBasketButton selectedEntries={accession} />
          </div>
          <SubEntryMain
            transformedData={transformedData}
            lineageData={lineageData.data}
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
