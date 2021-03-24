import { SetRequired } from 'type-fest';
import { Evidence } from '../../../uniprotkb/types/modelTypes';

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

export type Lineage = Array<
  SetRequired<Omit<TaxonomyDatum, 'lineage'>, 'hidden' | 'rank'>
>;

// Temporary function to check lineage type while backend unifies its model
export const isOfLineageType = (
  lineage: Lineage | string[]
): lineage is Lineage => {
  if ((lineage as Lineage).some((item) => item.taxonId)) {
    return true;
  }
  return false;
};

type TaxonomyBase = {
  taxonId: number;
  scientificName?: string;
  synonyms?: string[];
  commonName?: string;
  mnemonic?: string;
  evidences?: Evidence[];
  lineage?: Lineage;
  hidden?: boolean;
  rank?: Rank;
};

export type TaxonomyDatum =
  | TaxonomyBase
  | (TaxonomyBase & {
      /**
       * @deprecated "lineage should be of type 'Lineage'"
       */
      lineage?: string[];
    });

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

export type TaxonomyAPIModel = SetRequired<
  TaxonomyDatum & {
    parentId: number;
    otherNames?: string[];
    strains?: Strain[];
    // Probably, only on "organisms", higher level taxons don't appear to have
    statistics?: Statistics;
    hosts?: SetRequired<TaxonomyDatum, 'mnemonic'>[];
    inactiveReason?: InactiveReason;
    active: boolean;
    links?: string[];
  },
  'mnemonic' | 'hidden' | 'rank' | 'lineage'
>;

export type TaxonomyUIModel = TaxonomyAPIModel & {
  // any addition/change by the converter
};

const taxonomyConverter = (data: TaxonomyAPIModel): TaxonomyUIModel => ({
  ...data,
});

export default taxonomyConverter;
