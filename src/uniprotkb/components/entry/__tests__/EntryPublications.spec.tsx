import EntryPublications from '../EntryPublications';
import mockPublicationsData from './__mocks__/entryPublicationsData';
import renderWithRouter from '../../../../shared/__test-helpers__/RenderWithRouter';

jest.mock('../../../../shared/hooks/useDataApi', () => jest.fn());
import useDataApi from '../../../../shared/hooks/useDataApi';

const headers = { 'x-totalrecords': mockPublicationsData.results.length };
const dataMock = {
  loading: false,
  data: mockPublicationsData,
  headers,
};
const getRendered = () =>
  renderWithRouter(<EntryPublications accession="P05067" />);
describe('EntryPublications tests', () => {
  it('should call useDataApi and render', async () => {
    useDataApi.mockImplementation(() => dataMock);
    const { findByText } = getRendered();
    expect(useDataApi).toHaveBeenCalled();
    expect(await findByText(/S-adenosylhomocysteine/)).toBeTruthy();
  });
});
