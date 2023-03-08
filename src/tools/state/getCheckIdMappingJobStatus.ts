import { Dispatch, MutableRefObject } from 'react';

import fetchData from '../../shared/utils/fetchData';
import {
  getStatusFromResponse,
  getJobMessage,
  checkForResponseError,
  getCurrentStateOfJob,
  isJobAlreadyFinished,
  isJobIncomplete,
} from '../utils';
import * as logging from '../../shared/utils/logging';

import toolsURLs from '../config/urls';

import { updateJob } from './toolsActions';
import { addMessage } from '../../messages/state/messagesActions';

import { ToolsState } from './toolsInitialState';
import { ToolsAction } from './toolsReducers';
import { MessagesAction } from '../../messages/state/messagesReducers';
import { RunningJob, FinishedJob } from '../types/toolsJob';
import { Status } from '../types/toolsStatuses';
import { JobTypes } from '../types/toolsJobTypes';
import { MappingError } from '../id-mapping/types/idMappingSearchResults';

const getCheckIdMappingJobStatus =
  (
    dispatch: Dispatch<ToolsAction>,
    stateRef: MutableRefObject<ToolsState>,
    messagesDispatch: Dispatch<MessagesAction>
  ) =>
  async (job: RunningJob | FinishedJob<JobTypes>) => {
    const urlConfig = toolsURLs(job.type);
    try {
      // we use plain fetch as through Axios we cannot block redirects
      const response = await window.fetch(urlConfig.statusUrl(job.remoteID), {
        headers: {
          Accept: 'text/plain,application/json',
        },
        method: 'GET',
        redirect: 'follow',
      });

      const [status, idMappingResultsUrl] = await getStatusFromResponse(
        job.type,
        response
      );

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

      if (!idMappingResultsUrl) {
        return;
      }
      // only ID Mapping jobs
      const resultsResponse = await fetchData(idMappingResultsUrl, undefined, {
        method: 'HEAD',
      });

      // get a new reference to the job
      currentStateOfJob = getCurrentStateOfJob(job, stateRef);
      if (!currentStateOfJob) {
        return;
      }

      // check that the job is still in the state (it might have been removed)
      currentStateOfJob = getCurrentStateOfJob(job, stateRef);
      if (!currentStateOfJob) {
        return;
      }

      const now = Date.now();
      const hits: string = resultsResponse.headers['x-total-results'] || '0';
      dispatch(
        updateJob(job.internalID, {
          timeLastUpdate: now,
          timeFinished: now,
          seen: false,
          status,
          data: { hits: +hits },
        })
      );
      messagesDispatch(
        addMessage(getJobMessage({ job: currentStateOfJob, nHits: +hits }))
      );
    } catch (error) {
      if (error instanceof Error || typeof error === 'string') {
        logging.error(error);
      }
    }
  };

export default getCheckIdMappingJobStatus;
