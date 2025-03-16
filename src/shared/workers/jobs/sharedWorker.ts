import getJobs from './state/getJobs';
import { getActionHandler, ToolsAction } from './state/actionHandler';

import JobStore from './utils/storage';
import { Stores } from './utils/stores';
import { ToolsState } from './state/toolsInitialState';
import { MessagesAction } from '../../../messages/state/messagesReducers';
import jobPoller from './jobPoller';
import { GetJobMessageArgs } from '../../../messages/utils';

const jobStore = new JobStore(Stores.METADATA);

const sharedWorker = self as unknown as SharedWorkerGlobalScope;

export type JobSharedWorkerMessage = MessageEvent<{
  state?: ToolsState;
  jobAction?: ToolsAction;
  messageAction?: MessagesAction;
}>;

export type ActionFoo = {
  state?: ToolsState;
  jobAction?: ToolsAction;
  messageAction?: GetJobMessageArgs;
};

sharedWorker.onconnect = async (event) => {
  const port = event.ports[0];

  // Rehydrate jobs
  const jobs = await getJobs(jobStore);
  port.postMessage({ state: jobs });

  const actionHandler = getActionHandler(jobStore, port);
  await jobPoller(actionHandler, jobStore);
  port.onmessage = async (e: JobSharedWorkerMessage) => {
    const jobAction = e.data.jobAction;
    if (jobAction) {
      await actionHandler({ jobAction });
      await jobPoller(actionHandler, jobStore);
    }
  };
};

sharedWorker.onerror = async (e) => {
  console.error(e);
};
