import {
  getDatabaseInfoMaps,
  selectDatabases,
  getEntrySectionToDatabaseCategoryOrder,
} from '../database';
import { DatabaseCategory } from '../../types/databaseRefs';

import databaseInfo from './__mocks__/databaseInfo';
import {
  expectedDatabaseCategoryToNames,
  expectedDatabaseNameToCategory,
  expectedEntrySectionToDatabaseCategoryOrder,
} from './__mocks__/database';
import entrySectionToDatabaseNames from '../../adapters/__mocks__/entrySectionToDatabaseNames';
import databaseNameToCategory from '../../adapters/__mocks__/databaseNameToCategory';
import databaseCategoryToNames from '../../adapters/__mocks__/databaseCategoryToNames';

test('getDatabaseInfoMaps', () => {
  const {
    databaseCategoryToNames,
    databaseNameToCategory,
    databaseToDatabaseInfo,
  } = getDatabaseInfoMaps(databaseInfo);
  expect([...databaseNameToCategory]).toEqual(expectedDatabaseNameToCategory);
  expect([...databaseCategoryToNames]).toEqual(expectedDatabaseCategoryToNames);
  const databaseNames = databaseInfo
    .map((databaseInfoPoint) => databaseInfoPoint.name)
    .sort();
  const keys = Object.keys(databaseToDatabaseInfo).sort();
  expect(keys).toEqual(databaseNames);
});

test('getEntrySectionToDatabaseCategoryOrder', () => {
  const entrySectionToDatabaseCategoryOrder =
    getEntrySectionToDatabaseCategoryOrder(
      entrySectionToDatabaseNames,
      databaseNameToCategory
    );
  expect([...entrySectionToDatabaseCategoryOrder]).toEqual(
    expectedEntrySectionToDatabaseCategoryOrder
  );
});

test('selectDatabases', () => {
  const select = selectDatabases(databaseCategoryToNames);
  const selected = select({
    categories: [DatabaseCategory.STRUCTURE],
    include: ['EvolutionaryTrace'],
    exclude: ['PDB', 'PDBsum'],
  });
  expect(selected).toEqual([
    'PCDDB',
    'SASBDB',
    'BMRB',
    'ModBase',
    'SMR',
    'SWISS-MODEL-Workspace',
    'PDBe-KB',
    'PDBj',
    'RCSB-PDB',
    'EvolutionaryTrace',
  ]);
});
