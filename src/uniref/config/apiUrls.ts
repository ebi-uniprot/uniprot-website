import qs from 'query-string';
import joinUrl from 'url-join';

export const devPrefix = 'http://wp-np2-be:8091';
export const prodPrefix = 'https://www.ebi.ac.uk';

const apiUrls = {
  entry: (id?: string) => id && joinUrl(devPrefix, '/uniprot/api/uniref', id),
  members: (
    id: string,
    options: {
      facets?: Readonly<string[]>;
      selectedFacets?: string[];
      size?: number;
    } = {}
  ) => {
    const querystring = qs.stringify({
      size: options.size,
      facets: options.facets?.join(',') || undefined,
      facetFilter: options.selectedFacets?.join(',') || undefined,
    });
    return (
      joinUrl(devPrefix, '/uniprot/api/uniref', id, 'members') +
      (querystring ? '?' : '') +
      querystring
    );
  },
  search: joinUrl(devPrefix, 'uniprot/api/uniref/search'),
};

export default apiUrls;
