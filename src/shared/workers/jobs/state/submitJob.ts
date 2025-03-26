import { formParametersToServerParameters } from '../../../../tools/adapters/parameters';
import toolsURLs, {
  asyncDownloadUrlObjectCreator,
} from '../../../../tools/config/urls';
import { FormParameters } from '../../../../tools/types/toolsFormParameters';
import { JobTypes } from '../../../../tools/types/toolsJobTypes';
import { JobSharedWorkerMessage } from '../jobSharedWorker';
import { CreatedJob, Job } from '../types/toolsJob';
import { Status } from '../types/toolsStatuses';
import {
  getRemoteIDFromResponse,
  getServerErrorDescription,
  ServerError,
} from '../utils';
import JobStore from '../utils/storage';
import { updateJob } from './toolsActions';

const getFormJobUrlAndBody = (job: CreatedJob) => {
  // specific logic to transform FormParameters to ServerParameters
  let formData;
  try {
    formData = formParametersToServerParameters(
      job.type,
      job.parameters,
      job.lowPriority
    );
  } catch {
    throw new Error('Internal error');
  }
  return { url: toolsURLs(job.type).runUrl, body: formData };
};

const getAsyncDownloadUrlAndBody = (job: CreatedJob) => {
  const parameters = job.parameters as FormParameters[JobTypes.ASYNC_DOWNLOAD];
  return {
    url: asyncDownloadUrlObjectCreator(parameters.namespace).runUrl(parameters),
    body: undefined,
  };
};

const submitJob = async (
  job: CreatedJob,
  actionHandler: (action: JobSharedWorkerMessage) => void,
  jobStore: JobStore
) => {
  try {
    const { url, body } =
      job.type === JobTypes.ASYNC_DOWNLOAD
        ? getAsyncDownloadUrlAndBody(job)
        : getFormJobUrlAndBody(job);
    // we use plain fetch as through Axios we cannot block redirects
    const response = await fetch(url, {
      headers: {
        Accept:
          job.type === JobTypes.ASYNC_DOWNLOAD
            ? 'application/json'
            : 'text/plain,application/json',
      },
      method: 'POST',
      body,
      // 'manual' to block redirect is the bit we cannot do with Axios
      redirect: 'manual',
    });

    if (!response.ok) {
      let message;
      try {
        message = getServerErrorDescription(await response.text());
      } catch {
        /**/
      }
      throw new Error(
        message || `Request failed with status code ${response.status}`
      );
    }

    const remoteID = await getRemoteIDFromResponse(job.type, response);

    const currentStateOfJob = await jobStore.get<Job>(job.internalID);
    // check that the job is still in the state (it might have been removed)
    if (!currentStateOfJob) {
      return;
    }

    if (job.type === JobTypes.ASYNC_DOWNLOAD) {
      actionHandler({
        jobAction: updateJob(job.internalID, {
          status: Status.NEW,
          remoteID,
          timeSubmitted: Date.now(),
        }),
      });
    } else {
      actionHandler({
        jobAction: updateJob(job.internalID, {
          status: Status.QUEUED,
          remoteID,
          timeSubmitted: Date.now(),
        }),
      });
    }
  } catch (error) {
    let errorDescription = 'Unexpected error';
    if (error instanceof Object && 'response' in error) {
      errorDescription =
        getServerErrorDescription(error as ServerError) || errorDescription;
    } else if (error instanceof Error) {
      if (error.message === 'Failed to fetch') {
        errorDescription = `Could not run job: Server or network issue`;
      } else {
        errorDescription = `Could not run job: ${error.message}`;
      }
    }
    // get a new reference to the job
    const currentStateOfJob = await jobStore.get<Job>(job.internalID);
    // check that the job is still in the state (it might have been removed)
    if (!currentStateOfJob) {
      return;
    }
    actionHandler({
      jobAction: updateJob(job.internalID, {
        status: Status.FAILURE,
        errorDescription,
      }),
      messageAction: { job, errorDescription },
    });
  }
};

export default submitJob;
