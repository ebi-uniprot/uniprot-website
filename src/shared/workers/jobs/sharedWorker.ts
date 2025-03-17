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

const connectedPorts: MessagePort[] = [];

const broadcast = (message: JobSharedWorkerMessage) => {
  for (const port of connectedPorts) {
    port.postMessage(message);
  }
};

sharedWorker.onconnect = async (event) => {
  const port = event.ports[0];
  connectedPorts.push(port);
  // Add try catch here
  if (port.start) {
    port.start();
  }

  // Rehydrate jobs
  broadcast({ state: await getJobs(jobStore) });

  const actionHandler = getActionHandler(jobStore, broadcast);

  port.onmessage = async (e: JobSharedWorkerMessageEvent) => {
    const { jobAction } = e.data;
    if (jobAction) {
      await actionHandler({ jobAction });
      await jobPoller(actionHandler, jobStore);
    }
  };

  // Initial job polling
  await jobPoller(actionHandler, jobStore);
};

sharedWorker.onerror = async (error) => {
  logging.error(error);
};
