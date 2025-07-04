import { AgrOrthologsResult } from '../../../../types/agrOrthologs';
import { columns, getRowId, isBest, resultsCompare } from '../AgrOrthology';
import getHomologyMethodColumnConfig from '../getHomologyMethodColumnConfig';

jest.mock('../getHomologyMethodColumnConfig', () => {
  return jest.fn((index, method, tooltip, commonTooltip, accessor) => ({
    id: `col-${index}`,
    method,
    tooltip,
    commonTooltip,
    accessor: accessor({
      geneToGeneOrthologyGenerated: { objectGene: { foo: 'bar' } },
    }),
  }));
});

describe('isBest()', () => {
  it('returns true for boolean true', () => {
    expect(isBest(true)).toBe(true);
  });
  it('returns false for boolean false', () => {
    expect(isBest(false)).toBe(false);
  });
  it('matches /yes/i on strings', () => {
    expect(isBest('yes')).toBe(true);
    expect(isBest('YES')).toBe(true);
    expect(isBest('YeS-something')).toBe(true);
  });
  it('returns false if string does not match yes', () => {
    expect(isBest('no')).toBe(false);
    expect(isBest('foo')).toBe(false);
    expect(isBest(undefined)).toBe(false);
  });
});

describe('resultsCompare', () => {
  const makeResult = (taxonCurie: string, matchedCount: number) =>
    ({
      geneToGeneOrthologyGenerated: {
        objectGene: { taxon: { curie: taxonCurie } },
        predictionMethodsMatched: new Array(matchedCount),
      },
    }) as AgrOrthologsResult;

  it('orders by TAXON index first', () => {
    const a = makeResult('NCBITaxon:9606', 1);
    const b = makeResult('NCBITaxon:10090', 5);
    expect(resultsCompare(a, b)).toBeLessThan(0);
    expect(resultsCompare(b, a)).toBeGreaterThan(0);
  });

  it('when same taxon, orders by matched‐length descending', () => {
    const a = makeResult('NCBITaxon:9606', 2);
    const b = makeResult('NCBITaxon:9606', 5);
    expect(resultsCompare(a, b)).toBeGreaterThan(0);
    expect(resultsCompare(b, a)).toBeLessThan(0);
  });

  it('treats unknown‐taxon as largest index', () => {
    const a = makeResult('NCBITaxon:9999', 3);
    const b = makeResult('NCBITaxon:9606', 1);
    expect(resultsCompare(a, b)).toBeGreaterThan(0);
  });
});

describe('getRowId', () => {
  const result = {
    geneToGeneOrthologyGenerated: {
      objectGene: {
        taxon: { name: 'FooSpecies' },
        geneSymbol: { displayText: 'BarGene' },
      },
    },
  } as AgrOrthologsResult;
  it('returns "<species>-<geneSymbol>"', () => {
    expect(getRowId(result)).toBe('FooSpecies-BarGene');
  });
});

describe('columns array', () => {
  it('has the right total length', () => {
    // 4 base columns + one per ORTHOLOGY_METHOD + 1 match‐count
    const ORTHOLOGY_METHOD_COUNT = 12;
    expect(columns).toHaveLength(4 + ORTHOLOGY_METHOD_COUNT + 1);
  });

  it('starts with the 4 static IDs', () => {
    expect(columns.slice(0, 4).map((c) => c.id)).toEqual([
      'species',
      'gene-symbol',
      'best',
      'best-reverse',
    ]);
  });

  it('ends with "method-match-count"', () => {
    expect(columns[columns.length - 1].id).toBe('method-match-count');
  });

  it('calls getHomologyMethodColumnConfig for each method', () => {
    const calls = (getHomologyMethodColumnConfig as jest.Mock).mock.calls;
    expect(calls).toHaveLength(12);
    const [index, method, tooltip, commonTooltip, accessor] = calls[0];
    expect(typeof index).toBe('number');
    expect(typeof method).toBe('string');
    expect(typeof tooltip).toBe('string');
    expect(commonTooltip).toMatch(/Result of orthology/);
    expect(
      accessor({ geneToGeneOrthologyGenerated: { objectGene: { foo: 'bar' } } })
    ).toEqual({ objectGene: { foo: 'bar' } });
  });
});
