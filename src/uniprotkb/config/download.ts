import { FileFormat } from '../../shared/types/resultsDownload';

export const fileFormatsResultsDownload = [
  FileFormat.fastaCanonical,
  FileFormat.fastaCanonicalIsoform,
  FileFormat.fastaSubsequence,
  FileFormat.tsv,
  FileFormat.excel,
  FileFormat.json,
  FileFormat.xml,
  FileFormat.rdfXml,
  FileFormat.text,
  FileFormat.gff,
  FileFormat.list,
];

export const fileFormatEntryDownload = [
  FileFormat.text,
  FileFormat.fastaCanonical,
  FileFormat.fastaCanonicalIsoform,
  FileFormat.json,
  FileFormat.xml,
  FileFormat.rdfXml,
  FileFormat.gff,
];

export const fileFormatHistoryDownload = [
  FileFormat.text,
  FileFormat.fasta,
  FileFormat.tsv,
  FileFormat.json,
];
