import { Dispatch } from 'redux';
import { schedule } from 'timing-functions';

import { Stores } from './stores';
import JobStore from './storage';

import { rehydrateJobs as rehydrateJobsAction } from '../state/toolsActions';

import { Job } from '../blast/types/blastJob';

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

  dispatch(rehydrateJobsAction(persistedJobs));
};

export default rehydrateJobs;
