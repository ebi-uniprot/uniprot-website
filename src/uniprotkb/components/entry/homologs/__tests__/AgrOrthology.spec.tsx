import { screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import customRender from '../../../../../shared/__test-helpers__/customRender';
import { type AgrOrthologsResult } from '../../../../types/agrOrthologs';
import AgrOrthology, {
  columns,
  getRowId,
  isBest,
  resultsCompare,
} from '../AgrOrthology';
import mockData from './__mocks__/agr-orthologs';

const mock = new MockAdapter(axios);
mock
  .onGet(/www.alliancegenome.org\/api\/gene\/HGNC:620\/orthologs/)
  .reply(200, mockData, { 'x-total-results': 0 });

describe('AgrOrthology', () => {
  it('should render', async () => {
    const { asFragment, container } = customRender(
      <AgrOrthology agrId="HGNC:620" />
    );
    await screen.findByRole('link', { name: 'View source data' });
    expect(asFragment()).toMatchSnapshot();

    const headerCells = container.querySelectorAll('thead th');
    expect(headerCells).toHaveLength(18);

    const bodyRows = container.querySelectorAll('tbody tr');
    expect(bodyRows).toHaveLength(mockData.results.length);
  });
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
});
