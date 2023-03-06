import { Dispatch, MutableRefObject } from 'react';

import fetchData from '../../shared/utils/fetchData';
import { getStatusFromResponse, getJobMessage } from '../utils';
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
      // we use plain fetch as through Axios we cannot block redirects
      const response = await window.fetch(urlConfig.statusUrl(job.remoteID), {
        headers: {
          Accept: 'text/plain,application/json',
        },
        method: 'GET',
        redirect: 'error',
      });

      const [status, idMappingResultsUrl] = await getStatusFromResponse(
        job.type,
        response
      );

      if (
        !response.ok &&
        status !== Status.FAILURE &&
        status !== Status.ERRORED
      ) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      // stateRef not hydrated yet
      if (!stateRef.current) {
        return;
      }
      // get a new reference to the job
      let currentStateOfJob = stateRef.current[job.internalID];
      // check that the job is still in the state (it might have been removed)
      if (!currentStateOfJob) {
        return;
      }
      if (
        status === Status.FINISHED &&
        currentStateOfJob.status === Status.FINISHED
      ) {
        // job was already finished, and is still in the same state on the server
        return;
      }
      if (job.type === JobTypes.ID_MAPPING && status === Status.FAILURE) {
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
      if (
        status === Status.NOT_FOUND ||
        status === Status.RUNNING ||
        status === Status.FAILURE ||
        status === Status.ERRORED
      ) {
        dispatch(
          updateJob(job.internalID, {
            timeLastUpdate: Date.now(),
            status,
          })
        );
        return;
      }

      // only ID Mapping jobs
      const resultsResponse = await fetchData(idMappingResultsUrl, undefined, {
        method: 'HEAD',
      });

      // get a new reference to the job
      currentStateOfJob = stateRef.current[job.internalID];
      // check that the job is still in the state (it might have been removed)
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

export default getCheckAsyncDownloadJobStatus;
