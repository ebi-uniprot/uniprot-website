import { FileFormat } from '../../../shared/types/resultsDownload';

// Used when the number of results exceeds the enrichment threshold
export const fileFormatsResultsDownload = [
  FileFormat.tsvIdMappingFromTo, // stream
  FileFormat.tsv, // async
  FileFormat.excelIdMappingFromTo, // stream
  FileFormat.jsonIdMappingFromTo, // stream
  FileFormat.json, // async
];
