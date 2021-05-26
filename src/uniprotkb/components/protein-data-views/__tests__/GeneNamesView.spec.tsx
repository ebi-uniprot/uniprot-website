import customRender from '../../../../shared/__test-helpers__/customRender';

import GeneNamesView from '../GeneNamesView';

import GeneNamesUIData from './__mocks__/geneNamesUIData';

describe('GeneNames', () => {
  test('should render gene_names', () => {
    const { asFragment } = customRender(
      <GeneNamesView geneNamesData={GeneNamesUIData} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
