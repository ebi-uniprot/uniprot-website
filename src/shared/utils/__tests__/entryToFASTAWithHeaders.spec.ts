import entryToFASTAWithHeaders from '../entryToFASTAWithHeaders';

import uniProtKBEntryModelData from '../../../uniprotkb/__mocks__/uniProtKBEntryModelData';
import uniParcModelData from '../../../uniparc/__mocks__/uniParcEntryModelData';

describe('entryToFASTAWithHeaders', () => {
  describe('UniProtKB entry', () => {
    it('should handle reviewed entries', () => {
      expect(
        entryToFASTAWithHeaders(uniProtKBEntryModelData)
      ).toMatchSnapshot();
    });

    it('should handle unreviewed entries', () => {
      expect(
        entryToFASTAWithHeaders({
          ...uniProtKBEntryModelData,
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
        // Ignoring because we know we don't pass the full object for the pupose
        // of this specific test, it should fallback gracefully
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        entryToFASTAWithHeaders({ sequence: uniProtKBEntryModelData.sequence })
      ).toMatchSnapshot();
    });

    it('should handle invalid entry types', () => {
      expect(
        entryToFASTAWithHeaders({
          ...uniProtKBEntryModelData,
          entryType: 'blabla',
        })
      ).toMatchSnapshot();
    });
  });

  describe('modification', () => {
    it('should handle subsets', () => {
      expect(
        entryToFASTAWithHeaders(uniProtKBEntryModelData, {
          subsets: [{ start: 5, end: 7 }],
        })
      ).toMatchSnapshot();
    });

    it('should handle variations, replacements', () => {
      expect(
        entryToFASTAWithHeaders(uniProtKBEntryModelData, {
          variations: [{ start: 4, end: 6, replacement: 'XXXXXX' }],
        })
      ).toMatchSnapshot();
    });

    it('should handle variations, deletions', () => {
      expect(
        entryToFASTAWithHeaders(uniProtKBEntryModelData, {
          variations: [{ start: 4, end: 6, replacement: '-' }],
        })
      ).toMatchSnapshot();
    });

    it('should handle variations, insertions', () => {
      expect(
        entryToFASTAWithHeaders(uniProtKBEntryModelData, {
          variations: [{ start: 4, end: 4, replacement: 'SLMN' }],
        })
      ).toMatchSnapshot();
    });
  });
});
