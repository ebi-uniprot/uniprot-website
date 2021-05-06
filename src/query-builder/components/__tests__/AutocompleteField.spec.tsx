import { render, screen } from '@testing-library/react';

import AutocompleteField from '../AutocompleteField';

import { DataType, FieldType, ItemType } from '../../types/searchTypes';

const field = {
  id: 'organism_name_field',
  label: 'Organism [OS]',
  itemType: ItemType.single,
  term: 'organism_name',
  dataType: DataType.string,
  fieldType: FieldType.general,
  example: 'saccharomyces',
  autoComplete: '/uniprot/api/suggester?dict=organism&query=?',
  autoCompleteQueryTerm: 'organism_id',
};

describe('AutocompleteField', () => {
  test('Autocomplete field should be initialised with id', () => {
    const propsPrefix = {
      field,
      handleChange: jest.fn(),
      initialValue: { organism_id: '9606' },
    };
    render(<AutocompleteField {...propsPrefix} />);
    expect(screen.getByDisplayValue('9606')).toBeInTheDocument();
  });

  test('Autocomplete field should be initialised with name', () => {
    const propsPrefix = {
      field,
      handleChange: jest.fn(),
      initialValue: { organism_name: 'Homo' },
    };
    render(<AutocompleteField {...propsPrefix} />);
    expect(screen.getByDisplayValue('Homo')).toBeTruthy();
  });
});
