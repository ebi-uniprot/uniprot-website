import getJobs from './getJobs';
import actionHandler, { ToolsAction } from './actionHandler';
import checkJobStatus from './checkJobStatus';

import JobStore from '../../../tools/utils/storage';
import { Stores } from '../../../tools/utils/stores';
import { ToolsState } from '../../../tools/state/toolsInitialState';
import { MessagesAction } from '../../../messages/state/messagesReducers';

const jobStore = new JobStore(Stores.METADATA);

const sharedWorker = self as unknown as SharedWorkerGlobalScope;

export type JobSharedWorkerMessage = MessageEvent<{
  state?: ToolsState;
  jobAction?: ToolsAction;
  messageAction?: MessagesAction;
}>;

sharedWorker.onconnect = async (event) => {
  const port = event.ports[0];
  console.log('here');

  const jobs = await getJobs(jobStore);
  console.log(jobs);
  const job = Object.values(jobs)[0];
  checkJobStatus(job, jobStore, port);
  port.postMessage({ state: jobs });

  port.onmessage = async (e: JobSharedWorkerMessage) => {
    console.log(e);
    const jobAction = e.data.jobAction;
    if (jobAction) {
      actionHandler(jobAction, jobStore);
      const jobs = await getJobs(jobStore);
      port.postMessage({ state: jobs });
    }
  };
};

sharedWorker.onerror = async (e) => {
  console.error(e);
};
