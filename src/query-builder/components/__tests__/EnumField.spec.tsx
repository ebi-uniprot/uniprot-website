import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EnumField from '../../../query-builder/components/EnumField';

const props = {
  field: {
    id: 'protein_existence',
    label: 'Protein Existence [PE]',
    itemType: 'single',
    term: 'existence',
    dataType: 'enum',
    values: [
      {
        name: 'Evidence at protein level',
        value: '1',
      },
      {
        name: 'Evidence at transcript level',
        value: '2',
      },
    ],
    description: 'Search by protein existence',
    example: '1',
  },
  handleChange: jest.fn(),
  queryInput: { stringValue: '1' },
};

let rendered;

describe('Enum field', () => {
  beforeEach(() => {
    rendered = render(<EnumField {...props} />);
  });

  test('should render an enum field', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should select value and generate query bit', () => {
    const { getByTestId } = rendered;
    const select = getByTestId('enum-field-select');
    expect(select.value).toBe('1');
    fireEvent.change(select, { target: { value: '2' } });
    expect(select.value).toBe('2');
    expect(props.handleChange).toBeCalledWith({ existence: '2' });
  });
});
