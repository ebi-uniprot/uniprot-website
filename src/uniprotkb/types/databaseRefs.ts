export enum DatabaseCategory {
  CHEMISTRY = 'CHEMISTRY',
  DOMAIN = 'FMD',
  EXPRESSION = 'GEP',
  FAMILY = 'PFAM',
  GEL = '2DG',
  GENOME = 'GMA',
  INTERACTION = 'PPI',
  MISCELLANEOUS = 'MISC',
  ORGANISM = 'ORG',
  PATHWAY = 'EAP',
  PHYLOGENOMIC = 'PLG',
  GENETIC_VARIATION = 'GVD',
  GENE_ONTOLOGY = 'OTG',
  PROTEOMIC = 'PROTEOMIC',
  PROTEOMES = 'PRM',
  PROTOCOL = 'PAM',
  PTM = 'PTM',
  SEQUENCE = 'SEQ',
  STRUCTURE = '3DS',
}

export type AttributesItem = {
  name: string;
  xmlTag: string;
  uriLink?: string;
};

export type DatabaseInfoPoint = {
  name: string;
  displayName: string;
  category: string; // TODO: set as category type
  uriLink?: string;
  attributes?: AttributesItem[];
  implicit?: boolean;
  linkedReason?: string;
  idMappingName?: string;
};

export type DatabaseInfo = DatabaseInfoPoint[];
