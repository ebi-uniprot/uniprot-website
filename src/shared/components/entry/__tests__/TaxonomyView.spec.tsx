import customRender from '../../../__test-helpers__/customRender';

import TaxonomyView from '../TaxonomyView';

import TaxonomyUIDataJson from './__mocks__/taxonomyUIData.json';

describe('Organism', () => {
  it('should render organism', () => {
    const { asFragment } = customRender(
      <TaxonomyView data={TaxonomyUIDataJson} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
