import queryString from 'query-string';
import joinUrl from 'url-join';

export const devPrefix = 'http://wp-np2-be';
export const prodPrefix = 'https://www.ebi.ac.uk';

const apiUrls = {
  search: joinUrl(devPrefix, 'uniprot/api/uniref/search'),
};

export default apiUrls;

// TODO I don't think this is used - xav
export const getAPIQueryUrl = (query: string) =>
  `${apiUrls.search}?${queryString.stringify({
    query: `${query}`,
  })}`;
