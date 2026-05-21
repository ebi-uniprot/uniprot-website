import uniProtKbConverter from '../../../uniprotkb/adapters/uniProtkbConverter';
import databaseInfoMaps from '../../../uniprotkb/utils/__tests__/__mocks__/databaseInfoMaps';
import precomputedMock from '../../__mocks__/uniparcPrecomputedModelData';
import precomputedToUniProtkbConverter from '../precomputedToUniProtkbConverter';

describe('precomputedToUniProtkbConverter', () => {
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
});
