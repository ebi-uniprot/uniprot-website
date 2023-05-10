import { capitalize } from 'lodash-es';
import joinUrl from 'url-join';
import queryString from 'query-string';

import { FileFormat } from '../types/resultsDownload';

const ftpUniProt = 'https://ftp.uniprot.org/pub/databases/uniprot/';

const ftpUrls = {
  uniprot: ftpUniProt,
  referenceProteomes: (id: string, superkingdom: string, taxonId: number) =>
    joinUrl(
      ftpUniProt,
      `/current_release/knowledgebase/reference_proteomes/${capitalize(
        superkingdom
      )}/${id}/${id}_${taxonId}.fasta.gz`
    ),
  panProteomes: (id: string) =>
    joinUrl(
      ftpUniProt,
      `/current_release/knowledgebase/pan_proteomes/${id}.fasta.gz`
    ),
};

const restFormatToFtpFormat = new Map([
  [FileFormat.fastaCanonical, 'fasta'],
  [FileFormat.text, 'dat'],
  [FileFormat.xml, 'xml'],
]);

const restQueryToFtpFilename = new Map([
  ['reviewed:true', 'uniprot_sprot'],
  ['reviewed:false', 'uniprot_trembl'],
]);

// This goes from an array of regexs with named capture groups to a
// a template string which will replace the capture group name
// eg $<bool> with the matched value.
const reToSimple = new Map([
  [
    [
      /^\(*reviewed:(?<bool>false|true)\)*(?:\s+and\s+\(*\*\)*)?$/,
      /^(?:\(*\*\)*\s+and\s+)?\(*reviewed:(?<bool>false|true)\)*$/,
    ],
    'reviewed:$<bool>',
  ],
]);

export const simplifyQuery = (query: string) => {
  const q = query.trim().toLowerCase();
  for (const [res, simple] of reToSimple) {
    for (const re of res) {
      const matches = Object.entries(q.match(re)?.groups || {});
      if (matches.length === 1) {
        const [k, v] = matches[0];
        return simple.replace(`$<${k}>`, v);
      }
    }
  }
  return null;
};

export const getUniprotkbFtpFilenameAndUrl = (
  downloadUrl: string,
  format: FileFormat
) => {
  const parsed = queryString.parseUrl(downloadUrl);
  const { query } = parsed.query;
  const q = Array.isArray(query) ? query[0] : query;
  if (!q) {
    return null;
  }
  const simplifiedQuery = simplifyQuery(q);
  if (!simplifiedQuery) {
    return null;
  }
  const ftpFilename = restQueryToFtpFilename.get(simplifiedQuery);
  if (!ftpFilename) {
    return null;
  }
  const ftpFormat = restFormatToFtpFormat.get(format);
  if (!ftpFormat) {
    return null;
  }
  const filename = `${ftpFilename}.${ftpFormat}.gz`;
  const url = joinUrl(ftpUniProt, 'knowledgebase/complete', filename);
  return { filename, url };
};

export default ftpUrls;
