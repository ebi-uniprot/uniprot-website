import { selectDatabases } from '../database';

import { DatabaseCategory } from '../../types/databaseRefs';

import databaseInfoMaps from '../../utils/__tests__/__mocks__/databaseInfoMaps';

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
      'EMDB',
      'EvolutionaryTrace',
    ]);
  });
});
