import getJobs from './getJobs';
import { getActionHandler, ToolsAction } from './actionHandler';

import JobStore from '../../../tools/utils/storage';
import { Stores } from '../../../tools/utils/stores';
import { ToolsState } from '../../../tools/state/toolsInitialState';
import { MessagesAction } from '../../../messages/state/messagesReducers';
import jobPoller from './jobPoller';
import { GetJobMessageProps } from '../../../tools/utils';

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
  messageAction?: GetJobMessageProps;
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
