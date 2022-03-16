import qs from 'query-string';
import joinUrl from '../../shared/config/testingApiUrls'; // TODO: revert import to: import joinUrl from 'url-join'

import { apiPrefix } from '../../shared/config/apiUrls';
import { fileFormatToUrlParameter } from '../../shared/config/resultsDownload';

import { FileFormat } from '../../shared/types/resultsDownload';

const apiUrls = {
  databases: (
    upid: string,
    format: FileFormat.tsv | FileFormat.json = FileFormat.tsv
  ) =>
    qs.stringifyUrl({
      url: joinUrl(apiPrefix, 'uniparc', upid, 'databases'),
      query: { format: fileFormatToUrlParameter[format] },
    }),
};

export default apiUrls;
