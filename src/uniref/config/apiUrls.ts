import joinUrl from 'url-join';

import { apiPrefix } from '../../shared/config/apiUrls/apiPrefix';
import { fileFormatToUrlParameter } from '../../shared/config/resultsDownload';
import { type FileFormat } from '../../shared/types/resultsDownload';
import { stringifyUrl } from '../../shared/utils/url';

const members = (
  id: string,
  isDownload: boolean = false,
  options: {
    facets?: Readonly<string[]>;
    selectedFacets?: string[];
    size?: number;
    format?: FileFormat.json | FileFormat.list;
  } = {}
) => {
  const baseUrl = joinUrl(
    apiPrefix,
    'uniref',
    id,
    'members',
    isDownload ? 'stream' : ''
  );

  const params = {
    format: options.format
      ? fileFormatToUrlParameter[options.format]
      : undefined,
    ...(!isDownload && {
      size: options.size,
      facets: options.facets?.join(',') || undefined,
      facetFilter: options.selectedFacets?.join(' AND ') || undefined,
    }),
  };

  return stringifyUrl(baseUrl, params);
};

export default { members };
