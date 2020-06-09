import { urlsAreEqual } from '../url';

describe('urlsAreEqual', () => {
  test('should return true when urls are equal except for mismatch between the parameter compress', () => {
    expect(
      urlsAreEqual(
        'https://foo.bar?param=3&compress=true',
        'https://foo.bar?compress=true&param=3',
        ['compress']
      )
    ).toBe(true);
  });
  test('should return false when url hostnames are unequal', () => {
    expect(
      urlsAreEqual(
        'https://foo.bar?param=3&compress=true',
        'https://goo.bar?compress=true&param=3',
        ['compress']
      )
    ).toBe(false);
  });
  test('should return false when url non-ignored parameter is unequal', () => {
    expect(
      urlsAreEqual(
        'https://foo.bar?param=3&compress=true',
        'https://goo.bar?compress=true&param=4',
        ['compress']
      )
    ).toBe(false);
  });
});
