import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import AutocompleteWrapper, { prepareData } from '../AutocompleteWrapper';

import {
  mockSuggesterApi,
  preparedSuggestions,
} from './__mocks__/autocompleteWrapperData';

describe('prepareData', () => {
  it('should prepare API data for Autocomplete', () => {
    expect(prepareData(mockSuggesterApi.response.suggestions)).toEqual(
      preparedSuggestions
    );
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

describe('Autocomplete Wrapper', () => {
  it('should render', () => {
    const { asFragment } = render(<AutocompleteWrapper {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render the correct number of AutocompleteItems when input is human', async () => {
    render(<AutocompleteWrapper {...props} />);
    const searchInput = screen.getByRole('searchbox');
    fireEvent.change(searchInput, {
      target: { value: mockSuggesterApi.query },
    });
    const autocompleteItems = await waitFor(() =>
      screen.getAllByTestId('autocomplete-item')
    );
    expect(autocompleteItems.length).toEqual(
      mockSuggesterApi.response.suggestions.length
    );
  });

  it('should not render AutocompleteItems when input is less than minCharsToShowDropdown (=3)', async () => {
    render(<AutocompleteWrapper {...props} />);
    const searchInput = screen.getByRole('searchbox');
    const value = 'hu';
    fireEvent.change(searchInput, { target: { value } });
    const autocompleteItems = await waitFor(() =>
      screen.queryAllByTestId('autocomplete-item')
    );
    expect(autocompleteItems.length).toEqual(0);
  });
});
