import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RangeField from '../RangeField';

let props;
let rendered;

describe('Range field', () => {
  beforeEach(() => {
    props = {
      field: {
        id: 'range_field',
        field: {
          label: 'Any',
          itemType: 'feature',
          term: 'sites',
          dataType: 'string',
          hasRange: true,
          description: 'Search by feature sites',
          example: 'translocation',
        },
        queryInput: {},
      },
      handleChange: jest.fn(),
    };
    rendered = render(<RangeField {...props} />);
  });

  test('should render a range field', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should handle from/to change', () => {
    const { queryAllByTestId } = rendered;
    const fromNodes = queryAllByTestId('range-field-from-input');
    const toNodes = queryAllByTestId('range-field-to-input');
    const index = 0;
    fireEvent.change(fromNodes[index], { target: { value: 'val1' } });
    fireEvent.change(toNodes[index], { target: { value: 'val1' } });
    expect(props.handleChange).toHaveBeenCalledTimes(2);
  });
});
