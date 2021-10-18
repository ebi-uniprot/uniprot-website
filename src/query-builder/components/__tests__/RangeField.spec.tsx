import {
  render,
  screen,
  fireEvent,
  RenderResult,
} from '@testing-library/react';

import RangeField from '../RangeField';

import { idToSearchTerm } from './__mocks__/configureSearchTerms';

import { FieldProps } from '../Field';

const props: FieldProps = {
  field: idToSearchTerm.ftlen_sites,
  handleChange: jest.fn().mockClear(),
  initialValue: { ftlen_sites: '[11 TO 45]' },
};
let rendered: RenderResult;

describe('Range field', () => {
  beforeEach(() => {
    (props.handleChange as jest.Mock).mockClear();
    rendered = render(<RangeField {...props} />);
  });

  test('should render a range field', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should handle from/to change', () => {
    const fromNode = screen.getByTestId('range-field-from-input');
    const toNode = screen.getByTestId('range-field-to-input');
    fireEvent.change(fromNode, { target: { value: '5' } });
    fireEvent.change(toNode, { target: { value: '50' } });
    expect(props.handleChange).toHaveBeenCalledWith({
      ftlen_sites: '[5 TO 50]',
    });
  });

  test('should handle from/to change with one missing bound', () => {
    const fromNode = screen.getByTestId('range-field-from-input');
    const toNode = screen.getByTestId('range-field-to-input');
    fireEvent.change(fromNode, { target: { value: '5' } });
    fireEvent.change(toNode, { target: { value: '' } });
    expect(props.handleChange).toHaveBeenCalledWith({
      ftlen_sites: '[5 TO *]',
    });
  });
});
