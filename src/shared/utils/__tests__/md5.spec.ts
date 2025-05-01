import md5 from '../md5';
import testcases from './__mocks__/md5';

describe('md5', () => {
  test.each(testcases)('Calculate md5 for %s', (_, sequence, expected) => {
    expect(md5(sequence)).toEqual(expected);
  });
});
