import { BytesNumber, LongNumber } from 'franklin-sites';
import { Link } from 'react-router-dom';

import { jobTypeToPath, Location } from '../../app/config/urls';
import { pluralise } from '../../shared/utils/utils';
import { type Job } from '../../shared/workers/jobs/types/job';
import {
  MessageFormat,
  MessageLevel,
  MessageTag,
} from '../types/messagesTypes';

export type GetJobMessageArgs = {
  job: Job;
  nHits?: number;
  fileSizeBytes?: number;
  errorDescription?: string;
  url?: string;
};

const getJobMessage = ({
  job,
  nHits,
  fileSizeBytes,
  errorDescription,
  url,
}: GetJobMessageArgs) => {
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

export default getJobMessage;
