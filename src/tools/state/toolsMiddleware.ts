import { Middleware, Dispatch, AnyAction } from 'redux';
import { schedule, sleep, frame } from 'timing-functions';

import { CREATE_JOB, REHYDRATE_JOBS, deleteJob } from './toolsActions';

import rehydrateJobs from './rehydrateJobs';
import getCheckJobStatus from './getCheckJobStatus';
import getSubmitJob from './getSubmitJob';

import { CreatedJob, RunningJob } from '../types/toolsJob';
import { Status } from '../types/toolsStatuses';

import { RootState } from '../../app/state/rootInitialState';

const POLLING_INTERVAL = 1000 * 3; // 3 seconds
const EXPIRED_INTERVAL = 1000 * 60 * 5; // 5 minutes
const AUTO_DELETE_TIME = 1000 * 60 * 60 * 24 * 14; // 2 weeks

const toolsMiddleware: Middleware<Dispatch<AnyAction>, RootState> = (store) => {
  const { dispatch, getState } = store;

  // rehydrate jobs, run once in the application lifetime
  rehydrateJobs(dispatch as Dispatch);

  const checkJobStatus = getCheckJobStatus(store);

  const submitJob = getSubmitJob(store);

  // main loop to poll job statuses
  const pollJobs = async () => {
    const toolsState = getState().tools;

    const jobsToSubmit = Object.values(toolsState).filter(
      (job) => job.status === Status.CREATED
    ) as Array<CreatedJob>;
    const jobsToPoll = Object.values(toolsState).filter(
      (job) => job.status === Status.RUNNING
    ) as Array<RunningJob>;

    // nothing to check, early exit, no recursion
    if (!(jobsToSubmit.length || jobsToPoll.length)) {
      pollJobs.scheduled = false;
      return;
    }

    for (const createdJob of jobsToSubmit) {
      // eslint-disable-next-line no-await-in-loop
      await submitJob(createdJob);
    }

    for (const runningJob of jobsToPoll) {
      // eslint-disable-next-line no-await-in-loop
      await checkJobStatus(runningJob);
    }

    // reset flag
    pollJobs.scheduled = false;

    await sleep(POLLING_INTERVAL);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    pollJobs.schedule();
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
    const toolsState = getState().tools;

    const now = Date.now();
    for (const [internalID, job] of Object.entries(toolsState)) {
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

  return (next) => (action) => {
    switch (action.type) {
      case CREATE_JOB:
        pollJobs.schedule();
        break;
      case REHYDRATE_JOBS:
        pollJobs.schedule();
        expiredJobs.schedule();
        break;
      default:
      // do nothing
    }

    // state is not yet updated
    const returnValue = next(action);
    // state is now updated

    return returnValue;
  };
};

export default toolsMiddleware;
