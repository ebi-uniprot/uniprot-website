import { AgrParalogsResult } from '../../../../types/agrParalogs';
import { columns, getRowId } from '../AgrParalogy';
import getHomologyMethodColumnConfig from '../getHomologyMethodColumnConfig';

jest.mock('../getHomologyMethodColumnConfig', () =>
  jest.fn((index, method, tooltip, commonTooltip, accessor) => ({
    id: `col-${index}`,
    method,
    tooltip,
    commonTooltip,
    accessor: accessor({
      geneToGeneParalogy: { objectGene: { foo: 'bar' } },
    }),
  }))
);

describe('getRowId()', () => {
  it('returns the primaryExternalId of the objectGene', () => {
    const result = {
      geneToGeneParalogy: {
        objectGene: { primaryExternalId: 'XYZ:1234' },
      },
    } as AgrParalogsResult;
    expect(getRowId(result)).toBe('XYZ:1234');
  });
});

describe('columns array', () => {
  const PARALOGY_METHOD_COUNT = 10;
  it('has the right total length', () => {
    expect(columns).toHaveLength(5 + PARALOGY_METHOD_COUNT + 1);
  });

  it('starts with the 5 static IDs', () => {
    expect(columns.slice(0, 5).map((c) => c.id)).toEqual([
      'gene-symbol',
      'rank',
      'length',
      'similarity',
      'identity',
    ]);
  });

  it('ends with "method-match-count"', () => {
    expect(columns[columns.length - 1].id).toBe('method-match-count');
  });

  it('calls getHomologyMethodColumnConfig for each method', () => {
    const calls = (getHomologyMethodColumnConfig as jest.Mock).mock.calls;
    expect(calls).toHaveLength(PARALOGY_METHOD_COUNT);
    const [index, method, tooltip, commonTooltip, accessor] = calls[0];
    expect(typeof index).toBe('number');
    expect(typeof method).toBe('string');
    expect(typeof tooltip).toBe('string');
    expect(commonTooltip).toMatch(/Result of paralogy-inference/);
    expect(
      accessor({ geneToGeneParalogy: { objectGene: { foo: 'bar' } } })
    ).toEqual({ objectGene: { foo: 'bar' } });
  });
});
