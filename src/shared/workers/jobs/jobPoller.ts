/* eslint-disable no-console */
import pMap from 'p-map';

import { type JobSharedWorkerMessage } from './jobSharedWorker';
import checkJobStatus from './state/checkJobStatus';
import getJobs from './state/getJobs';
import { deleteJob } from './state/jobActions';
import submitJob from './state/submitJob';
import { type Job } from './types/job';
import { Status } from './types/jobStatuses';
import { heuristic } from './utils/heuristic';
import { Scheduler } from './utils/scheduler';
import type JobStore from './utils/storage';

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

const getJobsToCheck = async (jobStore: JobStore) =>
  Object.values(await getJobs(jobStore)).filter((job) =>
    checkableJobs.has(job.status)
  );

export const getJobScheduler = (
  jobStore: JobStore,
  actionHandler: (action: JobSharedWorkerMessage) => void
) => {
  const pollJobMapper = async (job: Job) => {
    if (job.status === Status.CREATED) {
      await submitJob(job, actionHandler, jobStore);
    } else if (
      job.status === Status.RUNNING ||
      job.status === Status.QUEUED ||
      job.status === Status.NEW
    ) {
      await checkJobStatus(job, actionHandler, jobStore);
    }
  };
  return new Scheduler(async () => {
    console.log('Job Scheduler Loop Running');
    const jobsToCheck = await getJobsToCheck(jobStore);
    await pMap(jobsToCheck, pollJobMapper, {
      concurrency: heuristic.concurrency,
    });

    // Only schedule a new loop when there were jobs to checks at the start
    if (jobsToCheck.length) {
      return heuristic.compoundFactors(BASE_POLLING_INTERVAL);
    }
    return +Infinity;
  });
};

export const getFinishedJobScheduler = (
  jobStore: JobStore,
  actionHandler: (action: JobSharedWorkerMessage) => void
) =>
  new Scheduler(async () => {
    console.log('Expired Job Scheduler Loop Running');
    const now = Date.now();
    for (const [internalID, job] of Object.entries(await getJobs(jobStore))) {
      if (now - job.timeCreated > AUTO_DELETE_TIME && !job.saved) {
        // job is older than 14 days
        actionHandler({ jobAction: deleteJob(internalID) });
      } else if (job.status === Status.FINISHED) {
        // job is finished and should still be present on the server
        // eslint-disable-next-line no-await-in-loop
        await checkJobStatus(job, actionHandler, jobStore);
      }
    }

    // Only schedule a new loop when there are jobs to checks
    if (Object.values(await getJobs(jobStore)).length) {
      return EXPIRED_INTERVAL;
    }
    return +Infinity;
  });
