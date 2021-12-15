import { FC, useEffect, useMemo } from 'react';
import { useRouteMatch, useLocation, Link, useHistory } from 'react-router-dom';
import { stringify } from 'query-string';
import { Loader, Tabs, Tab } from 'franklin-sites';

import HTMLHead from '../../../shared/components/HTMLHead';
import EntryTitle from '../../../shared/components/entry/EntryTitle';
import EntryMain from './EntryMain';
import UniParcFeaturesView from './UniParcFeaturesView';
import XRefsFacets from './XRefsFacets';
import BasketStatus from '../../../basket/BasketStatus';
import BlastButton from '../../../shared/components/action-buttons/Blast';
import AddToBasketButton from '../../../shared/components/action-buttons/AddToBasket';
import EntryDownload from '../../../shared/components/entry/EntryDownload';

import SideBarLayout from '../../../shared/components/layouts/SideBarLayout';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';
import useLocalStorage from '../../../shared/hooks/useLocalStorage';

import { getParamsFromURL } from '../../../uniprotkb/utils/resultsUtils';
import apiUrls from '../../../shared/config/apiUrls';
import {
  defaultColumns,
  UniParcXRefsColumn,
} from '../../config/UniParcXRefsColumnConfiguration';
import {
  LocationToPath,
  Location,
  getEntryPath,
} from '../../../app/config/urls';

import uniParcConverter, {
  UniParcAPIModel,
} from '../../adapters/uniParcConverter';
import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../shared/types/namespaces';

import '../../../shared/components/entry/styles/entry-page.scss';

export enum TabLocation {
  Entry = 'entry',
  FeatureViewer = 'feature-viewer',
}

const Entry: FC = () => {
  const match = useRouteMatch<{ accession: string; subPage?: TabLocation }>(
    LocationToPath[Location.UniParcEntry]
  );
  const history = useHistory();
  const { search } = useLocation();

  const [columns] = useLocalStorage(
    `table columns for ${Namespace.uniparc} entry page` as const,
    defaultColumns
  );

  // if URL doesn't finish with "entry" redirect to /entry by default
  useEffect(() => {
    if (match && !match.params.subPage) {
      history.replace({
        ...history.location,
        pathname: getEntryPath(
          Namespace.uniparc,
          match.params.accession,
          TabLocation.Entry
        ),
      });
    }
  }, [match, history]);

  const baseURL = apiUrls.entry(match?.params.accession, Namespace.uniparc);
  const xRefsURL = useMemo(() => {
    const { selectedFacets } = getParamsFromURL(search);
    if (!selectedFacets.length) {
      return baseURL;
    }
    return `${baseURL}?${stringify({
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
    })}`;
  }, [baseURL, search, columns]);
  const dataObject = useDataApiWithStale<UniParcAPIModel>(
    // Hack to have the backend only return the base object without xref data
    `${baseURL}?taxonIds=0`
  );
  const xrefsDataObject = useDataApiWithStale<UniParcAPIModel>(xRefsURL);

  if (dataObject.error || !match?.params.accession || !match) {
    return <ErrorHandler status={dataObject.status} />;
  }

  if (!dataObject.data) {
    return <Loader progress={dataObject.progress} />;
  }

  const transformedData = uniParcConverter(dataObject.data);

  const entrySidebar = <XRefsFacets xrefs={xrefsDataObject} />;

  const emptySidebar = (
    <div className="sidebar-layout__sidebar-content--empty" />
  );

  let sidebar;

  switch (match.params.subPage) {
    case TabLocation.FeatureViewer:
      sidebar = emptySidebar;
      break;

    default:
      sidebar = entrySidebar;
      break;
  }

  return (
    <SideBarLayout
      sidebar={sidebar}
      className="entry-page"
      title={
        <ErrorBoundary>
          <HTMLHead
            title={[
              transformedData.uniParcId,
              searchableNamespaceLabels[Namespace.uniparc],
            ]}
          />
          <h1>
            <EntryTitle
              mainTitle="UniParc"
              optionalTitle={transformedData.uniParcId}
            />
            <BasketStatus id={transformedData.uniParcId} className="big" />
          </h1>
        </ErrorBoundary>
      }
    >
      <Tabs active={match.params.subPage}>
        <Tab
          cache
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
          <div className="button-group">
            <BlastButton selectedEntries={[match.params.accession]} />
            <EntryDownload />
            <AddToBasketButton selectedEntries={match.params.accession} />
          </div>
          <EntryMain
            transformedData={transformedData}
            xrefs={xrefsDataObject}
          />
        </Tab>
        <Tab
          title={
            <Link
              to={getEntryPath(
                Namespace.uniparc,
                match.params.accession,
                TabLocation.FeatureViewer
              )}
            >
              Feature viewer
            </Link>
          }
          id={TabLocation.FeatureViewer}
        >
          {transformedData.sequenceFeatures ? (
            <>
              <HTMLHead
                title={[
                  transformedData.uniParcId,
                  'Feature viewer',
                  searchableNamespaceLabels[Namespace.uniparc],
                ]}
              />
              <UniParcFeaturesView
                data={transformedData.sequenceFeatures}
                sequence={transformedData.sequence.value}
              />
            </>
          ) : (
            'No features available'
          )}
        </Tab>
      </Tabs>
    </SideBarLayout>
  );
};

export default Entry;
