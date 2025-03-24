import joinUrl from 'url-join';

import { apiPrefix } from '../../../shared/config/apiUrls/apiPrefix';
import { stringifyUrl } from '../../../shared/utils/url';

export const entry = (
  accession: string,
  {
    format,
    entryVersions,
    download,
    includeContent,
  }: {
    format: 'json' | 'fasta' | 'txt';
    entryVersions?: number | number[];
    download?: boolean;
    includeContent?: boolean;
  } = { format: 'json' }
) =>
  accession &&
  stringifyUrl(joinUrl(apiPrefix, 'unisave', accession), {
    format,
    versions: entryVersions,
    download: download ? 'true' : undefined,
    includeContent: includeContent ? 'true' : undefined,
  });

export const status = (accession: string) =>
  accession && joinUrl(apiPrefix, 'unisave', accession, 'status');
