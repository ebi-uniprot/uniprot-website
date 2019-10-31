import databaseInfoJson from '../../data/databaseInfo.json';
import {
  getDatabaseInfoMaps,
  selectDatabases,
  getEntrySectionToDatabaseCategoryOrder,
} from '../database';
import {
  databaseCategoryToNames,
  entrySectionToDatabaseNames,
  databaseNameToCategory,
} from '../../data/database';
import {
  DatabaseCategory,
  DatabaseInfo,
} from '../../model/types/DatabaseTypes';
import {
  expectedDatabaseCategoryToNames,
  expectedDatabaseNameToCategory,
  expectedEntrySectionToDatabaseCategoryOrder,
} from '../../__mockData__/database';

const databaseInfo: DatabaseInfo = databaseInfoJson;

test('getDatabaseInfoMaps', () => {
  const {
    databaseCategoryToNames,
    databaseNameToCategory,
    databaseToDatabaseInfo,
  } = getDatabaseInfoMaps(databaseInfo);
  expect([...databaseNameToCategory]).toEqual(expectedDatabaseNameToCategory);
  expect([...databaseCategoryToNames]).toEqual(expectedDatabaseCategoryToNames);
  const databaseNames = databaseInfo
    .map(databaseInfoPoint => databaseInfoPoint.name)
    .sort();
  const keys = Object.keys(databaseToDatabaseInfo).sort();
  expect(keys).toEqual(databaseNames);
});

test('getEntrySectionToDatabaseCategoryOrder', () => {
  const entrySectionToDatabaseCategoryOrder = getEntrySectionToDatabaseCategoryOrder(
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
    whitelist: ['EvolutionaryTrace'],
    blacklist: ['PDB', 'PDBsum'],
  });
  expect(selected).toEqual([
    'DisProt',
    'ProteinModelPortal',
    'SMR',
    'EvolutionaryTrace',
  ]);
});
