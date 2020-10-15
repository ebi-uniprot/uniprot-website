/**
 * @jest-environment node
 */
import { parse, stringify } from '../queryStringProcessor';
import { testData } from './__mocks__/clauseQueryTestData';

describe('search querystring stringifier', () => {
  testData.forEach(({ description, queryString, clauses }) => {
    test(description, () => {
      expect(stringify(clauses)).toBe(queryString);
    });
  });
});

// test by parsing then re-stringifying just to see if we end up with the same
describe('search querystring parser', () => {
  testData.forEach(({ description, queryString, clauses }) => {
    test(description, () => {
      expect(stringify(parse(queryString))).toEqual(queryString);
    });
  });
});
