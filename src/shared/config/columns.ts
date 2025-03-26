import ARBAColumnConfiguration, {
  ARBAColumn,
  defaultColumns as defaultARBAColumns,
  primaryKeyColumns as primaryKeyColumnsARBA,
} from '../../automatic-annotations/arba/config/ARBAColumnConfiguration';
import UniRuleColumnConfiguration, {
  defaultColumns as defaultUniRuleColumns,
  primaryKeyColumns as primaryKeyColumnsUniRule,
  UniRuleColumn,
} from '../../automatic-annotations/unirule/config/UniRuleColumnConfiguration';
import {
  defaultColumns as defaultIdMappingColumns,
  IDMappingColumn,
  IdMappingColumnConfiguration,
  primaryKeyColumns as primaryKeyColumnsIdMapping,
} from '../../jobs/id-mapping/config/IdMappingColumnConfiguration';
import ProteomesColumnConfiguration, {
  defaultColumns as defaultProteomesColumns,
  primaryKeyColumns as primaryKeyColumnsProteomes,
  ProteomesColumn,
} from '../../proteomes/config/ProteomesColumnConfiguration';
import CitationsColumnConfiguration, {
  CitationsColumn,
  defaultColumns as defaultCitationsColumns,
  primaryKeyColumns as primaryKeyColumnsCitations,
} from '../../supporting-data/citations/config/CitationsColumnConfiguration';
import DatabaseColumnConfiguration, {
  DatabaseColumn,
  defaultColumns as defaultDatabaseColumns,
  primaryKeyColumns as primaryKeyColumnsDatabase,
} from '../../supporting-data/database/config/DatabaseColumnConfiguration';
import DiseasesColumnConfiguration, {
  defaultColumns as defaultDiseasesColumns,
  DiseasesColumn,
  primaryKeyColumns as primaryKeyColumnsDiseases,
} from '../../supporting-data/diseases/config/DiseasesColumnConfiguration';
import KeywordsColumnConfiguration, {
  defaultColumns as defaultKeywordsColumns,
  KeywordsColumn,
  primaryKeyColumns as primaryKeyColumnsKeywords,
} from '../../supporting-data/keywords/config/KeywordsColumnConfiguration';
import LocationsColumnConfiguration, {
  defaultColumns as defaultLocationsColumns,
  LocationsColumn,
  primaryKeyColumns as primaryKeyColumnsLocations,
} from '../../supporting-data/locations/config/LocationsColumnConfiguration';
import TaxonomyColumnConfiguration, {
  defaultColumns as defaultTaxonomyColumns,
  primaryKeyColumns as primaryKeyColumnsTaxonomy,
  TaxonomyColumn,
} from '../../supporting-data/taxonomy/config/TaxonomyColumnConfiguration';
import UniParcColumnConfiguration, {
  defaultColumns as defaultUniParcColumns,
  primaryKeyColumns as primaryKeyColumnsUniParc,
  UniParcColumn,
} from '../../uniparc/config/UniParcColumnConfiguration';
import {
  defaultColumns as defaultUniParcEntryColumns,
  primaryKeyColumns as primaryKeyColumnsUniParcEntry,
  UniParcXRefsColumn,
} from '../../uniparc/config/UniParcXRefsColumnConfiguration';
import UniProtKBColumnConfiguration, {
  defaultColumns as defaultUniProtKBColumns,
  primaryKeyColumns as primaryKeyColumnsUniProtKB,
} from '../../uniprotkb/config/UniProtKBColumnConfiguration';
import { UniProtKBColumn } from '../../uniprotkb/types/columnTypes';
import UniRefColumnConfiguration, {
  defaultColumns as defaultUniRefColumns,
  primaryKeyColumns as primaryKeyColumnsUniRef,
  UniRefColumn,
} from '../../uniref/config/UniRefColumnConfiguration';
import { Namespace } from '../types/namespaces';

export type Column =
  | UniProtKBColumn
  | UniRefColumn
  | UniParcColumn
  | UniParcXRefsColumn
  | ProteomesColumn
  | TaxonomyColumn
  | KeywordsColumn
  | CitationsColumn
  | DiseasesColumn
  | DatabaseColumn
  | LocationsColumn
  | UniRuleColumn
  | ARBAColumn
  | IDMappingColumn;

export const nsToDefaultColumns = (
  namespace: Namespace,
  isEntry?: boolean
): Column[] => {
  if (isEntry) {
    switch (namespace) {
      case Namespace.uniparc:
        return defaultUniParcEntryColumns;
      default:
        return [];
    }
  }
  switch (namespace) {
    case Namespace.uniprotkb:
      return defaultUniProtKBColumns;
    case Namespace.uniref:
      return defaultUniRefColumns;
    case Namespace.uniparc:
      return defaultUniParcColumns;
    case Namespace.proteomes:
      return defaultProteomesColumns;
    case Namespace.taxonomy:
      return defaultTaxonomyColumns;
    case Namespace.keywords:
      return defaultKeywordsColumns;
    case Namespace.citations:
      return defaultCitationsColumns;
    case Namespace.diseases:
      return defaultDiseasesColumns;
    case Namespace.database:
      return defaultDatabaseColumns;
    case Namespace.locations:
      return defaultLocationsColumns;
    case Namespace.unirule:
      return defaultUniRuleColumns;
    case Namespace.arba:
      return defaultARBAColumns;
    case Namespace.idmapping:
      return defaultIdMappingColumns;
    default:
      return [];
  }
};

export const nsToPrimaryKeyColumns = (
  namespace: Namespace,
  isEntry?: boolean
): Column[] => {
  if (isEntry) {
    switch (namespace) {
      case Namespace.uniparc:
        return primaryKeyColumnsUniParcEntry;
      default:
        return [];
    }
  }
  switch (namespace) {
    case Namespace.uniprotkb:
      return primaryKeyColumnsUniProtKB;
    case Namespace.uniref:
      return primaryKeyColumnsUniRef;
    case Namespace.uniparc:
      return primaryKeyColumnsUniParc;
    case Namespace.proteomes:
      return primaryKeyColumnsProteomes;
    case Namespace.taxonomy:
      return primaryKeyColumnsTaxonomy;
    case Namespace.keywords:
      return primaryKeyColumnsKeywords;
    case Namespace.citations:
      return primaryKeyColumnsCitations;
    case Namespace.diseases:
      return primaryKeyColumnsDiseases;
    case Namespace.database:
      return primaryKeyColumnsDatabase;
    case Namespace.locations:
      return primaryKeyColumnsLocations;
    case Namespace.unirule:
      return primaryKeyColumnsUniRule;
    case Namespace.arba:
      return primaryKeyColumnsARBA;
    case Namespace.idmapping:
      return primaryKeyColumnsIdMapping;
    default:
      return [];
  }
};

// TODO: create a "Column" type to cover the different column types
// and a Column renderer type with label: string and a render definition.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ColumnConfigurations: Partial<Record<Namespace, Map<any, any>>> = {
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
  [Namespace.unirule]: UniRuleColumnConfiguration,
  [Namespace.arba]: ARBAColumnConfiguration,
  [Namespace.idmapping]: IdMappingColumnConfiguration,
};
