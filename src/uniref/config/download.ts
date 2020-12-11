import { FileFormat } from '../../shared/types/resultsDownload';

export const fileFormatsResultsDownload = [
  FileFormat.fastaRepresentative,
  FileFormat.tsv,
  FileFormat.excel,
  FileFormat.list,
  FileFormat.json,
];

// TODO: use in uniref entry download
export const fileFormatEntryDownload = [
  FileFormat.fastaRepresentative,
  FileFormat.xml,
  FileFormat.rdfXml,
  FileFormat.list,
];
