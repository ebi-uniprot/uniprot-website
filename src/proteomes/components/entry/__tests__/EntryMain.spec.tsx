import { MemoryRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import EntryMain from '../EntryMain';
import proteomesConverter from '../../../adapters/proteomesConverter';
import mockData from '../../../__mocks__/proteomesEntryModelData';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';

describe('EntryMain view', () => {
  it('should render', async () => {
    await act(async () => {
      const { asFragment } = renderWithRedux(
        <Router>
          <EntryMain transformedData={proteomesConverter(mockData)} />
        </Router>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
