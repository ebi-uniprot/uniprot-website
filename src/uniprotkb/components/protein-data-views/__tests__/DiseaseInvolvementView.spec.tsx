import customRender from '../../../../shared/__test-helpers__/customRender';

import DiseaseInvolvement from '../DiseaseInvolvementView';

import diseaseInvolvementUIData from './__mocks__/diseaseInvolvementUIData';

describe('DiseaseInvolvement', () => {
  test('should render DiseaseInvolvement', () => {
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
});
