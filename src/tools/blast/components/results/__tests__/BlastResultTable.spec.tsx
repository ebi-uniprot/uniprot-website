import { screen, fireEvent } from '@testing-library/react';

import customRender from '../../../../../shared/__test-helpers__/customRender';

import BlastResultTable from '../BlastResultTable';

import { Namespace } from '../../../../../shared/types/namespaces';

import data from '../../../../__mocks__/server-jobs/example-truncated';
import noHits from '../../../../__mocks__/server-jobs/example-empty';

describe('BlastResultTable tests', () => {
  it('should render, and toggle the extra HSPs', async () => {
    const { asFragment } = customRender(
      <BlastResultTable
        data={data}
        setSelectedItemFromEvent={jest.fn()}
        setHspDetailPanel={jest.fn()}
        loading={false}
        namespace={Namespace.uniprotkb}
      />
    );
    expect(asFragment()).toMatchSnapshot();

    expect(screen.getByTestId('blast-summary-track')).toBeInTheDocument();
    const toggle = screen.getByRole('button', { name: '+1 more' });
    fireEvent.click(toggle);
    const hspTracks = screen.getAllByTestId('blast-summary-track');
    expect(hspTracks.length).toBe(2);
  });

  it('should render without any hits', () => {
    const { asFragment } = customRender(
      <BlastResultTable
        data={noHits}
        setSelectedItemFromEvent={jest.fn()}
        setHspDetailPanel={jest.fn()}
        loading={false}
        namespace={Namespace.uniprotkb}
      />
    );
    expect(asFragment()).toMatchSnapshot();
    expect(screen.queryByTestId('blast-summary-track')).not.toBeInTheDocument();
  });
});
