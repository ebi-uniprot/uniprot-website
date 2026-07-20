import uniParcModelData from '../../../uniparc/__mocks__/uniParcLightEntryModelData';
import { type UniParcLiteAPIModel } from '../../../uniparc/adapters/uniParcConverter';
import uniProtKBEntryModelData from '../../../uniprotkb/__mocks__/uniProtKBEntryModelData';
import { type UniProtkbAPIModel } from '../../../uniprotkb/adapters/uniProtkbConverter';
import entryToFASTAWithHeaders from '../entryToFASTAWithHeaders';

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

  it('should handle UniParc entries, active', () => {
    expect(
      entryToFASTAWithHeaders(
        uniParcModelData as UniParcLiteAPIModel,
        undefined,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        new Date(uniParcModelData.mostRecentCrossRefUpdated!)
      )
    ).toMatchSnapshot();
  });

  it('should handle UniParc entries, inactive', () => {
    expect(
      entryToFASTAWithHeaders(
        uniParcModelData as UniParcLiteAPIModel,
        undefined,
        new Date()
      )
    ).toMatchSnapshot();
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
          // Forcing an out-of-union value to exercise the fallback path.
          // `UniProtkbAPIModel['entryType']` is a tight literal union, so a
          // plain `as` cast is rejected — `unknown` lets us push 'blabla'
          // through to test how the formatter handles unexpected input.
          entryType: 'blabla' as unknown as UniProtkbAPIModel['entryType'],
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
  });
});
