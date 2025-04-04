import { JobAction } from './state/actionHandler';
import { supportsSharedWorker } from './utils';

export const jobsSharedWorker = supportsSharedWorker
  ? new SharedWorker(new URL('./jobSharedWorker.ts', import.meta.url))
  : null;

export const dispatchJobs = (jobAction: JobAction) => {
  jobsSharedWorker?.port.postMessage({ jobAction });
};
