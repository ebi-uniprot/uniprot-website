import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { screen, fireEvent } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';

import PeptideSearchForm from '../PeptideSearchForm';

import { mockSuggesterApi } from '../../../../query-builder/components/__tests__/__mocks__/autocompleteWrapperData';

const mock = new MockAdapter(axios);
mock.onGet().reply(200, mockSuggesterApi.response);

const aaSequence = 'ABCDEFGHIJKLMNOPQRST';
const ntSequence = 'ATCGAGCGATAGCGAGGGAC';

let component: ReturnType<typeof customRender>;

describe.skip('PeptideSearchForm test', () => {
  beforeEach(() => {
    component = customRender(<PeptideSearchForm />);
  });

  it('Renders the form', () => {
    const { asFragment } = component;
    expect(asFragment()).toMatchSnapshot();
  });

  it('Sets sequence type based on the sequence', () => {
    const textArea = screen.getByTestId('sequence-submission-input');
    fireEvent.change(textArea, { target: { value: aaSequence } });
    const stype1 = screen.getByTestId(
      'Sequence type-protein'
    ) as HTMLOptionElement;
    expect(stype1.selected).toBeTruthy();
    fireEvent.change(textArea, { target: { value: ntSequence } });
    const stype2 = screen.getByTestId('Sequence type-dna') as HTMLOptionElement;
    expect(stype2.selected).toBeTruthy();
  });

  it.skip('Sets the program type based on the sequence', () => {
    /* */
  });

  it.skip('Sets a name automatically', () => {
    /* */
  });

  it('Sets the automatic matrix based on the sequence', () => {
    const textArea = screen.getByTestId('sequence-submission-input');
    fireEvent.change(textArea, { target: { value: aaSequence } });
    const matrix = screen.getByTestId('Matrix-auto') as HTMLOptionElement;
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
    const autocompleteInput = screen.getByPlaceholderText(
      'Enter taxon names or IDs to include'
    );
    fireEvent.change(autocompleteInput, {
      target: { value: mockSuggesterApi.query },
    });
    const autocompleteItem = await screen.findByText('rotavirus [1906931]');
    fireEvent.click(autocompleteItem);
    const chip = await screen.findByText('Human rotavirus [1906931]');
    expect(chip).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('remove-icon'));
    expect(
      screen.queryByText('Human rotavirus [1906931]')
    ).not.toBeInTheDocument();
  });
});
