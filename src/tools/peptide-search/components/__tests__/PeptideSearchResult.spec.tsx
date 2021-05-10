import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';

import customRender from '../../../../shared/__test-helpers__/customRender';
import { Job } from '../../../types/toolsJob';
import { JobTypes } from '../../../types/toolsJobTypes';
import { Status } from '../../../types/toolsStatuses';
import JobStore from '../../../utils/storage';
import { Stores } from '../../../utils/stores';

import uniprotkbResults from '../../../../uniprotkb/components/__mocks__/results.json';

import PeptideSearchResult from '../PeptideSearchResult';

const mockJob: Job = {
  data: { hits: 2 },
  internalID: 'local-id',
  parameters: {
    peps: 'MLPGLALLLLA',
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
  title: 'title',
  type: JobTypes.PEPTIDE_SEARCH,
};

const mockRequests = new MockAdapter(axios);
mockRequests
  .onGet(new RegExp(`/peptidematchws/asyncrest/jobs/${mockJob.remoteID}$`))
  .reply(200, 'P123456,P654321');

mockRequests
  .onGet(/uniprotkb\/accessions/)
  .reply(
    200,
    { results: uniprotkbResults.results.slice(0, 2) },
    { 'x-total-records': 2 }
  );

describe('PeptideSearchResult', () => {
  it('should render with the correct number of results in the title', async () => {
    const storeName = Stores.METADATA;
    const jobStore = new JobStore(storeName);
    await jobStore.set(mockJob.internalID, mockJob);

    await act(async () => {
      const { asFragment } = customRender(<PeptideSearchResult />, {
        route: `/peptide-search/${mockJob.remoteID}`,
      });
      await screen.findByText('2 results');
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
