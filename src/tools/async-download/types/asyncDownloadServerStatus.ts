import { Status } from '../../../shared/workers/jobs/types/toolsStatuses';

export type ServerStatus = {
  jobStatus: Status;
  lastUpdated: string; // date
  start: string; // date
  totalEntries?: number;
  processedEntries?: number;
};
