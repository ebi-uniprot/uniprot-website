import { Dispatch, MutableRefObject } from 'react';

import { formParametersToServerParameters } from '../adapters/parameters';

import {
  getRemoteIDFromResponse,
  getServerErrorDescription,
  getJobMessage,
  ServerError,
} from '../utils';

import { addMessage } from '../../messages/state/messagesActions';
import { updateJob } from './toolsActions';

import toolsURLs, { asyncDownloadUrlObjectCreator } from '../config/urls';

import { ToolsAction } from './toolsReducers';
import { ToolsState } from './toolsInitialState';
import { MessagesAction } from '../../messages/state/messagesReducers';
import { Status } from '../types/toolsStatuses';
import { CreatedJob } from '../types/toolsJob';
import { JobTypes } from '../types/toolsJobTypes';
import { FormParameters } from '../types/toolsFormParameters';

const getFormJobUrlAndBody = (job: CreatedJob) => {
  // specific logic to transform FormParameters to ServerParameters
  let formData;
  try {
    formData = formParametersToServerParameters(job.type, job.parameters);
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

const getSubmitJob =
  (
    dispatch: Dispatch<ToolsAction>,
    stateRef: MutableRefObject<ToolsState>,
    messagesDispatch: Dispatch<MessagesAction>
  ) =>
  async (job: CreatedJob) => {
    // stateRef not hydrated yet
    if (!stateRef.current) {
      return;
    }
    try {
      const { url, body } =
        job.type === JobTypes.ASYNC_DOWNLOAD
          ? getAsyncDownloadUrlAndBody(job)
          : getFormJobUrlAndBody(job);

      // we use plain fetch as through Axios we cannot block redirects
      const response = await window.fetch(url, {
        headers: { Accept: 'text/plain,application/json' },
        method: 'POST',
        body,
        // 'manual' to block redirect is the bit we cannot do with Axios
        redirect: 'manual',
      });

      if (!response.ok) {
        let message;
        try {
          message = getServerErrorDescription(await response.text());
        } catch (e) {
          /**/
        }
        throw new Error(
          message || `Request failed with status code ${response.status}`
        );
      }

      const remoteID = await getRemoteIDFromResponse(job.type, response);

      // get a new reference to the job
      const currentStateOfJob = stateRef.current[job.internalID];
      // check that the job is still in the state (it might have been removed)
      if (!currentStateOfJob) {
        return;
      }

      if (job.type === JobTypes.ASYNC_DOWNLOAD) {
        dispatch(
          updateJob(job.internalID, {
            status: Status.NEW,
            remoteID,
            timeSubmitted: Date.now(),
          })
        );
      } else {
        dispatch(
          updateJob(job.internalID, {
            status: Status.QUEUED,
            remoteID,
            timeSubmitted: Date.now(),
          })
        );
      }
    } catch (error) {
      let errorDescription = 'Unexpected error';
      if (error instanceof Object && 'response' in error) {
        errorDescription =
          getServerErrorDescription(error as ServerError) || errorDescription;
      } else if (error instanceof Error) {
        errorDescription = `Could not run job: ${error.message}`;
      }
      // get a new reference to the job
      const currentStateOfJob = stateRef.current[job.internalID];
      // check that the job is still in the state (it might have been removed)
      if (!currentStateOfJob) {
        return;
      }
      dispatch(
        updateJob(job.internalID, {
          status: Status.FAILURE,
          errorDescription,
        })
      );
      messagesDispatch(addMessage(getJobMessage({ job, errorDescription })));
    }
  };

export default getSubmitJob;
