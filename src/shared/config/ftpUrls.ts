import { capitalize } from 'lodash-es';
import joinUrl from 'url-join';
import queryString from 'query-string';

import { FileFormat } from '../types/resultsDownload';

const ftpUniProt = 'https://ftp.uniprot.org/pub/databases/uniprot/';

const ftpUrls = {
  uniprot: ftpUniProt,
  uniprotkb: joinUrl(ftpUniProt, 'knowledgebase/complete'),
  uniprotkb_reviewed: joinUrl(
    ftpUniProt,
    'knowledgebase/complete/uniprot_sprot'
  ),
  uniprotkb_unreviewed: joinUrl(
    ftpUniProt,
    'knowledgebase/complete/uniprot_trembl'
  ),
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
  embeddings: joinUrl(ftpUniProt, '/current_release/knowledgebase/embeddings/'),
};

const restFormatToFtpFormat = new Map([
  [FileFormat.fastaCanonical, 'fasta'],
  [FileFormat.text, 'dat'],
  [FileFormat.xml, 'xml'],
]);

const restQueryToFtpFilename = new Map([
  ['reviewed:true', 'uniprot_sprot'],
  ['reviewed:false', 'uniprot_trembl'],
  ['proteome:up000006548', 'UP000006548_3702/per-protein.h5'],
  ['proteome:up000001940', 'UP000001940_6239/per-protein.h5'],
  ['proteome:up000000625', 'UP000000625_83333/per-protein.h5'],
  ['proteome:up000005640', 'UP000005640_9606/per-protein.h5'],
  ['proteome:up000000589', 'UP000000589_10090/per-protein.h5'],
  ['proteome:up000002494', 'UP000002494_10116/per-protein.h5'],
  ['proteome:up000464024', 'UP000464024_2697049/per-protein.h5'],
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
  [
    [
      /^\(*proteome:(?<upid>up\d+)\)*$/,
      /^(?:\(*\*\)*\s+and\s+)?\(*proteome:(?<upid>up\d+)\)*$/,
    ],
    'proteome:$<upid>',
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
  let ftpFilename = restQueryToFtpFilename.get(simplifiedQuery);
  if (!ftpFilename) {
    return null;
  }
  if (format === FileFormat.embeddings) {
    if (ftpFilename === 'uniprot_sprot') {
      ftpFilename += '/per-protein.h5';
    }
    return {
      filename: ftpFilename,
      url: joinUrl(ftpUrls.embeddings, ftpFilename),
    };
  }
  const ftpFormat = restFormatToFtpFormat.get(format);
  if (!ftpFormat || simplifiedQuery.includes('proteome')) {
    return null;
  }
  const filename = `${ftpFilename}.${ftpFormat}.gz`;
  const url = joinUrl(ftpUrls.uniprotkb, filename);
  return { filename, url };
};

export default ftpUrls;
