import { FileFormat, ContentType } from '../types/resultsDownload';
import { fileFormatsResultsDownload as fileFormatsResultsDownloadUniProtKB } from '../../uniprotkb/config/download';
import { fileFormatsResultsDownload as fileFormatsResultsDownloadUniRef } from '../../uniref/config/download';
import { Namespace } from '../types/namespaces';

export const fileFormatToContentType: Record<FileFormat, ContentType> = {
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

export const nsToFileFormatsResultsDownload: Partial<Record<
  Namespace,
  FileFormat[]
>> = {
  [Namespace.uniprotkb]: fileFormatsResultsDownloadUniProtKB,
  [Namespace.uniref]: fileFormatsResultsDownloadUniRef,
};
