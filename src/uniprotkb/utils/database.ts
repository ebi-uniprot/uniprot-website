import EntrySection from '../types/entrySection';
import {
  DatabaseCategory,
  DatabaseInfo,
  DatabaseInfoPoint,
} from '../types/databaseRefs';
import { Xref } from '../../shared/types/apiModel';
import {
  EntrySectionToDatabaseNames,
  getEntrySectionToDatabaseNames,
} from '../config/database';
import { UniProtKBColumn } from '../types/columnTypes';

export type DatabaseCategoryToNames = Map<DatabaseCategory, string[]>;
export type DatabaseNameToCategory = Map<string, DatabaseCategory>;
export type DatabaseToDatabaseInfo = {
  [database: string]: DatabaseInfoPoint;
};
export type ImplicitDatabaseXRefs = Map<string, Xref>;
export type EntrySectionToDatabaseCategoryOrder = Map<EntrySection, string[]>;

export type DatabaseInfoMaps = {
  databaseCategoryToNames: DatabaseCategoryToNames;
  databaseNameToCategory: DatabaseNameToCategory;
  databaseToDatabaseInfo: DatabaseToDatabaseInfo;
  implicitDatabaseXRefs: ImplicitDatabaseXRefs;
  entrySectionToDatabaseNames: EntrySectionToDatabaseNames;
  entrySectionToDatabaseCategoryOrder: EntrySectionToDatabaseCategoryOrder;
};

export const getEntrySectionToDatabaseCategoryOrder = (
  entrySectionToDatabaseNames: Map<EntrySection, string[]>,
  databaseNameToCategory: DatabaseNameToCategory
) => {
  const entrySectionToDatabaseCategoryOrder: EntrySectionToDatabaseCategoryOrder =
    new Map();
  for (const [entrySection, databaseNames] of entrySectionToDatabaseNames) {
    const uniqueCategories: DatabaseCategory[] = [];
    for (const databaseName of databaseNames) {
      const databaseCategory = databaseNameToCategory.get(databaseName);
      if (databaseCategory && !uniqueCategories.includes(databaseCategory)) {
        uniqueCategories.push(databaseCategory);
      }
    }
    entrySectionToDatabaseCategoryOrder.set(entrySection, uniqueCategories);
  }
  return entrySectionToDatabaseCategoryOrder;
};

export const getDatabaseInfoMaps = (
  databaseInfo: DatabaseInfo = []
): DatabaseInfoMaps => {
  const databaseCategoryToNames: DatabaseCategoryToNames = new Map();
  const databaseNameToCategory: DatabaseNameToCategory = new Map();
  const databaseToDatabaseInfo: DatabaseToDatabaseInfo = {};
  const implicitDatabaseXRefs: ImplicitDatabaseXRefs = new Map();
  databaseInfo.forEach((info) => {
    const { name, category, implicit } = info as {
      name: string;
      category: DatabaseCategory;
      implicit?: boolean;
    };
    if (implicit) {
      implicitDatabaseXRefs.set(name, { database: name, implicit: true });
    }
    const databaseNames = databaseCategoryToNames.get(category);
    databaseCategoryToNames.set(
      category,
      databaseNames ? [...databaseNames, name] : [name]
    );
    databaseNameToCategory.set(name, category);
    databaseToDatabaseInfo[name] = info;
  });

  const entrySectionToDatabaseNames = getEntrySectionToDatabaseNames(
    databaseCategoryToNames
  );
  const entrySectionToDatabaseCategoryOrder =
    getEntrySectionToDatabaseCategoryOrder(
      entrySectionToDatabaseNames,
      databaseNameToCategory
    );
  return {
    databaseCategoryToNames,
    databaseNameToCategory,
    databaseToDatabaseInfo,
    implicitDatabaseXRefs,
    entrySectionToDatabaseNames,
    entrySectionToDatabaseCategoryOrder,
  };
};

export const selectDatabases =
  (databaseCategoryToNames: Map<DatabaseCategory, string[]>) =>
  ({
    categories = [],
    include = [],
    exclude = [],
  }: {
    categories?: DatabaseCategory[];
    include?: string[];
    exclude?: string[];
  }) =>
    [
      ...(categories?.flatMap(
        (category) => databaseCategoryToNames.get(category) || []
      ) || []),
      ...include,
    ].filter((db) => !exclude.includes(db));

const reXrefPrefix = /^xref_/;

export const isDatabaseColumn = (column: UniProtKBColumn) =>
  column.match(reXrefPrefix);

export const getDatabaseNameFromColumn = (column: UniProtKBColumn) =>
  column.replace(reXrefPrefix, '');
