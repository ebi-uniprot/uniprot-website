/**
 * @jest-environment node
 */
import createQueryString from '../queryStringGenerator';
import {
  testData,
  exceptionThrowingTestData,
} from './__mocks__/clauseQueryTestData';

describe('QueryHelper', () => {
  testData.forEach(({ description, queryString, clauses }) => {
    test(description, () => {
      const testQueryString = createQueryString(clauses);
      expect(testQueryString).toBe(queryString);
    });
  });
  exceptionThrowingTestData.forEach(({ description, error, clauses }) => {
    test(description, () => {
      expect(() => {
        createQueryString(clauses);
      }).toThrow(error);
    });
  });
  // TODO databases
});
