import { Link, generatePath } from 'react-router-dom';
import { AxiosResponse } from 'axios';

import {
  MessageFormat,
  MessageLevel,
  MessageTag,
} from '../../messages/types/messagesTypes';

import { Location, jobTypeToPath } from '../../app/config/urls';

import { Job } from '../types/toolsJob';
import { JobTypes } from '../types/toolsJobTypes';
import { Status } from '../types/toolsStatuses';
import { IDMappingNamespace } from '../id-mapping/types/idMappingServerParameters';

const validServerID: Record<JobTypes, RegExp> = {
  [JobTypes.ALIGN]: /^clustalo-R\d{8}(-\w+){4}$/,
  [JobTypes.BLAST]: /^ncbiblast-R\d{8}(-\w+){4}$/,
  [JobTypes.ID_MAPPING]: /^[a-f\d]+$/,
  [JobTypes.PEPTIDE_SEARCH]: /^[A-Z\d]+$/,
};

export const isValidServerID = (type: JobTypes, id: string) =>
  validServerID[type].test(id);

const peptideSearchJobPattern = /\/peptidesearch\/uniprot\/(?<jobID>[A-Z\d]+)$/;

export const getRemoteIDFromResponse = (
  jobType: JobTypes,
  response: AxiosResponse<string | { jobId: string }>
) => {
  let remoteID: string | null = null;
  switch (jobType) {
    case JobTypes.ALIGN:
    case JobTypes.BLAST:
      remoteID = typeof response.data === 'string' ? response.data : null;
      break;
    case JobTypes.ID_MAPPING:
      remoteID = typeof response.data !== 'string' ? response.data.jobId : null;
      break;
    case JobTypes.PEPTIDE_SEARCH:
      // This gets the job info from the "location" header
      remoteID =
        (response.request as XMLHttpRequest).responseURL.match(
          peptideSearchJobPattern
        )?.groups?.jobID || null;
      break;
    default:
    //
  }

  if (!remoteID || !isValidServerID(jobType, remoteID)) {
    throw new Error(`The server didn't return a valid ID`);
  }

  return remoteID;
};

const idMappingStatusPattern = /\/idmapping(\/(?<idMappingTarget>\w+))?\/results\/[a-f\d]/;
const statuses = Object.values(Status);
const peptideSearchStatusPattern = new RegExp(
  `Job status: (?<status>${statuses.join('|')})`
);

export const getStatusFromResponse = (
  jobType: JobTypes,
  response: AxiosResponse<Status | { jobStatus: Status } | string>
): [status: Status, idMappingTarget?: IDMappingNamespace] => {
  let status: Status | undefined;
  let idMappingTarget: IDMappingNamespace | undefined;
  switch (jobType) {
    case JobTypes.ALIGN:
    case JobTypes.BLAST:
      status = response.data as Status;
      break;
    case JobTypes.ID_MAPPING:
      if ((response.request as XMLHttpRequest).responseURL) {
        const match = (response.request as XMLHttpRequest).responseURL.match(
          idMappingStatusPattern
        );
        if (match) {
          status = Status.FINISHED;
          idMappingTarget = match.groups?.idMappingTarget as IDMappingNamespace;
        }
      } else if (typeof response.data !== 'string') {
        status = response.data.jobStatus;
      }
      break;
    case JobTypes.PEPTIDE_SEARCH:
      // This gets the status from the reponse HTML string
      status = (typeof response.data === 'string' ? response.data : '').match(
        peptideSearchStatusPattern
      )?.groups?.status as Status;
      break;
    default:
    //
  }

  if (!status || !statuses.includes(status)) {
    throw new Error(`The server didn't return a valid status`);
  }

  return [status, idMappingTarget];
};

const parseXML = (xml: string) =>
  new window.DOMParser().parseFromString(xml, 'text/xml');

type ServerError = { response: AxiosResponse<string | { messages: string[] }> };

export const getServerErrorDescription = (error: ServerError) => {
  const data = error?.response?.data;
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

  let href;
  if ('remoteID' in job && job.remoteID) {
    href = generatePath(jobTypeToPath(job.type, true), {
      id: job.remoteID,
      subPage: 'overview',
    });
  }
  let hitsMessage = '';
  if (typeof nHits !== 'undefined') {
    hitsMessage = `, found ${nHits} hit${nHits === 1 ? '' : 's'}`;
  }

  return {
    ...message,
    content: (
      <>
        {job.type} job {href ? <Link to={href}>{jobName}</Link> : { jobName }}
        {` finished${hitsMessage}`}
      </>
    ),
    level: MessageLevel.SUCCESS,
  };
};

// Truncate label: Homo sapiens (Man/Human/HUMAN) [9606] --> Homo sapiens [9606]
export const truncateTaxonLabel = (label: string) =>
  label.replace(/ *\([^)]*\) */g, ' ');
