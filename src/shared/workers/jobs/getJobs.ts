import { schedule } from 'timing-functions';

import { Job } from '../../../tools/types/toolsJob';
import JobStore from '../../../tools/utils/storage';

const getJobs = async (jobStore: JobStore) => {
  // Wait for browser idleness
  // TODO: still need this?
  await schedule();
  const jobs = await jobStore.getAll<Job>();
  return Object.fromEntries(jobs.map((job) => [job.internalID, job]));
};

export default getJobs;
