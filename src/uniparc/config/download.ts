import { FileFormat } from '../../shared/types/resultsDownload';

export const fileFormatsResultsDownload = [
  FileFormat.fasta,
  FileFormat.tsv,
  FileFormat.excel,
  FileFormat.xml,
  FileFormat.rdfXml,
  FileFormat.list,
  FileFormat.json,
];

// TODO: use in uniparc entry download
export const fileFormatEntryDownload = [
  FileFormat.fasta,
  FileFormat.xml,
  FileFormat.rdfXml,
  FileFormat.tsv,
];
