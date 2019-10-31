import React from 'react';
import { render } from '@testing-library/react';
import ProteinOverview from '../ProteinOverviewView';
import ProteinNamesUIDataJson from '../__mocks__/ProteinNamesUIData.json';
import EntrySection from '../../../../model/types/EntrySection';

describe('ProteinOverview component', () => {
  test('should render', () => {
    const transformedData = {
      proteinExistence: 'IT exists',
      annotationScore: 12.4,
    };
    transformedData[EntrySection.NamesAndTaxonomy] = ProteinNamesUIDataJson;
    const { asFragment } = render(
      <ProteinOverview transformedData={transformedData} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
