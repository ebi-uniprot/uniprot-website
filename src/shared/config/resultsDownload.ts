import { FileFormat, ContentType } from '../types/resultsDownload';

import { fileFormatsResultsDownload as fileFormatsResultsDownloadUniProtKB } from '../../uniprotkb/config/download';
import { fileFormatsResultsDownload as fileFormatsResultsDownloadUniRef } from '../../uniref/config/download';
import { fileFormatsResultsDownload as fileFormatsResultsDownloadUniParc } from '../../uniparc/config/download';
import { fileFormatsResultsDownload as fileFormatsResultsDownloadProteomes } from '../../proteomes/config/download';
import { fileFormatsResultsDownload as fileFormatsResultsDownloadTaxonomy } from '../../supporting-data/taxonomy/config/download';
import { fileFormatsResultsDownload as fileFormatsResultsDownloadKeywords } from '../../supporting-data/keywords/config/download';
import { fileFormatsResultsDownload as fileFormatsResultsDownloadCitations } from '../../supporting-data/citations/config/download';
import { fileFormatsResultsDownload as fileFormatsResultsDownloadDiseases } from '../../supporting-data/diseases/config/download';
import { fileFormatsResultsDownload as fileFormatsResultsDownloadDatabase } from '../../supporting-data/database/config/download';
import { fileFormatsResultsDownload as fileFormatsResultsDownloadLocations } from '../../supporting-data/locations/config/download';

import { Namespace } from '../types/namespaces';

export const fileFormatToContentType: Record<FileFormat, ContentType> = {
  [FileFormat.fasta]: ContentType.fasta,
  [FileFormat.fastaCanonical]: ContentType.fasta,
  [FileFormat.fastaCanonicalIsoform]: ContentType.fasta,
  [FileFormat.fastaRepresentative]: ContentType.fasta,
  [FileFormat.tsv]: ContentType.tsv,
  [FileFormat.excel]: ContentType.excel,
  [FileFormat.xml]: ContentType.xml,
  [FileFormat.rdfXml]: ContentType.rdfXml,
  [FileFormat.text]: ContentType.text,
  [FileFormat.gff]: ContentType.gff,
  [FileFormat.list]: ContentType.list,
  [FileFormat.json]: ContentType.json,
};

export const fileFormatToUrlParameter: Record<FileFormat, string> = {
  [FileFormat.fasta]: 'fasta',
  [FileFormat.fastaCanonical]: 'fasta',
  [FileFormat.fastaCanonicalIsoform]: 'fasta',
  [FileFormat.fastaRepresentative]: 'fasta',
  [FileFormat.tsv]: 'tsv',
  [FileFormat.excel]: 'xlsx',
  [FileFormat.xml]: 'xml',
  [FileFormat.rdfXml]: 'rdf',
  [FileFormat.text]: 'txt',
  [FileFormat.gff]: 'gff',
  [FileFormat.list]: 'list',
  [FileFormat.json]: 'json',
};

export const fileFormatsWithColumns = [FileFormat.tsv, FileFormat.excel];

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
};
