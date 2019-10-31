import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TextField from '../TextField';

describe('Range field', () => {
  const props = {
    field: {
      label: 'UniProtKB AC',
      itemType: 'single',
      term: 'accession',
      description: 'Search by UniProtKB Accession',
      example: 'P12345',
    },
    type: 'text',
    queryInput: {},
    handleChange: jest.fn(),
  };

  test('should render a text field', () => {
    const updatedValue = 'Some term';
    const { getByPlaceholderText, rerender } = render(<TextField {...props} />);
    const inputElt = getByPlaceholderText('P12345');
    expect(inputElt.value).toBe('');
    fireEvent.change(inputElt, { target: { value: updatedValue } });
    expect(props.handleChange).toBeCalled();
    props.value = updatedValue;
    rerender(<TextField {...props} />);
    expect(inputElt.value).toBe(updatedValue);
  });

  test('should render', () => {
    const { asFragment } = render(<TextField {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
