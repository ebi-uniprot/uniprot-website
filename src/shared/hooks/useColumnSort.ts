import { useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import useDataApi from './useDataApi';
import useNS from './useNS';

import {
  getLocationObjForParams,
  getParamsFromURL,
  getSortableColumnToSortColumn,
} from '../../uniprotkb/utils/resultsUtils';
import apiUrls from '../config/apiUrls';
import { mainNamespaces } from '../types/namespaces';

import {
  ReceivedFieldData,
  SortDirection,
} from '../../uniprotkb/types/resultsTypes';
import { Column } from '../config/columns';
import { SearchResultsLocations } from '../../app/config/urls';

const useColumnSort = (): [
  Map<Column, string>,
  (columnName: string) => void
] => {
  const history = useHistory();
  const namespace = useNS();
  const location = useLocation();

  const { search: queryParamFromUrl } = location;
  const { query, selectedFacets, sortDirection } = getParamsFromURL(
    queryParamFromUrl
  );

  const { data: dataResultFields } = useDataApi<ReceivedFieldData>(
    // No configure endpoint for supporting data
    namespace && mainNamespaces.has(namespace)
      ? apiUrls.resultsFields(namespace)
      : null
  );

  const sortableColumnToSortColumn = useMemo(
    () => getSortableColumnToSortColumn(dataResultFields),
    [dataResultFields]
  );

  const updateColumnSort = (columnName: string) => {
    const sortColumn = sortableColumnToSortColumn.get(columnName as Column);
    if (!sortColumn || !namespace) {
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
  return [sortableColumnToSortColumn, updateColumnSort];
};

export default useColumnSort;
