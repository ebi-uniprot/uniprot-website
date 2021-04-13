import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { PageIntro, Loader } from 'franklin-sites';

import ResultsButtons from './ResultsButtons';
import ResultsFacets from './ResultsFacets';
import NoResultsPage from '../error-pages/NoResultsPage';
import ErrorHandler from '../error-pages/ErrorHandler';
import SideBarLayout from '../layouts/SideBarLayout';

import useItemSelect from '../../hooks/useItemSelect';

import {
  getLocationObjForParams,
  getParamsFromURL,
  getSortableColumnToSortColumn,
} from '../../../uniprotkb/utils/resultsUtils';

import useDataApi from '../../hooks/useDataApi';
import useDataApiWithStale from '../../hooks/useDataApiWithStale';
import useNS from '../../hooks/useNS';

import apiUrls, { getAPIQueryUrl } from '../../config/apiUrls';
import infoMappings from '../../config/InfoMappings';
import fieldsForUniProtKBCards from '../../../uniprotkb/config/UniProtKBCardConfiguration';

import { mainNamespaces, Namespace } from '../../types/namespaces';
import Response from '../../../uniprotkb/types/responseTypes';
import {
  ReceivedFieldData,
  SortDirection,
} from '../../../uniprotkb/types/resultsTypes';

import './styles/results-table.scss';
import useUserPreferences from '../../hooks/useUserPreferences';
import { Column, nsToDefaultColumns } from '../../config/columns';
import { APIModel } from '../../types/apiModel';
import usePrefetch from '../../hooks/usePrefetch';
import {
  getEntryPathFor,
  SearchResultsLocations,
} from '../../../app/config/urls';
import { getIdKeyFor } from '../../utils/getIdKeyForNamespace';
import getNextURLFromHeaders from '../../utils/getNextURLFromHeaders';
import ResultsData from './ResultsData';

export enum ViewMode {
  TABLE,
  CARD,
}

const getQueryColumns = (
  viewMode: ViewMode,
  columns: Column[],
  namespace: Namespace
) => {
  let queryColumns = viewMode === ViewMode.CARD ? undefined : columns;
  if (viewMode === ViewMode.CARD) {
    // TODO: Do similar things for the rest of namespaces
    if (namespace === Namespace.uniprotkb) {
      queryColumns = fieldsForUniProtKBCards;
    }
  }
  return queryColumns;
};

