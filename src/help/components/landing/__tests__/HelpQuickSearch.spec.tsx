import { fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import customRender from '../../../../shared/__test-helpers__/customRender';
import helpData from '../../__mocks__/helpSearchModelData';
import HelpQuickSearch from '../HelpQuickSearch';

jest.mock('lodash-es', () => ({
  debounce: (fn: unknown) => fn,
}));

const mock = new MockAdapter(axios);

mock
  .onGet(/api\/help\/search\?facets=category&query=canonical&size=5/)
  .reply(200, helpData, { 'x-total-results': 123 });

describe('HelpQuickSearch tests', () => {
  it('should render with input', async () => {
    const { asFragment } = customRender(<HelpQuickSearch />);
    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, {
      target: { value: 'canonical' },
    });
    await screen.findByText(/Show all results/);
    expect(asFragment()).toMatchSnapshot();
  });

  it('should navigate to the full results when the enter button is pressed', async () => {
    const { history } = customRender(<HelpQuickSearch />);
    const input = screen.getByPlaceholderText('Search');
    fireEvent.change(input, {
      target: { value: 'canonical' },
    });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(history.location.search).toMatch(/\?query=canonical/);
  });
});
