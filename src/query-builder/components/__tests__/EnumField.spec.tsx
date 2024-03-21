import { render, screen, fireEvent } from '@testing-library/react';

import EnumOrBooleanField from '../EnumOrBooleanField';

import { getSearchTerm } from './__mocks__/configureSearchTerms';

const props = {
  field: getSearchTerm('existence'),
  handleChange: jest.fn(),
  queryInput: { stringValue: '1' },
};

describe('Enum field', () => {
  beforeEach(() => {
    props.handleChange.mockReset();
  });

  it('should render an enum field', () => {
    const { asFragment } = render(<EnumOrBooleanField {...props} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should select value and generate query bit', () => {
    render(<EnumOrBooleanField {...props} />);
    const select = screen.getByRole<HTMLSelectElement>('combobox');
    expect(select.value).toBe('1');
    fireEvent.change(select, { target: { value: '2' } });
    expect(select.value).toBe('2');
    expect(props.handleChange).toBeCalledWith({ existence: '2' });
  });
});
