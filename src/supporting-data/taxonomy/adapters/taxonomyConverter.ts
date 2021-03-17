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

type TaxonomyLight = {
  taxonId: number;
  scientificName?: string;
  synonyms?: string[];
  commonName?: string;
  mnemonic?: string;
  evidences?: Evidence[];
  lineage: Array<SetRequired<TaxonomyLight, 'hidden' | 'rank'>>;
  hidden?: boolean;
  rank?: Rank;
};

export type OrganismData = {
  taxonId: number;
  scientificName?: string;
  synonyms?: string[];
  commonName?: string;
  mnemonic?: string;
  evidences?: Evidence[];

  lineage?: string[];
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

export type TaxonomyAPIModel = SetRequired<
  TaxonomyLight & {
    parentId: number;
    otherNames?: string[];
    strains?: Strain[];
    // Probably, only on "organisms", higher level taxons don't appear to have
    statistics?: Statistics;
    hosts?: SetRequired<TaxonomyLight, 'mnemonic'>[];
    inactiveReason?: InactiveReason;
    active: boolean;
    links?: string[];
  },
  'mnemonic' | 'hidden' | 'rank'
>;

export type TaxonomyUIModel = TaxonomyAPIModel & {
  // any addition/change by the converter
};

const taxonomyConverter = (data: TaxonomyAPIModel): TaxonomyUIModel => ({
  ...data,
});

export default taxonomyConverter;
