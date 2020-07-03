import { AnyAction, MiddlewareAPI, Dispatch } from 'redux';

import { formParametersToServerParameters } from '../adapters/parameters';

import isValidServerID from '../utils/isValidServerID';
import { getServerErrorDescription, getJobMessage } from '../utils';

import { addMessage } from '../../messages/state/messagesActions';
import { updateJob } from './toolsActions';

import toolsURLs from '../config/urls';
import postData from '../../uniprotkb/config/postData';

import { RootState } from '../../app/state/rootInitialState';
import { Status } from '../types/toolsStatuses';
import { CreatedJob } from '../types/toolsJob';

const getSubmitJob = ({
  dispatch,
  getState,
}: MiddlewareAPI<Dispatch<AnyAction>, RootState>) => async (
  job: CreatedJob
) => {
  try {
    // specific logic to transform FormParameters to ServerParameters
    let formData;
    try {
      formData = formParametersToServerParameters(job.type, job.parameters);
    } catch {
      throw new Error('Internal error');
    }
    const url = toolsURLs(job.type).runUrl;

    const response = await postData(url, {
      data: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'text/plain',
      },
    });
    const remoteID = response.data;

    if (!isValidServerID(job.type, remoteID)) {
      throw new Error(`The server didn't return a valid ID`);
    }

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
    const errorDescription =
      getServerErrorDescription(error) || `Could not run job: ${error.message}`;
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
