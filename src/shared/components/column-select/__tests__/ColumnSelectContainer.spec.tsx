import React from 'react';
import { waitFor } from '@testing-library/react';

import ColumnSelect from '../ColumnSelect';

import initialState from '../../../../app/state/rootInitialState';

import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';

import { ColumnSelectTab } from '../../../types/resultsTypes';
import { UniProtKBColumn } from '../../../types/columnTypes';

import structuredResultFieldsData from './__mocks__/structuredResultFieldsData.json';
import resultFields from '../../../__mocks__/resultFields.json';
import '../../__mocks__/mockApi';
import { Namespace } from '../../../../shared/types/namespaces';

describe('ColumnSelectContainer component', () => {
  // testing implementation?
  test('should call to get field data', async () => {
    const { getAllByTestId } = renderWithRedux(
      <ColumnSelectContainer
        onChange={jest.fn()}
        selectedColumns={initialState.results.tableColumns[Namespace.uniprotkb]}
      />
    );
    const items = await waitFor(() =>
      getAllByTestId('accordion-search-list-item')
    );
    // const expectedNumberListItems = resultFields.reduce(
    //   (accum, { fields }) => accum + fields.length,
    //   0
    // );
    const aLot = 10;
    expect(items.length).toBeGreaterThan(aLot);
  });

  test('removeFieldFromFieldsData should remove field', () => {
    const entryField = {
      tabId: ColumnSelectTab.data,
      accordionId: 'Names & Taxonomy',
      itemId: UniProtKBColumn.accession,
    };
    expect(
      removeFieldFromFieldsData(entryField, structuredResultFieldsData)
    ).toEqual({
      [ColumnSelectTab.data]: [
        {
          id: 'Names & Taxonomy',
          title: 'title',
          items: [
            {
              id: UniProtKBColumn.ccAllergen,
              label: 'ccAllergen-label',
            },
          ],
        },
      ],
      [ColumnSelectTab.links]: [
        {
          id: 'Sequence',
          title: 'title',
          items: [
            {
              id: UniProtKBColumn.xrefAbcd,
              label: 'xrefAbcd-label',
            },
          ],
        },
      ],
    });
  });
});
