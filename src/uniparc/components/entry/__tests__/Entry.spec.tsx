import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';
import Entry from '../Entry';
import { LocationToPath, Location } from '../../../../app/config/urls';
import data from '../../../__mocks__/entryModelData.json';
import useDataApi from '../../../../shared/hooks/useDataApi';

jest.mock('../../../../shared/hooks/useDataApi');

describe('UniParc Entry tests', () => {
  it('should display the correct id', () => {
    useDataApi.mockReturnValue({ loading: false, data });
    // `${LocationToPath[Location.UniParcEntry]}/:accession`,
    const { asFragment } = renderWithRedux(<Entry />, {
      path: LocationToPath[Location.UniParcEntry],
      route: '/uniparc/UPI0000000001',
    });
    expect(asFragment()).toMatchSnapshot();
  });
});
