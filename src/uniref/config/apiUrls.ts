import queryString from 'query-string';
import joinUrl from 'url-join';

export const devPrefix = 'https://wwwdev.ebi.ac.uk';
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
