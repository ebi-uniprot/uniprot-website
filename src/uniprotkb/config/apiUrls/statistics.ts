import joinUrl from 'url-join';

import { apiPrefix } from '../../../shared/config/apiUrls/apiPrefix';

export const statistics = (
  releaseNumber: string,
  type?: 'reviewed' | 'unreviewed'
) =>
  type
    ? joinUrl(apiPrefix, 'statistics', 'releases', releaseNumber, type)
    : joinUrl(apiPrefix, 'statistics', 'releases', releaseNumber);
