import { action } from 'typesafe-actions';

import { Job } from '../types/toolsJob';
import { FormParameters } from '../types/toolsFormParameters';
import { JobTypes } from '../types/toolsJobTypes';

export const REHYDRATE_JOBS = 'REHYDRATE_JOBS';
export const CREATE_JOB = 'CREATE_JOB';
export const DELETE_JOB = 'DELETE_JOB';
export const UPDATE_JOB = 'UPDATE_JOB';

/**
 * @param {FormParameters[T]} parameters job parameters to be kept in the application logic
 * @param {T extends JobTypes} jobType job type
 * @param {string}
 */
export function createJob<T extends JobTypes>(
  parameters: FormParameters[T],
  jobType: T,
  jobName: string
) {
  return action(CREATE_JOB, {
    parameters,
    jobType,
    jobName,
  });
}

export const rehydrateJobs = (jobs: { [internalID: string]: Job }) =>
  action(REHYDRATE_JOBS, { jobs });

export const updateJob = (id: Job['internalID'], partialJob: Partial<Job>) =>
  action(UPDATE_JOB, { id, ...partialJob, timeLastUpdate: Date.now() });

export const deleteJob = (id: Job['internalID']) => action(DELETE_JOB, id);
