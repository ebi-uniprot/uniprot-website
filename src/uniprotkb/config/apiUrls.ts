import joinUrl from 'url-join';

import { apiPrefix } from '../../shared/config/apiUrls';
import { stringifyUrl } from '../../shared/utils/url';

export type GroupBy = 'ec' | 'go' | 'keyword' | 'taxonomy';

const apiUrls = {
  groupBy: (by: GroupBy, query: string, parent?: string) =>
    stringifyUrl(joinUrl(apiPrefix, 'uniprotkb/groups', by), { query, parent }),
};

export default apiUrls;
