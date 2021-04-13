import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import useNS from './useNS';

import { getParamsFromURL } from '../../uniprotkb/utils/resultsUtils';
import { getAPIQueryUrl } from '../config/apiUrls';
import { Column } from '../config/columns';

const useNSQuery = ({
  queryColumns,
  facets,
  size,
}: {
  queryColumns?: Column[];
  facets?: string[];
  size?: number;
}) => {
  const namespace = useNS();
  const location = useLocation();
  const [url, setUrl] = useState<string>();

  const { search: queryParamFromUrl } = location;
  const {
    query,
    selectedFacets,
    sortColumn,
    sortDirection,
    direct,
  } = getParamsFromURL(queryParamFromUrl);

  useEffect(() => {
    setUrl(
      getAPIQueryUrl({
        namespace,
        query,
        columns: queryColumns,
        selectedFacets,
        facets,
        sortColumn,
        sortDirection,
        size,
      })
    );
  }, [
    namespace,
    query,
    queryColumns,
    selectedFacets,
    facets,
    sortColumn,
    sortDirection,
    size,
  ]);

  return { url, direct };
};

export default useNSQuery;
