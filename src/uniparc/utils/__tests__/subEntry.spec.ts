import { getSubEntryProteomes } from '../subEntry';

describe('getSubEntryProteomes', () => {
  it('returns an empty object when there are no properties', () => {
    expect(getSubEntryProteomes(undefined)).toEqual({});
  });

  it('extracts the proteome id and component from a sources property', () => {
    expect(
      getSubEntryProteomes([
        { key: 'sources', value: 'EMBL:CAA12345:UP000005640:Chromosome 1' },
      ])
    ).toEqual({ UP000005640: 'Chromosome 1' });
  });

  // Regression: a `sources` value with no proteome segment leaves `proteomeId`
  // undefined — it must be skipped, not written as an unkeyed entry that later
  // crashes getEntryPath().
  it('skips a sources value that has no proteome segment', () => {
    expect(
      getSubEntryProteomes([{ key: 'sources', value: 'EMBL:CAA12345' }])
    ).toEqual({});
  });

  it('skips a sources value whose proteome segment is empty', () => {
    expect(
      getSubEntryProteomes([{ key: 'sources', value: 'EMBL:CAA12345:' }])
    ).toEqual({});
  });

  it('ignores properties that are not sources', () => {
    expect(
      getSubEntryProteomes([{ key: 'organism', value: 'Homo sapiens' }])
    ).toEqual({});
  });
});
