import customRender from '../../../../shared/__test-helpers__/customRender';

import DiseaseInvolvement from '../DiseaseInvolvementView';

import DiseaseInvolvementUIDataJson from './__mocks__/diseaseInvolvementUIData';

describe('DiseaseInvolvement', () => {
  test('should render DiseaseInvolvement', () => {
    const { asFragment } = customRender(
      <DiseaseInvolvement
        comments={DiseaseInvolvementUIDataJson}
        primaryAccession="P05067"
        includeTitle
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
