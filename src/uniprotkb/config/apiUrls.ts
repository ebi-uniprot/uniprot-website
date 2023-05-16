import queryString from 'query-string';
import joinUrl from 'url-join';

import { apiPrefix } from '../../shared/config/apiUrls';

type GroupByHow = 'taxonomy';

const apiUrls = {
  viewBy: (how: GroupByHow, query: string, parent?: number) =>
    queryString.stringifyUrl({
      url: joinUrl(apiPrefix, 'uniprotkb/view', how),
      query: { query, parent },
    }),
};

export default apiUrls;
