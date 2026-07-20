import joinUrl from 'url-join';

import { apiPrefix } from '../../../shared/config/apiUrls/apiPrefix';

export const entry = (accession: string) =>
  joinUrl(apiPrefix, 'uniprotkb/protnlm', accession);
