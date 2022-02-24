import { Dispatch, MutableRefObject } from 'react';
import { schedule, sleep, frame } from 'timing-functions';
import pMap from 'p-map';

import { CREATE_JOB, REHYDRATE_JOBS, deleteJob } from './toolsActions';

import rehydrateJobs from './rehydrateJobs';
import getCheckJobStatus from './getCheckJobStatus';
import getSubmitJob from './getSubmitJob';

import { Job } from '../types/toolsJob';
import { Status } from '../types/toolsStatuses';

import { ToolsState } from './toolsInitialState';
import { ToolsAction } from './toolsReducers';
import { MessagesAction } from '../../messages/state/messagesReducers';

const POLLING_INTERVAL = 1000 * 3; // 3 seconds
const EXPIRED_INTERVAL = 1000 * 60 * 15; // 15 minutes
const AUTO_DELETE_TIME = 1000 * 60 * 60 * 24 * 14; // 2 weeks

const getJobsToCheck = (state: ToolsState) =>
  Object.values(state).filter(
    (job) => job.status === Status.CREATED || job.status === Status.RUNNING
  );

const toolsMiddleware = (
  dispatch: Dispatch<ToolsAction>,
  stateRef: MutableRefObject<ToolsState>,
  messagesDispatch: Dispatch<MessagesAction>
): Dispatch<ToolsAction> => {
  // rehydrate jobs, run once in the application lifetime
  rehydrateJobs(dispatch);

  const checkJobStatus = getCheckJobStatus(
    dispatch,
    stateRef,
    messagesDispatch
  );

  const submitJob = getSubmitJob(dispatch, stateRef, messagesDispatch);

  // eslint-disable-next-line consistent-return
  const pollJobMapper = (job: Job) => {
    if (job.status === Status.CREATED) {
      return submitJob(job);
    }
    if (job.status === Status.RUNNING) {
      return checkJobStatus(job);
    }
  };

  // main loop to poll job statuses
  const pollJobs = async () => {
    let jobsToCheck = getJobsToCheck(stateRef.current);

    await pMap(jobsToCheck, pollJobMapper, { concurrency: 4 });

    // reset flag
    pollJobs.scheduled = false;

    await sleep(POLLING_INTERVAL);

    jobsToCheck = getJobsToCheck(stateRef.current);
    // Make sure to only schedule a new loop when there are jobs to checks
    if (jobsToCheck.length) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      pollJobs.schedule();
    }
  };
  // flag to avoid multiple pollJobs loop being scheduled
  pollJobs.scheduled = false;
  // scheduler using the flag
  pollJobs.schedule = async () => {
    if (pollJobs.scheduled) {
      return;
    }
    pollJobs.scheduled = true;
    // wait for the browser to not be busy
    await schedule();
    // wait for a frame to be scheduled (so won't fire until tab in foreground)
    await frame();
    pollJobs();
  };

  // loop to check for expired jobs
  const expiredJobs = async () => {
    const now = Date.now();
    for (const [internalID, job] of Object.entries(stateRef.current)) {
      if (now - job.timeCreated > AUTO_DELETE_TIME && !job.saved) {
        // job is older than 7 days
        dispatch(deleteJob(internalID));
      } else if (job.status === Status.FINISHED) {
        // job is finished and should still be present on the server
        // eslint-disable-next-line no-await-in-loop
        await checkJobStatus(job);
      }
    }

    // reset flag
    expiredJobs.scheduled = false;

    await sleep(EXPIRED_INTERVAL);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    expiredJobs.schedule();
  };
  // flag to avoid multiple expiredJobs loop being scheduled
  expiredJobs.scheduled = false;
  expiredJobs.schedule = async () => {
    if (expiredJobs.scheduled) {
      return;
    }
    expiredJobs.scheduled = true;
    // wait for the browser to not be busy
    await schedule();
    // wait for a frame to be scheduled (so won't fire until tab in foreground)
    await frame();
    expiredJobs();
  };

  return (action) => {
    if (action.type === CREATE_JOB) {
      pollJobs.schedule();
    } else if (action.type === REHYDRATE_JOBS) {
      pollJobs.schedule();
      // don't check that rightaway, to avoid using up important connections
      sleep(5000).then(expiredJobs.schedule);
    } // else, nothing
  };
};

export default toolsMiddleware;
