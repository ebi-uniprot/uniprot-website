import renderWithRouter from '../../../../shared/__test-helpers__/RenderWithRouter';

import ProteinOverview from '../ProteinOverviewView';

import swissprotData from '../../__mocks__/swissprotEntry.json';

describe('ProteinOverview component', () => {
  test('should render', () => {
    const { asFragment } = renderWithRouter(
      <ProteinOverview data={swissprotData} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
