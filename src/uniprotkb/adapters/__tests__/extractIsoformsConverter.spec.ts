import modelData from '../../__mocks__/entryModelData.json';
import extractIsoforms from '../extractIsoformsConverter';

describe('Accessions data converter', () => {
  test('should extract all accessions', () => {
    const isoformData = extractIsoforms(modelData);
    expect(isoformData).toStrictEqual({ isoforms: ['isoID1'] });
  });
});
