import joinUrl from 'url-join';

import { stringifyUrl } from '../../../shared/utils/url';

import { apiPrefix } from '../../../shared/config/apiUrls/apiPrefix';

import { SelectedFacet } from '../../types/resultsTypes';

export const entryPublications = (accession: string) =>
  joinUrl(apiPrefix, 'uniprotkb', accession, 'publications');

type GetUniProtPublicationsQueryUrl = {
  accession: string;
  facets?: string[];
  selectedFacets: SelectedFacet[];
  size?: number;
};
export const getUniProtPublicationsQueryUrl = ({
  accession,
  facets,
  selectedFacets,
  size,
}: GetUniProtPublicationsQueryUrl) =>
  stringifyUrl(entryPublications(accession), {
    facets: facets?.join(','),
    facetFilter:
      selectedFacets
        .map((facet) => `(${facet.name}:"${facet.value}")`)
        .join(' AND ') || undefined,
    size,
  });
