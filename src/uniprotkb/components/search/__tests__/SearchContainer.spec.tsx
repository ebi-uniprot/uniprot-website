import { cleanup, fireEvent } from '@testing-library/react';
import { Namespace } from '../../../../shared/types/namespaces';
import renderWithRouter from '../../../../shared/__test-helpers__/RenderWithRouter';
import Search from '../SearchContainer';

const props = {
  dispatchCopyQueryClausesToSearch: jest.fn(),
  location: {
    search: '',
  },
  history: {
    push: jest.fn(),
    replace: jest.fn(),
  },
};

let component;

describe('Search shallow components', () => {
  beforeEach(() => {
    component = renderWithRouter(
      <Search {...props} includeFooter namespace={Namespace.uniprotkb} />
    );
  });

  test('should render', () => {
    const { asFragment } = component;
    expect(asFragment()).toMatchSnapshot();
  });

  test('it should ', () => {
    const { getByText, getByDisplayValue, queryByDisplayValue } = component;
    expect(queryByDisplayValue('Albumin')).toBeNull();
    fireEvent.click(getByText('Albumin'));
    expect(getByDisplayValue('Albumin')).toBeTruthy();
  });

  afterAll(cleanup);
});
