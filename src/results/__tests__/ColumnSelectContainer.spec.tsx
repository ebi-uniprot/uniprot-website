import React from 'react';
import axios from 'axios';
import 'core-js/stable';
import { waitForElement } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import ColumnSelectContainer, {
  removeFieldFromFieldsData,
} from '../ColumnSelectContainer';
import initialState from '../../state/initialState';
import renderWithRedux from '../../__testHelpers__/renderWithRedux';
import mockResultFieldsApi from '../../__mockData__/ResultFieldsData';
import { ColumnSelectTab } from '../types/resultsTypes';
import { Column } from '../../model/types/ColumnTypes';

const mock = new MockAdapter(axios);
mock
  .onGet(mockResultFieldsApi.request)
  .reply(200, mockResultFieldsApi.response);

describe('ColumnSelectContainer component', () => {
  test('should call to get field data', async () => {
    const { getAllByTestId } = renderWithRedux(
      <ColumnSelectContainer
        onChange={jest.fn()}
        selectedColumns={initialState.results.tableColumns}
      />
    );
    const items = await waitForElement(() =>
      getAllByTestId('accordion-search-list-item')
    );
    const expectedNumberListItems = mockResultFieldsApi.response.reduce(
      (accum, { fields }) =>
        accum + fields.filter(field => field.name !== 'accession').length,
      0
    );
    expect(items.length).toEqual(expectedNumberListItems);
  });

  test('removeFieldFromFieldsData should remove field', () => {
    type FieldDatum = {
      id: string;
      title: string;
      items: {
        id: Column;
        label: string;
      }[];
    };

    const entryField = {
      tabId: ColumnSelectTab.data,
      accordionId: 'Names & Taxonomy',
      itemId: Column.accession,
    };

    const fieldsData = {
      [ColumnSelectTab.data]: [
        {
          id: 'Names & Taxonomy',
          title: 'title',
          items: [
            {
              id: Column.accession,
              label: 'accession-label',
            },
            {
              id: Column.ccAllergen,
              label: 'ccAllergen-label',
            },
          ],
        },
      ],
      [ColumnSelectTab.links]: {
        id: 'Sequence',
        title: 'title',
        items: [
          {
            id: Column.drAbcd,
            label: 'drAbcd-label',
          },
        ],
      },
    };
    expect(removeFieldFromFieldsData(entryField, fieldsData)).toEqual({
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
      [ColumnSelectTab.links]: {
        id: 'Sequence',
        title: 'title',
        items: [
          {
            id: Column.drAbcd,
            label: 'drAbcd-label',
          },
        ],
      },
    });
  });
});
