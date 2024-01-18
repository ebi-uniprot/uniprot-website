import joinUrl from 'url-join';

import { stringifyUrl } from '../../../shared/utils/url';

import { apiPrefix } from '../../../shared/config/apiUrls/apiPrefix';

import { SelectedFacet } from '../../types/resultsTypes';

export const entryPublicationsPrefix = (accession: string) =>
  joinUrl(apiPrefix, 'uniprotkb', accession, 'publications');

type EntryPublications = {
  accession: string;
  facets?: string[];
  selectedFacets: SelectedFacet[];
  size?: number;
};

export const entryPublications = ({
  accession,
  facets,
  selectedFacets,
  size,
}: EntryPublications) =>
  stringifyUrl(entryPublicationsPrefix(accession), {
    facets: facets?.join(','),
    facetFilter:
      selectedFacets
        .map((facet) => `(${facet.name}:"${facet.value}")`)
        .join(' AND ') || undefined,
    size,
  });
