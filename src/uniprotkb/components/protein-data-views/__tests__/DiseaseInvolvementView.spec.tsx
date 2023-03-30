import customRender from '../../../../shared/__test-helpers__/customRender';

import DiseaseInvolvement from '../DiseaseInvolvementView';

import diseaseInvolvementUIData from './__mocks__/diseaseInvolvementUIData';

describe('DiseaseInvolvement', () => {
  it('should render DiseaseInvolvement', () => {
    const { asFragment } = customRender(
      <DiseaseInvolvement
        comments={diseaseInvolvementUIData.comments}
        features={diseaseInvolvementUIData.features}
        primaryAccession="P05067"
        includeTitle
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should not render DiseaseInvolvement when no disease data', () => {
    const { container } = customRender(
      <DiseaseInvolvement
        comments={[]}
        features={diseaseInvolvementUIData.features}
        primaryAccession="P05067"
        includeTitle
      />
    );
    expect(container).toBeEmptyDOMElement();
  });
});
