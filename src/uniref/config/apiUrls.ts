import qs from 'query-string';
import joinUrl from '../../shared/config/testingApiUrls'; // TODO: revert import to: import joinUrl from 'url-join'

import { apiPrefix } from '../../shared/config/apiUrls';
import { FileFormat } from '../../shared/types/resultsDownload';
import { fileFormatToUrlParameter } from '../../shared/config/resultsDownload';

const apiUrls = {
  members: (
    id: string,
    options: {
      facets?: Readonly<string[]>;
      selectedFacets?: string[];
      size?: number;
      format?: FileFormat.json | FileFormat.list; // TODO: add when supported: | FileFormat.tsv | FileFormat.xml https://www.ebi.ac.uk/panda/jira/browse/TRM-27641
    } = {}
  ) =>
    qs.stringifyUrl({
      url: joinUrl(apiPrefix, 'uniref', id, 'members'),
      query: {
        size: options.size,
        facets: options.facets?.join(',') || undefined,
        facetFilter: options.selectedFacets?.join(' AND ') || undefined,
        format: options.format
          ? fileFormatToUrlParameter[options.format]
          : undefined,
      },
    }),
};

export default apiUrls;
