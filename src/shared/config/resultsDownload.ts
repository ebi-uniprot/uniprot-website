import { FileFormat, ContentType } from '../types/resultsDownload';

import {
  fileFormatsResultsDownload as fileFormatsResultsDownloadUniProtKB,
  fileFormatHistoryDownload as fileFormatsResultsDownloadUniSave,
} from '../../uniprotkb/config/download';
import { fileFormatsResultsDownload as fileFormatsResultsDownloadUniRef } from '../../uniref/config/download';
import { fileFormatsResultsDownload as fileFormatsResultsDownloadUniParc } from '../../uniparc/config/download';
import { fileFormatsResultsDownload as fileFormatsResultsDownloadProteomes } from '../../proteomes/config/download';
import { fileFormatsResultsDownload as fileFormatsResultsDownloadTaxonomy } from '../../supporting-data/taxonomy/config/download';
import { fileFormatsResultsDownload as fileFormatsResultsDownloadKeywords } from '../../supporting-data/keywords/config/download';
import { fileFormatsResultsDownload as fileFormatsResultsDownloadCitations } from '../../supporting-data/citations/config/download';
import { fileFormatsResultsDownload as fileFormatsResultsDownloadDiseases } from '../../supporting-data/diseases/config/download';
import { fileFormatsResultsDownload as fileFormatsResultsDownloadDatabase } from '../../supporting-data/database/config/download';
import { fileFormatsResultsDownload as fileFormatsResultsDownloadLocations } from '../../supporting-data/locations/config/download';
import { fileFormatsResultsDownload as fileFormatsResultsDownloadUniRule } from '../../automatic-annotations/unirule/config/download';
import { fileFormatsResultsDownload as fileFormatsResultsDownloadARBA } from '../../automatic-annotations/arba/config/download';
import { fileFormatsResultsDownload as fileFormatsResultsDownloadIDMapping } from '../../tools/id-mapping/config/download';

import { Namespace } from '../types/namespaces';

export const fileFormatToContentType: Record<FileFormat, ContentType> = {
  [FileFormat.fasta]: ContentType.fasta,
  [FileFormat.fastaCanonical]: ContentType.fasta,
  [FileFormat.fastaCanonicalIsoform]: ContentType.fasta,
  [FileFormat.fastaRepresentative]: ContentType.fasta,
  [FileFormat.fastaSubsequence]: ContentType.fasta,
  [FileFormat.tsv]: ContentType.tsv,
  [FileFormat.tsvIdMappingFromTo]: ContentType.tsv,
  [FileFormat.excel]: ContentType.excel,
  [FileFormat.excelIdMappingFromTo]: ContentType.excel,
  [FileFormat.xml]: ContentType.xml,
  [FileFormat.rdfXml]: ContentType.rdfXml,
  [FileFormat.text]: ContentType.text,
  [FileFormat.gff]: ContentType.gff,
  [FileFormat.list]: ContentType.list,
  [FileFormat.json]: ContentType.json,
  [FileFormat.jsonIdMappingFromTo]: ContentType.json,
  [FileFormat.obo]: ContentType.obo,
  [FileFormat.embeddings]: ContentType.embeddings,
  [FileFormat.peff]: ContentType.peff,
  [FileFormat.mmCIF]: ContentType.mmCIF,
  [FileFormat.binaryCif]: ContentType.binaryCIF,
  [FileFormat.pdb]: ContentType.pdb,
  [FileFormat.csv]: ContentType.csv,
};

export const fileFormatToUrlParameter: Record<FileFormat, string> = {
  [FileFormat.fasta]: 'fasta',
  [FileFormat.fastaCanonical]: 'fasta',
  [FileFormat.fastaCanonicalIsoform]: 'fasta',
  [FileFormat.fastaRepresentative]: 'fasta',
  [FileFormat.fastaSubsequence]: 'fasta',
  [FileFormat.tsv]: 'tsv',
  [FileFormat.tsvIdMappingFromTo]: 'tsv',
  [FileFormat.excel]: 'xlsx',
  [FileFormat.excelIdMappingFromTo]: 'xlsx',
  [FileFormat.xml]: 'xml',
  [FileFormat.rdfXml]: 'rdf',
  [FileFormat.text]: 'txt',
  [FileFormat.gff]: 'gff',
  [FileFormat.list]: 'list',
  [FileFormat.json]: 'json',
  [FileFormat.jsonIdMappingFromTo]: 'json',
  [FileFormat.obo]: 'obo',
  [FileFormat.embeddings]: 'h5',
  [FileFormat.peff]: 'peff',
  [FileFormat.binaryCif]: 'bcif', // Not actually needed but added for completeness
  [FileFormat.mmCIF]: 'cif', // Not actually needed but added for completeness
  [FileFormat.pdb]: 'pdb', // Not actually needed but added for completeness
  [FileFormat.csv]: 'csv', // Not actually needed but added for completeness
};

export const fileFormatsWithColumns = new Set([
  FileFormat.tsv,
  FileFormat.excel,
]);

export const nsToFileFormatsResultsDownload: Record<Namespace, FileFormat[]> = {
  [Namespace.uniprotkb]: fileFormatsResultsDownloadUniProtKB,
  [Namespace.uniref]: fileFormatsResultsDownloadUniRef,
  [Namespace.uniparc]: fileFormatsResultsDownloadUniParc,
  [Namespace.proteomes]: fileFormatsResultsDownloadProteomes,
  [Namespace.taxonomy]: fileFormatsResultsDownloadTaxonomy,
  [Namespace.keywords]: fileFormatsResultsDownloadKeywords,
  [Namespace.citations]: fileFormatsResultsDownloadCitations,
  [Namespace.diseases]: fileFormatsResultsDownloadDiseases,
  [Namespace.database]: fileFormatsResultsDownloadDatabase,
  [Namespace.locations]: fileFormatsResultsDownloadLocations,
  [Namespace.unirule]: fileFormatsResultsDownloadUniRule,
  [Namespace.arba]: fileFormatsResultsDownloadARBA,
  [Namespace.idmapping]: fileFormatsResultsDownloadIDMapping,
  [Namespace.unisave]: fileFormatsResultsDownloadUniSave,
};
