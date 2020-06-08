import React from 'react';
import { waitFor } from '@testing-library/react';
import ColumnSelectContainer, {
  removeFieldFromFieldsData,
} from '../ColumnSelectContainer';
import initialState from '../../../../app/state/rootInitialState';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';
import { ColumnSelectTab } from '../../../types/resultsTypes';
import { Column } from '../../../types/columnTypes';
import structuredResultFieldsData from './__mocks__/structuredResultFieldsData.json';
import resultFields from '../../../__mocks__/resultFields.json';
import '../../__mocks__/mockApi';

describe('ColumnSelectContainer component', () => {
  test('should call to get field data', async () => {
    const { getAllByTestId } = renderWithRedux(
      <ColumnSelectContainer
        onChange={jest.fn()}
        selectedColumns={initialState.results.tableColumns}
      />
    );
    const items = await waitFor(() =>
      getAllByTestId('accordion-search-list-item')
    );
    const expectedNumberListItems = resultFields.reduce(
      (accum, { fields }) => accum + fields.length,
      0
    );
    expect(items.length).toEqual(expectedNumberListItems);
  });

  test('removeFieldFromFieldsData should remove field', () => {
    const entryField = {
      tabId: ColumnSelectTab.data,
      accordionId: 'Names & Taxonomy',
      itemId: Column.accession,
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
              id: Column.ccAllergen,
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
              id: Column.xrefAbcd,
              label: 'xrefAbcd-label',
            },
          ],
        },
      ],
    });
  });
});
