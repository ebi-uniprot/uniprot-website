import { getMatches } from '../peptideSearchConverter';

describe('getMatches', () => {
  it('should get the correct matches with 0-based indices', () => {
    expect(getMatches('0123456789ABCDEF', ['345', '789'])).toEqual([
      {
        matchSequence: '345',
        start: 3,
        end: 5,
      },
      {
        matchSequence: '789',
        start: 7,
        end: 9,
      },
    ]);
  });

  it('should get the correct matches with 0-based indices with repeats', () => {
    expect(getMatches('0123456789ABCDEF123456', ['345'])).toEqual([
      {
        matchSequence: '345',
        start: 3,
        end: 5,
      },
      {
        matchSequence: '345',
        start: 18,
        end: 20,
      },
    ]);

    expect(getMatches('012424243567', ['2424'])).toEqual([
      {
        matchSequence: '2424',
        start: 2,
        end: 5,
      },
      {
        matchSequence: '2424',
        start: 4,
        end: 7,
      },
    ]);
  });
});
