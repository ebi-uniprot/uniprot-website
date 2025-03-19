/**
 * @jest-environment node
 */
import { parse, stringify } from '../queryStringProcessor';
import testData from './__mocks__/clauseQueryTestData';

describe('search querystring stringifier', () => {
  testData.forEach(({ description, queryString, clauses }) => {
    test(description, () => {
      expect(stringify(clauses)).toBe(queryString);
    });
  });

  // edge cases
  test('empty query', () => {
    expect(stringify()).toBe('');
    expect(stringify([])).toBe('');
  });
});

// test by parsing then re-stringifying just to see if we end up with the same
describe('search querystring parser', () => {
  testData.forEach(({ description, queryString }) => {
    test(description, () => {
      expect(stringify(parse(queryString))).toEqual(queryString);
    });
  });

  // edge cases
  test('empty query', () => {
    expect(parse()).toEqual([]);
    expect(parse('')).toEqual([]);
  });

  describe('value-less queries (for use to prefill a form with empty fields)', () => {
    test('1 term', () => {
      const parsed = parse('(organism_name:)');
      expect(parsed).toHaveLength(1);
      expect(parsed[0].searchTerm.term).toBe('organism_name');
      expect(parsed[0].queryBits.organism_name).toBe('');
    });

    test('2 terms', () => {
      const parsed = parse('(name:) AND (taxonomy_name:)');
      expect(parsed).toHaveLength(2);
      expect(parsed[0].searchTerm.term).toBe('name');
      expect(parsed[0].queryBits.name).toBe('');
      expect(parsed[1].searchTerm.term).toBe('taxonomy_name');
      expect(parsed[1].queryBits.taxonomy_name).toBe('');
    });

    test('2 terms and free text', () => {
      const parsed = parse('(name:) AND (taxonomy_name:) AND');
      expect(parsed).toHaveLength(3);
      expect(parsed[0].searchTerm.term).toBe('name');
      expect(parsed[0].queryBits.name).toBe('');
      expect(parsed[1].searchTerm.term).toBe('taxonomy_name');
      expect(parsed[1].queryBits.taxonomy_name).toBe('');
      expect(parsed[2].searchTerm.term).toBe('All');
      expect(parsed[2].queryBits.All).toBe('');
    });
  });

  test('2 terms and free text, and random spacing', () => {
    const parsed = parse('    (name:)    AND(taxonomy_name:) AND ');
    expect(parsed).toHaveLength(3);
    expect(parsed[0].searchTerm.term).toBe('name');
    expect(parsed[0].queryBits.name).toBe('');
    expect(parsed[1].searchTerm.term).toBe('taxonomy_name');
    expect(parsed[1].queryBits.taxonomy_name).toBe('');
    expect(parsed[2].searchTerm.term).toBe('All');
    expect(parsed[2].queryBits.All).toBe('');
  });
});
