import { Dispatch } from 'redux';
import { schedule } from 'timing-functions';

import { Stores } from '../utils/stores';
import JobStore from '../utils/storage';

import { rehydrateJobs as rehydrateJobsActionCreator } from './toolsActions';

import { Job } from '../types/toolsJob';

const rehydrateJobs = async (dispatch: Dispatch) => {
  // Wait for browser idleness
  await schedule();

  const jobStore = new JobStore(Stores.METADATA);

  const persistedJobs: { [internalID: string]: Job } = {};
  for (const persistedJob of await jobStore.getAll()) {
    persistedJobs[persistedJob.internalID] = persistedJob;
  }

  if (!Object.keys(persistedJobs).length) return;

  // Wait for browser idleness
  await schedule();

  dispatch(rehydrateJobsActionCreator(persistedJobs));
};

export default rehydrateJobs;
