import { Middleware, Store, Dispatch } from 'redux';
import { schedule, sleep } from 'timing-functions';

import { CREATE_JOB, REHYDRATE_JOBS } from './toolsActions';

import rehydrateJobs from './rehydrateJobs';
import getCheckJobStatus from './getCheckJobStatus';
import getSubmitJob from './getSubmitJob';

import { CreatedJob, RunningJob } from '../types/toolsJob';
import { Status } from '../types/toolsStatuses';

import { ToolsState } from './toolsInitialState';

const POLLING_INTERVAL = 1000 * 3; // 3 seconds

const toolsMiddleware: Middleware = (store) => {
  const { dispatch, getState } = store;

  // rehydrate jobs, run once in the application lifetime
  rehydrateJobs(dispatch as Dispatch);

  // flag to avoid multiple pollJobs loop being scheduled
  let scheduledPollJobs = false;

  const checkJobStatus = getCheckJobStatus(store as Store);

  const submitJob = getSubmitJob(store as Store);

  // main loop
  const pollJobs = async () => {
    // Wait for browser idleness
    await schedule();

    const toolsState: ToolsState = getState().tools;

    const jobsToSubmit = Object.values(toolsState).filter(
      (job) => job.status === Status.CREATED
    ) as Array<CreatedJob>;
    const jobsToPoll = Object.values(toolsState).filter(
      (job) => job.status === Status.RUNNING
    ) as Array<RunningJob>;

    // nothing to check, early exit, no recursion
    if (!(jobsToSubmit.length || jobsToPoll.length)) {
      scheduledPollJobs = false;
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
    scheduledPollJobs = false;

    await sleep(POLLING_INTERVAL);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    schedulePollJobs();
  };

  const schedulePollJobs = async () => {
    if (scheduledPollJobs) return;
    scheduledPollJobs = true;
    await schedule(POLLING_INTERVAL);
    pollJobs();
  };

  return (next) => (action) => {
    switch (action.type) {
      case CREATE_JOB:
      case REHYDRATE_JOBS:
        schedulePollJobs();
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
