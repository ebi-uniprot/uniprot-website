import { screen } from '@testing-library/react';
import customRender from '../../../../shared/__test-helpers__/customRender';

import ProteinOverview from '../ProteinOverviewView';

import swissprotData from '../../__mocks__/swissprotEntry';
import { ProteinNames } from '../../../adapters/namesAndTaxonomyConverter';

describe('ProteinOverview component', () => {
  test('should render', () => {
    const { asFragment } = customRender(
      <ProteinOverview data={swissprotData} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render, in card variant', () => {
    const { asFragment } = customRender(
      <ProteinOverview data={swissprotData} inCard />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render', () => {
    const submissionData = {
      ...swissprotData,
      proteinDescription: {
        submissionNames: [
          {
            fullName: {
              value: 'Some Submission Name',
            },
          } as ProteinNames,
        ],
      },
    };
    customRender(<ProteinOverview data={submissionData} />);
    expect(screen.getByText(/Some Submission Name/)).toBeInTheDocument();
  });
});
