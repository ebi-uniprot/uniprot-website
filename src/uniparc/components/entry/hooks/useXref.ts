import { useLocation } from 'react-router-dom';

import { getParamsFromURL } from '../../../../uniprotkb/utils/resultsUtils';
import apiUrls from '../../../config/apiUrls';

enum XRefFacetEnum {
  Status = 'status',
  Organisms = 'organisms',
  Databases = 'databases',
}

const defaultXrefFacets = [
  XRefFacetEnum.Status,
  XRefFacetEnum.Organisms,
  XRefFacetEnum.Databases,
];

type Arg = {
  accession?: string;
  size?: number;
  withFacets?: boolean;
  includeSources?: boolean;
};

const useXref = ({
  accession,
  size,
  withFacets = false,
  includeSources = false,
}: Arg = {}) => {
  const { search: queryParamFromUrl } = useLocation();

  const [{ selectedFacets }] = getParamsFromURL(queryParamFromUrl);

  if (accession) {
    return apiUrls.databases(accession, undefined, includeSources, undefined, {
      facets: withFacets ? defaultXrefFacets.join(',') : undefined,
      size,
      selectedFacets,
    });
  }
  return undefined;
};

export default useXref;
