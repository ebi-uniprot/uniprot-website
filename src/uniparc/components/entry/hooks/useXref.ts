import { useLocation } from 'react-router';
import joinUrl from 'url-join';

import { getParamsFromURL } from '../../../../uniprotkb/utils/resultsUtils';

import { stringifyUrl } from '../../../../shared/utils/url';
import { apiPrefix } from '../../../../shared/config/apiUrls/apiPrefix';

import { Namespace } from '../../../../shared/types/namespaces';

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
};

const useXref = ({ accession, size, withFacets = false }: Arg = {}) => {
  const { search: queryParamFromUrl } = useLocation();

  const [{ selectedFacets }] = getParamsFromURL(queryParamFromUrl);

  if (accession) {
    const xrefApiPrefix = joinUrl(
      apiPrefix,
      Namespace.uniparc,
      accession,
      'databases'
    );

    const options = {
      facets: withFacets ? defaultXrefFacets.join(',') : undefined,
      size,
      ...Object.fromEntries(
        selectedFacets.map(({ name, value }) => [name, value])
      ),
    };

    return stringifyUrl(xrefApiPrefix, options);
  }
  return undefined;
};

export default useXref;
