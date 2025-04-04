import { AxiosResponse } from 'axios';
import { MutableRefObject } from 'react';

import { ServerStatus } from '../../../../jobs/async-download/types/asyncDownloadServerStatus';
import { JobTypes } from '../../../../jobs/types/jobTypes';
import * as logging from '../../../utils/logging';
import { JobsState } from '../state/jobsInitialState';
import { Job } from '../types/job';
import { Status } from '../types/jobStatuses';

const validServerID: Record<JobTypes, RegExp> = {
  [JobTypes.ALIGN]: /^clustalo-R\d{8}(-\w+){4}$/,
  [JobTypes.BLAST]: /^ncbiblast-R\d{8}(-\w+){4}$/,
  [JobTypes.ASYNC_DOWNLOAD]: /^\w+$/,
  [JobTypes.ID_MAPPING]: /^\w+$/,
  [JobTypes.PEPTIDE_SEARCH]: /^[A-Z\d]+$/i,
};

export const isValidServerID = (type: JobTypes, id: string) =>
  validServerID[type].test(id);

const peptideSearchJobPattern = /\/asyncrest\/jobs\/(?<jobID>[A-Z\d]+)$/i;

export const getRemoteIDFromResponse = async (
  jobType: JobTypes,
  response: Response
) => {
  let remoteID: string | null = null;
  switch (jobType) {
    case JobTypes.ALIGN:
    case JobTypes.BLAST:
      remoteID = await response.text();
      break;
    case JobTypes.ASYNC_DOWNLOAD:
    case JobTypes.ID_MAPPING:
      remoteID = (await response.json())?.jobId;
      break;
    case JobTypes.PEPTIDE_SEARCH:
      // This gets the job info from the "location" header
      remoteID =
        response.headers.get('Location')?.match(peptideSearchJobPattern)?.groups
          ?.jobID || null;
      break;
    default:
    //
  }

  if (!remoteID || !isValidServerID(jobType, remoteID)) {
    throw new Error(`The server didn't return a valid ID`);
  }

  return remoteID;
};

const statuses = Object.values(Status);

export const getStatusFromResponse = async (
  jobType: JobTypes,
  response: Response,
  jobID: string
): Promise<
  [status: Status, progress?: number, idMappingResultsUrl?: string]
> => {
  let status: Status | undefined;
  let progress: number | undefined;
  let idMappingResultsUrl: string | undefined;
  switch (jobType) {
    case JobTypes.ALIGN:
    case JobTypes.BLAST:
      status = (await response.text()) as Status;
      break;
    case JobTypes.ASYNC_DOWNLOAD: {
      const data: ServerStatus = await response.json();
      status = data.jobStatus;
      if (data.totalEntries && data.processedEntries) {
        // Round down to the closest integer
        const potentialProgress = Math.floor(
          (data.processedEntries / data.totalEntries) * 100
        );
        /* istanbul ignore if */
        if (potentialProgress > 100) {
          logging.warn(
            `progress reached ${potentialProgress}% for async download job ${jobID}`
          );
        }
        if (potentialProgress) {
          progress = potentialProgress;
        }
      }
      // But if we're FINISHED, we can set to 100%
      if (status === Status.FINISHED) {
        progress = 100;
      }
      break;
    }
    case JobTypes.ID_MAPPING:
      if (response.status >= 400) {
        status = Status.FAILURE;
      } else if (response.redirected && response.url) {
        status = Status.FINISHED;
        idMappingResultsUrl = response.url;
      } else {
        status = Status.RUNNING;
      }
      break;
    case JobTypes.PEPTIDE_SEARCH:
      // This deduces the job status from the HTTP response status
      if (!response.status) {
        // That's a bit weird, but that's what happens
        status = Status.RUNNING;
      } else if (response.status === 200) {
        status = Status.FINISHED;
      } else if (response.status === 303) {
        status = Status.RUNNING;
      } else if (response.status === 202) {
        status = Status.RUNNING;
      } else if (response.status >= 400) {
        status = Status.FAILURE;
      }
      break;
    default:
    //
  }

  if (!status || !statuses.includes(status)) {
    throw new Error(`Got an unexpected status of "${status}" from the server`);
  }

  return [status, progress, idMappingResultsUrl];
};

const parseXML = (xml: string) =>
  new window.DOMParser().parseFromString(xml, 'text/xml');

export type ServerError = {
  response: AxiosResponse<string | { messages: string[] }>;
};

export const getServerErrorDescription = (error: ServerError | string) => {
  const data = typeof error === 'string' ? error : error?.response?.data;
  if (!data) {
    return null;
  }
  if (typeof data === 'string') {
    const xml = parseXML(data);
    const description = xml.getElementsByTagName('description');
    const text = description[0]?.textContent;
    return text && text.replace('->', '→');
  }
  return data.messages.join('; ');
};

export const checkForResponseError = (response: Response, status: Status) => {
  if (!response.ok && status !== Status.FAILURE && status !== Status.ERRORED) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export const getCurrentStateOfJob = (
  job: Job,
  stateRef: MutableRefObject<JobsState>
) => {
  // stateRef not hydrated yet
  if (!stateRef.current) {
    return null;
  }
  // get a new reference to the job
  const currentStateOfJob = stateRef.current[job.internalID];
  // check that the job is still in the state (it might have been removed)
  if (!currentStateOfJob) {
    return null;
  }
  return currentStateOfJob;
};

export const isJobAlreadyFinished = (status: Status, currentStateOfJob: Job) =>
  // job was already finished, and is still in the same state on the server
  status === Status.FINISHED && currentStateOfJob.status === Status.FINISHED;

const incompleteStatuses = new Set([
  Status.NEW,
  Status.QUEUED,
  Status.NOT_FOUND,
  Status.RUNNING,
  Status.FAILURE,
  Status.ERRORED,
]);

export const isJobIncomplete = (status: Status) =>
  incompleteStatuses.has(status);

export const supportsSharedWorker = Boolean(window.SharedWorker);
