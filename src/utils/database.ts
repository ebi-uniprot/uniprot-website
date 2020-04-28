import { flatten } from 'lodash';
import EntrySection from '../model/types/EntrySection';
import {
  DatabaseCategory,
  DatabaseInfo,
  DatabaseInfoPoint,
} from '../model/types/DatabaseRefs';
import { Xref } from '../model/types/CommentTypes';

export const getDatabaseInfoMaps = (databaseInfo: DatabaseInfo) => {
  const databaseCategoryToNames = new Map<DatabaseCategory, string[]>();
  const databaseNameToCategory = new Map<string, DatabaseCategory>();
  const databaseToDatabaseInfo: {
    [database: string]: DatabaseInfoPoint;
  } = {};
  const implicitDatabaseXRefs = new Map<string, Xref>();
  databaseInfo.forEach(info => {
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

export const selectDatabases = (
  databaseCategoryToNames: Map<DatabaseCategory, string[]>
) => ({
  categories = [],
  whitelist = [],
  blacklist = [],
}: {
  categories?: string[];
  whitelist?: string[];
  blacklist?: string[];
}) =>
  [
    ...flatten(
      categories.map(
        category =>
          databaseCategoryToNames.get(category as DatabaseCategory) || []
      )
    ),
    ...whitelist,
  ].filter(db => !blacklist.includes(db));

export const getEntrySectionToDatabaseCategoryOrder = (
  entrySectionToDatabaseNames: Map<EntrySection, string[]>,
  databaseNameToCategory: Map<string, DatabaseCategory>
) => {
  const entrySectionToDatabaseCategoryOrder = new Map<EntrySection, string[]>();
  // eslint-disable-next-line no-restricted-syntax
  for (const [entrySection, databaseNames] of entrySectionToDatabaseNames) {
    const uniqueCategories: DatabaseCategory[] = [];
    // eslint-disable-next-line no-restricted-syntax
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
