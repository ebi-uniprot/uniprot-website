import { Dispatch, MutableRefObject } from 'react';
import { AxiosResponse } from 'axios';

import fetchData from '../../shared/utils/fetchData';
import {
  getStatusFromResponse,
  getJobMessage,
  checkForResponseError,
  getCurrentStateOfJob,
  isJobAlreadyFinished,
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
import { BlastResults } from '../blast/types/blastResults';
import { JobTypes } from '../types/toolsJobTypes';

const getCheckBlastJobStatus =
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
        // 'manual' to block redirect is the bit we cannot do with Axios
        redirect: 'manual',
      });

      const [status] = await getStatusFromResponse(job.type, response);

      checkForResponseError(response, status);

      const currentStateOfJob = getCurrentStateOfJob(job, stateRef);
      if (!currentStateOfJob) {
        return;
      }

      if (isJobAlreadyFinished(status, currentStateOfJob)) {
        return;
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
        currentStateOfJob = stateRef.current[job.internalID];
        // check that the job is still in the state (it might have been removed)
        if (!currentStateOfJob) {
          return;
        }

        const now = Date.now();

        if (!results?.hits) {
          dispatch(
            updateJob(job.internalID, {
              timeLastUpdate: now,
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
            timeLastUpdate: now,
            timeFinished: now,
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
      }
    } catch (error) {
      if (error instanceof Error || typeof error === 'string') {
        logging.error(error);
      }
    }
  };

export default getCheckBlastJobStatus;
