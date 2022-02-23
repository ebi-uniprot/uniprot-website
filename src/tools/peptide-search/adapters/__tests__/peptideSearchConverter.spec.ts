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
});