const Results: FC = () => {
  // hooks
  const namespace = useNS() || Namespace.uniprotkb;
  const history = useHistory();
  const [viewMode] = useUserPreferences<ViewMode>('view-mode', ViewMode.CARD);
  const [columns] = useUserPreferences<Column[]>(
    `table columns for ${namespace}` as const,
    nsToDefaultColumns[namespace]
  );
  const { search: queryParamFromUrl } = useLocation();
  const [selectedEntries, handleEntrySelection] = useItemSelect();

  // refs
  const prevNamespace = useRef<Namespace>(namespace);
  useEffect(() => {
    // will set it *after* the current render
    prevNamespace.current = namespace;
  });
  const prevColumns = useRef<Column[] | undefined>(columns);
  useEffect(() => {
    // will set it *after* the current render
    prevColumns.current = columns;
  });
  const prevViewMode = useRef<ViewMode>(viewMode);
  useEffect(() => {
    prevViewMode.current = viewMode;
  });

  const {
    query,
    selectedFacets,
    sortColumn,
    sortDirection,
    direct,
  } = getParamsFromURL(queryParamFromUrl);

  const { data: dataResultFields } = useDataApi<ReceivedFieldData>(
    // No configure endpoint for supporting data
    mainNamespaces.has(namespace) ? apiUrls.resultsFields(namespace) : null
  );

  const sortableColumnToSortColumn = useMemo(
    () => getSortableColumnToSortColumn(dataResultFields),
    [dataResultFields]
  );

  // facets without results
  const facetsApiUrl = getAPIQueryUrl({
    namespace,
    query,
    selectedFacets,
    sortColumn,
    sortDirection,
    // Not really interested in the list of results here, try to reduce payload
    size: 0,
  });

  const {
    data: facetsData,
    error: facetsError,
    loading: facetsLoading,
    progress: facetsProgress,
    headers: facetsHeaders,
    status: facetsStatus,
    isStale: facetsIsStale,
  } = useDataApiWithStale<Response['data']>(facetsApiUrl);

  // results without facets
  const queryColumns = getQueryColumns(viewMode, columns, namespace);
  const initialResultsApiUrl = getAPIQueryUrl({
    namespace,
    query,
    // TODO: Do similar things for the rest of namespaces
    columns: queryColumns,
    selectedFacets,
    // Not really interested in the facets here, so try to reduce payload
    facets: null,
    sortColumn,
    sortDirection,
  });
  const [resultsApiUrl, setResultsApiUrl] = useState(initialResultsApiUrl);
  const [nextResultsApiUrl, setNextResultsApiUrl] = useState<string>();
  usePrefetch(nextResultsApiUrl);
  const [allResults, setAllResults] = useState<APIModel[]>([]);

  // Reset if the initialResultsApiUrl changes
  useEffect(() => {
    setAllResults([]);
    setNextResultsApiUrl(undefined);
    setResultsApiUrl(initialResultsApiUrl);
  }, [initialResultsApiUrl]);

  const {
    data: resultsData,
    loading: resultsLoading,
    progress: resultsProgress,
    headers: resultsHeaders,
  } = useDataApi<{
    results: APIModel[];
  }>(resultsApiUrl);

  const [getIdKey, getEntryPathForEntry] = useMemo(() => {
    const getIdKey = getIdKeyFor(namespace);
    const getEntryPath = getEntryPathFor(namespace);
    return [getIdKey, (entry: APIModel) => getEntryPath(getIdKey(entry))];
  }, [namespace]);

  const total =
    (facetsHeaders?.['x-totalrecords'] &&
      (+facetsHeaders['x-totalrecords'] || 0)) ||
    (resultsHeaders?.['x-totalrecords'] &&
      (+resultsHeaders['x-totalrecords'] || 0));

  // redirect to entry directly when only 1 result and query marked as "direct"
  useEffect(() => {
    if (direct && total === 1 && allResults.length === 1) {
      const uniqueItem = allResults[0];
      history.replace(getEntryPathForEntry(uniqueItem));
    }
  }, [history, direct, allResults, getEntryPathForEntry, total]);

  useEffect(() => {
    if (!resultsData) {
      return;
    }
    const { results } = resultsData;
    setAllResults((allRes) => [...allRes, ...results]);
    setNextResultsApiUrl(getNextURLFromHeaders(resultsHeaders));
  }, [resultsData, resultsHeaders]);

  if (facetsError || !(facetsLoading || facetsData) || !namespace) {
    return <ErrorHandler status={facetsStatus} />;
  }

  // no results if total is 0, or if not loading anymore and still no total info
  if (total === 0 || !(total || facetsLoading || resultsLoading)) {
    return <NoResultsPage />;
  }

  const hasMoreData = (total || 0) > allResults.length;

  const handleLoadMoreRows = () =>
    nextResultsApiUrl && setResultsApiUrl(nextResultsApiUrl);

  const handleColumnSort = (columnName: string) => {
    const sortColumn = sortableColumnToSortColumn.get(columnName as Column);
    if (!sortColumn) {
      return;
    }

    // Change sort direction
    const updatedSortDirection =
      !sortDirection || sortDirection === SortDirection.descend
        ? SortDirection.ascend
        : SortDirection.descend;

    history.push(
      getLocationObjForParams({
        pathname: SearchResultsLocations[namespace],
        query,
        selectedFacets,
        sortColumn,
        sortDirection: updatedSortDirection,
      })
    );
  };

  const { name, links, info } = infoMappings[namespace];

  return (
    <SideBarLayout
      title={
        <PageIntro title={name} links={links} resultsCount={total}>
          {info}
        </PageIntro>
      }
      actionButtons={
        <ResultsButtons
          query={query}
          selectedFacets={selectedFacets}
          selectedEntries={selectedEntries}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          total={total || 0}
        />
      }
      sidebar={
        facetsLoading && !facetsData?.facets ? (
          <Loader progress={facetsProgress} />
        ) : (
          <ResultsFacets
            facets={facetsData?.facets || []}
            isStale={facetsIsStale}
          />
        )
      }
    >
      {
        // if loading the first page of results
        (resultsLoading && resultsApiUrl === initialResultsApiUrl) ||
        // or we just switched namespace (a bit hacky workaround to force unmount)
        prevNamespace.current !== namespace ||
        // or we just switched view mode (hacky too)
        prevViewMode.current !== viewMode ||
        // or we just changed the displayed columns (hacky too...)
        prevColumns.current !== columns ? (
          <Loader progress={resultsProgress} />
        ) : (
          <ResultsData
            namespace={namespace}
            viewMode={viewMode}
            getIdKey={getIdKey}
            results={allResults}
            selectedEntries={selectedEntries}
            handleEntrySelection={handleEntrySelection}
            sortableColumnToSortColumn={sortableColumnToSortColumn}
            handleLoadMoreRows={handleLoadMoreRows}
            hasMoreData={hasMoreData}
            progress={resultsProgress}
            handleColumnSort={handleColumnSort}
            columns={columns}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
          />
        )
      }
    </SideBarLayout>
  );
};

export default Results;
