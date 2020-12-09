import { FileFormat } from '../../shared/types/resultsDownload';

export const fileFormatsResultsDownload = [
  FileFormat.fastaCanonical,
  FileFormat.fastaCanonicalIsoform,
  FileFormat.tsv,
  FileFormat.excel,
  FileFormat.xml,
  FileFormat.rdfXml,
  FileFormat.text,
  FileFormat.gff,
  FileFormat.list,
  FileFormat.json,
];

export const fileFormatEntryDownload = [
  FileFormat.text,
  FileFormat.fastaCanonical,
  FileFormat.fastaCanonicalIsoform,
  FileFormat.xml,
  FileFormat.rdfXml,
  FileFormat.gff,
];
