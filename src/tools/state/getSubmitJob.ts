import { AnyAction, MiddlewareAPI, Dispatch } from 'redux';

import { formParametersToServerParameters } from '../adapters/parameters';

import {
  getRemoteIDFromResponse,
  getServerErrorDescription,
  getJobMessage,
  ServerError,
} from '../utils';

import { addMessage } from '../../messages/state/messagesActions';
import { updateJob } from './toolsActions';

import toolsURLs from '../config/urls';

import { RootState } from '../../app/state/rootInitialState';
import { Status } from '../types/toolsStatuses';
import { CreatedJob } from '../types/toolsJob';

const getSubmitJob =
  ({ dispatch, getState }: MiddlewareAPI<Dispatch<AnyAction>, RootState>) =>
  async (job: CreatedJob) => {
    try {
      // specific logic to transform FormParameters to ServerParameters
      let formData;
      try {
        formData = formParametersToServerParameters(job.type, job.parameters);
      } catch {
        throw new Error('Internal error');
      }

      // we use plain fetch as through Axios we cannot block redirects
      const response = await window.fetch(toolsURLs(job.type).runUrl, {
        headers: { Accept: 'text/plain,application/json' },
        method: 'POST',
        body: formData,
        // 'manual' to block redirect is the bit we cannot do with Axios
        redirect: 'manual',
      });

      if (!response.ok) {
        throw new Error(`Request failed with status code ${response.status}`);
      }

      const remoteID = await getRemoteIDFromResponse(job.type, response);

      // get a new reference to the job
      const currentStateOfJob = getState().tools[job.internalID];
      // check that the job is still in the state (it might have been removed)
      if (!currentStateOfJob) {
        return;
      }

      const now = Date.now();
      dispatch(
        updateJob(job.internalID, {
          status: Status.RUNNING,
          remoteID,
          timeSubmitted: now,
          timeLastUpdate: now,
        })
      );
    } catch (error) {
      let errorDescription = 'Unexpected error';
      if (error instanceof Object && 'response' in error) {
        errorDescription =
          getServerErrorDescription(error as ServerError) || errorDescription;
      } else if (error instanceof Error) {
        errorDescription = `Could not run job: ${error.message}`;
      }
      // get a new reference to the job
      const currentStateOfJob = getState().tools[job.internalID];
      // check that the job is still in the state (it might have been removed)
      if (!currentStateOfJob) {
        return;
      }
      dispatch(
        updateJob(job.internalID, {
          status: Status.FAILURE,
          timeLastUpdate: Date.now(),
          errorDescription,
        })
      );
      dispatch(addMessage(getJobMessage({ job, errorDescription })));
    }
  };

export default getSubmitJob;
