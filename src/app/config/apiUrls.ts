import joinUrl from 'url-join';

import { stringifyUrl } from '../../shared/utils/url';
import {
  getApiSortDirection,
  SortDirection,
} from '../../uniprotkb/types/resultsTypes';

import { apiPrefix } from '../../shared/config/apiUrls/apiPrefix';

// Release notes
export const entry = (id?: string) =>
  id && joinUrl(apiPrefix, 'release-notes', id);

export const search = ({
  query,
  sort,
}: Record<string, string[] | string | null>) =>
  stringifyUrl(joinUrl(apiPrefix, 'release-notes/search'), {
    query: [query || '*'].filter(Boolean).join(' AND '),
    sort: sort || `release_date ${getApiSortDirection(SortDirection.descend)}`,
  });

export default { releaseNotes: { entry, search } };
