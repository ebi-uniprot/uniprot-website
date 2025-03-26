import getExponentialContrast from '../getExponentialContrast';

describe('getExponentialContrast', () => {
  it('should throw outside of bounds', () => {
    expect(() => getExponentialContrast(-1, 1)).toThrow();
    expect(() => getExponentialContrast(-1, 1)).toThrow();
    expect(() => getExponentialContrast(0, -1)).toThrow();
    expect(() => getExponentialContrast(0, -1)).toThrow();
    expect(() => getExponentialContrast(2, 10)).toThrow();
  });

  it('should return same value if factor is 1', () => {
    expect(getExponentialContrast(0, 1)).toBe(0);
    expect(getExponentialContrast(1, 1)).toBe(1);
    expect(getExponentialContrast(0.5, 1)).toBe(0.5);
  });

  it('should return in modified range', () => {
    expect(getExponentialContrast(0, 2)).toBe(0);
    expect(getExponentialContrast(1, 2)).toBe(1);
    expect(getExponentialContrast(0.5, 2)).toBeLessThan(0.5);
    expect(getExponentialContrast(0.5, 3)).toBeLessThan(0.5);
    expect(getExponentialContrast(0.5, 3)).toBeLessThan(
      getExponentialContrast(0.5, 2)
    );
  });
});
