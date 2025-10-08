import axios from 'axios';
import cn from 'classnames';
import { Button, Card, Loader, Message, Tab, Tabs } from 'franklin-sites';
import { useEffect, useState } from 'react';
import { Link, Redirect, useRouteMatch } from 'react-router-dom';

import {
  getEntryPath,
  Location,
  LocationToPath,
} from '../../../app/config/urls';
import ContactLink from '../../../contact/components/ContactLink';
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
import sticky from '../../../shared/styles/sticky.module.scss';
import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../shared/types/namespaces';
import { SearchResults } from '../../../shared/types/results';
import fetchData from '../../../shared/utils/fetchData';
import * as logging from '../../../shared/utils/logging';
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
  }, [runUniFire, accession, subEntryData.data]);

  if (uniparcData.loading || subEntryData.loading) {
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

  const transformedData = uniParcSubEntryConverter(
    uniparcData.data,
    subEntryData.data?.results[0],
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
        >
          {/* Keep while not publicly available */}
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
        <Card className={styles['unifire-info']}>
          This entry is no longer available in UniProtKB. You are currently
          viewing it in the UniParc Sequence Archive. To see additional
          predictions generated by our automatic annotation rules, please opt
          in.
          <br />
          <Button
            variant="secondary"
            onClick={() => setRunUniFire(true)}
            className={styles['run-unifire-button']}
          >
            {runUniFire ? 'Showing' : 'Show'} predicted annotations
          </Button>
        </Card>
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
