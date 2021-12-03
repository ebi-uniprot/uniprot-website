import {
  getDatabaseInfoMaps,
  selectDatabases,
  getEntrySectionToDatabaseCategoryOrder,
} from '../database';
import { DatabaseCategory } from '../../types/databaseRefs';

import databaseInfo from './__mocks__/databaseInfo';
// TODO delete these mocks and move the ones in ../../adapters/__mocks__/ to ./__mocks__/
// import {
//   expectedDatabaseCategoryToNames,
//   expectedDatabaseNameToCategory,
//   expectedEntrySectionToDatabaseCategoryOrder,
// } from './__mocks__/database';
import expectedDatabaseNameToCategory from '../../adapters/__mocks__/databaseNameToCategory';
import expectedDatabaseCategoryToNames from '../../adapters/__mocks__/databaseCategoryToNames';
import expectedEntrySectionToDatabaseNames from '../../adapters/__mocks__/entrySectionToDatabaseNames';
import expectedEntrySectionToDatabaseCategoryOrder from '../../adapters/__mocks__/entrySectionToDatabaseCategoryOrder';
import expectedImplicitDatabaseXRefs from '../../adapters/__mocks__/implicitDatabaseXrefs';

test.only('getDatabaseInfoMaps', () => {
  const {
    databaseCategoryToNames,
    databaseNameToCategory,
    databaseToDatabaseInfo,
    entrySectionToDatabaseNames,
    entrySectionToDatabaseCategoryOrder,
    implicitDatabaseXRefs,
  } = getDatabaseInfoMaps(databaseInfo);
  expect(databaseNameToCategory).toEqual(expectedDatabaseNameToCategory);
  expect(databaseCategoryToNames).toEqual(expectedDatabaseCategoryToNames);
  expect(entrySectionToDatabaseNames).toEqual(
    expectedEntrySectionToDatabaseNames
  );
  expect(entrySectionToDatabaseCategoryOrder).toEqual(
    expectedEntrySectionToDatabaseCategoryOrder
  );
  expect(implicitDatabaseXRefs).toEqual(expectedImplicitDatabaseXRefs);
  const databaseNames = databaseInfo
    .map((databaseInfoPoint) => databaseInfoPoint.name)
    .sort();
  const keys = Object.keys(databaseToDatabaseInfo).sort();
  expect(keys).toEqual(databaseNames);
});

test('getEntrySectionToDatabaseCategoryOrder', () => {
  const entrySectionToDatabaseCategoryOrder =
    getEntrySectionToDatabaseCategoryOrder(
      expectedEntrySectionToDatabaseNames,
      expectedDatabaseNameToCategory
    );
  expect(entrySectionToDatabaseCategoryOrder).toEqual(
    expectedEntrySectionToDatabaseCategoryOrder
  );
});

test('selectDatabases', () => {
  const select = selectDatabases(expectedDatabaseCategoryToNames);
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
