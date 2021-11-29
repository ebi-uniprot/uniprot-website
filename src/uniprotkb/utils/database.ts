import { flatten } from 'lodash-es';
import EntrySection from '../types/entrySection';
import {
  DatabaseCategory,
  DatabaseInfo,
  DatabaseInfoPoint,
} from '../types/databaseRefs';
import { Xref } from '../../shared/types/apiModel';

export type DatabaseCategoryToNames = Map<DatabaseCategory, string[]>;
export type DatabaseNameToCategory = Map<string, DatabaseCategory>;
export type DatabaseToDatabaseInfo = {
  [database: string]: DatabaseInfoPoint;
};
export type ImplicitDatabaseXRefs = Map<string, Xref>;

export type DatabaseInfoMaps = {
  databaseCategoryToNames: DatabaseCategoryToNames;
  databaseNameToCategory: DatabaseNameToCategory;
  databaseToDatabaseInfo: DatabaseToDatabaseInfo;
  implicitDatabaseXRefs: ImplicitDatabaseXRefs;
};

export const getDatabaseInfoMaps = (
  databaseInfo: DatabaseInfo
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
  return {
    databaseCategoryToNames,
    databaseNameToCategory,
    databaseToDatabaseInfo,
    implicitDatabaseXRefs,
  };
};

export const selectDatabases =
  (databaseCategoryToNames: Map<DatabaseCategory, string[]>) =>
  ({
    categories = [],
    include = [],
    exclude = [],
  }: {
    categories?: string[];
    include?: string[];
    exclude?: string[];
  }) =>
    [
      ...flatten(
        categories.map(
          (category) =>
            databaseCategoryToNames.get(category as DatabaseCategory) || []
        )
      ),
      ...include,
    ].filter((db) => !exclude.includes(db));

export const getEntrySectionToDatabaseCategoryOrder = (
  entrySectionToDatabaseNames: Map<EntrySection, string[]>,
  databaseNameToCategory: Map<string, DatabaseCategory>
) => {
  const entrySectionToDatabaseCategoryOrder = new Map<EntrySection, string[]>();
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
