import { ToolsAction } from './state/actionHandler';

export const jobsSharedWorker = window.SharedWorker
  ? new SharedWorker(new URL('./sharedWorker.ts', import.meta.url))
  : null;

export const dispatchJobs = (jobAction: ToolsAction) => {
  jobsSharedWorker?.port.postMessage({ jobAction });
};
