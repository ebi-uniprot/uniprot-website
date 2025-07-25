import cn from 'classnames';
import { Loader, Tab, Tabs } from 'franklin-sites';
import { useState } from 'react';
import { Link, Redirect, useRouteMatch } from 'react-router-dom';

import {
  getEntryPath,
  Location,
  LocationToPath,
} from '../../../app/config/urls';
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
import {
  UniParcLiteAPIModel,
  UniParcXRef,
} from '../../adapters/uniParcConverter';
import uniParcSubEntryConverter from '../../adapters/uniParcSubEntryConverter';
import uniparcApiUrls from '../../config/apiUrls';
import uniParcSubEntryConfig from '../../config/UniParcSubEntryConfig';
import { TabLocation } from '../../types/entry';
import SubEntrySection from '../../types/subEntrySection';
import { getSubEntryPath } from '../../utils/subEntry';
import UniParcFeaturesView from '../entry/UniParcFeaturesView';
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
  const { accession, subEntryId, subPage } = match?.params || {};

  const baseURL = `${apiUrls.entry.entry(
    subEntryId && accession,
    Namespace.uniparc
  )}/light`;
  const xrefIdURL = accession
    ? uniparcApiUrls.databases(accession, subEntryId)
    : '';

  const uniparcData = useDataApi<UniParcLiteAPIModel>(baseURL);
  const subEntryData = useDataApi<SearchResults<UniParcXRef>>(xrefIdURL);

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
    subEntryData.data?.results[0]
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
          section.id === SubEntrySection.Structure &&
          !hasStructure(transformedData.subEntry),
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
