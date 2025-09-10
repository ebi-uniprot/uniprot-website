import { fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { enableFetchMocks, FetchMock } from 'jest-fetch-mock';

import { Location, LocationToPath } from '../../../../app/config/urls';
import { mockSuggesterApi } from '../../../../query-builder/components/__tests__/__mocks__/autocompleteWrapperData';
import customRender from '../../../../shared/__test-helpers__/customRender';
import BlastForm from '../BlastForm';

global.AbortController = jest.fn(() => ({
  abort: jest.fn(),
  signal: { addEventListener: jest.fn() },
})) as unknown as {
  new (): AbortController;
  prototype: AbortController;
};

enableFetchMocks();

const mock = new MockAdapter(axios);
mock.onGet().reply(200, mockSuggesterApi.response);
mock.onHead().reply(200, {}, { 'X-Total-Results': '1000' });

const aaSequence = 'ABCDEFGHIJKLMNOPQRST';
const ntSequence = 'ATCGAGCGATAGCGAGGGAC';

let rendered: ReturnType<typeof customRender>;

const setTextArea = async (textArea: HTMLElement, value: string) => {
  fireEvent.change(textArea, { target: { value } });
  // Don't wait for ChecksumSuggester to show anything as we're not testing that here
  await waitFor(() => {
    expect(
      screen.queryByText('This exact sequence has been found')
    ).not.toBeInTheDocument();
  });
};

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

    setTextArea(textArea, aaSequence);
    expect(sequenceTypeSelect.value).toBe('protein');
    setTextArea(textArea, ntSequence);
    expect(sequenceTypeSelect.value).toBe('dna');
  });

  it('Sets the program type based on the sequence', async () => {
    const textArea = screen.getByTestId('sequence-submission-input');
    const programSelect = screen.getByRole<HTMLSelectElement>('combobox', {
      name: 'Program',
    });
    setTextArea(textArea, aaSequence);
    expect(programSelect.value).toBe('blastp');
    setTextArea(textArea, ntSequence);
    expect(programSelect.value).toBe('blastx');
  });

  it('Sets a name automatically', () => {
    const textArea = screen.getByTestId('sequence-submission-input');
    const jobNameField = screen.getByRole<HTMLSelectElement>('textbox', {
      name: 'Name your BLAST job',
    });
    expect(jobNameField.value).toBe('');
    setTextArea(textArea, `>some_FASTA_header extra info\n${aaSequence}`);
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
    setTextArea(textArea, `>some_FASTA_header extra info\n${aaSequence}`);
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
    setTextArea(textArea, `>some_FASTA_header extra info\n${aaSequence}`);
    expect(programSelect.value).toBe('blastx');
  });

  it("Doesn't set the sequence type automatically when user selected one", () => {
    const textArea = screen.getByTestId('sequence-submission-input');
    const sequenceTypeSelect = screen.getByRole<HTMLSelectElement>('combobox', {
      name: 'Sequence type',
    });
    fireEvent.change(sequenceTypeSelect, { target: { value: 'dna' } });
    setTextArea(textArea, aaSequence);
    expect(sequenceTypeSelect.value).toBe('dna');
  });

  it('Informs the user about the automatic matrix based on the sequence', async () => {
    const textArea = screen.getByTestId('sequence-submission-input');
    setTextArea(textArea, aaSequence);
    const matrix = screen.getByRole<HTMLOptionElement>('option', {
      name: /Auto/,
    });
    expect(matrix.text).toEqual('Auto - PAM30');
    expect(matrix.value).toEqual('auto');
    await setTextArea(textArea, `${aaSequence}${aaSequence}`);
    expect(matrix.text).toEqual('Auto - PAM70');
    expect(matrix.value).toEqual('auto');
    await setTextArea(textArea, `${aaSequence}${aaSequence}${aaSequence}`);
    expect(matrix.text).toEqual('Auto - BLOSUM80');
    expect(matrix.value).toEqual('auto');
    await setTextArea(
      textArea,
      `${aaSequence}${aaSequence}${aaSequence}${aaSequence}${aaSequence}`
    );
    expect(matrix.text).toEqual('Auto - BLOSUM62');
    expect(matrix.value).toEqual('auto');
  });

  it('Adds and removes a taxon', async () => {
    (fetch as FetchMock).mockResponse('OK', {
      status: 200,
      headers: { 'X-Total-Results': '1000' },
    });

    const autocompleteInput = screen.getByRole('searchbox', {
      name: 'Restrict by taxonomy',
    });

    fireEvent.change(autocompleteInput, {
      target: { value: mockSuggesterApi.query },
    });

    const autocompleteItem = await screen.findByText('rotavirus [1906931]');
    fireEvent.click(autocompleteItem);

    expect(
      await screen.findByText('Human rotavirus [1906931]')
    ).toBeInTheDocument();

    expect(await screen.findByText(/Search space:/i)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('remove-icon'));

    await waitFor(() =>
      expect(screen.queryByText(/Search space:/i)).not.toBeInTheDocument()
    );
  });
  it('should reset the form when clicking on reset', async () => {
    const resetButton = screen.getByRole('button', { name: 'Reset' });

    const textArea = screen.getByTestId<HTMLTextAreaElement>(
      'sequence-submission-input'
    );

    await setTextArea(textArea, aaSequence);

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
    await setTextArea(textArea, aaSequence);
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
