import { flatten } from 'lodash-es';
import EntrySection from '../types/entrySection';
import {
  DatabaseCategory,
  DatabaseInfo,
  DatabaseInfoPoint,
} from '../types/databaseRefs';
import { Xref } from '../../shared/types/apiModel';

export type DatabaseInfoMaps = {
  databaseCategoryToNames: Map<DatabaseCategory, string[]>;
  databaseNameToCategory: Map<string, DatabaseCategory>;
  databaseToDatabaseInfo: {
    [database: string]: DatabaseInfoPoint;
  };
  implicitDatabaseXRefs: Map<string, Xref>;
};

export const getDatabaseInfoMaps = (
  databaseInfo: DatabaseInfo
): DatabaseInfoMaps => {
  const databaseCategoryToNames = new Map<DatabaseCategory, string[]>();
  const databaseNameToCategory = new Map<string, DatabaseCategory>();
  const databaseToDatabaseInfo: {
    [database: string]: DatabaseInfoPoint;
  } = {};
  const implicitDatabaseXRefs = new Map<string, Xref>();
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
