import { ToolsAction } from './actionHandler';

export const jobsSharedWorker = window.SharedWorker
  ? new SharedWorker(new URL('./sharedWorker.ts', import.meta.url))
  : null;

export const dispatchJobs = (jobAction: ToolsAction) => {
  console.log(jobAction, jobsSharedWorker);
  jobsSharedWorker?.port.postMessage({ jobAction });
};
