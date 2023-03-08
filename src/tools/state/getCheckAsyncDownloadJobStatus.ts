import { Dispatch, MutableRefObject } from 'react';

import {
  getStatusFromResponse,
  getJobMessage,
  checkForResponseError,
  getCurrentStateOfJob,
  isJobAlreadyFinished,
  isJobIncomplete,
} from '../utils';
import * as logging from '../../shared/utils/logging';

import { asyncDownloadUrlObjectCreator } from '../config/urls';

import { updateJob } from './toolsActions';
import { addMessage } from '../../messages/state/messagesActions';

import { ToolsState } from './toolsInitialState';
import { ToolsAction } from './toolsReducers';
import { MessagesAction } from '../../messages/state/messagesReducers';
import { RunningJob, FinishedJob } from '../types/toolsJob';
import { Status } from '../types/toolsStatuses';
import { JobTypes } from '../types/toolsJobTypes';
import { MappingError } from '../id-mapping/types/idMappingSearchResults';
import { FormParameters } from '../types/toolsFormParameters';

const getCheckAsyncDownloadJobStatus =
  (
    dispatch: Dispatch<ToolsAction>,
    stateRef: MutableRefObject<ToolsState>,
    messagesDispatch: Dispatch<MessagesAction>
  ) =>
  async (job: RunningJob | FinishedJob<JobTypes>) => {
    const urlConfig = asyncDownloadUrlObjectCreator(
      (job.parameters as FormParameters[JobTypes.ASYNC_DOWNLOAD]).namespace
    );
    try {
      const response = await window.fetch(urlConfig.statusUrl(job.remoteID), {
        headers: {
          Accept: 'text/plain,application/json',
        },
      });

      const [status] = await getStatusFromResponse(job.type, response);
      checkForResponseError(response, status);

      let currentStateOfJob = getCurrentStateOfJob(job, stateRef);
      if (!currentStateOfJob) {
        return;
      }

      if (isJobAlreadyFinished(status, currentStateOfJob)) {
        return;
      }

      if (status === Status.FAILURE) {
        const errorResponse: { jobStatus: Status; errors?: MappingError[] } =
          await response.json();
        if (errorResponse.errors?.[0]) {
          const error = errorResponse.errors[0];
          dispatch(
            updateJob(job.internalID, {
              timeLastUpdate: Date.now(),
              status,
              errorDescription: error.message,
            })
          );
        }
      }
      if (isJobIncomplete(status)) {
        dispatch(
          updateJob(job.internalID, {
            timeLastUpdate: Date.now(),
            status,
          })
        );
        return;
      }

      // TODO: get size of resulting download
      // const resultsResponse = await fetchData(
      //   urlConfig.resultsUrl(job.remoteID),
      //   undefined,
      //   {
      //     method: 'HEAD',
      //   }
      // );
      // const bytes: string = resultsResponse.headers['Content-Length'] || '0';

      // get a new reference to the job
      currentStateOfJob = getCurrentStateOfJob(job, stateRef);
      if (!currentStateOfJob) {
        return;
      }

      const now = Date.now();
      dispatch(
        updateJob(job.internalID, {
          timeLastUpdate: now,
          timeFinished: now,
          seen: false,
          status,
          // data: { fileSize: .... }, // TODO: add this
        })
      );
      messagesDispatch(
        addMessage(getJobMessage({ job: currentStateOfJob })) // TODO: add fileSize
      );
    } catch (error) {
      if (error instanceof Error || typeof error === 'string') {
        logging.error(error);
      }
    }
  };

export default getCheckAsyncDownloadJobStatus;
