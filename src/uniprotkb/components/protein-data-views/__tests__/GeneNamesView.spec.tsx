import GeneNamesView from '../GeneNamesView';
import customRender from '../../../../shared/__test-helpers__/customRender';
import GeneNamesUIDataJson from './__mocks__/geneNamesUIData.json';

describe('GeneNames', () => {
  test('should render gene_names', () => {
    const { asFragment } = customRender(
      <GeneNamesView geneNamesData={GeneNamesUIDataJson} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
