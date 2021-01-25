import { cleanup, fireEvent, getAllByText } from '@testing-library/react';
import { after } from 'lodash';
import renderWithRedux from '../../../shared/__test-helpers__/RenderWithRedux';

import HomePage from '../HomePage';

let component;

describe('HomePage component', () => {
  beforeEach(() => {
    component = renderWithRedux(<HomePage />);
  });

  test('should render', () => {
    const { asFragment } = component;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should change the text when selecting a different namespace', async () => {
    const { getByText, getAllByText } = component;
    expect(getByText('Find your protein')).toBeTruthy();
    fireEvent.click(getByText('UniProtKB'));
    const matches = getAllByText('UniRef');
    fireEvent.click(matches.find(({ type }) => type === 'button'));
    const newTagLine = await getByText('Find your protein cluster');
    expect(newTagLine).toBeTruthy();
  });

  afterEach(cleanup);
});
