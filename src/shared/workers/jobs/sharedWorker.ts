import { GetJobMessageArgs } from '../../../messages/utils';
import * as logging from '../../utils/logging';
import getJobPoller from './jobPoller';
import { getActionHandler, ToolsAction } from './state/actionHandler';
import getJobs from './state/getJobs';
import { ToolsState } from './state/toolsInitialState';
import JobStore from './utils/storage';
import { Stores } from './utils/stores';

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
  const jobPoller = getJobPoller(jobStore, actionHandler);

  port.onmessage = async (e: JobSharedWorkerMessageEvent) => {
    const { jobAction } = e.data;
    if (jobAction) {
      await actionHandler({ jobAction });
      await jobPoller();
    }
  };

  // Initial job polling
  await jobPoller();
};

sharedWorker.onerror = async (error) => {
  logging.error(error);
};
