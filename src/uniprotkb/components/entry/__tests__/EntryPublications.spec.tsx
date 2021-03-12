import { screen } from '@testing-library/react';
import EntryPublications from '../EntryPublications';
import mockPublicationsData from './__mocks__/entryPublicationsData';
import renderWithRouter from '../../../../shared/__test-helpers__/RenderWithRouter';
import useDataApi from '../../../../shared/hooks/useDataApi';

jest.mock('../../../../shared/hooks/useDataApi', () => jest.fn());

const headers = { 'x-totalrecords': mockPublicationsData.results.length };
const dataMock = {
  loading: false,
  data: mockPublicationsData,
  headers,
};

describe('EntryPublications tests', () => {
  it('should call useDataApi and render', async () => {
    (useDataApi as jest.Mock).mockImplementation(() => dataMock);
    renderWithRouter(<EntryPublications accession="P05067" />);
    expect(useDataApi).toHaveBeenCalled();
    expect(
      await screen.getByText(/S-adenosylhomocysteine/)
    ).toBeInTheDocument();
  });
});
