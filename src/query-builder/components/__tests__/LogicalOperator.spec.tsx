import { render, screen, fireEvent } from '@testing-library/react';

import LogicalOperator, { LogicalOperatorProps } from '../LogicalOperator';

const props: LogicalOperatorProps = {
  value: 'AND',
  handleChange: jest.fn(),
  isFirst: false,
};

describe('LogicalOperator component', () => {
  beforeEach(() => {
    (props.handleChange as jest.Mock).mockClear();
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

  test('should render not render "AND" or "OR" when it is the first one', () => {
    const { asFragment } = render(<LogicalOperator {...props} isFirst />);
    expect(screen.getAllByRole('option')).toHaveLength(2);
    expect(screen.queryByText('AND')).not.toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});
