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

const simplifiedQuery = new Map([
  ['(reviewed:true)', 'reviewed:true'],
  ['(*) and (reviewed:true)', 'reviewed:true'],
  ['(reviewed:true) and (*)', 'reviewed:true'],
  ['(reviewed:false)', 'reviewed:false'],
  ['(*) and (reviewed:false)', 'reviewed:false'],
  ['(reviewed:false) and (*)', 'reviewed:false'],
]);

const simplifyQuery = (query: string) => {
  const q = query.trim().toLowerCase();
  return simplifiedQuery.get(q) || q;
};

export const getUniprotkbFtpUrl = (downloadUrl: string, format: FileFormat) => {
  const parsed = queryString.parseUrl(downloadUrl);
  const { query } = parsed.query;
  const q = Array.isArray(query) ? query[0] : query;
  if (!q) {
    return null;
  }
  const ftpFilename = restQueryToFtpFilename.get(simplifyQuery(q));
  if (!ftpFilename) {
    return null;
  }
  const ftpFormat = restFormatToFtpFormat.get(format);
  if (!ftpFormat) {
    return null;
  }
  return joinUrl(
    ftpUniProt,
    'knowledgebase/complete',
    `${ftpFilename}.${ftpFormat}.gz`
  );
};

export default ftpUrls;
