import queryString from 'query-string';
import joinUrl from 'url-join';

export const devPrefix = 'https://wwwdev.ebi.ac.uk';
export const prodPrefix = 'https://www.ebi.ac.uk';

const apiUrls = {
  entry: (id?: string) => id && joinUrl(devPrefix, '/uniprot/api/uniref', id),
  members: (id?: string, facets?: string[]) =>
    id &&
    joinUrl(
      devPrefix,
      '/uniprot/api/uniref',
      id,
      'members',
      facets ? `?facets=${facets.join(',')}` : ''
    ),
  search: joinUrl(devPrefix, 'uniprot/api/uniref/search'),
};

export default apiUrls;

// TODO I don't think this is used - xav
export const getAPIQueryUrl = (query: string) =>
  `${apiUrls.search}?${queryString.stringify({
    query: `${query}`,
  })}`;
