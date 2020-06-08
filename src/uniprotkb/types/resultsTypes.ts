import { Column } from './columnTypes';

export enum SortDirection {
  ascend = 'ascend',
  descend = 'descend',
}

export enum SortDirectionApi {
  ascend = 'asc',
  descend = 'desc',
}

export const getApiSortDirection = (direction: SortDirection) =>
  direction === SortDirection.ascend
    ? SortDirectionApi.ascend
    : SortDirectionApi.descend;

export type SelectedFacet = { name: string; value: string };

export enum ColumnSelectTab {
  data = 'data',
  links = 'links',
}

export type SelectedColumn = {
  tabId: ColumnSelectTab;
  accordionId: string;
  itemId: Column;
  label: string;
};

export type FieldDatum = {
  id: string;
  title: string;
  items: {
    id: Column;
    label: string;
    sortField?: string;
  }[];
};

export type FieldData = {
  [tab in ColumnSelectTab]: FieldDatum[];
};

export type ReceivedField = {
  name: Column;
  label: string;
  id: string;
  sortField?: string;
};

export type ReceivedFieldData = {
  groupName: string;
  isDatabaseGroup: boolean;
  id: string;
  fields: ReceivedField[];
}[];

export enum FileFormat {
  fastaCanonical = 'FASTA (canonical)',
  fastaCanonicalIsoform = 'FASTA (canonical & isoform)',
  tsv = 'TSV',
  excel = 'Excel',
  xml = 'XML',
  rdfXml = 'RDF/XML',
  text = 'Text',
  gff = 'GFF',
  list = 'List',
  json = 'JSON',
}

/* Note, eventually these will be the formats for these files
  [FileFormat.excel, 'application/vnd.ms-excel'], //excel
  [FileFormat.rdfXml, 'application/rdf+xml'], //rdf
  [FileFormat.text, 'text/flatfile'], // txt
*/

export const fileFormatToContentType = new Map<FileFormat, string>([
  [FileFormat.fastaCanonical, 'text/fasta'],
  [FileFormat.fastaCanonicalIsoform, 'text/fasta'],
  [FileFormat.tsv, 'text/tsv'],
  [FileFormat.excel, 'application/vnd.ms-excel'],
  [FileFormat.xml, 'application/xml'],
  [FileFormat.rdfXml, 'application/rdf+xml'],
  [FileFormat.text, 'text/flatfile'],
  [FileFormat.gff, 'text/gff'],
  [FileFormat.list, 'text/list'],
  [FileFormat.json, 'application/json'],
]);

export const fileFormatToUrlParameter = new Map<FileFormat, string>([
  [FileFormat.fastaCanonical, 'fasta'],
  [FileFormat.fastaCanonicalIsoform, 'fasta'],
  [FileFormat.tsv, 'tsv'],
  [FileFormat.excel, 'xlsx'],
  [FileFormat.xml, 'xml'],
  [FileFormat.rdfXml, 'rdf'],
  [FileFormat.text, 'txt'],
  [FileFormat.gff, 'gff'],
  [FileFormat.list, 'list'],
  [FileFormat.json, 'json'],
]);

export const fileFormatsWithColumns = [FileFormat.tsv, FileFormat.excel];

export const fileFormatEntryDownload = [
  FileFormat.text,
  FileFormat.fastaCanonical,
  FileFormat.fastaCanonicalIsoform,
  FileFormat.xml,
  FileFormat.rdfXml,
  FileFormat.gff,
];
