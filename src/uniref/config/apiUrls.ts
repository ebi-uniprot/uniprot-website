import joinUrl from 'url-join';

import { apiPrefix } from '../../shared/config/apiUrls/apiPrefix';
import { fileFormatToUrlParameter } from '../../shared/config/resultsDownload';
import { stringifyUrl } from '../../shared/utils/url';

import { FileFormat } from '../../shared/types/resultsDownload';

const members = (
  id: string,
  options: {
    facets?: Readonly<string[]>;
    selectedFacets?: string[];
    size?: number;
    format?: FileFormat.json | FileFormat.list;
  } = {}
) =>
  stringifyUrl(joinUrl(apiPrefix, 'uniref', id, 'members'), {
    size: options.size,
    facets: options.facets?.join(',') || undefined,
    facetFilter: options.selectedFacets?.join(' AND ') || undefined,
    format: options.format
      ? fileFormatToUrlParameter[options.format]
      : undefined,
  });

export default { members };
