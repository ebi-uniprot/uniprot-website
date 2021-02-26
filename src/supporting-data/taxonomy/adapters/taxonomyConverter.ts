type Statistics = {
  referenceProteomeCount: number;
  proteomeCount: number;
  reviewedProteinCount: number;
  unreviewedProteinCount: number;
};

type InactiveReason = {
  inactiveReasonType: string; // TODO: replace with possible reasons
  mergedTo: number;
};

type Strain = {
  synonyms: string[];
  name: string;
};

type TaxonomyLight = {
  taxonId: number;
  scientificName: string;
  synonyms: string[];
  commonName: string;
};

type TaxonomyLightWithHiddenFlag = TaxonomyLight & {
  hidden: boolean;
};

type TaxonomyLightWithMnemonic = TaxonomyLight & {
  mnemonic: string;
};

type TaxonomyLightWithRank = TaxonomyLight & {
  rank: string; // TODO: replace with possible ranks
};

export type TaxonomyAPIModel = TaxonomyLightWithHiddenFlag &
  TaxonomyLightWithMnemonic &
  TaxonomyLightWithRank & {
    parentId: number;
    otherNames: string[];
    lineages: Array<TaxonomyLightWithHiddenFlag & TaxonomyLightWithRank>;
    strains: Strain[];
    statistics: Statistics;
    hosts: TaxonomyLightWithMnemonic[];
    inactiveReason: InactiveReason;
    active: boolean;
    links: string[];
  };

export type TaxonomyUIModel = TaxonomyAPIModel & {
  // any addition/change by the converter
};

const taxonomyConverter = (data: TaxonomyAPIModel): TaxonomyUIModel => ({
  ...data,
});

export default taxonomyConverter;
