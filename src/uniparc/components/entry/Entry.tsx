import { useMemo, useState } from 'react';
import { useLocation, Link, Redirect } from 'react-router-dom';
import { Loader, Tabs, Tab } from 'franklin-sites';
import cn from 'classnames';

import HTMLHead from '../../../shared/components/HTMLHead';
import EntryTitle from '../../../shared/components/entry/EntryTitle';
import EntryMain from './EntryMain';
import UniParcFeaturesView from './UniParcFeaturesView';
import XRefsFacets from './XRefsFacets';
import BasketStatus from '../../../basket/BasketStatus';
import BlastButton from '../../../shared/components/action-buttons/Blast';
import AddToBasketButton from '../../../shared/components/action-buttons/AddToBasket';
import EntryDownloadPanel from '../../../shared/components/entry/EntryDownloadPanel';
import EntryDownloadButton from '../../../shared/components/entry/EntryDownloadButton';

import { SidebarLayout } from '../../../shared/components/layouts/SideBarLayout';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import useDataApi from '../../../shared/hooks/useDataApi';
import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';
import useLocalStorage from '../../../shared/hooks/useLocalStorage';
import useMatchWithRedirect from '../../../shared/hooks/useMatchWithRedirect';
import { useSmallScreen } from '../../../shared/hooks/useMatchMedia';

import { getParamsFromURL } from '../../../uniprotkb/utils/resultsUtils';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import {
  defaultColumns,
  UniParcXRefsColumn,
} from '../../config/UniParcXRefsColumnConfiguration';
import { Location, getEntryPath } from '../../../app/config/urls';
import { stringifyUrl } from '../../../shared/utils/url';

import uniParcConverter, {
  UniParcAPIModel,
} from '../../adapters/uniParcConverter';
import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../shared/types/namespaces';

import sticky from '../../../shared/styles/sticky.module.scss';
import '../../../shared/components/entry/styles/entry-page.scss';

export enum TabLocation {
  Entry = 'entry',
  FeatureViewer = 'feature-viewer',
}

const Entry = () => {
  const match = useMatchWithRedirect<{
    accession: string;
    subPage?: TabLocation;
  }>(Location.UniParcEntry, TabLocation);
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);
  const { search } = useLocation();
  const smallScreen = useSmallScreen();

  const [columns] = useLocalStorage(
    `table columns for ${Namespace.uniparc} entry page` as const,
    defaultColumns
  );

  const baseURL = apiUrls.entry.entry(
    match?.params.accession,
    Namespace.uniparc
  );
  const xRefsURL = useMemo(() => {
    const [{ selectedFacets }] = getParamsFromURL(search);
    if (!selectedFacets.length) {
      return baseURL;
    }
    return stringifyUrl(baseURL || '', {
      ...Object.fromEntries(
        selectedFacets.map(({ name, value }) => [name, value])
      ),
      fields: Array.from(
        new Set([
          ...columns,
          // We always need all below to calculate the facets
          UniParcXRefsColumn.active,
          UniParcXRefsColumn.organism,
          UniParcXRefsColumn.database,
        ])
      )
        // Sort to have better cache hits
        .sort()
        .join(','),
    });
  }, [baseURL, search, columns]);
  const dataObject = useDataApi<UniParcAPIModel>(
    // Hack to have the backend only return the base object without xref data
    `${baseURL}?taxonIds=0`
  );
  const wholeXrefsDataObject = useDataApi<UniParcAPIModel>(baseURL);
  const partialXrefsDataObject = useDataApiWithStale<UniParcAPIModel>(
    baseURL === xRefsURL ? null : xRefsURL
  );
  const xrefsDataObject =
    baseURL === xRefsURL ? wholeXrefsDataObject : partialXrefsDataObject;

  if (dataObject.error || !match?.params.accession || !match) {
    return <ErrorHandler status={dataObject.status} />;
  }

  if (!dataObject.data) {
    return <Loader progress={dataObject.progress} />;
  }

  const transformedData = uniParcConverter(dataObject.data);

  const entrySidebar = <XRefsFacets xrefs={xrefsDataObject} />;

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
      </ErrorBoundary>
      {/* Put overview here if we ever have data to display there */}
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
              nResults={xrefsDataObject.data?.uniParcCrossReferences?.length}
              columns={columns}
            />
          )}
          <div className="button-group">
            <BlastButton selectedEntries={[match.params.accession]} />
            <EntryDownloadButton handleToggle={handleToggleDownload} />
            <AddToBasketButton selectedEntries={match.params.accession} />
          </div>
          <EntryMain
            transformedData={transformedData}
            xrefs={xrefsDataObject}
            totalNResults={
              wholeXrefsDataObject.data?.uniParcCrossReferences?.length
            }
          />
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
            <Redirect
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
