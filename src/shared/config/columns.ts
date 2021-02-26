import { Namespace } from '../types/namespaces';
import { UniProtKBColumn } from '../../uniprotkb/types/columnTypes';
import {
  defaultColumns as defaultUniProtKBColumns,
  primaryKeyColumn as primaryKeyColumnUniProtKB,
} from '../../uniprotkb/config/UniProtKBColumnConfiguration';
import {
  UniRefColumn,
  defaultColumns as defaultUniRefColumns,
  primaryKeyColumn as primaryKeyColumnUniRef,
} from '../../uniref/config/UniRefColumnConfiguration';
import {
  UniParcColumn,
  defaultColumns as defaultUniParcColumns,
  primaryKeyColumn as primaryKeyColumnUniParc,
} from '../../uniparc/config/UniParcColumnConfiguration';
import {
  ProteomesColumn,
  defaultColumns as defaultProteomesColumns,
  primaryKeyColumn as primaryKeyColumnProteomes,
} from '../../proteomes/config/ProteomesColumnConfiguration';
import {
  TaxonomyColumn,
  defaultColumns as defaultTaxonomyColumns,
  primaryKeyColumn as primaryKeyColumnTaxonomy,
} from '../../supporting-data/taxonomy/config/TaxonomyColumnConfiguration';
import {
  KeywordsColumn,
  defaultColumns as defaultKeywordsColumns,
  primaryKeyColumn as primaryKeyColumnKeywords,
} from '../../supporting-data/keywords/config/KeywordsColumnConfiguration';
import {
  CitationsColumn,
  defaultColumns as defaultCitationsColumns,
  primaryKeyColumn as primaryKeyColumnCitations,
} from '../../supporting-data/citations/config/CitationsColumnConfiguration';
import {
  DiseasesColumn,
  defaultColumns as defaultDiseasesColumns,
  primaryKeyColumn as primaryKeyColumnDiseases,
} from '../../supporting-data/diseases/config/DiseasesColumnConfiguration';
import {
  DatabaseColumn,
  defaultColumns as defaultDatabaseColumns,
  primaryKeyColumn as primaryKeyColumnDatabase,
} from '../../supporting-data/database/config/DatabaseColumnConfiguration';
import {
  LocationsColumn,
  defaultColumns as defaultLocationsColumns,
  primaryKeyColumn as primaryKeyColumnLocations,
} from '../../supporting-data/locations/config/LocationsColumnConfiguration';

export type Column =
  | UniProtKBColumn
  | UniRefColumn
  | UniParcColumn
  | ProteomesColumn
  | TaxonomyColumn
  | KeywordsColumn
  | CitationsColumn
  | DiseasesColumn
  | DatabaseColumn
  | LocationsColumn;

export const nsToDefaultColumns: Record<Namespace, Column[]> = {
  [Namespace.uniprotkb]: defaultUniProtKBColumns,
  [Namespace.uniref]: defaultUniRefColumns,
  [Namespace.uniparc]: defaultUniParcColumns,
  [Namespace.proteomes]: defaultProteomesColumns,
  [Namespace.taxonomy]: defaultTaxonomyColumns,
  [Namespace.keywords]: defaultKeywordsColumns,
  [Namespace.citations]: defaultCitationsColumns,
  [Namespace.diseases]: defaultDiseasesColumns,
  [Namespace.database]: defaultDatabaseColumns,
  [Namespace.locations]: defaultLocationsColumns,
};

export const nsToPrimaryKeyColumn: Record<Namespace, Column> = {
  [Namespace.uniprotkb]: primaryKeyColumnUniProtKB,
  [Namespace.uniref]: primaryKeyColumnUniRef,
  [Namespace.uniparc]: primaryKeyColumnUniParc,
  [Namespace.proteomes]: primaryKeyColumnProteomes,
  [Namespace.taxonomy]: primaryKeyColumnTaxonomy,
  [Namespace.keywords]: primaryKeyColumnKeywords,
  [Namespace.citations]: primaryKeyColumnCitations,
  [Namespace.diseases]: primaryKeyColumnDiseases,
  [Namespace.database]: primaryKeyColumnDatabase,
  [Namespace.locations]: primaryKeyColumnLocations,
};
