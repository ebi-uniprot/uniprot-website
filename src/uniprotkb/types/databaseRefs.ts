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
  PROTEOMIC = 'PROTEOMIC',
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
  category: string;
  uriLink?: string;
  attributes?: AttributesItem[];
  implicit?: boolean;
  linkedReason?: string;
  idMappingName?: string; // TODO: 2021-11-29: remove as soon as Shadab has hidden this field as we don't use it
};

export type DatabaseInfo = DatabaseInfoPoint[];
