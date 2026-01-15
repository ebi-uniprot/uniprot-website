import { type FacetObject } from '../../../../shared/types/results';
import mockResults from '../../../../uniprotkb/components/__mocks__/results';
import { getFacetString } from '../AsyncDownloadConfirmation';

describe('getFacetString', () => {
  it('should create facet string', () => {
    expect(
      getFacetString(mockResults.facets as Array<FacetObject>, [
        { name: 'proteins_with', value: '2' },
        { name: 'existence', value: '3' },
        { name: 'reviewed', value: 'false' },
      ])
    ).toEqual(
      'Proteins with: Active site, Protein existence: Homology, Status: Unreviewed (TrEMBL)'
    );
  });
});
