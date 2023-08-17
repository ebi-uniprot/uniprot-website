import joinUrl from 'url-join';

import { apiPrefix } from '../../shared/config/apiUrls';
import { fileFormatToUrlParameter } from '../../shared/config/resultsDownload';
import { stringifyUrl } from '../../shared/utils/url';

import { FileFormat } from '../../shared/types/resultsDownload';

const apiUrls = {
  databases: (
    upid: string,
    options: { format?: FileFormat.tsv | FileFormat.json; size?: number } = {}
  ) =>
    stringifyUrl(joinUrl(apiPrefix, 'uniparc', upid, 'databases'), {
      format: fileFormatToUrlParameter[options.format || FileFormat.json],
      size: options.size,
    }),
};

export default apiUrls;
