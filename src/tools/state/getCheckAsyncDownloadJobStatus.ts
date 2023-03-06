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
      /*
      Access to fetch at 'http://hx-rke-wp-webadmin-35-worker-9.caas.ebi.ac.uk:31210/uniprotkb/download/results/f9049c38631176ac76741e92c432aaf982f293db' from origin 'http://localhost:8080' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
      */
      const response = await window
        // .fetch(urlConfig.statusUrl(job.remoteID), {
        .fetch(
          'http://hx-rke-wp-webadmin-35-worker-9.caas.ebi.ac.uk:31210/uniprotkb/download/results/f9049c38631176ac76741e92c432aaf982f293db',
          {
            headers: {
              Accept: 'text/plain,application/json',
            },
            method: 'HEAD',
            // Return a network error when a request is met with a redirect.
            // We don't want to fetch async download payloads as they will be huge.
            // redirect: 'error',
          }
        )
        .catch((reason) => {
          console.log(reason);
        });

      console.log(response);
      // const [status] = await getStatusFromResponse(job.type, response);

      // checkForResponseError(response, status);

      // const currentStateOfJob = getCurrentStateOfJob(job, stateRef);
      // if (!currentStateOfJob) {
      //   return;
      // }

      // if (isJobAlreadyFinished(status, currentStateOfJob)) {
      //   return;
      // }

      // if (job.type === JobTypes.ID_MAPPING && status === Status.FAILURE) {
      //   const errorResponse: { jobStatus: Status; errors?: MappingError[] } =
      //     await response.json();
      //   if (errorResponse.errors?.[0]) {
      //     const error = errorResponse.errors[0];
      //     dispatch(
      //       updateJob(job.internalID, {
      //         timeLastUpdate: Date.now(),
      //         status,
      //         errorDescription: error.message,
      //       })
      //     );
      //   }
      // }

      // if (isJobIncomplete(status)) {
      //   dispatch(
      //     updateJob(job.internalID, {
      //       timeLastUpdate: Date.now(),
      //       status,
      //     })
      //   );
      //   return;
      // }

      // // only ID Mapping jobs
      // const resultsResponse = await fetchData(idMappingResultsUrl, undefined, {
      //   method: 'HEAD',
      // });

      // // get a new reference to the job
      // currentStateOfJob = stateRef.current[job.internalID];
      // // check that the job is still in the state (it might have been removed)
      // if (!currentStateOfJob) {
      //   return;
      // }

      // const now = Date.now();

      // const hits: string = resultsResponse.headers['x-total-results'] || '0';

      // dispatch(
      //   updateJob(job.internalID, {
      //     timeLastUpdate: now,
      //     timeFinished: now,
      //     seen: false,
      //     status,
      //     data: { hits: +hits },
      //   })
      // );
      // messagesDispatch(
      //   addMessage(getJobMessage({ job: currentStateOfJob, nHits: +hits }))
      // );
    } catch (error) {
      if (error instanceof Error || typeof error === 'string') {
        logging.error(error);
      }
    }
  };

export default getCheckAsyncDownloadJobStatus;
