import React from 'react';
import { createMemoryHistory } from 'history';
import { fireEvent } from '@testing-library/react';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';
import BlastForm from '../BlastForm';
import initialState from '../../../../app/state/rootInitialState';

let component;

describe('BlastForm test', () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    component = renderWithRedux(<BlastForm />, {
      initialState: {
        ...initialState,
      },
      history,
    });
  });

  it('Renders the form', () => {
    const { asFragment } = component;
    expect(asFragment()).toMatchSnapshot();
  });

  it('Adds and removes a taxon', () => {
    const { getByPlaceholderText } = component;
    const autocompleteInput = getByPlaceholderText('Homo sapiens, 9606,...');
    fireEvent.change(autocompleteInput, { target: { value: 'Homo' } });
    // TODO mock suggester library, select item and check that chip is present
  });
});
