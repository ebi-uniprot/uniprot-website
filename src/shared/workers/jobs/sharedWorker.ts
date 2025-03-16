import getJobs from './state/getJobs';
import { getActionHandler, ToolsAction } from './state/actionHandler';

import JobStore from './utils/storage';
import { Stores } from './utils/stores';
import { ToolsState } from './state/toolsInitialState';
import jobPoller from './jobPoller';
import { GetJobMessageArgs } from '../../../messages/utils';
import * as logging from '../../utils/logging';

const jobStore = new JobStore(Stores.METADATA);

const sharedWorker = self as unknown as SharedWorkerGlobalScope;

export type JobSharedWorkerMessage = {
  state?: ToolsState;
  jobAction?: ToolsAction;
  messageAction?: GetJobMessageArgs;
};

export type JobSharedWorkerMessageEvent = MessageEvent<JobSharedWorkerMessage>;

sharedWorker.onconnect = async (event) => {
  const port = event.ports[0];

  // Rehydrate jobs
  const jobs = await getJobs(jobStore);
  port.postMessage({ state: jobs });

  const actionHandler = getActionHandler(jobStore, port);
  await jobPoller(actionHandler, jobStore);
  port.onmessage = async (e: JobSharedWorkerMessageEvent) => {
    const { jobAction } = e.data;
    if (jobAction) {
      await actionHandler({ jobAction });
      await jobPoller(actionHandler, jobStore);
    }
  };
};

sharedWorker.onerror = async (error) => {
  logging.error(error);
};
