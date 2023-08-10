import { FileFormat } from '../../../shared/types/resultsDownload';

export const fileFormatsResultsDownload = [
  FileFormat.tsvIdMappingFromTo, // stream
  FileFormat.tsv, // async
  FileFormat.excelIdMappingFromTo, // stream
  FileFormat.jsonIdMappingFromTo, // stream
  FileFormat.json, // async
];
