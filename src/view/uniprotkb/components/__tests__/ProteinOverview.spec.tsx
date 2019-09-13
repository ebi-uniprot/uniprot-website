import React from 'react';
import { render } from '@testing-library/react';
import ProteinOverview from '../ProteinOverviewView';
import ProteinNamesUIDataJson from '../__mocks__/ProteinNamesUIData.json';

describe('ProteinOverview component', () => {
  test('should render', () => {
    const { asFragment } = render(
      <ProteinOverview
        data={ProteinNamesUIDataJson}
        primaryAccession="P05067"
        proteinExistence="Exists"
        uniProtId="Some nameu"
        annotationScore={12.345}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
