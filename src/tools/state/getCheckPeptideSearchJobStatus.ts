import { Dispatch, MutableRefObject } from 'react';

import { getStatusFromResponse, getJobMessage } from '../utils';
import * as logging from '../../shared/utils/logging';

import toolsURLs from '../config/urls';
import { possibleStatuses, unfinishedStatuses } from './getCheckJobStatus';

import { updateJob } from './toolsActions';
import { addMessage } from '../../messages/state/messagesActions';

import { ToolsState } from './toolsInitialState';
import { ToolsAction } from './toolsReducers';
import { MessagesAction } from '../../messages/state/messagesReducers';
import { RunningJob, FinishedJob } from '../types/toolsJob';
import { Status } from '../types/toolsStatuses';
import { JobTypes } from '../types/toolsJobTypes';

const getCheckPeptideSearchJobStatus =
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

      // stateRef not hydrated yet
      if (!stateRef.current) {
        return;
      }
      // get a new reference to the job
      const currentStateOfJob = stateRef.current[job.internalID];
      // check that the job is still in the state (it might have been removed)
      if (!currentStateOfJob) {
        return;
      }
      // check that the status we got from the server is something expected
      if (!possibleStatuses.has(status)) {
        throw new Error(
          `got an unexpected status of "${status}" from the server`
        );
      }
      if (
        status === Status.FINISHED &&
        currentStateOfJob.status === Status.FINISHED
      ) {
        // job was already finished, and is still in the same state on the server
        return;
      }
      if (unfinishedStatuses.has(status)) {
        dispatch(
          updateJob(job.internalID, {
            timeLastUpdate: Date.now(),
            status,
          })
        );
        return;
      }
      const now = Date.now();
      let hits = 0;
      if (!response.bodyUsed) {
        hits = (await response.text()).split(/,/)?.length || 0;
      }
      dispatch(
        updateJob(job.internalID, {
          timeLastUpdate: now,
          timeFinished: now,
          seen: false,
          status,
          data: { hits },
        })
      );
      messagesDispatch(
        addMessage(getJobMessage({ job: currentStateOfJob, nHits: hits }))
      );
      messagesDispatch(addMessage(getJobMessage({ job: currentStateOfJob })));
    } catch (error) {
      if (error instanceof Error || typeof error === 'string') {
        logging.error(error);
      }
    }
  };

export default getCheckPeptideSearchJobStatus;
