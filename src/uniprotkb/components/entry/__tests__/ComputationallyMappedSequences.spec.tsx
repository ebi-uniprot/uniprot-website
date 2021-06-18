import { screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import ComputationalyMappedSequences from '../ComputationallyMappedSequences';

import useDataApi from '../../../../shared/hooks/useDataApi';
import customRender from '../../../../shared/__test-helpers__/customRender';

import data from './__mocks__/genecentric.json';

jest.mock('../../../../shared/hooks/useDataApi');

describe('Computationally mapped isoforms', () => {
  test('Should render correctly', () => {
    (useDataApi as jest.Mock).mockReturnValue({ loading: false, data });

    const { asFragment } = customRender(
      <ComputationalyMappedSequences primaryAccession="P05067" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Should return nothing while loading', () => {
    (useDataApi as jest.Mock).mockReturnValue({ loading: true });

    const { container } = customRender(
      <ComputationalyMappedSequences primaryAccession="P05067" />
    );
    expect(container).toBeEmptyDOMElement();
  });

  test('Should return nothing if 404', () => {
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      status: 404,
      error: {},
    });

    const { container } = customRender(
      <ComputationalyMappedSequences primaryAccession="P05067" />
    );
    expect(container).toBeEmptyDOMElement();
  });

  test('Should return nothing if no related proteins in data', () => {
    const { relatedProteins: _, ...partialData } = data;
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      data: partialData,
    });

    const { container } = customRender(
      <ComputationalyMappedSequences primaryAccession="P05067" />
    );
    expect(container).toBeEmptyDOMElement();
  });

  test('Should go to results with all accessions', async () => {
    (useDataApi as jest.Mock).mockReturnValue({ loading: false, data });
    const history = createMemoryHistory();

    customRender(<ComputationalyMappedSequences primaryAccession="P05067" />, {
      history,
    });
    const button = await screen.findByRole('button', { name: /View all/i });
    fireEvent.click(button);
    expect(history.location.search).toEqual(
      '?query=(accession:A0A0A0MRG2 OR accession:E9PG40 OR accession:H7C0V9 OR accession:H7C2L2)'
    );
  });
});
