import React from 'react';
import { createMemoryHistory } from 'history';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fireEvent, waitFor } from '@testing-library/react';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';
import BlastForm from '../BlastForm';
import initialState from '../../../../app/state/rootInitialState';
import { mockSuggesterApi } from '../../../../uniprotkb/components/query-builder/__tests__/__mocks__/autocompleteWrapperData';

const mock = new MockAdapter(axios);
mock.onGet().reply(200, mockSuggesterApi.response);

const aaSequence = 'ABCDEFGHIJKLMNOPQRST';
const ntSequence = 'ATCGAGCGATAGCGAGGGAC';

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

  it('Sets sequence type based on the sequence', () => {
    const { getByTestId } = component;
    const textArea = getByTestId('sequence-submission-input');
    fireEvent.change(textArea, { target: { value: aaSequence } });
    const stype1 = getByTestId('Sequence type-protein');
    expect(stype1.selected).toBeTruthy();
    fireEvent.change(textArea, { target: { value: ntSequence } });
    const stype2 = getByTestId('Sequence type-dna');
    expect(stype2.selected).toBeTruthy();
  });

  it.skip('Sets the program type based on the sequence', () => {});

  it.skip('Sets a name automatically', () => {});

  it('Sets the automatic matrix based on the sequence', () => {
    const { getByTestId } = component;
    const textArea = getByTestId('sequence-submission-input');
    fireEvent.change(textArea, { target: { value: aaSequence } });
    const matrix = getByTestId('Matrix-auto');
    expect(matrix.text).toEqual('Auto - PAM30');
    fireEvent.change(textArea, {
      target: { value: `${aaSequence}${aaSequence}` },
    });
    expect(matrix.text).toEqual('Auto - PAM70');
    fireEvent.change(textArea, {
      target: { value: `${aaSequence}${aaSequence}${aaSequence}` },
    });
    expect(matrix.text).toEqual('Auto - BLOSUM80');
    fireEvent.change(textArea, {
      target: {
        value: `${aaSequence}${aaSequence}${aaSequence}${aaSequence}${aaSequence}`,
      },
    });
    expect(matrix.text).toEqual('Auto - BLOSUM62');
  });

  it('Adds and removes a taxon', async () => {
    const {
      getByPlaceholderText,
      findByText,
      queryByText,
      getByTestId,
    } = component;
    const autocompleteInput = getByPlaceholderText(
      'Enter taxonomy names or tax IDs'
    );
    fireEvent.change(autocompleteInput, {
      target: { value: mockSuggesterApi.query },
    });
    const autocompleteItem = await findByText('rotavirus [1906931]');
    fireEvent.click(autocompleteItem);
    const chip = await findByText('Human rotavirus [1906931]');
    expect(chip).toBeTruthy();
    fireEvent.click(getByTestId('remove-icon'));
    await waitFor(() =>
      expect(queryByText('Human rotavirus [1906931]')).toBeFalsy()
    );
  });
});
