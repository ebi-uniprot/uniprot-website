import getNextURLFromHeaders from '../getNextURLFromHeaders';

describe('getNextURLFromHeaders', () => {
  it('should return the next URL if present', () => {
    const headers = new Headers({
      link: '<https://www.example.com/>; rel="next"',
    });
    const parsedHeaders = Object.fromEntries(headers.entries());
    expect(getNextURLFromHeaders(parsedHeaders)).toBe(
      'https://www.example.com/'
    );
  });

  it("shouldn't return anything if no next URL if present", () => {
    const headers = new Headers({
      link: '<https://www.example.com/>; rel="canonical"',
    });
    const parsedHeaders = Object.fromEntries(headers.entries());
    expect(getNextURLFromHeaders(parsedHeaders)).toBeUndefined();
  });

  it("shouldn't return anything if no next URL if present", () => {
    const headers = new Headers({ 'content-type': 'application/json' });
    const parsedHeaders = Object.fromEntries(headers.entries());
    expect(getNextURLFromHeaders(parsedHeaders)).toBeUndefined();
  });
});
