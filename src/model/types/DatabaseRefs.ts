export enum DatabaseCategory {
  CHEMISTRY = 'CHEMISTRY',
  DOMAIN = 'FMD',
  EXPRESSION = 'GEP',
  FAMILY = 'PFAM',
  GEL = '2DG',
  GENOME = 'GMA',
  INTERACTION = 'PPI',
  ORGANISM = 'ORG',
  OTHER = 'OTHER',
  PATHWAY = 'EAP',
  PHYLOGENOMIC = 'PLG',
  POLYMORPHISM = 'PMD',
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
  uriLink: string;
  attributes?: AttributesItem[];
  implicit?: boolean;
};

export type DatabaseInfo = DatabaseInfoPoint[];
