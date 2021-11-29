import {
  getDatabaseInfoMaps,
  selectDatabases,
  getEntrySectionToDatabaseCategoryOrder,
} from '../database';
import {
  databaseCategoryToNames,
  entrySectionToDatabaseNames,
  databaseNameToCategory,
} from '../../config/database';
import { DatabaseCategory } from '../../types/databaseRefs';

import databaseInfo from '../../components/protein-data-views/__tests__/__mocks__/databaseInfo';
import {
  expectedDatabaseCategoryToNames,
  expectedDatabaseNameToCategory,
  expectedEntrySectionToDatabaseCategoryOrder,
} from './__mocks__/database';

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
