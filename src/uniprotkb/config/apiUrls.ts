import queryString from 'query-string';
import joinUrl from 'url-join';

import { apiPrefix } from '../../shared/config/apiUrls';

type GroupBy = 'taxonomy';

const apiUrls = {
  groupBy: (by: GroupBy, query: string, parent?: number) =>
    queryString.stringifyUrl({
      url: joinUrl(apiPrefix, 'uniprotkb/view', by),
      query: { query, parent },
    }),
};

export default apiUrls;
