import { type ARBAAPIModel } from '../../automatic-annotations/arba/adapters/arbaConverter';
import { type UniRuleAPIModel } from '../../automatic-annotations/unirule/adapters/uniRuleConverter';
import { type HelpAPIModel } from '../../help/types/apiModel';
import { type MappingAPIModel } from '../../jobs/id-mapping/types/idMappingSearchResults';
import { type ProteomesAPIModel } from '../../proteomes/adapters/proteomesConverter';
import { type CitationsAPIModel } from '../../supporting-data/citations/adapters/citationsConverter';
import { type DatabaseAPIModel } from '../../supporting-data/database/adapters/databaseConverter';
import { type DiseasesAPIModel } from '../../supporting-data/diseases/adapters/diseasesConverter';
import { type KeywordsAPIModel } from '../../supporting-data/keywords/adapters/keywordsConverter';
import { type LocationsAPIModel } from '../../supporting-data/locations/adapters/locationsConverter';
import {
  type Rank,
  type TaxonomyAPIModel,
} from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import {
  type UniParcAPIModel,
  type UniParcXRef,
} from '../../uniparc/adapters/uniParcConverter';
import { type UniProtkbAPIModel } from '../../uniprotkb/adapters/uniProtkbConverter';
import { type Evidence } from '../../uniprotkb/types/modelTypes';
import { type UniRefLiteAPIModel } from '../../uniref/adapters/uniRefConverter';

export type APIModel =
  | UniProtkbAPIModel
  | UniRefLiteAPIModel
  | UniParcAPIModel
  | UniParcXRef
  | ProteomesAPIModel
  | TaxonomyAPIModel
  | KeywordsAPIModel
  | CitationsAPIModel
  | DiseasesAPIModel
  | DatabaseAPIModel
  | LocationsAPIModel
  | UniRuleAPIModel
  | ARBAAPIModel
  | MappingAPIModel
  | HelpAPIModel;

export type Statistics = {
  reviewedProteinCount: number;
  unreviewedProteinCount: number;
  // proteomes
  isoformProteinCount?: number;
  // in citations
  computationallyMappedProteinCount?: number;
  communityMappedProteinCount?: number;
  // in taxonomy
  referenceProteomeCount?: number;
  proteomeCount?: number;
};

// TODO: remove all below and replace with types from corresponding namespaces
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
  properties?: Record<string, string | null>;
  evidences?: Evidence[];
  additionalIds?: string[];
  isoformId?: string;
  implicit?: true;
};
