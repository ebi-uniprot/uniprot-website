import { FileFormat } from '../../shared/types/resultsDownload';

export const fileFormatsResultsDownload = [
  FileFormat.fasta,
  FileFormat.tsv,
  FileFormat.excel,
  FileFormat.json,
  FileFormat.xml,
  FileFormat.list,
];

export const fileFormatEntryDownload = [
  FileFormat.json,
  FileFormat.excel,
  FileFormat.xml,
  FileFormat.tsv,
  FileFormat.list,
];

export const fileFormatsResultsDownloadForRedundant = [FileFormat.fasta];

export const fileFormatsResultsDownloadForIsoformSequence = [
  FileFormat.fasta,
  FileFormat.json,
];
