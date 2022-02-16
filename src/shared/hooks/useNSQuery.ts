import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import useNS from './useNS';
import useViewMode from './useViewMode';
import useColumnNames from './useColumnNames';

import { getParamsFromURL } from '../../uniprotkb/utils/resultsUtils';
import { getAccessionsURL, getAPIQueryUrl } from '../config/apiUrls';
import fieldsForUniProtKBCards from '../../uniprotkb/config/UniProtKBCardConfiguration';
import { Column } from '../config/columns';

import { Namespace } from '../types/namespaces';

type Arg = {
  size?: number;
  withFacets?: boolean;
  withColumns?: boolean;
  accessions?: string[];
  overrideNS?: Namespace;
  facetsNotApplied?: boolean;
};

const useNSQuery = ({
  size,
  withFacets = false,
  withColumns = true,
  accessions,
  overrideNS,
  facetsNotApplied,
}: Arg = {}) => {
  const namespace = useNS(overrideNS) || Namespace.uniprotkb;
  const location = useLocation();
  const { viewMode } = useViewMode(overrideNS);
  const { columnNames } = useColumnNames(overrideNS);

  const { search: queryParamFromUrl } = location;
  const [{ query, selectedFacets, sortColumn, sortDirection }] =
    getParamsFromURL(queryParamFromUrl);

  let queryColumns: Column[] | undefined = columnNames;

  // TODO: put this into useColumnNames
  if (viewMode === 'card') {
    // TODO: Do similar things for the rest of namespaces
    if (namespace === Namespace.uniprotkb) {
      queryColumns = fieldsForUniProtKBCards;
    } else {
      queryColumns = undefined;
    }
  }

  const url = useMemo(() => {
    if (!(query || accessions?.length)) {
      return undefined;
    }

    const options = {
      namespace,
      query,
      columns: withColumns ? queryColumns : undefined,
      selectedFacets: facetsNotApplied ? undefined : selectedFacets,
      facets: withFacets ? undefined : null,
      sortColumn,
      sortDirection,
      size,
    };
    return accessions
      ? getAccessionsURL(accessions, options)
      : getAPIQueryUrl(options);
  }, [
    query,
    accessions,
    namespace,
    withColumns,
    queryColumns,
    facetsNotApplied,
    selectedFacets,
    withFacets,
    sortColumn,
    sortDirection,
    size,
  ]);

  return url;
};

export default useNSQuery;
