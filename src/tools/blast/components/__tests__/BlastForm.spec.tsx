import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { screen, fireEvent, waitFor } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';

import BlastForm from '../BlastForm';

import { LocationToPath, Location } from '../../../../app/config/urls';

import { mockSuggesterApi } from '../../../../query-builder/components/__tests__/__mocks__/autocompleteWrapperData';

const mock = new MockAdapter(axios);
mock.onGet().reply(200, mockSuggesterApi.response);

const aaSequence = 'ABCDEFGHIJKLMNOPQRST';
const ntSequence = 'ATCGAGCGATAGCGAGGGAC';

let rendered: ReturnType<typeof customRender>;

describe('BlastForm test', () => {
  beforeEach(() => {
    rendered = customRender(<BlastForm />);
  });

  it('Renders the form', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  it('Sets sequence type based on the sequence', () => {
    const textArea = screen.getByTestId('sequence-submission-input');
    const sequenceTypeSelect = screen.getByRole('combobox', {
      name: 'Sequence type',
    }) as HTMLSelectElement;
    fireEvent.change(textArea, { target: { value: aaSequence } });
    expect(sequenceTypeSelect.value).toBe('protein');
    fireEvent.change(textArea, { target: { value: ntSequence } });
    expect(sequenceTypeSelect.value).toBe('dna');
  });

  it('Sets the program type based on the sequence', () => {
    const textArea = screen.getByTestId('sequence-submission-input');
    const programSelect = screen.getByRole('combobox', {
      name: 'Program',
    }) as HTMLSelectElement;
    fireEvent.change(textArea, { target: { value: aaSequence } });
    expect(programSelect.value).toBe('blastp');
    fireEvent.change(textArea, { target: { value: ntSequence } });
    expect(programSelect.value).toBe('blastx');
  });

  it('Sets a name automatically', () => {
    const textArea = screen.getByTestId('sequence-submission-input');
    const jobNameField = screen.getByRole('textbox', {
      name: 'Name your BLAST job',
    }) as HTMLSelectElement;
    expect(jobNameField.value).toBe('');
    fireEvent.change(textArea, {
      target: { value: `>some_FASTA_header extra info\n${aaSequence}` },
    });
    expect(jobNameField.value).toBe('some_FASTA_header');
  });

  it("Don't set a name automatically when user entered one", () => {
    const textArea = screen.getByTestId('sequence-submission-input');
    const jobNameField = screen.getByRole('textbox', {
      name: 'Name your BLAST job',
    }) as HTMLSelectElement;
    fireEvent.change(jobNameField, {
      target: { value: 'My job name' },
    });
    expect(jobNameField.value).toBe('My job name');
    fireEvent.change(textArea, {
      target: { value: `>some_FASTA_header extra info\n${aaSequence}` },
    });
    expect(jobNameField.value).toBe('My job name');
  });

  it('Informs the user about the automatic matrix based on the sequence', () => {
    const textArea = screen.getByTestId('sequence-submission-input');
    fireEvent.change(textArea, { target: { value: aaSequence } });
    const matrix = screen.getByRole('option', {
      name: /Auto/,
    }) as HTMLOptionElement;
    expect(matrix.text).toEqual('Auto - PAM30');
    expect(matrix.value).toEqual('auto');
    fireEvent.change(textArea, {
      target: { value: `${aaSequence}${aaSequence}` },
    });
    expect(matrix.text).toEqual('Auto - PAM70');
    expect(matrix.value).toEqual('auto');
    fireEvent.change(textArea, {
      target: { value: `${aaSequence}${aaSequence}${aaSequence}` },
    });
    expect(matrix.text).toEqual('Auto - BLOSUM80');
    expect(matrix.value).toEqual('auto');
    fireEvent.change(textArea, {
      target: {
        value: `${aaSequence}${aaSequence}${aaSequence}${aaSequence}${aaSequence}`,
      },
    });
    expect(matrix.text).toEqual('Auto - BLOSUM62');
    expect(matrix.value).toEqual('auto');
  });

  it('Adds and removes a taxon', async () => {
    const autocompleteInput = screen.getByRole('textbox', {
      name: 'Restrict by taxonomy',
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

  it('should reset the form when clicking on reset', () => {
    const resetButton = screen.getByRole('button', { name: 'Reset' });

    const textArea = screen.getByTestId(
      'sequence-submission-input'
    ) as HTMLTextAreaElement;
    fireEvent.change(textArea, { target: { value: aaSequence } });

    fireEvent.click(resetButton);

    expect(textArea.value).toBe('');
  });

  it.skip('should handle submitting a job', async () => {
    const { history } = rendered;
    const submitButton = screen.getByRole('button', { name: 'Run BLAST' });

    const textArea = screen.getByTestId(
      'sequence-submission-input'
    ) as HTMLTextAreaElement;
    fireEvent.change(textArea, { target: { value: aaSequence } });

    fireEvent.submit(submitButton);

    expect(submitButton).toBeDisabled();

    // Below not really working for now, that's why this test is skipped
    await waitFor(() =>
      history.location.pathname.includes(LocationToPath[Location.Dashboard])
    );

    expect(history.location.hash).not.toBe({});
    // expect(Object.keys(store.getState().tools)).toHaveLength(1);
  });
});
