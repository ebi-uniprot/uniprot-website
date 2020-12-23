import { FC, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { PageIntro, Loader } from 'franklin-sites';

import ResultsView from './ResultsView';
import ResultsButtons from './ResultsButtons';
import ResultsFacets from './ResultsFacets';
import NoResultsPage from '../error-pages/NoResultsPage';
import ErrorHandler from '../error-pages/ErrorHandler';
import SideBarLayout from '../layouts/SideBarLayout';

import {
  getLocationObjForParams,
  getParamsFromURL,
  getSortableColumnToSortColumn,
} from '../../../uniprotkb/utils/resultsUtils';

import useLocalStorage from '../../hooks/useLocalStorage';
import useDataApi from '../../hooks/useDataApi';
import useDataApiWithStale from '../../hooks/useDataApiWithStale';
import useNS from '../../hooks/useNS';

import apiUrls, { getAPIQueryUrl } from '../../config/apiUrls';
import infoMappings from '../../config/InfoMappings';
import { Column, nsToDefaultColumns } from '../../config/columns';

import { Namespace } from '../../types/namespaces';
import Response from '../../../uniprotkb/types/responseTypes';
import { ReceivedFieldData } from '../../../uniprotkb/types/resultsTypes';

import './styles/results-table.scss';

export enum ViewMode {
  TABLE,
  CARD,
}

const Results: FC = () => {
  const namespace = useNS() || Namespace.uniprotkb;
  const history = useHistory();

  const { search: queryParamFromUrl } = useLocation();
  const { query, selectedFacets, sortColumn, sortDirection } = getParamsFromURL(
    queryParamFromUrl
  );
  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);
  const [sortableColumnToSortColumn, setSortableColumnToSortColumn] = useState<
    Map<Column, string>
  >();

  const [viewMode, setViewMode] = useLocalStorage<ViewMode>(
    'view-mode',
    ViewMode.CARD
  );

  const [tableColumns, setTableColumns] = useLocalStorage<Column[]>(
    `table columns for ${namespace}`,
    namespace ? nsToDefaultColumns[namespace] : []
  );

  const { data: dataResultFields } = useDataApi<ReceivedFieldData>(
    apiUrls.resultsFields(namespace)
  );

  useEffect(() => {
    if (!dataResultFields) {
      return;
    }
    setSortableColumnToSortColumn(
      getSortableColumnToSortColumn(dataResultFields)
    );
  }, [dataResultFields]);

  /**
   * WARNING: horrible hack to get the switch between
   * table and cards to work while we wait for the backend
   * to generate a column for card counts and we refactor
   * this class as a functional component and put all url
   * parameters in the store.
   */
  const columns =
    viewMode === ViewMode.TABLE && tableColumns ? tableColumns : [];

  const initialApiUrl = getAPIQueryUrl({
    namespace,
    query,
    columns: namespace === Namespace.uniparc ? undefined : columns,
    selectedFacets,
    sortColumn,
    sortDirection,
    // Not really interested in the list of results here, try to reduce payload
    size: 1, // TODO: change to 0 whenever the API accepts it
  });

  const {
    data,
    error,
    loading,
    headers,
    status,
    isStale,
  } = useDataApiWithStale<Response['data']>(initialApiUrl);

  if (error || !(loading || data) || !namespace) {
    return <ErrorHandler status={status} />;
  }

  const total = headers?.['x-totalrecords']
    ? +headers['x-totalrecords']
    : undefined;

  // no results if total is 0, or if not loading anymore and still no total info
  if (total === 0 || !(total || loading)) {
    return <NoResultsPage />;
  }

  const handleEntrySelection = (rowId: string): void => {
    const filtered = selectedEntries.filter((id) => id !== rowId);
    setSelectedEntries(
      filtered.length === selectedEntries.length
        ? [...selectedEntries, rowId]
        : filtered
    );
  };

  if (!sortableColumnToSortColumn || !sortableColumnToSortColumn.size) {
    return <Loader />;
  }

  const handleTableColumnsChange = (columns: Column[]) => {
    if (
      sortColumn &&
      !columns.some(
        (column) => sortableColumnToSortColumn?.get(column) === sortColumn
      )
    ) {
      history.push(
        getLocationObjForParams({
          pathname: `/${namespace}`,
          query,
          selectedFacets,
        })
      );
    }
    setTableColumns(columns);
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
          viewMode={viewMode ?? ViewMode.CARD}
          setViewMode={setViewMode}
          query={query}
          selectedFacets={selectedFacets}
          selectedEntries={selectedEntries}
          sortColumn={sortColumn}
          sortDirection={sortDirection}
          total={total || 0}
          tableColumns={tableColumns as Column[]}
          onTableColumnsChange={handleTableColumnsChange}
        />
      }
      sidebar={
        loading ? (
          <Loader />
        ) : (
          <ResultsFacets facets={data?.facets || []} isStale={isStale} />
        )
      }
    >
      <ResultsView
        columns={columns}
        handleEntrySelection={handleEntrySelection}
        selectedEntries={selectedEntries}
        viewMode={viewMode ?? ViewMode.CARD}
        sortableColumnToSortColumn={sortableColumnToSortColumn}
      />
    </SideBarLayout>
  );
};

export default Results;
