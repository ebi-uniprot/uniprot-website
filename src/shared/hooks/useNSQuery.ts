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
  withQuery?: boolean;
  accessions?: string[];
  overrideNS?: Namespace;
  facetsNotApplied?: boolean;
  getSequence?: boolean;
};

const useNSQuery = ({
  size,
  withFacets = false,
  withColumns = true,
  withQuery = true,
  accessions,
  overrideNS,
  facetsNotApplied,
  getSequence = false,
}: Arg = {}) => {
  const namespace = useNS(overrideNS) || Namespace.uniprotkb;
  const location = useLocation();
  const { viewMode } = useViewMode(overrideNS);
  // TODO: destructure useColumnNames
  const { columnNames } = useColumnNames({
    namespaceOverride: overrideNS,
    getSequence,
  });

  const { search: queryParamFromUrl } = location;
  const [{ query, selectedFacets, sortColumn, sortDirection }] =
    getParamsFromURL(queryParamFromUrl);

  let queryColumns: Column[] | undefined = columnNames;

  // TODO: put this into useColumnNames
  if (viewMode === 'cards') {
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
      query: withQuery ? query : undefined,
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
    withFacets,
    withColumns,
    withQuery,
    queryColumns,
    facetsNotApplied,
    selectedFacets,
    sortColumn,
    sortDirection,
    size,
  ]);

  return url;
};

export default useNSQuery;
