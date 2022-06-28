import qs from 'query-string';
import joinUrl from 'url-join';

import { apiPrefix } from '../../shared/config/apiUrls';
import { fileFormatToUrlParameter } from '../../shared/config/resultsDownload';

import { FileFormat } from '../../shared/types/resultsDownload';

const apiUrls = {
  databases: (
    upid: string,
    options: { format?: FileFormat.tsv | FileFormat.json; size?: number } = {}
  ) =>
    qs.stringifyUrl({
      url: joinUrl(apiPrefix, 'uniparc', upid, 'databases'),
      query: {
        format: fileFormatToUrlParameter[options.format || FileFormat.json],
        size: options.size,
      },
    }),
};

export default apiUrls;
