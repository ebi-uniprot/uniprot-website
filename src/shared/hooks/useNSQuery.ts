import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import useUserPreferences from './useUserPreferences';
import useNS from './useNS';

import { getParamsFromURL } from '../../uniprotkb/utils/resultsUtils';
import { getAccessionsURL, getAPIQueryUrl } from '../config/apiUrls';
import fieldsForUniProtKBCards from '../../uniprotkb/config/UniProtKBCardConfiguration';
import { Column, nsToDefaultColumns } from '../config/columns';

import { ViewMode } from '../components/results/ResultsData';
import { Namespace } from '../types/namespaces';

const useNSQuery = ({
  size,
  withFacets = false,
  withColumns = true,
  accessions = [],
}: {
  size?: number;
  withFacets?: boolean;
  withColumns?: boolean;
  accessions?: string[];
} = {}) => {
  const namespace = useNS() || Namespace.uniprotkb;
  const location = useLocation();
  const [viewMode] = useUserPreferences<ViewMode>('view-mode', ViewMode.CARD);
  const [columns] = useUserPreferences<Column[]>(
    `table columns for ${namespace}` as const,
    nsToDefaultColumns[namespace]
  );

  let queryColumns = viewMode === ViewMode.CARD ? undefined : columns;
  if (viewMode === ViewMode.CARD) {
    // TODO: Do similar things for the rest of namespaces
    if (namespace === Namespace.uniprotkb) {
      queryColumns = fieldsForUniProtKBCards;
    }
  }

  const { search: queryParamFromUrl } = location;
  const { query, selectedFacets, sortColumn, sortDirection, direct } =
    getParamsFromURL(queryParamFromUrl);

  const url = useMemo(() => {
    if (!query && !accessions.length) {
      return undefined;
    }
    const options = {
      namespace,
      query,
      columns: withColumns ? queryColumns : undefined,
      selectedFacets,
      facets: withFacets ? undefined : null,
      sortColumn,
      sortDirection,
      size,
    };
    return accessions.length
      ? getAccessionsURL(accessions, options)
      : getAPIQueryUrl(options);
  }, [
    namespace,
    query,
    withColumns,
    queryColumns,
    selectedFacets,
    withFacets,
    sortColumn,
    sortDirection,
    size,
    accessions,
  ]);

  return { url, direct };
};

export default useNSQuery;
