export type Rank =
  | 'class'
  | 'family'
  | 'genus'
  | 'kingdom'
  | 'no rank'
  | 'order'
  | 'phylum'
  | 'species'
  | 'subclass'
  | 'subfamily'
  | 'subgenus'
  | 'subkingdom'
  | 'subphylum'
  | 'subspecies'
  | 'superkingdom';

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
