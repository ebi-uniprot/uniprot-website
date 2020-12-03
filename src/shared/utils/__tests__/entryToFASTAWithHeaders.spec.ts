import entryToFASTAWithHeaders from '../entryToFASTAWithHeaders';

import uniProtKBModelData from '../../../uniprotkb/__mocks__/entryModelData.json';
import uniParcModelData from '../../../uniparc/__mocks__/entryModelData.json';

describe('entryToFASTAWithHeaders', () => {
  describe('UniProtKB entry', () => {
    it('should handle reviewed entries', () => {
      expect(entryToFASTAWithHeaders(uniProtKBModelData)).toMatchSnapshot();
    });

    it('should handle unreviewed entries', () => {
      expect(
        entryToFASTAWithHeaders({
          ...uniProtKBModelData,
          entryType: 'UniProtKB unreviewed (TrEMBL)',
        })
      ).toMatchSnapshot();
    });
  });

  it('should handle UniParc entries', () => {
    expect(entryToFASTAWithHeaders(uniParcModelData)).toMatchSnapshot();
  });

  describe('fallback gracefully when lacking metadata', () => {
    it('should handle only sequence data', () => {
      expect(
        entryToFASTAWithHeaders({ sequence: uniProtKBModelData.sequence })
      ).toMatchSnapshot();
    });

    it('should handle invalid entry types', () => {
      expect(
        entryToFASTAWithHeaders({
          ...uniProtKBModelData,
          entryType: 'blabla',
        })
      ).toMatchSnapshot();
    });
  });

  describe('modification', () => {
    it('should handle subsets', () => {
      expect(
        entryToFASTAWithHeaders(uniProtKBModelData, {
          subsets: [{ start: 5, end: 7 }],
        })
      ).toMatchSnapshot();
    });
  });
});
