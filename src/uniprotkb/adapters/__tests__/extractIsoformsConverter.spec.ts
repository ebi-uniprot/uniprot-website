import modelData from '../../__mocks__/uniProtKBEntryModelData';
import extractIsoforms from '../extractIsoformsConverter';

describe('Accessions data converter', () => {
  it('should extract all isoforms', () => {
    const isoformData = extractIsoforms(modelData);
    expect(isoformData).toEqual({ canonical: 'P21802', isoforms: ['isoID1'] });
  });
});
