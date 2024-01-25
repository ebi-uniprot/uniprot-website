import joinUrl from 'url-join';

import { apiPrefix } from '../../../shared/config/apiUrls/apiPrefix';

export const statistics = (
  releaseNumber: string,
  type: 'reviewed' | 'unreviewed'
) => joinUrl(apiPrefix, 'statistics', 'releases', releaseNumber, type);
