import getJobs from './getJobs';
import actionHandler from './actionHandler';

import JobStore from '../../../tools/utils/storage';
import { Stores } from '../../../tools/utils/stores';

const jobStore = new JobStore(Stores.METADATA);

const sharedWorker = self as unknown as SharedWorkerGlobalScope;

sharedWorker.onconnect = async (event) => {
  const port = event.ports[0];

  const jobs = await getJobs(jobStore);
  port.postMessage({ state: jobs });

  port.onmessage = async (e) => {
    console.log(e);
    actionHandler(e.data, jobStore);
    const jobs = await getJobs(jobStore);
    port.postMessage({ state: jobs });
  };
};
