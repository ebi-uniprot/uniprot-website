import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LogicalOperator from '../LogicalOperator';

let rendered;
let props;

describe('LogicalOperator component', () => {
  beforeEach(() => {
    props = {
      value: 'AND',
      handleChange: jest.fn(),
    };
    rendered = render(<LogicalOperator {...props} />);
  });

  test('should change evidence', () => {
    const { getByTestId } = rendered;
    const select = getByTestId('advanced-search-logic-select');
    fireEvent.change(select, {
      target: { value: 'OR' },
    });
    expect(props.handleChange).toBeCalled();
  });

  test('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });
});
