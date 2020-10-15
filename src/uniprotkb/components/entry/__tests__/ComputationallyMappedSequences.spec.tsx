import { cleanup, fireEvent, render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import useDataApi from '../../../../shared/hooks/useDataApi';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';
import ComputationalyMappedSequences from '../ComputationallyMappedSequences';
import data from './__mocks__/genecentric.json';

jest.mock('../../../../shared/hooks/useDataApi');

afterEach(cleanup);

describe('Computationally mapped isoforms', () => {
  test('Should render correctly', () => {
    useDataApi.mockReturnValue({ loading: false, data });

    const { asFragment } = renderWithRedux(
      <ComputationalyMappedSequences primaryAccession="P05067" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Should return nothing if 404', () => {
    useDataApi.mockReturnValue({ loading: false, status: 404, error: {} });

    const { asFragment } = renderWithRedux(
      <ComputationalyMappedSequences primaryAccession="P05067" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Should go to results with all accessions', async () => {
    useDataApi.mockReturnValue({ loading: false, data });
    const history = createMemoryHistory();

    const {
      findByText,
    } = renderWithRedux(
      <ComputationalyMappedSequences primaryAccession="P05067" />,
      { history }
    );
    const button = await findByText(/View all/i);
    fireEvent.click(button);
    expect(history.location.search).toEqual(
      '?query=(accession:H7C0V9 OR accession:A0A0A0MRG2 OR accession:E9PG40 OR accession:H7C2L2)'
    );
  });
});
