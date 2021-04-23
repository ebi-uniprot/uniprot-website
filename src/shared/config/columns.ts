import { Namespace } from '../types/namespaces';
import { UniProtKBColumn } from '../../uniprotkb/types/columnTypes';
import {
  defaultColumns as defaultUniProtKBColumns,
  primaryKeyColumn as primaryKeyColumnUniProtKB,
  UniProtKBColumnConfiguration,
} from '../../uniprotkb/config/UniProtKBColumnConfiguration';
import {
  UniRefColumn,
  defaultColumns as defaultUniRefColumns,
  primaryKeyColumn as primaryKeyColumnUniRef,
  UniRefColumnConfiguration,
} from '../../uniref/config/UniRefColumnConfiguration';
import {
  UniParcColumn,
  defaultColumns as defaultUniParcColumns,
  primaryKeyColumn as primaryKeyColumnUniParc,
  UniParcColumnConfiguration,
} from '../../uniparc/config/UniParcColumnConfiguration';
import {
  ProteomesColumn,
  defaultColumns as defaultProteomesColumns,
  primaryKeyColumn as primaryKeyColumnProteomes,
  ProteomesColumnConfiguration,
} from '../../proteomes/config/ProteomesColumnConfiguration';
import {
  TaxonomyColumn,
  defaultColumns as defaultTaxonomyColumns,
  primaryKeyColumn as primaryKeyColumnTaxonomy,
  TaxonomyColumnConfiguration,
} from '../../supporting-data/taxonomy/config/TaxonomyColumnConfiguration';
import {
  KeywordsColumn,
  defaultColumns as defaultKeywordsColumns,
  primaryKeyColumn as primaryKeyColumnKeywords,
  KeywordsColumnConfiguration,
} from '../../supporting-data/keywords/config/KeywordsColumnConfiguration';
import {
  CitationsColumn,
  defaultColumns as defaultCitationsColumns,
  primaryKeyColumn as primaryKeyColumnCitations,
  CitationsColumnConfiguration,
} from '../../supporting-data/citations/config/CitationsColumnConfiguration';
import {
  DiseasesColumn,
  defaultColumns as defaultDiseasesColumns,
  primaryKeyColumn as primaryKeyColumnDiseases,
  DiseasesColumnConfiguration,
} from '../../supporting-data/diseases/config/DiseasesColumnConfiguration';
import {
  DatabaseColumn,
  defaultColumns as defaultDatabaseColumns,
  primaryKeyColumn as primaryKeyColumnDatabase,
  DatabaseColumnConfiguration,
} from '../../supporting-data/database/config/DatabaseColumnConfiguration';
import {
  LocationsColumn,
  defaultColumns as defaultLocationsColumns,
  primaryKeyColumn as primaryKeyColumnLocations,
  LocationsColumnConfiguration,
} from '../../supporting-data/locations/config/LocationsColumnConfiguration';
import {
  IDMappingColumn,
  defaultColumns as defaultIdMappingColumns,
  primaryKeyColumn as primaryKeyIdMapping,
  IdMappingColumnConfiguration,
} from '../../tools/id-mapping/config/IdMappingColumnConfiguration';
import { ColumnConfiguration } from '../types/columnConfiguration';

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
  | LocationsColumn
  | IDMappingColumn;

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
  [Namespace.idmapping]: defaultIdMappingColumns,
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
  [Namespace.idmapping]: primaryKeyIdMapping,
};

export const nsToColumnConfig: Record<
  Namespace,
  ColumnConfiguration<Column>
> = {
  [Namespace.uniprotkb]: UniProtKBColumnConfiguration,
  [Namespace.uniref]: UniRefColumnConfiguration,
  [Namespace.uniparc]: UniParcColumnConfiguration,
  [Namespace.proteomes]: ProteomesColumnConfiguration,
  [Namespace.taxonomy]: TaxonomyColumnConfiguration,
  [Namespace.keywords]: KeywordsColumnConfiguration,
  [Namespace.citations]: CitationsColumnConfiguration,
  [Namespace.diseases]: DiseasesColumnConfiguration,
  [Namespace.database]: DatabaseColumnConfiguration,
  [Namespace.locations]: LocationsColumnConfiguration,
  [Namespace.idmapping]: IdMappingColumnConfiguration,
};
