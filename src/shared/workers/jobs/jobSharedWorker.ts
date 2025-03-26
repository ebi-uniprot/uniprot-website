import { GetJobMessageArgs } from '../../../messages/utils';
import * as logging from '../../utils/logging';
import { getExpiredJobScheduler, getJobScheduler } from './jobPoller';
import { getActionHandler, JobAction } from './state/actionHandler';
import getJobs from './state/getJobs';
import { JobsState } from './state/jobsInitialState';
import JobStore from './utils/storage';
import { Stores } from './utils/stores';

const jobStore = new JobStore(Stores.METADATA);

const sharedWorker = self as unknown as SharedWorkerGlobalScope;

export type JobSharedWorkerMessage = {
  state?: JobsState;
  jobAction?: JobAction;
  messageAction?: GetJobMessageArgs;
};

export type JobSharedWorkerMessageEvent = MessageEvent<JobSharedWorkerMessage>;

// Keep track of all connected MessagePorts so we can broadcast updates to all of them.
const connectedPorts: MessagePort[] = [];

// Function to broadcast a message to all connected ports.
const broadcast = (message: JobSharedWorkerMessage) => {
  for (const port of connectedPorts) {
    try {
      port.postMessage(message);
    } catch (error) {
      logging.error(`Jobs SharedWorker > broadcasting message error: ${error}`);
    }
  }
};

// Catch unhandled errors in the worker's global scope.
sharedWorker.addEventListener('error', (error: ErrorEvent) => {
  logging.error(`Jobs SharedWorker > unhandled error: ${error}`);
});

// Handle new connections from clients.
sharedWorker.onconnect = async (event) => {
  try {
    const port = event.ports[0];
    connectedPorts.push(port);

    // Rehydrate jobs from persistent storage and broadcast state to all clients.
    const jobs = await getJobs(jobStore);
    broadcast({ state: jobs });

    const actionHandler = getActionHandler(jobStore, broadcast);
    const jobScheduler = getJobScheduler(jobStore, actionHandler);
    const expiredJobScheduler = getExpiredJobScheduler(jobStore, actionHandler);

    // Listen for incoming messages.
    port.onmessage = async (e: JobSharedWorkerMessageEvent) => {
      try {
        const { jobAction } = e.data;
        if (jobAction) {
          await actionHandler({ jobAction });
          jobScheduler.schedule(0);
        }
      } catch (error) {
        logging.error(
          `Jobs SharedWorker > Error handling port message: ${error}`
        );
      }
    };
    // Initial polling cycle.
    jobScheduler.schedule(0);
    // don't check that rightaway, to avoid using up important connections
    expiredJobScheduler.schedule(5_000);
  } catch (error) {
    logging.error(`Jobs SharedWorker > onconnect error: ${error}`);
  }
};
