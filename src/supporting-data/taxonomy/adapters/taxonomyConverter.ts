type Statistics = {
  referenceProteomeCount: number;
  proteomeCount: number;
  reviewedProteinCount: number;
  unreviewedProteinCount: number;
};

type InactiveReason =
  | {
      inactiveReasonType: 'MERGED';
      mergedTo: number;
    }
  | {
      inactiveReasonType: 'DELETED';
      mergedTo?: never;
    };

type Strain = {
  synonyms: string[];
  name: string;
};

type TaxonomyLight = {
  taxonId: number;
  scientificName: string;
  synonyms?: string[];
  commonName?: string;
};

type TaxonomyLightWithHiddenFlag = TaxonomyLight & {
  hidden: boolean;
};

type TaxonomyLightWithMnemonic = TaxonomyLight & {
  mnemonic: string;
};

type Rank =
  | 'FORMA'
  | 'VARIETAS'
  | 'SUBSPECIES'
  | 'SPECIES'
  | 'SPECIES_SUBGROUP'
  | 'SPECIES_GROUP'
  | 'SUBGENUS'
  | 'GENUS'
  | 'SUBTRIBE'
  | 'TRIBE'
  | 'SUBFAMILY'
  | 'FAMILY'
  | 'SUPERFAMILY'
  | 'PARVORDER'
  | 'INFRAORDER'
  | 'SUBORDER'
  | 'ORDER'
  | 'SUPERORDER'
  | 'SUBCOHORT'
  | 'COHORT'
  | 'INFRACLASS'
  | 'SUBCLASS'
  | 'CLASS'
  | 'SUPERCLASS'
  | 'SUBPHYLUM'
  | 'PHYLUM'
  | 'SUPERPHYLUM'
  | 'SUBKINGDOM'
  | 'KINGDOM'
  | 'SUPERKINGDOM'
  | 'NO_RANK';

type TaxonomyLightWithRank = TaxonomyLight & {
  rank: Rank;
};

export type TaxonomyAPIModel = TaxonomyLightWithHiddenFlag &
  TaxonomyLightWithMnemonic &
  TaxonomyLightWithRank & {
    parentId: number;
    otherNames?: string[];
    lineage: Array<TaxonomyLightWithHiddenFlag & TaxonomyLightWithRank>;
    strains?: Strain[];
    // Probably, only on "organisms", higher level taxons don't appear to have
    statistics?: Statistics;
    hosts?: TaxonomyLightWithMnemonic[];
    inactiveReason?: InactiveReason;
    active: boolean;
    links?: string[];
  };

export type TaxonomyUIModel = TaxonomyAPIModel & {
  // any addition/change by the converter
};

const taxonomyConverter = (data: TaxonomyAPIModel): TaxonomyUIModel => ({
  ...data,
});

export default taxonomyConverter;
