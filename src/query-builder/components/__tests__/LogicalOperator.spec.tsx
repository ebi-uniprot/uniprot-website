import { render, screen, fireEvent } from '@testing-library/react';

import LogicalOperator from '../LogicalOperator';

import { Operator } from '../../types/searchTypes';

const props = {
  value: Operator.AND,
  handleChange: jest.fn(),
  isFirst: false,
};

describe('LogicalOperator component', () => {
  beforeEach(() => {
    props.handleChange.mockClear();
  });

  test('should change evidence', () => {
    render(<LogicalOperator {...props} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'OR' } });
    expect(props.handleChange).toBeCalled();
  });

  test('should render', () => {
    const { asFragment } = render(<LogicalOperator {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render empty placeholder when it is the first one', () => {
    const { asFragment } = render(<LogicalOperator {...props} isFirst />);
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
