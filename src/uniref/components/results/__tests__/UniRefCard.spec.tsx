import renderWithRouter from '../../../../shared/__test-helpers__/RenderWithRouter';

import UniRefCard from '../UniRefCard';

import { UniRefLiteAPIModel } from '../../../adapters/uniRefConverter';

import data from '../../../__mocks__/UniRefResultsData.json';

describe('UniRefCard tests', () => {
  it('should render and match snapshot', () => {
    const row = data.results[0];
    const { asFragment } = renderWithRouter(
      <UniRefCard
        // TODO: check mock data to see if it fits model, something's off...
        data={row as UniRefLiteAPIModel}
        handleEntrySelection={() => {}}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
