import qs from 'query-string';
import joinUrl from '../../shared/config/testingApiUrls'; // TODO: revert import to: import joinUrl from 'url-join'

import { devPrefix } from '../../shared/config/apiUrls';

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
      (querystring ? `?${querystring}` : '')
    );
  },
  search: joinUrl(devPrefix, 'uniprot/api/uniref/search'),
};

export default apiUrls;
