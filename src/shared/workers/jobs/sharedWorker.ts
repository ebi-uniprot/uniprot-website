import { schedule } from 'timing-functions';

import actionHandler from './actionHandler';

import { Job } from '../../../tools/types/toolsJob';
import JobStore from '../../../tools/utils/storage';
import { Stores } from '../../../tools/utils/stores';

const jobStore = new JobStore(Stores.METADATA);

const getJobs = async () => {
  // Wait for browser idleness
  // TODO: still need this?
  await schedule();
  const jobs = await jobStore.getAll<Job>();
  return Object.fromEntries(jobs.map((job) => [job.internalID, job]));
};

const sharedWorker = self as unknown as SharedWorkerGlobalScope;

sharedWorker.onconnect = async (event) => {
  const port = event.ports[0];

  const jobs = await getJobs();
  port.postMessage({ state: jobs });

  port.onmessage = async (e) => {
    console.log(e);
    actionHandler(e.data, jobStore);
    port.postMessage(await getJobs());
  };
};
