import { Link } from 'react-router-dom';
import { AxiosResponse } from 'axios';
import { LocationDescriptor } from 'history';

import { pluralise } from '../../shared/utils/utils';

import { Location, jobTypeToPath } from '../../app/config/urls';

import {
  MessageFormat,
  MessageLevel,
  MessageTag,
} from '../../messages/types/messagesTypes';

import { Job } from '../types/toolsJob';
import { JobTypes } from '../types/toolsJobTypes';
import { Status } from '../types/toolsStatuses';
import { LocationStateFromJobLink } from '../hooks/useMarkJobAsSeen';

const validServerID: Record<JobTypes, RegExp> = {
  [JobTypes.ALIGN]: /^clustalo-R\d{8}(-\w+){4}$/,
  [JobTypes.BLAST]: /^ncbiblast-R\d{8}(-\w+){4}$/,
  [JobTypes.ID_MAPPING]: /^[a-f\d]+$/,
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
  response: Response
): Promise<[status: Status, idMappingResultsUrl?: string]> => {
  let status: Status | undefined;
  let idMappingResultsUrl: string | undefined;
  switch (jobType) {
    case JobTypes.ALIGN:
    case JobTypes.BLAST:
      status = (await response.text()) as Status;
      break;
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
    throw new Error(`The server didn't return a valid status`);
  }

  return [status, idMappingResultsUrl];
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
  errorDescription?: string;
};

export const getJobMessage = ({
  job,
  nHits,
  errorDescription,
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

  let location: LocationDescriptor<LocationStateFromJobLink> | undefined;
  if ('remoteID' in job && job.remoteID && nHits !== 0) {
    location = {
      pathname: jobTypeToPath(job.type, job),
      state: { internalID: job.internalID },
    };
  }
  let hitsMessage = '';
  if (typeof nHits !== 'undefined') {
    hitsMessage = `, found ${nHits} ${pluralise('hit', nHits)}`;
  }

  return {
    ...message,
    content: (
      <>
        {job.type} job{' '}
        {location ? <Link to={location}>{jobName}</Link> : jobName}
        {` finished${hitsMessage}`}
      </>
    ),
    level: MessageLevel.SUCCESS,
  };
};

// Truncate label: Homo sapiens (Man/Human/HUMAN) [9606] --> Homo sapiens [9606]
export const truncateTaxonLabel = (label: string) =>
  label.replace(/ *\([^)]*\) */g, ' ');
