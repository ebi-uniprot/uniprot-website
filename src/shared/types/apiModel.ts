import { UniProtkbAPIModel } from '../../uniprotkb/adapters/uniProtkbConverter';
import { UniRefLiteAPIModel } from '../../uniref/adapters/uniRefConverter';
import { UniParcAPIModel } from '../../uniparc/adapters/uniParcConverter';
import { ProteomesAPIModel } from '../../proteomes/adapters/proteomesConverter';

import {
  TaxonomyAPIModel,
  Rank,
} from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { KeywordsAPIModel } from '../../supporting-data/keywords/adapters/keywordsConverter';
import { CitationsAPIModel } from '../../supporting-data/citations/adapters/citationsConverter';
import { DiseasesAPIModel } from '../../supporting-data/diseases/adapters/diseasesConverter';
import { DatabaseAPIModel } from '../../supporting-data/database/adapters/databaseConverter';
import { LocationsAPIModel } from '../../supporting-data/locations/adapters/locationsConverter';

import { UniRuleAPIModel } from '../../automatic-annotations/unirule/adapters/uniRuleConverter';
import { ARBAAPIModel } from '../../automatic-annotations/arba/adapters/arbaConverter';

import { MappingAPIModel } from '../../tools/id-mapping/types/idMappingSearchResults';

import { HelpAPIModel } from '../../help/types/apiModel';

import { Evidence } from '../../uniprotkb/types/modelTypes';

export type APIModel =
  | UniProtkbAPIModel
  | UniRefLiteAPIModel
  | UniParcAPIModel
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
  properties?: Record<string, string>;
  evidences?: Evidence[];
  additionalIds?: string[];
  isoformId?: string;
  implicit?: true;
};
