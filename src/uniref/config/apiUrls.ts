import qs from 'query-string';
import joinUrl from '../../shared/config/testingApiUrls'; // TODO: revert import to: import joinUrl from 'url-join'

import { apiPrefix } from '../../shared/config/apiUrls';

const apiUrls = {
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
      joinUrl(apiPrefix, 'uniref', id, 'members') +
      (querystring ? `?${querystring}` : '')
    );
  },
};

export default apiUrls;
