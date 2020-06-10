import React, { Fragment } from 'react';
import { generatePath } from 'react-router-dom';
import {
  MessageFormat,
  MessageLevel,
  MessageTag,
} from '../../messages/types/messagesTypes';
import { Location, LocationToPath } from '../../app/config/urls';
import { Job } from '../blast/types/blastJob';

const parseXML = (xml: string) => {
  return new window.DOMParser().parseFromString(xml, 'text/xml');
};

type ServerError = {
  response?: { data?: string };
};

export const getServerErrorDescription = (error: ServerError) => {
  const data = error?.response?.data;
  if (!data) {
    return null;
  }
  const xml = parseXML(data);
  const description = xml.getElementsByTagName('description');
  const text = description[0]?.textContent;
  return text && text.replace('->', '→');
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

  const href =
    'remoteID' in job &&
    generatePath(LocationToPath[Location.BlastResult], { id: job.remoteID });
  return {
    ...message,
    content: (
      <Fragment>
        Job {href ? <a href={href}>{jobName}</a> : { jobName }}
        {` finished, found ${nHits} hit${nHits === 1 ? '' : 's'}`}
      </Fragment>
    ),
    level: MessageLevel.SUCCESS,
  };
};
