import extractIsoforms from '../extractIsoformsConverter';

import modelData from '../../__mocks__/uniProtKBEntryModelData';

describe('Accessions data converter', () => {
  it('should extract all isoforms', () => {
    const isoformData = extractIsoforms(modelData);
    expect(isoformData).toEqual(['isoID1']);
  });
});
