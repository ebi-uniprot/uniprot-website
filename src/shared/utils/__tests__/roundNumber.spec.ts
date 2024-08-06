import { roundNumber } from '../roundNumber';

describe('roundNumber', () => {
  it('should just stringify small numbers as such', () => {
    expect(roundNumber(0)).toBe('0');
    expect(roundNumber(1)).toBe('1');
    expect(roundNumber(2)).toBe('2');
    expect(roundNumber(999)).toBe('999');
  });

  it('should format and round down bigger numbers', () => {
    expect(roundNumber(1e3)).toBe('1k');
    expect(roundNumber(1001)).toBe('1k');
    expect(roundNumber(1234)).toBe('1k');
    expect(roundNumber(1499)).toBe('1k');
    expect(roundNumber(1500)).toBe('2k');
    expect(roundNumber(1501)).toBe('2k');
    expect(roundNumber(9999)).toBe('10k');
    expect(roundNumber(1e6)).toBe('1M');
    expect(roundNumber(2e6)).toBe('2M');
  });
});
