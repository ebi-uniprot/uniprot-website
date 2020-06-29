import React from 'react';
import BlastResultTable from '../BlastResultTable';
import blastResultsMockData from '../../../../__mocks__/server-jobs/example-truncated.json';
import renderWithRedux from '../../../../../shared/__test-helpers__/RenderWithRedux';
import { fireEvent } from '@testing-library/react';

let component;

describe('BlastResultTable tests', () => {
  beforeEach(() => {
    component = renderWithRedux(
      <BlastResultTable data={blastResultsMockData} />
    );
  });

  it('should render the results table', () => {
    const { asFragment } = component;
    expect(asFragment()).toMatchSnapshot();
  });

  it('should toggle the extra hss', async () => {
    const { getByText, findAllByTestId } = component;
    let hspTracks = await findAllByTestId('blast-summary-track');
    expect(hspTracks.length).toBe(1);
    const toggle = getByText('+1 more');
    fireEvent.click(toggle);
    hspTracks = await findAllByTestId('blast-summary-track');
    expect(hspTracks.length).toBe(2);
  });
});
