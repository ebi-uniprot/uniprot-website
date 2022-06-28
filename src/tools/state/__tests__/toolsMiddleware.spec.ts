/**
 * @jest-environment node
 */
import { Dispatch, MutableRefObject } from 'react';
import { sleep } from 'timing-functions';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import toolsMiddleware from '../toolsMiddleware';

import { ToolsAction } from '../toolsReducers';
import { ToolsState } from '../toolsInitialState';
import { MessagesAction } from '../../../messages/state/messagesReducers';
import JobStore from '../../utils/storage';
import { Stores } from '../../utils/stores';

import createdJob from '../../__mocks__/internal-jobs/created';

const axiosMock = new MockAdapter(axios);

axiosMock.onPost().reply(200, { data: 'ncbiblast-R20200505-A-B-C-D' });

const dispatch: jest.Mock<Dispatch<ToolsAction>> = jest.fn();
const stateRef: MutableRefObject<ToolsState> = {
  current: {},
};
const messagesDispatch: jest.Mock<Dispatch<MessagesAction>> = jest.fn();

describe('toolsMiddleware', () => {
  it('should automatically dispatch a rehydration event from jobs in storage', async () => {
    const idbStore = new JobStore(Stores.METADATA);
    await idbStore.set(createdJob.internalID, createdJob);

    toolsMiddleware(dispatch, stateRef, messagesDispatch);

    await sleep(1000);

    expect(dispatch).toHaveBeenCalledWith({
      type: 'REHYDRATE_JOBS',
      payload: { jobs: { [createdJob.internalID]: createdJob } },
    });

    await idbStore.clear();
  });
});
