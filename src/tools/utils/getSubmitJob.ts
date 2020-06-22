import { Store } from 'redux';

import { formParameterToServerParameters } from '../blast/adapters/BlastParametersAdapter';

import isValidServerID from './isValidServerID';
import { getServerErrorDescription, getJobMessage } from '.';

import { addMessage } from '../../messages/state/messagesActions';
import { updateJob } from '../state/toolsActions';

import blastUrls from '../blast/config/blastUrls';
import postData from '../../uniprotkb/config/postData';

import { Status } from '../blast/types/blastStatuses';
import { CreatedJob } from '../blast/types/blastJob';

const getSubmitJob = ({ dispatch, getState }: Store) => async (
  job: CreatedJob
) => {
  try {
    // specific logic to transform FormParameters to ServerParameters
    let formData;
    try {
      formData = formParameterToServerParameters(job.parameters);
    } catch {
      throw new Error('Internal error');
    }
    const url = job.type === 'blast' ? blastUrls.runUrl : '';

    const response = await postData(url, {
      data: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'text/plain',
      },
    });
    const remoteID = response.data;

    if (!isValidServerID(remoteID)) {
      throw new Error(`The server didn't return a valid ID`);
    }

    // get a new reference to the job
    const currentStateOfJob = getState().tools[job.internalID];
    // check that the job is still in the state (it might have been removed)
    if (!currentStateOfJob) return;

    const now = Date.now();
    dispatch(
      updateJob({
        ...currentStateOfJob,
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
    if (!currentStateOfJob) return;
    dispatch(
      updateJob({
        ...currentStateOfJob,
        status: Status.FAILURE,
        timeLastUpdate: Date.now(),
        errorDescription,
      })
    );
    dispatch(addMessage(getJobMessage({ job, errorDescription })));
  }
};

export default getSubmitJob;
