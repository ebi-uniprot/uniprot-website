import { FileFormat } from '../../shared/types/resultsDownload';

export const fileFormatsResultsDownload = [
  FileFormat.tsv,
  FileFormat.excel,
  FileFormat.xml,
  FileFormat.rdfXml,
  FileFormat.list,
  FileFormat.json,
];

// TODO: use in proteomes entry download
export const fileFormatEntryDownload = [
  FileFormat.fastaCanonical,
  FileFormat.fastaCanonicalIsoform,
  FileFormat.tsv,
  FileFormat.excel,
  FileFormat.xml,
  FileFormat.rdfXml,
  FileFormat.text,
  FileFormat.gff,
  FileFormat.list,
];
