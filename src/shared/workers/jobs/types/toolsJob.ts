import { IDMappingNamespace } from '../../../../tools/id-mapping/types/idMappingServerParameters';
import { FormParameters } from '../../../../tools/types/toolsFormParameters';
import { JobTypes } from '../../../../tools/types/toolsJobTypes';
import { Status } from './toolsStatuses';

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
  seen: boolean;
  lowPriority?: boolean;
}

export interface NewJob extends BaseJob<JobTypes> {
  status: Status.NEW;
  remoteID: string;
  timeSubmitted: number;
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
  status: Status.RUNNING | Status.QUEUED;
  remoteID: string;
  timeSubmitted: number;
  progress?: number; // percentage
}

export type DataForDashboard = {
  [JobTypes.ALIGN]: never;
  [JobTypes.BLAST]: { hits: number };
  [JobTypes.ID_MAPPING]: { hits: number; idMappingTarget: IDMappingNamespace };
  [JobTypes.PEPTIDE_SEARCH]: never;
  [JobTypes.ASYNC_DOWNLOAD]: { fileSizeBytes: number };
};

export interface FinishedJob<T extends JobTypes> extends BaseJob<T> {
  status: Status.FINISHED | Status.NOT_FOUND;
  remoteID: string;
  timeSubmitted: number;
  timeFinished: number;
  progress?: number; // percentage
  // just data needed for the dashboard, not more than this
  data?: DataForDashboard[T];
}

export type Job =
  | NewJob
  | CreatedJob
  | FailedJob
  | RunningJob
  | FinishedJob<JobTypes>;
