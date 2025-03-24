import { Dispatch } from 'react';
import { schedule } from 'timing-functions';

import { Job } from '../types/toolsJob';
import JobStore from '../utils/storage';
import { Stores } from '../utils/stores';
import { rehydrateJobs as rehydrateJobsActionCreator } from './toolsActions';
import { ToolsAction } from './toolsReducers';

const rehydrateJobs = async (dispatch: Dispatch<ToolsAction>) => {
  // Wait for browser idleness
  await schedule();

  const jobStore = new JobStore(Stores.METADATA);

  const persistedJobs: Record<string, Job> = {};
  for (const persistedJob of await jobStore.getAll<Job>()) {
    persistedJobs[persistedJob.internalID] = persistedJob;
  }

  // Wait for browser idleness
  await schedule();

  dispatch(rehydrateJobsActionCreator(persistedJobs));
};

export default rehydrateJobs;
