import {
  fireEvent,
  render,
  type RenderResult,
  screen,
} from '@testing-library/react';

import { type FieldProps } from '../Field';
import RangeField from '../RangeField';
import { getSearchTerm } from './__mocks__/configureSearchTerms';

const props: FieldProps = {
  field: getSearchTerm('length_range'),
  handleChange: jest.fn().mockClear(),
  initialValue: { length: '[11 TO 45]' },
};
let rendered: RenderResult;

describe('Range field', () => {
  beforeEach(() => {
    (props.handleChange as jest.Mock).mockClear();
    rendered = render(<RangeField {...props} />);
  });

  it('should render a range field', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  it('should handle from/to change', () => {
    const fromNode = screen.getByTestId('range-field-from-input');
    const toNode = screen.getByTestId('range-field-to-input');
    fireEvent.change(fromNode, { target: { value: '5' } });
    fireEvent.change(toNode, { target: { value: '50' } });
    expect(props.handleChange).toHaveBeenCalledWith({
      length: '[5 TO 50]',
    });
  });

  it('should handle from/to change with one missing bound', () => {
    const fromNode = screen.getByTestId('range-field-from-input');
    const toNode = screen.getByTestId('range-field-to-input');
    fireEvent.change(fromNode, { target: { value: '5' } });
    fireEvent.change(toNode, { target: { value: '' } });
    expect(props.handleChange).toHaveBeenCalledWith({
      length: '[5 TO *]',
    });
  });
});
