import { Job } from '../types/job';

export type JobsState = null | {
  [key: string]: Job;
};

const jobsInitialState: JobsState = null;

export default jobsInitialState;
