import renderWithRouter from '../../../../shared/__test-helpers__/RenderWithRouter';

import UniRefCard from '../UniRefCard';

import data from '../../../__mocks__/UniRefResultsData';

describe('UniRefCard tests', () => {
  it('should render and match snapshot', () => {
    const row = data.results[0];
    const { asFragment } = renderWithRouter(
      <UniRefCard data={row} handleEntrySelection={() => {}} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
