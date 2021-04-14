import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import useUserPreferences from './useUserPreferences';
import useNS from './useNS';

import { getParamsFromURL } from '../../uniprotkb/utils/resultsUtils';
import { getAPIQueryUrl } from '../config/apiUrls';
import fieldsForUniProtKBCards from '../../uniprotkb/config/UniProtKBCardConfiguration';
import { Column, nsToDefaultColumns } from '../config/columns';

import { ViewMode } from '../components/results/ResultsData';
import { Namespace } from '../types/namespaces';

const useNSQuery = ({
  size,
  withFacets = true,
}: {
  size?: number;
  withFacets?: boolean;
} = {}) => {
  const namespace = useNS() || Namespace.uniprotkb;
  const location = useLocation();
  const [viewMode] = useUserPreferences<ViewMode>('view-mode', ViewMode.CARD);
  const [columns] = useUserPreferences<Column[]>(
    `table columns for ${namespace}` as const,
    nsToDefaultColumns[namespace]
  );

  const [url, setUrl] = useState<string>();

  let queryColumns = viewMode === ViewMode.CARD ? undefined : columns;
  if (viewMode === ViewMode.CARD) {
    // TODO: Do similar things for the rest of namespaces
    if (namespace === Namespace.uniprotkb) {
      queryColumns = fieldsForUniProtKBCards;
    }
  }

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
        facets: withFacets ? undefined : null,
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
    withFacets,
    sortColumn,
    sortDirection,
    size,
  ]);

  return { url, direct };
};

export default useNSQuery;
