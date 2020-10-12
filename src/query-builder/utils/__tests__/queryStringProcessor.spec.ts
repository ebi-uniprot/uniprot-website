/**
 * @jest-environment node
 */
import { parse, stringify } from '../queryStringProcessor';
import {
  testData,
  exceptionThrowingTestData,
} from './__mocks__/clauseQueryTestData';

describe.skip('search querystring stringifier', () => {
  testData.forEach(({ description, queryString, clauses }) => {
    test(description, () => {
      const testQueryString = stringify(clauses);
      expect(testQueryString).toBe(queryString);
    });
  });
  exceptionThrowingTestData.forEach(({ description, error, clauses }) => {
    test(description, () => {
      expect(() => {
        stringify(clauses);
      }).toThrow(error);
    });
  });
  // TODO databases
});

// test by parsing then re-stringifying just to see if we end up with the same
describe.skip('search querystring parser', () => {
  testData.forEach(({ description, queryString, clauses }) => {
    test(description, () => {
      expect(stringify(parse(queryString))).toEqual(queryString);
    });
  });
});
