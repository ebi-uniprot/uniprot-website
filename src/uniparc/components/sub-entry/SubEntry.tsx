import axios from 'axios';
import cn from 'classnames';
import { Button, InfoList, Loader, Message, Tab, Tabs } from 'franklin-sites';
import { useEffect, useState } from 'react';
import { Link, Redirect, useRouteMatch } from 'react-router-dom';

import {
  getEntryPath,
  Location,
  LocationToPath,
} from '../../../app/config/urls';
import ContactLink from '../../../contact/components/ContactLink';
import { addMessage } from '../../../messages/state/messagesActions';
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
import useDataApi from '../../../shared/hooks/useDataApi';
import { useSmallScreen } from '../../../shared/hooks/useMatchMedia';
import useMessagesDispatch from '../../../shared/hooks/useMessagesDispatch';
import sticky from '../../../shared/styles/sticky.module.scss';
import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../shared/types/namespaces';
import { SearchResults } from '../../../shared/types/results';
import fetchData from '../../../shared/utils/fetchData';
import * as logging from '../../../shared/utils/logging';
import uniprotkbUrls from '../../../uniprotkb/config/apiUrls/apiUrls';
import { UniSaveStatus } from '../../../uniprotkb/types/uniSave';
import {
  UniParcLiteAPIModel,
  UniParcXRef,
} from '../../adapters/uniParcConverter';
import uniParcSubEntryConverter, {
  UniFireModel,
} from '../../adapters/uniParcSubEntryConverter';
import uniparcApiUrls from '../../config/apiUrls';
import { groupTypesBySection } from '../../config/UniFireAnnotationTypeToSection';
import uniParcSubEntryConfig from '../../config/UniParcSubEntryConfig';
import { TabLocation } from '../../types/entry';
import SubEntrySection from '../../types/subEntrySection';
import { getSubEntryPath } from '../../utils/subEntry';
import UniParcFeaturesView from '../entry/UniParcFeaturesView';
import styles from './styles/sub-entry.module.scss';
import SubEntryMain from './SubEntryMain';
import SubEntryOverview from './SubEntryOverview';
import { hasStructure } from './SubEntryStructureSection';

