import { screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import customRender from '../../../../../shared/__test-helpers__/customRender';
import { type AgrParalogsResult } from '../../../../types/agrParalogs';
import AgrParalogy, { columns, getRowId } from '../AgrParalogy';
import mockData from './__mocks__/agr-paralogs';

const mock = new MockAdapter(axios);
mock
  .onGet(/www.alliancegenome.org\/api\/gene\/HGNC:620\/paralogs/)
  .reply(200, mockData, { 'x-total-results': 0 });

describe('AgrOrthology', () => {
  it('should render', async () => {
    const { asFragment, container } = customRender(
      <AgrParalogy agrId="HGNC:620" />
    );
    await screen.findByRole('link', { name: 'View source data' });
    expect(asFragment()).toMatchSnapshot();

    const headerCells = container.querySelectorAll('thead th');
    expect(headerCells).toHaveLength(17);

    const bodyRows = container.querySelectorAll('tbody tr');
    expect(bodyRows).toHaveLength(mockData.results.length);
  });
});

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
});
