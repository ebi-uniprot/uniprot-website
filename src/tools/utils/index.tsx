import { MutableRefObject } from 'react';
import { Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { BytesNumber, LongNumber } from 'franklin-sites';

import { pluralise } from '../../shared/utils/utils';
import * as logging from '../../shared/utils/logging';

import { Location, jobTypeToPath } from '../../app/config/urls';

import {
  MessageFormat,
  MessageLevel,
  MessageTag,
} from '../../messages/types/messagesTypes';

import { Job } from '../types/toolsJob';
import { JobTypes } from '../types/toolsJobTypes';
import { Status } from '../types/toolsStatuses';
import { ToolsState } from '../state/toolsInitialState';
import { ServerStatus } from '../async-download/types/asyncDownloadServerStatus';

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

type getJobMessageProps = {
  job: Job;
  nHits?: number;
  fileSizeBytes?: number;
  errorDescription?: string;
  url?: string;
};

export const getJobMessage = ({
  job,
  nHits,
  fileSizeBytes,
  errorDescription,
  url,
}: getJobMessageProps) => {
  const message = {
    id: job.internalID,
    format: MessageFormat.POP_UP,
    tag: MessageTag.JOB,
    omitAndDeleteAtLocations: [Location.Dashboard],
  };

  // Error message
  if (errorDescription) {
    return {
      ...message,
      content: errorDescription,
      level: MessageLevel.FAILURE,
    };
  }

  // Success message
  let jobName;
  if (job.title) {
    jobName = `"${job.title}"`;
  } else if ('remoteID' in job) {
    jobName = job.remoteID;
  } else {
    jobName = '';
  }

  let jobNameNode;
  if (url) {
    jobNameNode = (
      <a href={url} target="_blank" rel="noreferrer">
        {jobName}
      </a>
    );
  } else if (
    'remoteID' in job &&
    job.remoteID &&
    (nHits !== 0 || fileSizeBytes !== 0)
  ) {
    const location = {
      pathname: jobTypeToPath(job.type, job),
      state: { internalID: job.internalID },
    };
    jobNameNode = <Link to={location}>{jobName}</Link>;
  } else {
    jobNameNode = jobName;
  }

  let quantityMessage;
  if (typeof nHits !== 'undefined') {
    quantityMessage = (
      <>
        {', found '}
        <LongNumber>{nHits}</LongNumber>
        {` ${pluralise('hit', nHits)}`}
      </>
    );
  } else if (typeof fileSizeBytes !== 'undefined') {
    quantityMessage = (
      <>
        {', '}
        <BytesNumber>{fileSizeBytes}</BytesNumber> file generated
      </>
    );
  }

  return {
    ...message,
    content: (
      <>
        {job.type} job {jobNameNode}
        {' finished'}
        {quantityMessage}
      </>
    ),
    level: MessageLevel.SUCCESS,
  };
};

// Truncate label: Homo sapiens (Man/Human/HUMAN) [9606] --> Homo sapiens [9606]
export const truncateTaxonLabel = (label: string) =>
  label.replace(/ *\([^)]*\) */g, ' ');

export const checkForResponseError = (response: Response, status: Status) => {
  if (!response.ok && status !== Status.FAILURE && status !== Status.ERRORED) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export const getCurrentStateOfJob = (
  job: Job,
  stateRef: MutableRefObject<ToolsState>
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
