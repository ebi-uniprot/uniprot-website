import joinUrl from 'url-join';

import { apiPrefix } from '../../shared/config/apiUrls/apiPrefix';
import { fileFormatToUrlParameter } from '../../shared/config/resultsDownload';
import { stringifyUrl } from '../../shared/utils/url';

import { FileFormat } from '../../shared/types/resultsDownload';

const databases = (
  upid: string,
  stream?: boolean,
  options: {
    format?: FileFormat.tsv | FileFormat.json;
    size?: number;
    fields?: string;
  } = {}
) => {
  const url = stream
    ? joinUrl(apiPrefix, 'uniparc', upid, 'databases', 'stream')
    : joinUrl(apiPrefix, 'uniparc', upid, 'databases');
  return stringifyUrl(url, {
    format: fileFormatToUrlParameter[options.format || FileFormat.json],
    size: options.size,
    fields: options.fields,
  });
};

export default { databases };
