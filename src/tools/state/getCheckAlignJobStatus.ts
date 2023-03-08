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

import toolsURLs from '../config/urls';

import { updateJob } from './toolsActions';
import { addMessage } from '../../messages/state/messagesActions';

import { ToolsState } from './toolsInitialState';
import { ToolsAction } from './toolsReducers';
import { MessagesAction } from '../../messages/state/messagesReducers';
import { RunningJob, FinishedJob } from '../types/toolsJob';
import { Status } from '../types/toolsStatuses';
import { JobTypes } from '../types/toolsJobTypes';

export const possibleStatuses = new Set(Object.values(Status));
export const unfinishedStatuses = new Set([
  Status.NOT_FOUND,
  Status.RUNNING,
  Status.FAILURE,
  Status.ERRORED,
]);

const getCheckAlignJobStatus =
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

      if (isJobIncomplete(status)) {
        dispatch(
          updateJob(job.internalID, {
            status,
          })
        );
        return;
      }

      dispatch(
        updateJob(job.internalID, {
          timeFinished: Date.now(),
          seen: false,
          status,
        })
      );
      messagesDispatch(addMessage(getJobMessage({ job: currentStateOfJob })));
    } catch (error) {
      if (error instanceof Error || typeof error === 'string') {
        logging.error(error);
      }
    }
  };

export default getCheckAlignJobStatus;
