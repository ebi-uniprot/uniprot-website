import { capitalize } from 'lodash-es';
import joinUrl from 'url-join';

import { FileFormat } from '../types/resultsDownload';
import { Namespace } from '../types/namespaces';

const ftpUniProt = 'https://ftp.uniprot.org/pub/databases/uniprot/';

const ftpUrls = {
  uniprot: ftpUniProt,
  uniprotkb: joinUrl(ftpUniProt, 'knowledgebase/complete'),
  uniprotkbReviewed: joinUrl(
    ftpUniProt,
    'knowledgebase/complete/uniprot_sprot'
  ),
  uniprotkbUnreviewed: joinUrl(
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
  embeddings: joinUrl(ftpUniProt, 'current_release/knowledgebase/embeddings'),
  uniref: joinUrl(ftpUniProt, 'uniref'),
  uniparc: joinUrl(ftpUniProt, 'uniparc'),
};

const namespaceToFtpUrlBase = new Map([
  [Namespace.uniprotkb, ftpUrls.uniprotkb],
  [Namespace.uniref, ftpUrls.uniref],
]);

const restFormatToFtpFormat = new Map([
  [FileFormat.fastaRepresentative, 'fasta'],
  [FileFormat.fastaCanonical, 'fasta'],
  [FileFormat.text, 'dat'],
  [FileFormat.xml, 'xml'],
]);

const namespaceToAvailableFormats = new Map([
  [
    Namespace.uniprotkb,
    new Set([
      FileFormat.fastaCanonical,
      FileFormat.text,
      FileFormat.xml,
      FileFormat.embeddings,
    ]),
  ],
  [Namespace.uniref, new Set([FileFormat.fastaRepresentative])],
]);

const namespaceToRestQueryToFtpFilenames = new Map([
  [
    Namespace.uniref,
    new Map([
      ['identity:1.0', ['uniref100/uniref100']],
      ['identity:0.9', ['uniref90/uniref90']],
      ['identity:0.5', ['uniref50/uniref50']],
    ]),
  ],
  [
    Namespace.uniprotkb,
    new Map([
      ['reviewed:true', ['uniprot_sprot']],
      ['reviewed:false', ['uniprot_trembl']],
      ['*', ['uniprot_sprot', 'uniprot_trembl']],
      ['proteome:up000006548', ['UP000006548_3702/per-protein.h5']],
      ['proteome:up000001940', ['UP000001940_6239/per-protein.h5']],
      ['proteome:up000000625', ['UP000000625_83333/per-protein.h5']],
      ['proteome:up000005640', ['UP000005640_9606/per-protein.h5']],
      ['proteome:up000000589', ['UP000000589_10090/per-protein.h5']],
      ['proteome:up000002494', ['UP000002494_10116/per-protein.h5']],
      ['proteome:up000464024', ['UP000464024_2697049/per-protein.h5']],
    ]),
  ],
]);

// This goes from an array of regexs with named capture groups to a
// a template string which will replace the capture group name
// eg $<bool> with the matched value.
const reToSimple = new Map([
  [[/^\(*\*\)*$/], '*'],
  [
    [
      /^\(*identity:(?<identity>0.5|0.9|1.0)\)*(?:\s+and\s+\(*\*\)*)?$/,
      /^(?:\(*\*\)*\s+and\s+)?\(*identity:(?<identity>0.5|0.9|1.0)\)*$/,
    ],
    'identity:$<identity>',
  ],
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
      const match = q.match(re);
      if (match) {
        const groups = Object.entries(match.groups || {});
        if (groups.length === 0) {
          return simple;
        }
        if (groups.length === 1) {
          const [k, v] = groups[0];
          return simple.replace(`$<${k}>`, v);
        }
      }
    }
  }
  return null;
};

export const getUniprotkbFtpFilenamesAndUrls = (
  namespace: Namespace,
  downloadUrl: string,
  format: FileFormat
) => {
  if (!namespaceToAvailableFormats.get(namespace)?.has(format)) {
    return null;
  }
  const ftpUrlBase = namespaceToFtpUrlBase.get(namespace);
  if (!ftpUrlBase) {
    return null;
  }
  const sp = new URLSearchParams(downloadUrl);
  const query = sp.get('query');
  if (!query) {
    return null;
  }
  const simplifiedQuery = simplifyQuery(query);
  if (!simplifiedQuery) {
    return null;
  }
  const ftpFilenames = namespaceToRestQueryToFtpFilenames
    .get(namespace)
    ?.get(simplifiedQuery);
  if (!ftpFilenames) {
    return null;
  }
  if (format === FileFormat.embeddings && ftpFilenames.length === 1) {
    if (ftpFilenames[0] === 'uniprot_sprot') {
      ftpFilenames[0] += '/per-protein.h5';
    }
    return [
      {
        filename: ftpFilenames[0],
        url: joinUrl(ftpUrls.embeddings, ftpFilenames[0]),
      },
    ];
  }
  const ftpFormat = restFormatToFtpFormat.get(format);
  if (!ftpFormat || simplifiedQuery.includes('proteome')) {
    return null;
  }

  return ftpFilenames.map((ftpFilename) => {
    const filename = `${ftpFilename}.${ftpFormat}.gz`;
    const url = joinUrl(ftpUrlBase, filename);
    return { filename, url };
  });
};

export default ftpUrls;
