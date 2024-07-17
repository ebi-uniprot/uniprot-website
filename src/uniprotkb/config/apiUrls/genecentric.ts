import joinUrl from 'url-join';

import { stringifyUrl } from '../../../shared/utils/url';

import { apiPrefix } from '../../../shared/config/apiUrls/apiPrefix';

export const search = (accession: string) =>
  stringifyUrl(joinUrl(apiPrefix, 'genecentric/search'), {
    query: `accession:${accession}`,
  });
