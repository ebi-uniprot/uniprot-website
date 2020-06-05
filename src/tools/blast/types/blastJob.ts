import { Status } from './blastStatuses';
import { FormParameters } from './blastFormParameters';

/* Job as defined inside the web application */
interface BaseJob {
  status: Status;
  internalID: string;
  title: string;
  type: 'blast';
  parameters: FormParameters;
  timeCreated: number;
  timeLastUpdate: number;
}

export interface CreatedJob extends BaseJob {
  status: Status.CREATED;
}

export interface FailedJob extends BaseJob {
  status: Status.FAILURE | Status.ERRORED;
  remoteID?: string; // depending on if it failed before or after submission
  timeSubmitted?: number; // depending on if it failed before or after submission
}

export interface RunningJob extends BaseJob {
  status: Status.RUNNING;
  remoteID: string;
  timeSubmitted: number;
}

// Data as BlastResults from './blastResults are not in here all the time to not
// fill the store with too much data
export interface FinishedJob extends BaseJob {
  status: Status.FINISHED;
  remoteID: string;
  timeSubmitted: number;
  timeFinished: number;
  data: {
    hits: number;
  };
}

export type Job = CreatedJob | FailedJob | RunningJob | FinishedJob;
