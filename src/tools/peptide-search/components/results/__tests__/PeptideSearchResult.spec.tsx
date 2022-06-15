import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { screen } from '@testing-library/react';

import customRender from '../../../../../shared/__test-helpers__/customRender';

import PeptideSearchResult from '../PeptideSearchResult';

import { FinishedJob } from '../../../../types/toolsJob';
import { JobTypes } from '../../../../types/toolsJobTypes';
import { Status } from '../../../../types/toolsStatuses';

import uniprotkbResults from '../../../../../uniprotkb/components/__mocks__/results';

const mockJob: FinishedJob<JobTypes.PEPTIDE_SEARCH> = {
  internalID: 'local-id',
  parameters: {
    peps: 'AAQGYGYYRTVIFSAMFGGYSLYYFNRKTFSF\nIQSTHYLQVNYQDSQDWFILVSVIADLRNAFYVLFPIWFHLQEAVGI',
    taxIds: undefined,
    lEQi: 'off',
    spOnly: 'on',
  },
  remoteID: 'remote-id',
  saved: false,
  status: Status.FINISHED,
  timeCreated: 1620215833639,
  timeFinished: 1620216241725,
  timeLastUpdate: 1620216241725,
  timeSubmitted: 1620215833848,
  seen: false,
  title: 'title',
  type: JobTypes.PEPTIDE_SEARCH,
};

const mockRequests = new MockAdapter(axios);
mockRequests
  .onGet(new RegExp(`/peptidematchws/asyncrest/jobs/${mockJob.remoteID}$`))
  .reply(200, 'P35575,O43826');

mockRequests
  .onGet(/uniprotkb\/accessions/)
  .reply(
    200,
    { results: uniprotkbResults.results.slice(0, 2) },
    { 'x-total-results': 2 }
  );

describe('PeptideSearchResult', () => {
  it('should render with the correct number of results in the title, not own job', async () => {
    const { asFragment } = customRender(<PeptideSearchResult />, {
      route: `/peptide-search/${mockJob.remoteID}`,
      initialLocalStorage: {
        'view-mode': 'table',
      },
    });
    await screen.findByText('2 results');
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render with the correct number of results in the title, own user job', async () => {
    const { asFragment } = customRender(<PeptideSearchResult />, {
      route: `/peptide-search/${mockJob.remoteID}`,
      initialLocalStorage: {
        'view-mode': 'table',
      },
      toolsState: { [mockJob.internalID]: mockJob },
    });
    await screen.findByText('2 results');
    expect(asFragment()).toMatchSnapshot();
  });
});