const SubEntry = () => {
  const smallScreen = useSmallScreen();
  const dispatch = useMessagesDispatch();
  const match = useRouteMatch<{
    accession: string;
    subPage: string;
    subEntryId: string;
  }>(LocationToPath[Location.UniParcSubEntry]);
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);
  const [runUniFire, setRunUniFire] = useState(false);
  const [uniFireData, setUniFireData] = useState<UniFireModel>();

  const { accession, subEntryId, subPage } = match?.params || {};

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
    uniprotkbUrls.unisave.status(subEntryId as string)
  );

  useEffect(() => {
    if (runUniFire) {
      // eslint-disable-next-line import/no-named-as-default-member
      const cancelTokenSource = axios.CancelToken.source();
      const abortController = new AbortController();
      const { signal } = abortController;
      signal.addEventListener('abort', () => {
        cancelTokenSource.cancel('Operation canceled by the user.');
      });

      async function fetchUniFireData() {
        if (accession && subEntryData.data?.results?.length) {
          const subEntrytaxId = subEntryData.data.results[0].organism?.taxonId;
          if (subEntrytaxId) {
            try {
              const response = await fetchData(
                // Below line should be uncommented once the data is returned as JSON instead of JSON array
                // apiUrls.unifire.unifire(accession, `${subEntrytaxId}`),
                `http://hh-rke-wp-webadmin-74-worker-4.caas.ebi.ac.uk:32324/uniprotkb/unifire/run?id=${accession}&taxId=${subEntrytaxId}`,
                cancelTokenSource.token
              );
              if (response.data) {
                setUniFireData(response.data as UniFireModel);
                dispatch(
                  addMessage({
                    id: 'load-AA-annotations',
                    content: (
                      <>Predictions by automatic annotation rules are loaded</>
                    ),
                    format: MessageFormat.POP_UP,
                    level: MessageLevel.SUCCESS,
                    tag: MessageTag.JOB,
                  })
                );
              }
            } catch (error) {
              if (error instanceof Error) {
                if (error.name === 'AbortError') {
                  // The operation was aborted; silently bail
                  return;
                }
                logging.error(error);
              }
            }
          }
        }
      }

      fetchUniFireData();
      return () => {
        abortController.abort();
      };
    }
  }, [runUniFire, accession, subEntryData.data, dispatch]);

  if (uniparcData.loading || subEntryData.loading || unisaveData.loading) {
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
    !unisaveData.data ||
    !match ||
    !accession ||
    !subEntryId
  ) {
    return (
      <ErrorHandler
        status={uniparcData.error ? uniparcData.status : subEntryData.status}
        error={uniparcData.error || subEntryData.error}
        fullPage
      />
    );
  }

  let contextInfo;
  if (unisaveData.data?.events) {
    let events = unisaveData.data.events;
    if (
      unisaveData.data.events.length > 1 &&
      unisaveData.data.events[0].eventType === 'merged'
    ) {
      const demergedEntries = events.map((event) => event.targetAccession);
      events = [{ ...events[0], targetAccession: demergedEntries.join(', ') }];
    }
    contextInfo = events.map((event) => {
      const infoData = [
        {
          title: 'Availability',
          content: (
            <>
              <div className={styles['availability-content']}>
                <input
                  type="checkbox"
                  className={styles['availability-checkbox']}
                  checked={event.eventType === 'merged'}
                  readOnly
                />{' '}
                UniProtKB <br />
                {event.eventType === 'deleted' &&
                  `Removed because ${subEntryId} is ${event.deletedReason?.toLocaleLowerCase() || 'deleted'}`}
                {event.eventType === 'merged' && (
                  <>
                    {subEntryId} is{' '}
                    {event.targetAccession.split(', ').length > 1
                      ? 'demerged'
                      : 'merged'}{' '}
                    into{' '}
                    {event.targetAccession
                      .split(', ')
                      .map((targetAccession, index, array) => (
                        <span key={targetAccession}>
                          <Link
                            to={getEntryPath(
                              Namespace.uniprotkb,
                              targetAccession
                            )}
                          >
                            {targetAccession}
                          </Link>
                          {index < array.length - 1 ? ', ' : ''}
                        </span>
                      ))}
                  </>
                )}
              </div>
              <div className={styles['availability-content']}>
                <input
                  type="checkbox"
                  className={styles['availability-checkbox']}
                  checked
                  readOnly
                />{' '}
                UniParc
                <br />
                Current location, UniProt’s sequence archive
              </div>
            </>
          ),
        },
        {
          title: 'Actions',
          content: event.eventType === 'deleted' && (
            <>
              Since {subEntryId} is no longer in UniProtKB, its annotations have
              been removed. However, annotations may be generated on demand
              using automatic annotation rules.
              <br />
              <Button
                variant="primary"
                onClick={() => setRunUniFire(true)}
                className={styles['run-unifire-button']}
                disabled={runUniFire}
              >
                {!runUniFire && 'Generate annotations'}
                {runUniFire && !uniFireData && 'Generating...'}
                {runUniFire && uniFireData && 'Predictions loaded'}
              </Button>
            </>
          ),
        },
        {
          title: 'Further information',
          content: (
            <ul>
              <li>
                <Link to="https://insideuniprot.blogspot.com/2025/06/capturing-diversity-of-life.html">
                  Reference proteome move
                </Link>
              </li>
              <li>
                <Link to={LocationToPath[Location.UniParcResults]}>
                  About UniParc
                </Link>
              </li>
            </ul>
          ),
        },
      ];
      return (
        <InfoList
          key={`${event.eventType}-${subEntryId}`}
          infoData={infoData}
        />
      );
    });
  }

  const transformedData = uniParcSubEntryConverter(
    uniparcData.data,
    subEntryData.data?.results[0],
    unisaveData.data,
    uniFireData
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
          (section.id === SubEntrySection.Keywords &&
            !transformedData.unifire?.predictions.some(
              (p) => p.annotationType === 'keyword'
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
        />
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
                {`  · ${subEntryId}`}
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
          . These are <span data-article-id="uniparc">UniParc</span> pages and
          not <span data-article-id="uniprotkb">UniProtKB</span> pages.
        </Message>
        {contextInfo && (
          <Message level="info">
            <h4>Attention: You are viewing this entry in UniParc.</h4>
            {contextInfo}
          </Message>
        )}
      </ErrorBoundary>
      <Tabs active={subPage}>
        <Tab
          title={
            <Link
              to={getSubEntryPath(accession, subEntryId, TabLocation.Entry)}
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
          <SubEntryMain transformedData={transformedData} />
        </Tab>
        <Tab
          title={
            smallScreen ? null : (
              <Link
                to={getSubEntryPath(
                  accession,
                  subEntryId,
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
              to={getSubEntryPath(accession, subEntryId, TabLocation.Entry)}
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
