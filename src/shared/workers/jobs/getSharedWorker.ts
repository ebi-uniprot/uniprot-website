import { ToolsAction } from './actionHandler';

export const jobsSharedWorker = window.SharedWorker
  ? new SharedWorker(new URL('./sharedWorker.ts', import.meta.url))
  : null;

export const dispatchJobs = (job: ToolsAction) =>
  jobsSharedWorker?.port.postMessage(job);
