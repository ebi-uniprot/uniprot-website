import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import AutocompleteWrapper from '../AutocompleteWrapper';
import { resetUuidV1 } from '../../../__mocks__/uuid';
import {
  mockSuggesterApi,
  preparedSuggestions,
} from '../../__mockData__/AutocompleteWrapperData';

describe('Autocomplete Wrapper static methods', () => {
  test('should prepare API data for Autocomplete', () => {
    resetUuidV1();
    expect(
      AutocompleteWrapper.prepareData(mockSuggesterApi.response.suggestions)
    ).toEqual(preparedSuggestions);
  });
});

const props = {
  title: 'Taxonomy [OC]',
  value: 'Homo sapiens (Human) [9606]',
  inputValue: mockSuggesterApi.query,
  url: mockSuggesterApi.baseUrl,
  onSelect: jest.fn(),
};
const mock = new MockAdapter(axios);
mock.onGet(mockSuggesterApi.request).reply(200, mockSuggesterApi.response);

let rendered;
describe('Autocomplete Wrapper', () => {
  beforeEach(() => {
    resetUuidV1();
    rendered = render(<AutocompleteWrapper {...props} />);
  });

  test('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render the correct number of AutocompleteItems when input is human', async () => {
    const { queryByTestId, getAllByTestId } = rendered;
    const searchInput = queryByTestId('search-input');
    fireEvent.change(searchInput, {
      target: { value: mockSuggesterApi.query },
    });
    const autocompleteItems = await waitForElement(() =>
      getAllByTestId('autocomplete-item')
    );
    expect(autocompleteItems.length).toEqual(
      mockSuggesterApi.response.suggestions.length
    );
  });

  test('should not render AutocompleteItems when input is less than minCharsToShowDropdown (=3)', async () => {
    const { queryByTestId, queryAllByTestId } = rendered;
    const searchInput = queryByTestId('search-input');
    const value = 'hu';
    fireEvent.change(searchInput, { target: { value } });
    const autocompleteItems = await waitForElement(() =>
      queryAllByTestId('autocomplete-item')
    );
    expect(autocompleteItems.length).toEqual(0);
  });
});
