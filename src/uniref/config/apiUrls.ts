import queryString from 'query-string';
import joinUrl from 'url-join';

export const devPrefix = 'http://wp-np2-be:8091';
export const prodPrefix = 'https://www.ebi.ac.uk';

const apiUrls = {
  entry: (id?: string) => id && joinUrl(devPrefix, '/uniprot/api/uniref', id),
  members: (
    id?: string,
    options?: { facets?: string[]; selectedFacets?: string[] }
  ) =>
    id &&
    joinUrl(
      devPrefix,
      '/uniprot/api/uniref',
      id,
      'members',
      options?.facets ? `?facets=${options?.facets.join(',')}` : '',
      options?.selectedFacets
        ? `?facetFilter=${options?.selectedFacets.join(',')}`
        : ''
    ),
  search: joinUrl(devPrefix, 'uniprot/api/uniref/search'),
};

export default apiUrls;

// TODO I don't think this is used - xav
export const getAPIQueryUrl = (query: string) =>
  `${apiUrls.search}?${queryString.stringify({
    query: `${query}`,
  })}`;
