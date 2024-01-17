import joinUrl from 'url-join';

import { stringifyUrl } from '../../utils/url';
import { fileFormatToUrlParameter } from '../resultsDownload';

import { search } from './search';
import { apiPrefix } from './apiPrefix';

import { Namespace } from '../../types/namespaces';
import { FileFormat } from '../../types/resultsDownload';
import { Column } from '../columns';

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

export const entryDownload = (
  accession: string,
  format: FileFormat,
  namespace: Namespace = Namespace.uniprotkb
) =>
  format === FileFormat.fastaCanonicalIsoform
    ? stringifyUrl(search(namespace), {
        query: `accession:${accession}`,
        includeIsoform: true,
        format: fileFormatToUrlParameter[FileFormat.fastaCanonicalIsoform],
      })
    : `${entry(accession, namespace)}.${fileFormatToUrlParameter[format]}`;

export const sequenceFasta = (accession: string) =>
  `${entry(accession, Namespace.uniprotkb)}.fasta`;

export const genecentric = (accession: string) =>
  stringifyUrl(joinUrl(apiPrefix, 'genecentric/search'), {
    query: `accession:${accession}`,
  });
