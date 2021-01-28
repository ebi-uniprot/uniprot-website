export type Lineage = {
  scientificName?: string;
  commonName?: string;
  synonyms?: string[];
  taxonId?: number;
  rank?: string;
  hidden?: boolean;
};

export type Xref = {
  database?: string;
  id?: string;
  properties?: { [key: string]: string };
  additionalIds?: string[];
  isoformId?: string;
  implicit?: true;
};
