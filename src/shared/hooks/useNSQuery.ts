import { useLocation } from 'react-router';

import useNS from './useNS';
import useViewMode, { ViewMode } from './useViewMode';
import useColumnNames from './useColumnNames';

import { getParamsFromURL } from '../../uniprotkb/utils/resultsUtils';
import apiUrls from '../config/apiUrls/apiUrls';
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
  overrideView?: ViewMode;
  overrideQuery?: string;
  facetsNotApplied?: boolean;
  getSequence?: boolean;
  noSort?: boolean;
};

const useNSQuery = ({
  size,
  withFacets = false,
  withColumns = true,
  withQuery = true,
  accessions,
  overrideNS,
  overrideView,
  overrideQuery,
  facetsNotApplied,
  getSequence = false,
  noSort = false,
}: Arg = {}) => {
  const namespace = useNS(overrideNS) || Namespace.uniprotkb;
  const { search: queryParamFromUrl } = useLocation();
  const { viewMode } = useViewMode(overrideNS);
  const { columnNames } = useColumnNames({
    namespaceOverride: overrideNS,
    getSequence,
  });

  const [{ query, selectedFacets, sortColumn, sortDirection }] =
    getParamsFromURL(queryParamFromUrl);

  let queryColumns: Column[] | undefined = columnNames;

  // TODO: put this into useColumnNames
  if ((overrideView || viewMode) === 'cards') {
    // TODO: Do similar things for the rest of namespaces
    if (namespace === Namespace.uniprotkb) {
      queryColumns = fieldsForUniProtKBCards;
    } else {
      queryColumns = undefined;
    }
  }

  if (!(overrideQuery || query || accessions?.length)) {
    return undefined;
  }

  const options = {
    namespace,
    query: withQuery ? overrideQuery || query : undefined,
    columns: withColumns ? queryColumns : undefined,
    selectedFacets: facetsNotApplied ? undefined : selectedFacets,
    facets: withFacets ? undefined : null,
    sortColumn,
    sortDirection,
    size,
    noSort,
  };
  return accessions
    ? apiUrls.search.accessions(accessions, options)
    : apiUrls.search.search(options);
};

export default useNSQuery;
