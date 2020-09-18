import queryString from 'query-string';
import joinUrl from 'url-join';

export const devPrefix = 'http://wp-np2-be:8091';
export const prodPrefix = 'https://www.ebi.ac.uk';

const apiUrls = {
  search: joinUrl(devPrefix, 'uniprot/api/uniref/search'),
};

export default apiUrls;

export const getAPIQueryUrl = (query: string) => {
  return `${apiUrls.search}?${queryString.stringify({
    query: `${query}`,
  })}`;
};
