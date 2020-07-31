import { Status } from './toolsStatuses';
import { JobTypes } from './toolsJobTypes';
import { FormParameters } from './toolsFormParameters';

/* Job as defined inside the web application */
interface BaseJob<T extends JobTypes> {
  status: Status;
  internalID: string;
  title: string;
  type: T;
  parameters: FormParameters[T];
  timeCreated: number;
  timeLastUpdate: number;
  saved: boolean;
}

export interface CreatedJob extends BaseJob<JobTypes> {
  status: Status.CREATED;
}

export interface FailedJob extends BaseJob<JobTypes> {
  status: Status.FAILURE | Status.ERRORED;
  remoteID?: string; // depending on if it failed before or after submission
  timeSubmitted?: number; // depending on if it failed before or after submission
  errorDescription?: string; // the server's error response
}

export interface RunningJob extends BaseJob<JobTypes> {
  status: Status.RUNNING;
  remoteID: string;
  timeSubmitted: number;
}

type DataForDashboard = {
  [JobTypes.ALIGN]: never;
  [JobTypes.BLAST]: { hits: number };
  [JobTypes.IDMAP]: never; // TODO
  [JobTypes.PEPTIDE_SEARCH]: never; // TODO
};

export interface FinishedJob<T extends JobTypes> extends BaseJob<T> {
  status: Status.FINISHED | Status.NOT_FOUND;
  remoteID: string;
  timeSubmitted: number;
  timeFinished: number;
  // just data needed for the dashboard, not more than this
  data: DataForDashboard[T];
}

export type Job = CreatedJob | FailedJob | RunningJob | FinishedJob<JobTypes>;
