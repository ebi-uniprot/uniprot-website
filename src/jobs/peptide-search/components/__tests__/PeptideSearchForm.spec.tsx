import { fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import { mockSuggesterApi } from '../../../../query-builder/components/__tests__/__mocks__/autocompleteWrapperData';
import customRender from '../../../../shared/__test-helpers__/customRender';
import PeptideSearchForm from '../PeptideSearchForm';

const mock = new MockAdapter(axios);
mock.onGet().reply(200, mockSuggesterApi.response);

let component: ReturnType<typeof customRender>;

describe('PeptideSearchForm test', () => {
  beforeEach(() => {
    component = customRender(<PeptideSearchForm />);
  });

  it('Renders the form', () => {
    const { asFragment } = component;
    expect(asFragment()).toMatchSnapshot();
  });

  it('Adds and removes a taxon', async () => {
    const autocompleteInput = screen.getByRole('searchbox', {
      name: 'Restrict by organism',
    });
    fireEvent.change(autocompleteInput, {
      target: { value: mockSuggesterApi.query },
    });
    const autocompleteItem = await screen.findByText('rotavirus [1906931]');
    fireEvent.click(autocompleteItem);
    expect(screen.getByText('Human rotavirus [1906931]')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('remove-icon'));
    expect(
      screen.queryByText('Human rotavirus [1906931]')
    ).not.toBeInTheDocument();
  });
});
