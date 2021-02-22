export enum Rank {
  Class = 'class',
  Family = 'family',
  Genus = 'genus',
  Kingdom = 'kingdom',
  NoRank = 'no rank',
  Order = 'order',
  Phylum = 'phylum',
  Species = 'species',
  Subclass = 'subclass',
  Subfamily = 'subfamily',
  Subgenus = 'subgenus',
  Subkingdom = 'subkingdom',
  Subphylum = 'subphylum',
  Subspecies = 'subspecies',
  Superkingdom = 'superkingdom',
}

export type Lineage = {
  scientificName?: string;
  commonName?: string;
  synonyms?: string[];
  taxonId: number;
  rank: Rank;
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

export type Citation = {
  citationType?: string;
  authors?: string[];
  citationCrossReferences?: Xref[];
  title?: string;
  publicationDate?: string;
  journal?: string;
  firstPage?: string;
  lastPage?: string;
  volume?: string;
  completeAuthorList?: boolean;
  literatureAbstract?: string;
  authoringGroup?: string[];
  submissionDatabase?: string;
};
