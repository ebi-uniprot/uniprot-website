import joinUrl from 'url-join';

import { apiPrefix } from '../../../shared/config/apiUrls/apiPrefix';
import { stringifyUrl } from '../../../shared/utils/url';

export const search = (accession: string) =>
  stringifyUrl(joinUrl(apiPrefix, 'genecentric/search'), {
    query: `accession:${accession}`,
  });
