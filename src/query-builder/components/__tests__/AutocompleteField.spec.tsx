import { render, screen } from '@testing-library/react';

import AutocompleteField from '../AutocompleteField';
import { getSearchTerm } from './__mocks__/configureSearchTerms';

const field = getSearchTerm('organism_name_field');

describe('AutocompleteField', () => {
  test('Autocomplete field should be initialised with id', () => {
    const propsPrefix = {
      field,
      handleChange: jest.fn(),
      initialValue: { organism_id: '9606' }, // eslint-disable-line camelcase
    };
    render(<AutocompleteField {...propsPrefix} />);
    expect(screen.getByDisplayValue('9606')).toBeInTheDocument();
  });

  test('Autocomplete field should be initialised with name', () => {
    const propsPrefix = {
      field,
      handleChange: jest.fn(),
      initialValue: { organism_name: 'Homo' }, // eslint-disable-line camelcase
    };
    render(<AutocompleteField {...propsPrefix} />);
    expect(screen.getByDisplayValue('Homo')).toBeInTheDocument();
  });
});
