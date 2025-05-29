import joinUrl from 'url-join';

import { Namespace } from '../../types/namespaces';
import { FileFormat } from '../../types/resultsDownload';
import { stringifyUrl } from '../../utils/url';
import { Column } from '../columns';
import { fileFormatToUrlParameter } from '../resultsDownload';
import { apiPrefix } from './apiPrefix';
import { searchPrefix } from './search';

export const entry = (
  id: string | undefined,
  namespace: Namespace,
  columns?: Column[]
) => {
  if (!id) {
    return undefined;
  }
  const url = joinUrl(apiPrefix, namespace, id);
  if (columns?.length) {
    return stringifyUrl(url, { fields: columns.join(',') });
  }
  return url;
};

export const download = (
  accession: string,
  format: FileFormat,
  namespace: Namespace = Namespace.uniprotkb
) =>
  format === FileFormat.fastaCanonicalIsoform
    ? stringifyUrl(searchPrefix(namespace), {
        query: `accession:${accession}`,
        includeIsoform: true,
        format: fileFormatToUrlParameter[FileFormat.fastaCanonicalIsoform],
        size: 500,
        sort: 'accession asc',
      })
    : `${entry(accession, namespace)}.${fileFormatToUrlParameter[format]}`;

export const sequenceFasta = (accession: string, namespace?: Namespace) =>
  `${entry(accession, namespace || Namespace.uniprotkb)}.fasta`;
