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

  afterEach(() => {
    jest.useRealTimers();
  });

  it('Renders the form', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  it('Sets sequence type based on the sequence', () => {
    const textArea = screen.getByTestId('sequence-submission-input');
    const sequenceTypeSelect = screen.getByRole<HTMLSelectElement>('combobox', {
      name: 'Sequence type',
    });
    fireEvent.change(textArea, { target: { value: aaSequence } });
    expect(sequenceTypeSelect.value).toBe('protein');
    fireEvent.change(textArea, { target: { value: ntSequence } });
    expect(sequenceTypeSelect.value).toBe('dna');
  });

  it('Sets the program type based on the sequence', () => {
    const textArea = screen.getByTestId('sequence-submission-input');
    const programSelect = screen.getByRole<HTMLSelectElement>('combobox', {
      name: 'Program',
    });
    fireEvent.change(textArea, { target: { value: aaSequence } });
    expect(programSelect.value).toBe('blastp');
    fireEvent.change(textArea, { target: { value: ntSequence } });
    expect(programSelect.value).toBe('blastx');
  });

  it('Sets a name automatically', () => {
    const textArea = screen.getByTestId('sequence-submission-input');
    const jobNameField = screen.getByRole<HTMLSelectElement>('textbox', {
      name: 'Name your BLAST job',
    });
    expect(jobNameField.value).toBe('');
    fireEvent.change(textArea, {
      target: { value: `>some_FASTA_header extra info\n${aaSequence}` },
    });
    expect(jobNameField.value).toBe('some_FASTA_header');
  });

  it("Doesn't set a name automatically when user entered one", () => {
    const textArea = screen.getByTestId('sequence-submission-input');
    const jobNameField = screen.getByRole<HTMLSelectElement>('textbox', {
      name: 'Name your BLAST job',
    });
    fireEvent.change(jobNameField, {
      target: { value: 'My job name' },
    });
    expect(jobNameField.value).toBe('My job name');
    fireEvent.change(textArea, {
      target: { value: `>some_FASTA_header extra info\n${aaSequence}` },
    });
    expect(jobNameField.value).toBe('My job name');
  });

  it("Doesn't set the program automatically when user selected one", () => {
    const textArea = screen.getByTestId('sequence-submission-input');
    const programSelect = screen.getByRole<HTMLSelectElement>('combobox', {
      name: 'Program',
    });
    fireEvent.change(programSelect, {
      target: { value: 'blastx' },
    });
    expect(programSelect.value).toBe('blastx');
    fireEvent.change(textArea, {
      target: { value: `>some_FASTA_header extra info\n${aaSequence}` },
    });
    expect(programSelect.value).toBe('blastx');
  });

  it("Doesn't set the sequence type automatically when user selected one", () => {
    const textArea = screen.getByTestId('sequence-submission-input');
    const sequenceTypeSelect = screen.getByRole<HTMLSelectElement>('combobox', {
      name: 'Sequence type',
    });
    fireEvent.change(sequenceTypeSelect, { target: { value: 'dna' } });
    fireEvent.change(textArea, { target: { value: aaSequence } });
    expect(sequenceTypeSelect.value).toBe('dna');
  });

  it('Informs the user about the automatic matrix based on the sequence', () => {
    const textArea = screen.getByTestId('sequence-submission-input');
    fireEvent.change(textArea, { target: { value: aaSequence } });
    const matrix = screen.getByRole<HTMLOptionElement>('option', {
      name: /Auto/,
    });
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

    const textArea = screen.getByTestId<HTMLTextAreaElement>(
      'sequence-submission-input'
    );
    fireEvent.change(textArea, { target: { value: aaSequence } });

    fireEvent.click(resetButton);

    expect(textArea.value).toBe('');
  });

  it('should handle submitting a job', async () => {
    jest.useFakeTimers();
    const { history } = rendered;
    const submitButton = screen.getByRole('button', { name: 'Run BLAST' });

    const textArea = screen.getByTestId<HTMLTextAreaElement>(
      'sequence-submission-input'
    );
    fireEvent.change(textArea, { target: { value: aaSequence } });

    fireEvent.submit(submitButton);

    expect(submitButton).toBeDisabled();

    jest.runAllTimers();
    await waitFor(() =>
      expect(history.location.pathname).toContain(
        LocationToPath[Location.Dashboard]
      )
    );
  });
});
