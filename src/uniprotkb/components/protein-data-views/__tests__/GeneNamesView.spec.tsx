import GeneNamesView from '../GeneNamesView';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';
import GeneNamesUIDataJson from './__mocks__/geneNamesUIData.json';

describe('GeneNames', () => {
  test('should render gene_names', () => {
    const { asFragment } = renderWithRedux(
      <GeneNamesView geneNamesData={GeneNamesUIDataJson} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
