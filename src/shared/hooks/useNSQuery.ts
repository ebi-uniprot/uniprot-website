import { useLocation } from 'react-router-dom';

import useNS from './useNS';
import useViewMode, { ViewMode } from './useViewMode';
import useColumnNames from './useColumnNames';

import { getParamsFromURL } from '../../uniprotkb/utils/resultsUtils';
import { getAccessionsURL, getAPIQueryUrl } from '../config/apiUrls';
import fieldsForUniProtKBCards from '../../uniprotkb/config/UniProtKBCardConfiguration';

import { Column } from '../config/columns';
import { UniProtKBColumn } from '../../uniprotkb/types/columnTypes';
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

  let queryColumns: Column[] | undefined = columnNames?.filter(
    (c) => c !== UniProtKBColumn.alphafold
  );

  // TODO: put this into useColumnNames
  if ((overrideView || viewMode) === 'cards') {
    // TODO: Do similar things for the rest of namespaces
    if (
      namespace === Namespace.uniprotkb ||
      namespace === Namespace.alphafold
    ) {
      queryColumns = fieldsForUniProtKBCards;
    } else {
      queryColumns = undefined;
    }
  }

  if (!(overrideQuery || query || accessions?.length)) {
    return undefined;
  }

  const options = {
    namespace:
      namespace === Namespace.alphafold ? Namespace.uniprotkb : namespace,
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
    ? getAccessionsURL(accessions, options)
    : getAPIQueryUrl(options);
};

export default useNSQuery;
