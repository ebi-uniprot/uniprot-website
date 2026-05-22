import * as logging from '../../../shared/utils/logging';
import uniProtKbConverter from '../../../uniprotkb/adapters/uniProtkbConverter';
import databaseInfoMaps from '../../../uniprotkb/utils/__tests__/__mocks__/databaseInfoMaps';
import precomputedMock from '../../__mocks__/uniparcPrecomputedModelData';
import precomputedToUniProtkbConverter, {
  isValidPrecomputedModel,
} from '../precomputedToUniProtkbConverter';

jest.mock('../../../shared/utils/logging', () => ({
  warn: jest.fn(),
  error: jest.fn(),
}));

const mockError = logging.error as jest.MockedFunction<typeof logging.error>;

describe('precomputedToUniProtkbConverter', () => {
  beforeEach(() => {
    mockError.mockClear();
  });

  it('fills the placeholder fields the precomputed model lacks', () => {
    const result = precomputedToUniProtkbConverter(precomputedMock);
    expect(result.uniProtkbId).toBe('');
    expect(result.proteinExistence).toBe('');
    expect(result.entryType).toBe('AA');
  });

  it('carries the precomputed annotation payload through unchanged', () => {
    const result = precomputedToUniProtkbConverter(precomputedMock);
    expect(result.primaryAccession).toBe(precomputedMock.primaryAccession);
    expect(result.proteinDescription).toBe(precomputedMock.proteinDescription);
    expect(result.annotationScore).toBe(precomputedMock.annotationScore);
  });

  it('produces a model uniProtKbConverter accepts (same pipeline as UniFire)', () => {
    const ui = uniProtKbConverter(
      precomputedToUniProtkbConverter(precomputedMock),
      databaseInfoMaps
    );
    expect(ui.primaryAccession).toBe(precomputedMock.primaryAccession);
  });

  it('throws and logs on invalid input', () => {
    expect(() => precomputedToUniProtkbConverter(null)).toThrow(
      'Invalid UniParcPrecomputedModel input'
    );
    expect(mockError).toHaveBeenCalledWith(
      expect.stringContaining('Invalid UniParcPrecomputedModel input')
    );
  });

  it('throws when an annotation collection is not an array', () => {
    expect(() =>
      precomputedToUniProtkbConverter({
        ...precomputedMock,
        comments: 'not-an-array',
      })
    ).toThrow('Invalid UniParcPrecomputedModel input');
  });
});

describe('isValidPrecomputedModel', () => {
  it('accepts the precomputed mock', () => {
    expect(isValidPrecomputedModel(precomputedMock)).toBe(true);
  });

  it('rejects null and non-objects', () => {
    expect(isValidPrecomputedModel(null)).toBe(false);
    expect(isValidPrecomputedModel('UPI0000000001')).toBe(false);
  });

  it('rejects a missing or non-string primaryAccession', () => {
    expect(isValidPrecomputedModel({ entryType: 'AA' })).toBe(false);
  });

  it('rejects a non-array annotation collection', () => {
    expect(
      isValidPrecomputedModel({
        primaryAccession: 'UPI0000000001',
        keywords: {},
      })
    ).toBe(false);
  });

  // The type now covers every UniProtkbAPIModel field, not a hand-picked
  // subset, so the guard must reject a non-array in any collection the
  // converter iterates — e.g. a `uniProtKBCrossReferences` the endpoint could
  // add later — not just `comments` / `features` / `keywords`.
  it('rejects a non-array uniProtKBCrossReferences', () => {
    expect(
      isValidPrecomputedModel({
        primaryAccession: 'UPI0000000001',
        uniProtKBCrossReferences: {},
      })
    ).toBe(false);
  });

  it('accepts a model with empty array collections', () => {
    expect(
      isValidPrecomputedModel({
        primaryAccession: 'UPI0000000001',
        genes: [],
        references: [],
        uniProtKBCrossReferences: [],
      })
    ).toBe(true);
  });
});
