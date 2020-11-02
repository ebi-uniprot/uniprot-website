import React from 'react';
import ProteinOverview from '../../protein-data-views/ProteinOverviewView';
import swissprotData from '../../__mocks__/swissprotEntry.json';
import renderWithRouter from '../../../../shared/__test-helpers__/RenderWithRouter';

describe('ProteinOverview component', () => {
  test('should render', () => {
    const { asFragment } = renderWithRouter(
      <ProteinOverview data={swissprotData} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
