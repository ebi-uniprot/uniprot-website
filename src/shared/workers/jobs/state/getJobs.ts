import { Job } from '../types/job';
import JobStore from '../utils/storage';

const getJobs = async (jobStore: JobStore) => {
  const jobs = await jobStore.getAll<Job>();
  return Object.fromEntries(jobs.map((job) => [job.internalID, job]));
};

export default getJobs;
