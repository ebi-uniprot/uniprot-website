// TODO: Eventually use a shared Statistics type
type Statistics = {
  referenceProteomeCount: number;
  proteomeCount: number;
  reviewedProteinCount: number;
  unreviewedProteinCount: number;
};

type InactiveReason = {
  inactiveReasonType: 'MERGED' | 'DELETED';
  mergedTo: number;
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
  | 'superkingdom'
  | 'no rank';

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
