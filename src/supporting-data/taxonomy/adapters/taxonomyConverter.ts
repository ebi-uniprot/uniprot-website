import { SetRequired } from 'type-fest';

import { Statistics } from '../../../shared/types/apiModel';
import { Evidence } from '../../../uniprotkb/types/modelTypes';

type InactiveReason = {
  inactiveReasonType: 'MERGED' | 'DELETED';
  mergedTo: number;
};

type Strain = {
  synonyms?: string[];
  name: string;
};

export type Lineage = Array<
  SetRequired<Omit<TaxonomyDatum, 'lineage'>, 'hidden' | 'rank'>
>;

export type TaxonomyDatum = {
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
  | 'superkingdom'
  | 'clade'
  | 'no rank';

export type TaxonomyAPIModel = SetRequired<
  TaxonomyDatum,
  'mnemonic' | 'hidden' | 'rank' | 'lineage'
> & {
  parent: TaxonomyDatum;
  otherNames?: string[];
  strains?: Strain[];
  // Probably, only on "organisms", higher level taxons don't appear to have
  // Note: backend will add, remove optional when it's done
  statistics?: SetRequired<
    Statistics,
    'referenceProteomeCount' | 'proteomeCount'
  >;
  hosts?: SetRequired<TaxonomyDatum, 'mnemonic'>[];
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
