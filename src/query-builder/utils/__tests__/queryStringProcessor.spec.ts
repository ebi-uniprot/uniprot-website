/**
 * @jest-environment node
 */
import { getSearchTerm } from '../../components/__tests__/__mocks__/configureSearchTerms';
import {
  isOrphanProteomeComponent,
  parse,
  stringify,
} from '../queryStringProcessor';
import testData from './__mocks__/clauseQueryTestData';

describe('search querystring stringifier', () => {
  testData.forEach(({ description, queryString, clauses }) => {
    test(description, () => {
      expect(stringify(clauses)).toBe(queryString);
    });
  });

  describe('proteome + proteomecomponent fusion', () => {
    test('combines proteome ID and component into a single proteomecomponent clause', () => {
      expect(
        stringify([
          {
            id: 0,
            searchTerm: getSearchTerm('proteome'),
            logicOperator: 'AND',
            queryBits: {
              proteome: 'UP000005640',
              proteomecomponent: 'chromosome',
            },
          },
        ])
      ).toBe('(proteomecomponent:"UP000005640:chromosome")');
    });

    test('does not include a separate proteome clause when both queryBits are present', () => {
      const result = stringify([
        {
          id: 0,
          searchTerm: getSearchTerm('proteome'),
          logicOperator: 'AND',
          queryBits: {
            proteome: 'UP000005640',
            proteomecomponent: 'chromosome',
          },
        },
      ]);
      expect(result).not.toMatch(/\(proteome:/);
      expect(result).not.toMatch(/AND/);
    });

    test('leaves a proteome-only clause untouched', () => {
      expect(
        stringify([
          {
            id: 0,
            searchTerm: getSearchTerm('proteome'),
            logicOperator: 'AND',
            queryBits: {
              proteome: 'UP000005640',
            },
          },
        ])
      ).toBe('(proteome:UP000005640)');
    });

    test('round-trips a fused clause through parse then stringify', () => {
      const queryString = '(proteomecomponent:"UP000005640:chromosome")';
      expect(stringify(parse(queryString))).toBe(queryString);
    });

    test('round-trips a quoted value containing a closing parenthesis', () => {
      const queryString = '(proteomecomponent:"UP000005640:Chromosome (1)")';
      const parsed = parse(queryString);
      expect(parsed[0].searchTerm.term).toBe('proteomecomponent');
      expect(parsed[0].queryBits.proteomecomponent).toBe(
        'UP000005640:Chromosome (1)'
      );
      expect(stringify(parsed)).toBe(queryString);
    });

    test('does not double-quote a component the user has already quoted', () => {
      expect(
        stringify([
          {
            id: 0,
            searchTerm: getSearchTerm('proteome'),
            logicOperator: 'AND',
            queryBits: {
              proteome: 'UP000005640',
              proteomecomponent: '"chromosome 1"',
            },
          },
        ])
      ).toBe('(proteomecomponent:"UP000005640:chromosome 1")');
    });

    test('never falls back to the legacy two-field form', () => {
      // eg the `*` wildcard the query builder itself suggests: there's no ID
      // to fuse with, and `(proteome:*) AND (proteomecomponent:chromosome)`
      // returns no results from 2026_03, so the component is dropped (and the
      // UI warns) rather than producing a silently empty search
      expect(
        stringify([
          {
            id: 0,
            searchTerm: getSearchTerm('proteome'),
            logicOperator: 'AND',
            queryBits: {
              proteome: '*',
              proteomecomponent: 'chromosome',
            },
          },
        ])
      ).toBe('(proteome:*)');
    });
  });

  describe('legacy two-clause proteome + proteomecomponent migration', () => {
    test('folds a legacy `(proteome:ID) AND (proteomecomponent:"name")` bookmark into the fused form', () => {
      const legacyQueryString =
        '(proteome:UP000005640) AND (proteomecomponent:"chromosome")';
      const parsed = parse(legacyQueryString);
      expect(parsed).toHaveLength(1);
      expect(parsed[0].queryBits).toEqual({
        proteome: 'UP000005640',
        proteomecomponent: 'chromosome',
      });
      expect(stringify(parsed)).toBe(
        '(proteomecomponent:"UP000005640:chromosome")'
      );
    });

    test('folds the reverse order too', () => {
      const legacyQueryString =
        '(proteomecomponent:"chromosome") AND (proteome:UP000005640)';
      const parsed = parse(legacyQueryString);
      expect(parsed).toHaveLength(1);
      expect(stringify(parsed)).toBe(
        '(proteomecomponent:"UP000005640:chromosome")'
      );
    });

    test('does not fold across an intervening, unrelated clause', () => {
      const queryString =
        '(proteome:UP000005640) AND (organism_id:9606) AND (proteomecomponent:"chromosome")';
      const parsed = parse(queryString);
      expect(parsed).toHaveLength(3);
      // the component clause stays orphaned rather than being paired with a
      // non-adjacent proteome clause
      expect(isOrphanProteomeComponent(parsed[2])).toBe(true);
    });

    test('does not fold an OR-joined component (changes the meaning of the pair)', () => {
      const queryString =
        '(proteome:UP000005640) OR (proteomecomponent:"chromosome")';
      const parsed = parse(queryString);
      expect(parsed).toHaveLength(2);
      expect(isOrphanProteomeComponent(parsed[1])).toBe(true);
    });

    test('does not fold a NOT-joined component (no fused-field equivalent for exclusion)', () => {
      const queryString =
        '(proteome:UP000005640) NOT (proteomecomponent:"chromosome")';
      const parsed = parse(queryString);
      expect(parsed).toHaveLength(2);
      expect(isOrphanProteomeComponent(parsed[1])).toBe(true);
      // the dropped clause's own NOT doesn't leak onto the surviving clause
      expect(stringify(parsed)).toBe('(proteome:UP000005640)');
    });
  });

  describe('isOrphanProteomeComponent', () => {
    it('is true for a component with no proteome ID', () => {
      expect(
        isOrphanProteomeComponent({
          id: 0,
          searchTerm: getSearchTerm('proteome'),
          logicOperator: 'AND',
          queryBits: { proteomecomponent: 'chromosome' },
        })
      ).toBe(true);
    });

    it('is true, and matches stringify, for a component with an invalid proteome ID', () => {
      const clause = {
        id: 0,
        searchTerm: getSearchTerm('proteome'),
        logicOperator: 'AND' as const,
        queryBits: {
          proteome: 'not-a-proteome-id',
          proteomecomponent: 'chromosome',
        },
      };
      expect(isOrphanProteomeComponent(clause)).toBe(true);
      expect(stringify([clause])).toBe('(proteome:not-a-proteome-id)');
    });

    it('is false, and matches stringify, for a component with a valid proteome ID', () => {
      const clause = {
        id: 0,
        searchTerm: getSearchTerm('proteome'),
        logicOperator: 'AND' as const,
        queryBits: { proteome: 'UP000005640', proteomecomponent: 'chromosome' },
      };
      expect(isOrphanProteomeComponent(clause)).toBe(false);
      expect(stringify([clause])).not.toBe('');
    });

    it('is false, and matches stringify, for an already-fused component with no separate proteome bit', () => {
      const clause = {
        id: 0,
        searchTerm: getSearchTerm('proteome'),
        logicOperator: 'AND' as const,
        queryBits: { proteomecomponent: 'UP000005640:chromosome' },
      };
      expect(isOrphanProteomeComponent(clause)).toBe(false);
      expect(stringify([clause])).not.toBe('');
    });

    it('is false when there is no component at all', () => {
      expect(
        isOrphanProteomeComponent({
          id: 0,
          searchTerm: getSearchTerm('proteome'),
          logicOperator: 'AND',
          queryBits: { proteome: 'UP000005640' },
        })
      ).toBe(false);
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
