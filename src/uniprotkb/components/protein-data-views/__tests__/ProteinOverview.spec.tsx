import { screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';
import { type ProteinNames } from '../../../adapters/namesAndTaxonomyConverter';
import swissprotData from '../../__mocks__/swissprotEntry';
import ProteinOverview from '../ProteinOverviewView';

describe('ProteinOverview component', () => {
  it('should render', () => {
    const { asFragment } = customRender(
      <ProteinOverview data={swissprotData} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render, in card variant', () => {
    const { asFragment } = customRender(
      <ProteinOverview data={swissprotData} inCard />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render', () => {
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
