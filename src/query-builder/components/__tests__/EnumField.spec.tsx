import { render, screen, fireEvent } from '@testing-library/react';

import EnumField from '../EnumField';

import { DataType, ItemType } from '../../types/searchTypes';

const props = {
  field: {
    id: 'protein_existence',
    label: 'Protein Existence [PE]',
    itemType: ItemType.single,
    term: 'existence',
    dataType: DataType.enum,
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

describe('Enum field', () => {
  beforeEach(() => {
    props.handleChange.mockReset();
  });

  test('should render an enum field', () => {
    const { asFragment } = render(<EnumField {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should select value and generate query bit', () => {
    render(<EnumField {...props} />);
    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('1');
    fireEvent.change(select, { target: { value: '2' } });
    expect(select.value).toBe('2');
    expect(props.handleChange).toBeCalledWith({ existence: '2' });
  });
});
