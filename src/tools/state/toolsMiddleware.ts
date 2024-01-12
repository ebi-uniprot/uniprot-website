import { Dispatch, MutableRefObject } from 'react';
import pMap from 'p-map';

import { deleteJob, POLL_JOBS } from './toolsActions';

import rehydrateJobs from './rehydrateJobs';
import getCheckJobStatus from './getCheckJobStatus';
import getSubmitJob from './getSubmitJob';

import { Scheduler } from './utils/scheduler';
import { heuristic } from './utils/heuristic';

import { Job } from '../types/toolsJob';
import { Status } from '../types/toolsStatuses';

import { ToolsState } from './toolsInitialState';
import { ToolsAction } from './toolsReducers';
import { MessagesAction } from '../../messages/state/messagesReducers';

const BASE_POLLING_INTERVAL = 1_000 * 15; // 15 seconds baseline / minimum
// See ./utils/heuristic.ts possible changing factors => min 15s, max 4min
const EXPIRED_INTERVAL = 1_000 * 60 * 60; // 1 hour
const AUTO_DELETE_TIME = 1_000 * 60 * 60 * 24 * 14; // 2 weeks

const checkableJobs = new Set([
  Status.CREATED,
  Status.RUNNING,
  Status.NEW,
  Status.QUEUED,
]);

const getJobsToCheck = (state: ToolsState) =>
  Object.values(state ?? {}).filter((job) => checkableJobs.has(job.status));

const toolsMiddleware = (
  toolsDispatch: Dispatch<ToolsAction>,
  stateRef: MutableRefObject<ToolsState>,
  messagesDispatch: Dispatch<MessagesAction>
): Dispatch<ToolsAction> => {
  const checkJobStatus = getCheckJobStatus(
    toolsDispatch,
    stateRef,
    messagesDispatch
  );

  const submitJob = getSubmitJob(toolsDispatch, stateRef, messagesDispatch);

  // eslint-disable-next-line consistent-return
  const pollJobMapper = (job: Job) => {
    if (job.status === Status.CREATED) {
      return submitJob(job);
    }
    if (
      job.status === Status.RUNNING ||
      job.status === Status.QUEUED ||
      job.status === Status.NEW
    ) {
      return checkJobStatus(job);
    }
  };

  // Main loop to poll job statuses
  const pollJobs = new Scheduler(async () => {
    const jobsToCheck = getJobsToCheck(stateRef.current);
    await pMap(jobsToCheck, pollJobMapper, {
      concurrency: heuristic.concurrency,
    });

    // Only schedule a new loop when there were jobs to checks at the start
    if (jobsToCheck.length) {
      return heuristic.compoundFactors(BASE_POLLING_INTERVAL);
    }
    return +Infinity;
  });

  // Loop to check for expired jobs
  const expiredJobs = new Scheduler(async () => {
    const now = Date.now();
    for (const [internalID, job] of Object.entries(stateRef.current ?? {})) {
      if (now - job.timeCreated > AUTO_DELETE_TIME && !job.saved) {
        // job is older than 14 days
        toolsDispatch(deleteJob(internalID));
      } else if (job.status === Status.FINISHED) {
        // job is finished and should still be present on the server
        // eslint-disable-next-line no-await-in-loop
        await checkJobStatus(job);
      }
    }

    // Only schedule a new loop when there are jobs to checks
    if (Object.values(stateRef.current ?? {}).length) {
      return EXPIRED_INTERVAL;
    }
    return +Infinity;
  });

  // Rehydrate jobs, run only once in the application lifetime
  rehydrateJobs(toolsDispatch).then(() => {
    pollJobs.schedule(0);
    // don't check that rightaway, to avoid using up important connections
    expiredJobs.schedule(5_000);
  });

  // Middleware reducer to trigger middleware logic
  return (action) => {
    if (action.type === POLL_JOBS) {
      pollJobs.schedule(0);
    }
    toolsDispatch(action);
  };
};

export default toolsMiddleware;
