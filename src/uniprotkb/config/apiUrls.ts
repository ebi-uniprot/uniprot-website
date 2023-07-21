import queryString from 'query-string';
import joinUrl from 'url-join';

import { apiPrefix } from '../../shared/config/apiUrls';

export type GroupBy = 'ec' | 'go' | 'keyword' | 'taxonomy';

const apiUrls = {
  groupBy: (by: GroupBy, query: string, parent?: string) =>
    queryString.stringifyUrl({
      url: joinUrl(apiPrefix, 'uniprotkb/groups', by),
      query: { query, parent },
    }),
};

export default apiUrls;
