/**
 * @jest-environment node
 */
import { sleep } from 'timing-functions';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Store } from 'redux';

import toolsMiddleware from '../toolsMiddleware';

import JobStore from '../../utils/storage';
import { Stores } from '../../utils/stores';

import createdJob from '../../__mocks__/internal-jobs/created';

const axiosMock = new MockAdapter(axios);

axiosMock.onPost().reply(200, { data: 'ncbiblast-R20200505-A-B-C-D' });

const create = (initalState = {}) => {
  const store: Store = {
    getState: jest.fn(() => ({ tools: initalState })),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
    replaceReducer: jest.fn(),
    [Symbol.observable]: jest.fn(),
  };
  const next = jest.fn();

  const invoke = (action: { type: string }) =>
    toolsMiddleware(store)(next)(action);

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
    invoke({ type: '@@INIT' });

    await sleep(1000);

    expect(store.dispatch).toHaveBeenLastCalledWith({
      type: 'REHYDRATE_JOBS',
      payload: { jobs: { [createdJob.internalID]: createdJob } },
    });

    await idbStore.clear();
  });
});
