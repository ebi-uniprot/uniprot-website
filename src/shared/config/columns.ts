import { Namespace } from '../types/namespaces';
import { UniProtKBColumn } from '../../uniprotkb/types/columnTypes';
import {
  defaultColumns as defaultUniProtKBColumns,
  primaryKeyColumns as primaryKeyColumnsUniProtKB,
} from '../../uniprotkb/config/UniProtKBColumnConfiguration';
import {
  UniRefColumn,
  defaultColumns as defaultUniRefColumns,
  primaryKeyColumns as primaryKeyColumnsUniRef,
} from '../../uniref/config/UniRefColumnConfiguration';
import {
  UniParcColumn,
  defaultColumns as defaultUniParcColumns,
  primaryKeyColumns as primaryKeyColumnsUniParc,
} from '../../uniparc/config/UniParcColumnConfiguration';
import {
  UniParcXRefsColumn,
  defaultColumns as defaultUniParcEntryColumns,
  primaryKeyColumns as primaryKeyColumnsUniParcEntry,
} from '../../uniparc/config/UniParcXRefsColumnConfiguration';
import {
  ProteomesColumn,
  defaultColumns as defaultProteomesColumns,
  primaryKeyColumns as primaryKeyColumnsProteomes,
} from '../../proteomes/config/ProteomesColumnConfiguration';
import {
  TaxonomyColumn,
  defaultColumns as defaultTaxonomyColumns,
  primaryKeyColumns as primaryKeyColumnsTaxonomy,
} from '../../supporting-data/taxonomy/config/TaxonomyColumnConfiguration';
import {
  KeywordsColumn,
  defaultColumns as defaultKeywordsColumns,
  primaryKeyColumns as primaryKeyColumnsKeywords,
} from '../../supporting-data/keywords/config/KeywordsColumnConfiguration';
import {
  CitationsColumn,
  defaultColumns as defaultCitationsColumns,
  primaryKeyColumns as primaryKeyColumnsCitations,
} from '../../supporting-data/citations/config/CitationsColumnConfiguration';
import {
  DiseasesColumn,
  defaultColumns as defaultDiseasesColumns,
  primaryKeyColumns as primaryKeyColumnsDiseases,
} from '../../supporting-data/diseases/config/DiseasesColumnConfiguration';
import {
  DatabaseColumn,
  defaultColumns as defaultDatabaseColumns,
  primaryKeyColumns as primaryKeyColumnsDatabase,
} from '../../supporting-data/database/config/DatabaseColumnConfiguration';
import {
  LocationsColumn,
  defaultColumns as defaultLocationsColumns,
  primaryKeyColumns as primaryKeyColumnsLocations,
} from '../../supporting-data/locations/config/LocationsColumnConfiguration';
import {
  UniRuleColumn,
  defaultColumns as defaultUniRuleColumns,
  primaryKeyColumns as primaryKeyColumnsUniRule,
} from '../../automatic-annotations/unirule/config/UniRuleColumnConfiguration';
import {
  ARBAColumn,
  defaultColumns as defaultARBAColumns,
  primaryKeyColumns as primaryKeyColumnsARBA,
} from '../../automatic-annotations/arba/config/ARBAColumnConfiguration';
import {
  IDMappingColumn,
  defaultColumns as defaultIdMappingColumns,
  primaryKeyColumns as primaryKeyColumnsIdMapping,
} from '../../tools/id-mapping/config/IdMappingColumnConfiguration';
import { PeptideSearchColumn } from '../../tools/peptide-search/config/PeptideSearchColumnConfiguration';

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
  | IDMappingColumn
  | PeptideSearchColumn;

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
