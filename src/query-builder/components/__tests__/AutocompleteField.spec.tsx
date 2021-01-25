import { render } from '@testing-library/react';

import AutocompleteField from '../AutocompleteField';

const field = {
  id: 'organism_name_field',
  label: 'Organism [OS]',
  itemType: 'single',
  term: 'organism_name',
  dataType: 'string',
  fieldType: 'general',
  example: 'saccharomyces',
  autoComplete: '/uniprot/api/suggester?dict=organism&query=?',
  autoCompleteQueryTerm: 'organism_id',
};

describe('AutocompleteField', () => {
  test('Autocomplete field should be initialised with id', () => {
    const propsPrefix = {
      field: field,
      handleChange: jest.fn(),
      initialValue: { organism_id: '9606' },
    };
    const { getByDisplayValue } = render(
      <AutocompleteField {...propsPrefix} />
    );
    const inputElt = getByDisplayValue('9606');
    expect(inputElt).toBeTruthy();
  });

  test('Autocomplete field should be initialised with name', () => {
    const propsPrefix = {
      field: field,
      handleChange: jest.fn(),
      initialValue: { organism_name: 'Homo' },
    };
    const { getByDisplayValue } = render(
      <AutocompleteField {...propsPrefix} />
    );
    const inputElt = getByDisplayValue('Homo');
    expect(inputElt).toBeTruthy();
  });
});
