import { schedule, sleep } from 'timing-functions';
import { action } from 'typesafe-actions';

var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');

import toolsMiddleware from '../toolsMiddleware';

import postData from '../../../uniprotkb/config/postData';
import JobStore from '../../utils/storage';
import { Stores } from '../../utils/stores';
import { REHYDRATE_JOBS } from '../toolsActions';

import createdJob from '../../blast/__mocks__/internal-jobs/created';

// jest.mock('timing-functions');
// jest.mock('../../utils/storage', () => jest.fn());

var axiosMock = new MockAdapter(axios);
axiosMock.onPost().reply(200, { data: 'ncbiblast-R20200505-A-B-C-D' });

const create = (initalState = {}) => {
  const store = {
    getState: jest.fn(() => ({ tools: initalState })),
    dispatch: jest.fn(),
  };
  const next = jest.fn();

  const invoke = (action) => toolsMiddleware(store)(next)(action);

  return { store, next, invoke };
};

describe('toolsMiddleware', () => {
  it('should let other actions pass through', () => {
    const { next, invoke } = create();
    const action = { type: 'TEST' };
    invoke(action);

    expect(next).toHaveBeenCalledWith(action);
  });

  it('should automatically dispatch a rehydration event from jobs in storage', async () => {
    const idbStore = new JobStore(Stores.METADATA);
    await idbStore.set(createdJob.internalID, createdJob);

    const { invoke, store } = create();
    invoke({ TYPE: '@INIT' });

    await sleep(1000);

    expect(store.dispatch).toHaveBeenLastCalledWith({
      type: 'REHYDRATE_JOBS',
      payload: { jobs: { [createdJob.internalID]: createdJob } },
    });

    await idbStore.clear();
  });

  it.skip('submit created jobs', async () => {
    // const { next, invoke, store } = create({
    //   [createdJob.internalID]: createdJob,
    // });
    // invoke({ type: 'CREATE_JOB' });
    // await sleep(5000);
    // expect(store.dispatch).toHaveBeenLastCalledWith({
    //   type: 'REHYDRATE_JOBS',
    //   payload: { jobs: { [createdJob.internalID]: createdJob } },
    // });
  });

  it.skip('should run with new jobs', () => {
    // TODO this currently runs into infite loops,
    // possibly because the dispatch doesn't interupt the loop
    // const { next, invoke, store } = create();
    // const action = {
    //   type: REHYDRATE_JOBS,
    // };
    // const instantiatedMiddleware = toolsMiddleware(store);
    // instantiatedMiddleware(next)(action);
    // expect(store.dispatch).toHaveBeenCalled();
  });
});
