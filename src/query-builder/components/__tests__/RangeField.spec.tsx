import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RangeField from '../../../query-builder/components/RangeField';

let props;
let rendered;

describe('Range field', () => {
  beforeEach(() => {
    props = {
      field: {
        id: 'ftlen_sites',
        itemType: 'single',
        term: 'ftlen_sites',
        dataType: 'integer',
        fieldType: 'range',
        example: '[0 TO 100]',
      },
      handleChange: jest.fn(),
      initialValue: { ftlen_sites: '[11 TO 45]' },
    };
    rendered = render(<RangeField {...props} />);
  });

  test('should render a range field', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should handle from/to change', () => {
    const { queryByTestId } = rendered;
    const fromNode = queryByTestId('range-field-from-input');
    const toNode = queryByTestId('range-field-to-input');
    fireEvent.change(fromNode, { target: { value: '5' } });
    fireEvent.change(toNode, { target: { value: '50' } });
    expect(props.handleChange).toHaveBeenCalledWith({
      ftlen_sites: '[5 TO 50]',
    });
  });

  test('should handle from/to change with one missing bound', () => {
    const { queryByTestId } = rendered;
    const fromNode = queryByTestId('range-field-from-input');
    const toNode = queryByTestId('range-field-to-input');
    fireEvent.change(fromNode, { target: { value: '5' } });
    fireEvent.change(toNode, { target: { value: '' } });
    expect(props.handleChange).toHaveBeenCalledWith({
      ftlen_sites: '[5 TO *]',
    });
  });
});
