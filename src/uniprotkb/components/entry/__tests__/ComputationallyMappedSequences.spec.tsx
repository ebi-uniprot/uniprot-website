import { screen } from '@testing-library/react';

import ComputationalyMappedSequences from '../ComputationallyMappedSequences';

import useDataApi from '../../../../shared/hooks/useDataApi';
import customRender from '../../../../shared/__test-helpers__/customRender';

import data from './__mocks__/genecentric';

jest.mock('../../../../shared/hooks/useDataApi');

describe('Computationally mapped isoforms', () => {
  it('should render correctly', () => {
    (useDataApi as jest.Mock).mockReturnValue({ loading: false, data });

    const { asFragment } = customRender(
      <ComputationalyMappedSequences primaryAccession="P05067" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should return nothing while loading', () => {
    (useDataApi as jest.Mock).mockReturnValue({ loading: true });

    const { container } = customRender(
      <ComputationalyMappedSequences primaryAccession="P05067" />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('should return nothing if 404', () => {
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

  it('should return nothing if no related proteins in data', () => {
    const { relatedProteins: _, ...partialData } = data.results[0];
    (useDataApi as jest.Mock).mockReturnValue({
      loading: false,
      data: { results: [partialData] },
    });

    const { container } = customRender(
      <ComputationalyMappedSequences primaryAccession="P05067" />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('should go to results with all accessions', async () => {
    (useDataApi as jest.Mock).mockReturnValue({ loading: false, data });

    customRender(<ComputationalyMappedSequences primaryAccession="P05067" />);
    const link = await screen.findByRole<HTMLAnchorElement>('link', {
      name: /View all/i,
    });
    expect(link.href).toContain(
      '?query=accession:P05067%20OR%20accession:A0A0A0MRG2%20OR%20accession:E9PG40%20OR%20accession:H7C0V9%20OR%20accession:H7C2L2'
    );
  });
});
