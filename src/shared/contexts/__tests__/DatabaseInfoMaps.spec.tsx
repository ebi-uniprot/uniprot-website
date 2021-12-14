import { databaseInfoColumnsSanityCheck } from '../DatabaseInfoMaps';
import { warn } from '../../utils/logging';

jest.mock('../../../uniprotkb/types/columnTypes', () => ({
  UniProtKBColumn: {
    item_a: 'xref_item_a',
    item_b: 'xref_item_b',
    item_c: 'xref_item_c',
  },
}));

jest.mock('../../utils/logging');

describe('DatabaseInfoMaps', () => {
  beforeEach(() => {
    (warn as jest.Mock).mockImplementation(jest.fn());
  });

  it('Should not complains if all configs are the same', () => {
    const databaseInfo = [
      { name: 'item_a', displayName: 'Item A', category: '', implicit: false },
      { name: 'item_b', displayName: 'Item B', category: '', implicit: false },
      { name: 'item_c', displayName: 'Item C', category: '', implicit: false },
    ];
    databaseInfoColumnsSanityCheck(databaseInfo);
    expect(warn).not.toHaveBeenCalled();
  });

  it('Should not ignore implicit database configs', () => {
    const databaseInfo = [
      { name: 'item_a', displayName: 'Item A', category: '', implicit: false },
      { name: 'item_b', displayName: 'Item B', category: '', implicit: false },
      { name: 'item_c', displayName: 'Item C', category: '', implicit: false },
      {
        name: 'item_implicit',
        displayName: 'Item C',
        category: '',
        implicit: true,
      },
    ];
    databaseInfoColumnsSanityCheck(databaseInfo);
    expect(warn).not.toHaveBeenCalled();
  });

  it('Should log if an item is missing from the column definition', () => {
    const databaseInfo = [
      { name: 'item_a', displayName: 'Item A', category: '', implicit: false },
      { name: 'item_b', displayName: 'Item B', category: '', implicit: false },
      { name: 'item_c', displayName: 'Item C', category: '', implicit: false },
      { name: 'item_d', displayName: 'Item D', category: '', implicit: false },
    ];
    databaseInfoColumnsSanityCheck(databaseInfo);
    expect(warn).toHaveBeenCalledWith('Missing column definition for item_d');
  });

  it('Should log if an item is in the column definition but not in the db info', () => {
    const databaseInfo = [
      { name: 'item_a', displayName: 'Item A', category: '', implicit: false },
      { name: 'item_c', displayName: 'Item C', category: '', implicit: false },
    ];
    databaseInfoColumnsSanityCheck(databaseInfo);
    expect(warn).toHaveBeenCalledWith('Unused column definition for item_b');
  });
});
