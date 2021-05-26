import { render } from '@testing-library/react';

import DiseaseInvolvement from '../DiseaseInvolvementView';

import DiseaseInvolvementUIDataJson from './__mocks__/diseaseInvolvementUIData';

describe('DiseaseInvolvement', () => {
  test('should render DiseaseInvolvement', () => {
    const { asFragment } = render(
      <DiseaseInvolvement
        comments={DiseaseInvolvementUIDataJson}
        primaryAccession="P05067"
        includeTitle
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
