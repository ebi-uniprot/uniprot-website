import joinUrl from 'url-join';

import { apiPrefix } from '../../../shared/config/apiUrls/apiPrefix';
import { stringifyUrl } from '../../../shared/utils/url';

export type GroupBy = 'ec' | 'go' | 'keyword' | 'taxonomy';

export const search = (by: GroupBy, query: string, parent?: string) =>
  stringifyUrl(joinUrl(apiPrefix, 'uniprotkb/groups', by), { query, parent });
