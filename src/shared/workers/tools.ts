import { schedule } from 'timing-functions';
import { Job } from '../../tools/types/toolsJob';
import JobStore from '../../tools/utils/storage';
import { Stores } from '../../tools/utils/stores';

const rehydrateJobs = async () => {
  // Wait for browser idleness
  await schedule();

  const jobStore = new JobStore(Stores.METADATA);

  const persistedJobs: Record<string, Job> = {};
  for (const persistedJob of await jobStore.getAll<Job>()) {
    persistedJobs[persistedJob.internalID] = persistedJob;
  }

  return persistedJobs;
};

const sharedWorkerScope = self as unknown as SharedWorkerGlobalScope;

sharedWorkerScope.onconnect = async (event) => {
  const port = event.ports[0];

  const jobs = await rehydrateJobs();
  port.postMessage({ state: jobs });

  port.onmessage = (e) => {
    const workerResult = `Result: ${e.data[0] * e.data[1]}`;
    port.postMessage(workerResult);
  };
};
