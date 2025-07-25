import '../../../shared/components/entry/styles/entry-page.scss';

import cn from 'classnames';
import { Loader, Tab, Tabs } from 'franklin-sites';
import { useState } from 'react';
import { Link, Navigate } from 'react-router';
import joinUrl from 'url-join';

import { getEntryPath, Location } from '../../../app/config/urls';
import BasketStatus from '../../../basket/BasketStatus';
import AddToBasketButton from '../../../shared/components/action-buttons/AddToBasket';
import ToolsDropdown from '../../../shared/components/action-buttons/ToolsDropdown';
import EntryDownloadButton from '../../../shared/components/entry/EntryDownloadButton';
import EntryDownloadPanel from '../../../shared/components/entry/EntryDownloadPanel';
import EntryTitle from '../../../shared/components/entry/EntryTitle';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import HTMLHead from '../../../shared/components/HTMLHead';
import { SidebarLayout } from '../../../shared/components/layouts/SideBarLayout';
import { Facets } from '../../../shared/components/results/Facets';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import useDataApi from '../../../shared/hooks/useDataApi';
import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';
import useLocalStorage from '../../../shared/hooks/useLocalStorage';
import { useSmallScreen } from '../../../shared/hooks/useMatchMedia';
import useMatchWithRedirect from '../../../shared/hooks/useMatchWithRedirect';
import sticky from '../../../shared/styles/sticky.module.scss';
import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../shared/types/namespaces';
import { SearchResults } from '../../../shared/types/results';
import uniParcConverter, {
  UniParcLiteAPIModel,
  UniParcXRef,
} from '../../adapters/uniParcConverter';
import { defaultColumns } from '../../config/UniParcXRefsColumnConfiguration';
import { TabLocation } from '../../types/entry';
import EntryMain from './EntryMain';
import useXref from './hooks/useXref';
import Overview from './Overview';
import UniParcFeaturesView from './UniParcFeaturesView';

const Entry = () => {
  const match = useMatchWithRedirect(Location.UniParcEntry, TabLocation);
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);
  const smallScreen = useSmallScreen();

  const [columns] = useLocalStorage(
    `table columns for ${Namespace.uniparc} entry page` as const,
    defaultColumns
  );

  const baseURL =
    apiUrls.entry.entry(match?.params.accession, Namespace.uniparc) || '';

  // Query for xref facets
  const initialApiFacetUrl = useXref({
    accession: match?.params.accession,
    size: 0,
    withFacets: true,
  });
  const xRefsFacetApiObject =
    useDataApiWithStale<SearchResults<UniParcXRef>>(initialApiFacetUrl);

  const lightObject = useDataApi<UniParcLiteAPIModel>(
    joinUrl(baseURL, 'light')
  );

  const {
    loading: facetLoading,
    data: facetData,
    isStale: facetHasStaleData,
  } = xRefsFacetApiObject;

  if (!match?.params.accession || !match || lightObject.error) {
    return (
      <ErrorHandler
        status={lightObject.status}
        error={lightObject.error}
        fullPage
      />
    );
  }
  if (!lightObject.data) {
    return <Loader progress={lightObject.progress} />;
  }

  const transformedData = uniParcConverter(lightObject.data);

  const entrySidebar =
    !facetLoading && !facetHasStaleData && facetData ? (
      <Facets data={facetData.facets} />
    ) : (
      <Loader progress={xRefsFacetApiObject.progress} />
    );

  let sidebar;

  switch (match.params.subPage) {
    case TabLocation.FeatureViewer:
      sidebar = null;
      break;

    default:
      sidebar = entrySidebar;
      break;
  }

  const handleToggleDownload = () =>
    setDisplayDownloadPanel(!displayDownloadPanel);

  return (
    <SidebarLayout
      sidebar={sidebar}
      noOverflow
      className={cn('entry-page', sticky['sticky-tabs-container'])}
    >
      <HTMLHead
        title={[
          transformedData.uniParcId,
          searchableNamespaceLabels[Namespace.uniparc],
        ]}
      />
      <ErrorBoundary>
        <h1>
          <EntryTitle
            mainTitle="UniParc"
            optionalTitle={transformedData.uniParcId}
          />
          <BasketStatus id={transformedData.uniParcId} className="small" />
        </h1>
        <Overview data={transformedData} />
      </ErrorBoundary>
      <Tabs active={match.params.subPage}>
        <Tab
          title={
            <Link
              to={getEntryPath(
                Namespace.uniparc,
                match.params.accession,
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
              nResults={transformedData.crossReferenceCount}
              columns={columns}
            />
          )}
          <div className="button-group">
            <ToolsDropdown
              selectedEntries={[match.params.accession]}
              blast
              mapID
            />
            <EntryDownloadButton handleToggle={handleToggleDownload} />
            <AddToBasketButton selectedEntries={match.params.accession} />
          </div>
          <EntryMain transformedData={transformedData} />
        </Tab>
        <Tab
          title={
            smallScreen ? null : (
              <Link
                to={getEntryPath(
                  Namespace.uniparc,
                  match.params.accession,
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
            <Navigate
              replace
              to={getEntryPath(
                Namespace.uniparc,
                match.params.accession,
                TabLocation.Entry
              )}
            />
          ) : (
            <>
              <HTMLHead
                title={[
                  transformedData.uniParcId,
                  'Feature viewer',
                  searchableNamespaceLabels[Namespace.uniparc],
                ]}
              />
              {transformedData.sequenceFeatures ? (
                <div className="wider-tab-content">
                  <UniParcFeaturesView
                    data={transformedData.sequenceFeatures}
                    sequence={transformedData.sequence.value}
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

export default Entry;
