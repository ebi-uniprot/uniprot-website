import customRender from '../../../../shared/__test-helpers__/customRender';

import ProteinOverview from '../ProteinOverviewView';

import swissprotData from '../../__mocks__/swissprotEntry.json';

describe('ProteinOverview component', () => {
  test('should render', () => {
    const { asFragment } = customRender(
      <ProteinOverview data={swissprotData} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
