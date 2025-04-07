import { action } from 'typesafe-actions';

import { FormParameters } from '../../../../jobs/types/jobsFormParameters';
import { JobTypes } from '../../../../jobs/types/jobTypes';
import { Job } from '../types/job';

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
  jobName: string,
  lowPriority?: boolean
) {
  return action(CREATE_JOB, {
    parameters,
    jobType,
    jobName,
    lowPriority,
  });
}

export const updateJob = (id: Job['internalID'], partialJob: Partial<Job>) =>
  action(UPDATE_JOB, { id, partialJob });

export const deleteJob = (id: Job['internalID']) => action(DELETE_JOB, id);
