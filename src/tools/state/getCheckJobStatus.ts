import { AnyAction, MiddlewareAPI, Dispatch } from 'redux';

import fetchData from '../../shared/utils/fetchData';
import { getJobMessage } from '../utils';

import toolsURLs from '../config/urls';

import { updateJob } from './toolsActions';
import { addMessage } from '../../messages/state/messagesActions';

import { RootState } from '../../app/state/rootInitialState';
import { RunningJob, FinishedJob } from '../types/toolsJob';
import { Status } from '../types/toolsStatuses';
import { BlastResults } from '../blast/types/blastResults';
import { JobTypes } from '../types/toolsJobTypes';

const getCheckJobStatus = ({
  dispatch,
  getState,
}: MiddlewareAPI<Dispatch<AnyAction>, RootState>) => async (
  job: RunningJob | FinishedJob<JobTypes>
) => {
  const urlConfig = toolsURLs(job.type);
  try {
    const { data: status } = await fetchData<Status>(
      urlConfig.statusUrl(job.remoteID),
      { Accept: 'text/plain' },
      undefined,
      { responseType: 'text' }
    );
    // get a new reference to the job
    let currentStateOfJob = getState().tools[job.internalID];
    // check that the job is still in the state (it might have been removed)
    if (!currentStateOfJob) {
      return;
    }
    // check that the status we got from the server is something expected
    if (!(Object.values(Status) as Array<string>).includes(status)) {
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
    if (
      status === Status.NOT_FOUND ||
      status === Status.RUNNING ||
      status === Status.FAILURE ||
      status === Status.ERRORED
    ) {
      dispatch(
        updateJob(job.internalID, {
          timeLastUpdate: Date.now(),
          status: status as
            | Status.NOT_FOUND
            | Status.RUNNING
            | Status.FAILURE
            | Status.ERRORED,
        })
      );
      return;
    }
    // job finished, handle differently depending on job type
    if (job.type === JobTypes.BLAST) {
      // only BLAST jobs
      const response = await fetchData<BlastResults>(
        urlConfig.resultUrl(job.remoteID, 'jdp?format=json')
      );

      const results = response.data;

      // get a new reference to the job
      currentStateOfJob = getState().tools[job.internalID];
      // check that the job is still in the state (it might have been removed)
      if (!currentStateOfJob) {
        return;
      }

      const now = Date.now();

      if (!results.hits) {
        dispatch(
          updateJob(job.internalID, {
            timeLastUpdate: now,
            status: Status.FAILURE,
          })
        );
        throw new Error(
          `"${JSON.stringify(
            response.data
          )}" in not a valid result for this job`
        );
      }

      dispatch(
        updateJob(job.internalID, {
          timeLastUpdate: now,
          timeFinished: now,
          status,
          data: { hits: results.hits.length },
        })
      );
      dispatch(
        addMessage(
          getJobMessage({ job: currentStateOfJob, nHits: results.hits.length })
        )
      );
    } else {
      // all kinds of jobs except BLAST
      const now = Date.now();
      dispatch(
        updateJob(job.internalID, {
          timeLastUpdate: now,
          timeFinished: now,
          status,
          data: {},
        })
      );
      dispatch(addMessage(getJobMessage({ job: currentStateOfJob })));
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

export default getCheckJobStatus;
