import { Dispatch, MutableRefObject } from 'react';
import { AxiosResponse } from 'axios';

import fetchData from '../../shared/utils/fetchData';
import {
  getStatusFromResponse,
  getJobMessage,
  isJobIncomplete,
  getCurrentStateOfJob,
  isJobAlreadyFinished,
  checkForResponseError,
} from '../utils';
import * as logging from '../../shared/utils/logging';

import toolsURLs, { asyncDownloadUrlObjectCreator } from '../config/urls';

import { updateJob } from './toolsActions';
import { addMessage } from '../../messages/state/messagesActions';

import { ToolsState } from './toolsInitialState';
import { ToolsAction } from './toolsReducers';
import { MessagesAction } from '../../messages/state/messagesReducers';
import { RunningJob, FinishedJob } from '../types/toolsJob';
import { Status } from '../types/toolsStatuses';
import { BlastResults } from '../blast/types/blastResults';
import { JobTypes } from '../types/toolsJobTypes';
import { MappingError } from '../id-mapping/types/idMappingSearchResults';
import { FormParameters } from '../types/toolsFormParameters';

const getCheckJobStatus =
  (
    dispatch: Dispatch<ToolsAction>,
    stateRef: MutableRefObject<ToolsState>,
    messagesDispatch: Dispatch<MessagesAction>
  ) =>
  async (job: RunningJob | FinishedJob<JobTypes>) => {
    // const urlConfig = toolsURLs(job.type);
    const urlConfig =
      job.type === JobTypes.ASYNC_DOWNLOAD
        ? asyncDownloadUrlObjectCreator(
            (job.parameters as FormParameters[JobTypes.ASYNC_DOWNLOAD])
              .namespace
          )
        : toolsURLs(job.type);

    try {
      // we use plain fetch as through Axios we cannot block redirects
      const response = await window.fetch(urlConfig.statusUrl(job.remoteID), {
        headers: {
          Accept: 'text/plain,application/json',
        },
        method: 'GET',
        // 'manual' to block redirect is the bit we cannot do with Axios
        redirect: job.type === JobTypes.ID_MAPPING ? 'follow' : 'manual',
      });

      const [status, idMappingResultsUrl] = await getStatusFromResponse(
        job.type,
        response
      );

      if (
        // When doing Peptide Search weird redirects happen and mess this up
        job.type !== JobTypes.PEPTIDE_SEARCH
      ) {
        checkForResponseError(response, status);
      }

      // get a new reference to the job
      let currentStateOfJob = getCurrentStateOfJob(job, stateRef);
      // check that the job is still in the state (it might have been removed)
      if (!currentStateOfJob) {
        return;
      }
      if (isJobAlreadyFinished(status, currentStateOfJob)) {
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
      if (isJobIncomplete(status)) {
        dispatch(
          updateJob(job.internalID, {
            status,
          })
        );
        return;
      }
      // job finished, handle differently depending on job type
      if (job.type === JobTypes.BLAST) {
        // only BLAST jobs
        let response: AxiosResponse<BlastResults> | null = null;
        try {
          response = await fetchData<BlastResults>(
            urlConfig.resultUrl(job.remoteID, { format: 'json' })
          );
        } catch (error) {
          if (error instanceof Error || typeof error === 'string') {
            logging.error(error);
          }
        }

        const results = response?.data;

        // get a new reference to the job
        currentStateOfJob = getCurrentStateOfJob(job, stateRef);
        // check that the job is still in the state (it might have been removed)
        if (!currentStateOfJob) {
          return;
        }

        if (!results?.hits) {
          dispatch(
            updateJob(job.internalID, {
              status: Status.FAILURE,
            })
          );
          throw new Error(
            response?.data &&
              `"${JSON.stringify(
                response?.data
              )}" is not a valid result for this job`
          );
        }

        dispatch(
          updateJob(job.internalID, {
            timeFinished: Date.now(),
            seen: false,
            status,
            data: { hits: results.hits.length },
          })
        );
        messagesDispatch(
          addMessage(
            getJobMessage({
              job: currentStateOfJob,
              nHits: results.hits.length,
            })
          )
        );
      } else if (job.type === JobTypes.ID_MAPPING && idMappingResultsUrl) {
        // only ID Mapping jobs
        const response = await fetchData(idMappingResultsUrl, undefined, {
          method: 'HEAD',
        });

        // get a new reference to the job
        currentStateOfJob = getCurrentStateOfJob(job, stateRef);
        // check that the job is still in the state (it might have been removed)
        if (!currentStateOfJob) {
          return;
        }

        const hits: string = response.headers['x-total-results'] || '0';

        dispatch(
          updateJob(job.internalID, {
            timeFinished: Date.now(),
            seen: false,
            status,
            data: { hits: +hits },
          })
        );
        messagesDispatch(
          addMessage(getJobMessage({ job: currentStateOfJob, nHits: +hits }))
        );
      } else if (job.type === JobTypes.ASYNC_DOWNLOAD) {
        // Only Async Download jobs
        const resultUrl = urlConfig.resultUrl(job.remoteID, {});
        // HEAD the generated file to get file size
        const response = await fetchData(resultUrl, undefined, {
          method: 'HEAD',
        });

        // get a new reference to the job
        currentStateOfJob = getCurrentStateOfJob(job, stateRef);
        if (!currentStateOfJob) {
          return;
        }

        const fileSizeBytes = +response.headers['content-length'] || 0;

        dispatch(
          updateJob(job.internalID, {
            timeFinished: Date.now(),
            seen: false,
            status,
            data: { fileSizeBytes },
          })
        );
        messagesDispatch(
          addMessage(
            getJobMessage({
              job: currentStateOfJob,
              fileSizeBytes,
              url: resultUrl,
            })
          )
        );
      } else if (job.type === JobTypes.PEPTIDE_SEARCH) {
        // Only Peptide Search jobs
        let hits = 0;
        if (!response.bodyUsed) {
          hits =
            (await response.text()).split(/\s*,\s*/).filter(Boolean)?.length ||
            0;
        }
        dispatch(
          updateJob(job.internalID, {
            timeFinished: Date.now(),
            seen: false,
            status,
            data: { hits },
          })
        );
        messagesDispatch(
          addMessage(getJobMessage({ job: currentStateOfJob, nHits: hits }))
        );
      } else {
        // Align
        dispatch(
          updateJob(job.internalID, {
            timeFinished: Date.now(),
            seen: false,
            status,
          })
        );
        messagesDispatch(addMessage(getJobMessage({ job: currentStateOfJob })));
      }
    } catch (error) {
      if (error instanceof Error || typeof error === 'string') {
        logging.error(error);
      }
    }
  };

export default getCheckJobStatus;
