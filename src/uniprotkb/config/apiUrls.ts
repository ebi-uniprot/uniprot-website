import queryString from 'query-string';
import joinUrl from 'url-join';

import { apiPrefix } from '../../shared/config/apiUrls';

type ViewByHow = 'taxonomy';

const apiUrls = {
  viewBy: (how: ViewByHow, query: string, parent: number) =>
    queryString.stringifyUrl({
      url: joinUrl(apiPrefix, 'view', how),
      query: { query, parent },
    }),
};

export default apiUrls;
