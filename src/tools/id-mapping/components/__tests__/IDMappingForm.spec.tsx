import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fireEvent, screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';

import IDMappingForm from '../IDMappingForm';

import { mockSuggesterApi } from '../../../../query-builder/components/__tests__/__mocks__/autocompleteWrapperData';
import mockIDMappingFormConfig from './__mocks__/idMappingFormConfig';

const mock = new MockAdapter(axios);
mock.onGet(/\/api\/suggester/).reply(200, mockSuggesterApi.response);
mock
  .onGet(/\/configure\/idmapping\/fields/)
  .reply(200, mockIDMappingFormConfig);

let component: ReturnType<typeof customRender>;

describe('IDMappingForm test', () => {
  beforeEach(async () => {
    component = customRender(<IDMappingForm />);
    await screen.findByRole('button', { name: 'Map IDs' });
  });

  it('Renders the form', () => {
    const { asFragment } = component;
    expect(asFragment()).toMatchSnapshot();
  });

  it('Counts the number of IDs and sets a name automatically', () => {
    const idInput = screen.getByPlaceholderText(
      'P31946 P62258 ALBU_HUMAN EFTU_ECOLI'
    );
    const jobNameInput = screen.getByPlaceholderText(
      '"my job title"'
    ) as HTMLInputElement;
    const initialToDatabaseButton = screen.getByRole('button', {
      name: 'UniProtKB',
    });

    // One ID with default toDB
    fireEvent.change(idInput, { target: { value: 'P31946' } });
    expect(screen.getByText('Your input contains 1 ID')).toBeInTheDocument();
    expect(jobNameInput.value).toEqual('P31946 UniProtKB_AC-ID → UniProtKB');

    // Two IDs with toDB:=CCDS
    fireEvent.click(initialToDatabaseButton);
    const ccdsButton = screen.getByRole('button', { name: 'CCDS' });
    fireEvent.click(ccdsButton);
    fireEvent.change(idInput, { target: { value: 'P31946 P62258' } });
    expect(screen.getByText('Your input contains 2 IDs')).toBeInTheDocument();
    expect(jobNameInput.value).toEqual('P31946 +1 UniProtKB_AC-ID → CCDS');
  });

  it('Not change the name when non-first IDs change and there are the same number', () => {
    const idInput = screen.getByPlaceholderText(
      'P31946 P62258 ALBU_HUMAN EFTU_ECOLI'
    );
    fireEvent.change(idInput, { target: { value: 'P31946 P62258' } });
    const jobNameInput = screen.getByPlaceholderText(
      '"my job title"'
    ) as HTMLInputElement;
    expect(jobNameInput.value).toEqual('P31946 +1 UniProtKB_AC-ID → UniProtKB');
    fireEvent.change(idInput, {
      target: { value: 'P31946 ALBU_HUMAN' },
    });
    expect(jobNameInput.value).toEqual('P31946 +1 UniProtKB_AC-ID → UniProtKB');
  });

  it('Resets the form', async () => {
    // Set input form values
    const idInput = screen.getByPlaceholderText(
      'P31946 P62258 ALBU_HUMAN EFTU_ECOLI'
    ) as HTMLInputElement;
    fireEvent.change(idInput, { target: { value: 'P31946 P62258' } });
    const initialFromDatabaseButton = screen.getByRole('button', {
      name: 'UniProtKB AC/ID',
    });
    fireEvent.click(initialFromDatabaseButton);
    let geneNameButton = screen.getByRole('button', { name: 'Gene Name' });
    fireEvent.click(geneNameButton);
    let autocompleteInput = (await screen.findByPlaceholderText(
      'Enter taxon name or ID'
    )) as HTMLInputElement;
    fireEvent.change(autocompleteInput, {
      target: { value: mockSuggesterApi.query },
    });
    expect(screen.queryByText('UniProtKB AC/ID')).not.toBeInTheDocument();

    // Reset the form
    const resetButton = screen.getByRole('button', { name: 'Reset' });
    fireEvent.click(resetButton);

    // Check everything has been reset
    expect(idInput.value).toBeFalsy();
    expect(screen.queryByText('UniProtKB AC/ID')).toBeInTheDocument();
    expect(
      (screen.getByPlaceholderText('"my job title"') as HTMLInputElement).value
    ).toBeFalsy();
    fireEvent.click(
      screen.getByRole('button', {
        name: 'UniProtKB AC/ID',
      })
    );
    geneNameButton = screen.getByRole('button', { name: 'Gene Name' });
    fireEvent.click(geneNameButton);
    autocompleteInput = (await screen.findByPlaceholderText(
      'Enter taxon name or ID'
    )) as HTMLInputElement;
    expect(autocompleteInput.value).toBeFalsy();
  });

  it('Adds and removes a taxon', async () => {
    const fromDatabaseButton = screen.getByRole('button', {
      name: 'UniProtKB AC/ID',
    });
    fireEvent.click(fromDatabaseButton);
    const geneNameButton = screen.getByRole('button', { name: 'Gene Name' });
    fireEvent.click(geneNameButton);
    const autocompleteInput = (await screen.findByPlaceholderText(
      'Enter taxon name or ID'
    )) as HTMLInputElement;
    expect(autocompleteInput).toBeInTheDocument();
    fireEvent.change(autocompleteInput, {
      target: { value: mockSuggesterApi.query },
    });
    const autocompleteItem = await screen.findByText('rotavirus [1906931]');
    fireEvent.click(autocompleteItem);
    expect(autocompleteInput.value).toEqual('Human rotavirus [1906931]');
  });
});
