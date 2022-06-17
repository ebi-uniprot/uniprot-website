import { selectDatabases } from '../database';
import { DatabaseCategory } from '../../types/databaseRefs';

import databaseInfoMaps from './__mocks__/databaseInfoMaps';
import databaseInfo from './__mocks__/databaseInfo';

describe('getDatabaseInfoMaps', () => {
  it('should match snapshot', () => {
    //
    const databaseInfoMapsJSON = Object.fromEntries(
      Object.entries(databaseInfoMaps).map(([k, v]) =>
        v instanceof Map ? [k, Object.fromEntries(v)] : [k, v]
      )
    );
    expect(databaseInfoMapsJSON).toMatchSnapshot();
  });

  it('should generate databaseToDatabaseInfo with keys equal to the name attribute', () => {
    const databaseNames = databaseInfo
      .map((databaseInfoPoint) => databaseInfoPoint.name)
      .sort();
    const keys = Object.keys(databaseInfoMaps.databaseToDatabaseInfo).sort();
    expect(keys).toEqual(databaseNames);
  });
});

describe('selectDatabases', () => {
  it('should select the correct databases', () => {
    const select = selectDatabases(databaseInfoMaps.databaseCategoryToNames);
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
      'AlphaFoldDB',
      'EvolutionaryTrace',
    ]);
  });
});
