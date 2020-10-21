export type NoRank = 'no rank';
export type Rank =
  | 'forma'
  | 'varietas'
  | 'subspecies'
  | 'species'
  | 'species subgroup'
  | 'species group'
  | 'subgenus'
  | 'genus'
  | 'subtribe'
  | 'tribe'
  | 'subfamily'
  | 'family'
  | 'superfamily'
  | 'parvorder'
  | 'infraorder'
  | 'suborder'
  | 'order'
  | 'superorder'
  | 'subcohort'
  | 'cohort'
  | 'infraclass'
  | 'subclass'
  | 'class'
  | 'superclass'
  | 'subphylum'
  | 'phylum'
  | 'superphylum'
  | 'subkingdom'
  | 'kingdom'
  | 'superkingdom';

type TaxonID = number;

export type MinimumTaxonomyItem = {
  hidden: boolean;
  rank: Rank | NoRank;
  scientificName: string;
  taxonId: TaxonID;
};

export type InactiveTaxonomyItem = {
  taxonId: number;
  inactiveReason: {
    // Most likely type: 'DELETED' (couldn't find other example)
    inactiveReasonType: string;
    mergedTo: number;
  };
};

export type TaxonomyEndpointItem = MinimumTaxonomyItem & {
  active: boolean;
  commonName?: string;
  lineage?: MinimumTaxonomyItem[];
  links?: string[];
  mnemonic: string;
  otherNames?: string[];
  parentId: number;
  // not on every node. All or nothing mean proteomeCount could still be 0 and
  // present. Might not be there only if all to 0? Also, statistics not taking
  // into account children
  statistics?: {
    proteomeCount: number;
    referenceProteomeCount: number;
    reviewedProteinCount: number;
    unreviewedProteinCount: number;
  };
};

// returned by https://wwwdev.ebi.ac.uk/uniprot/api/taxonomy/taxonIds/{<tax ids separated by commas>}
export type TaxonomyEndpoint = {
  results: TaxonomyEndpointItem[];
};
