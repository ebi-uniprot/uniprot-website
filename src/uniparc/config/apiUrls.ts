import joinUrl from 'url-join';

import { apiPrefix } from '../../shared/config/apiUrls/apiPrefix';
import { fileFormatToUrlParameter } from '../../shared/config/resultsDownload';
import { FileFormat } from '../../shared/types/resultsDownload';
import { stringifyUrl } from '../../shared/utils/url';

const databases = (
  upid: string,
  stream?: boolean,
  options: {
    format?: FileFormat.tsv | FileFormat.json;
    size?: number;
    fields?: string;
    facets?: string;
  } = {}
) => {
  const url = stream
    ? joinUrl(apiPrefix, 'uniparc', upid, 'databases', 'stream')
    : joinUrl(apiPrefix, 'uniparc', upid, 'databases');
  return stringifyUrl(url, {
    format: fileFormatToUrlParameter[options.format || FileFormat.json],
    size: options.size,
    fields: options.fields,
    facets: options.facets,
  });
};

export const proteomeFasta = (upid: string, stream?: boolean) => {
  const baseUrl = stream
    ? joinUrl(apiPrefix, 'uniparc', 'proteome', upid, 'stream')
    : joinUrl(apiPrefix, 'uniparc', 'proteome', upid);
  return stringifyUrl(baseUrl, {
    format: fileFormatToUrlParameter[FileFormat.fasta],
  });
};

export default { databases };
