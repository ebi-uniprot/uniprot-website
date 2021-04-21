import { UniProtkbAPIModel } from '../../uniprotkb/adapters/uniProtkbConverter';
import { UniRefLiteAPIModel } from '../../uniref/adapters/uniRefConverter';
import { UniParcAPIModel } from '../../uniparc/adapters/uniParcConverter';
import { ProteomesAPIModel } from '../../proteomes/adapters/proteomesConverter';
import { TaxonomyAPIModel } from '../../supporting-data/taxonomy/adapters/taxonomyConverter';
import { KeywordsAPIModel } from '../../supporting-data/keywords/adapters/keywordsConverter';
import { CitationsAPIModel } from '../../supporting-data/citations/adapters/citationsConverter';
import { DiseasesAPIModel } from '../../supporting-data/diseases/adapters/diseasesConverter';
import { DatabaseAPIModel } from '../../supporting-data/database/adapters/databaseConverter';
import { LocationsAPIModel } from '../../supporting-data/locations/adapters/locationsConverter';
import { MappingAPIModel } from '../../tools/id-mapping/types/idMappingSearchResults';

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
  | MappingAPIModel;

// TODO: remove all below and replace with types from corresponding namespaces
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
