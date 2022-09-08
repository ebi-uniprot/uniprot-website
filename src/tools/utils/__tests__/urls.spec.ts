import { parseIdsFromSearchParams } from '../urls';

describe('parseIdsFromSearchParams', () => {
  it('should parse a single ID', () => {
    expect(parseIdsFromSearchParams(['P05067'])).toEqual([{ id: 'P05067' }]);
  });
  it('should parse a single ID with a range', () => {
    expect(parseIdsFromSearchParams(['P05067[1-10]'])).toEqual([
      { id: 'P05067', start: 1, end: 10 },
    ]);
  });
  it('should parse several IDs', () => {
    expect(parseIdsFromSearchParams(['P05067', 'P05068'])).toEqual([
      { id: 'P05067' },
      { id: 'P05068' },
    ]);
  });
  it('should parse several IDs some with a range', () => {
    expect(parseIdsFromSearchParams(['P05067[1-10]', 'P05068'])).toEqual([
      { id: 'P05067', start: 1, end: 10 },
      { id: 'P05068' },
    ]);
  });
  it('should parse several IDs all with ranges', () => {
    expect(parseIdsFromSearchParams(['P05067[1-10]', 'P05068[20-39]'])).toEqual(
      [
        { id: 'P05067', start: 1, end: 10 },
        { id: 'P05068', start: 20, end: 39 },
      ]
    );
  });
  it('should parse an isoform with a hyphen', () => {
    // TODO: make isoform pass
    expect(parseIdsFromSearchParams(['P05067-1[1-10]'])).toEqual([
      { id: 'P05067-1', start: 1, end: 10 },
    ]);
  });
});
