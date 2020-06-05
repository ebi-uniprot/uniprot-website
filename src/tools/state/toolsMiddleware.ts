import { Middleware } from 'redux';
import { schedule, sleep } from 'timing-functions';

import { Job, CreatedJob, RunningJob } from '../blast/types/blastJob';
import { Status } from '../blast/types/blastStatuses';
import {
  MessageFormat,
  MessageLevel,
  MessageTag,
} from '../../messages/types/messagesTypes';
import { BlastResults } from '../blast/types/blastResults';

import { Stores } from '../utils/stores';

import {
  CREATE_JOB,
  REHYDRATE_JOBS,
  updateJob,
  rehydrateJobs,
} from './toolsActions';

import fetchData from '../../shared/utils/fetchData';
import postData from '../../uniprotkb/config/postData';
import JobStore from '../utils/storage';
import convertFormParametersForServer from '../blast/adapters/BlastParametersAdapter';

import { addMessage } from '../../messages/state/messagesActions';

import blastUrls from '../blast/config/blastUrls';

import { ToolsState } from './toolsInitialState';

const POLLING_INTERVAL = 1000 * 3; // 3 seconds

const validServerID = /^ncbiblast-R\d{8}(-\w+){4}$/;
const isValidServerID = (id: string) => validServerID.test(id);

const toolsMiddleware: Middleware = (store) => {
  const { dispatch, getState } = store;

  // rehydrate jobs, run once in the application lifetime
  (async () => {
    // Wait for browser idleness
    await schedule();

    const jobStore = new JobStore(Stores.METADATA);

    const persistedJobs: { [internalID: string]: Job } = {};
    for (const persistedJob of await jobStore.getAll()) {
      persistedJobs[persistedJob.internalID] = persistedJob;
    }

    if (!Object.keys(persistedJobs).length) return;

    // Wait for browser idleness
    await schedule();

    dispatch(rehydrateJobs(persistedJobs));
  })();

  // flag to avoid multiple pollJobs loop being scheduled
  let scheduledPollJobs = false;

  /**
   * Returns a job from the state at the moment of execution, useful with async
   * code as the job might have changed
   * @param {Job["internalID"]} id - internal ID of the job ID to check
   */
  const getJobWithID = (id: Job['internalID']) => getState().tools[id];

  const checkJobStatus = async (job: RunningJob) => {
    const url = job.type === 'blast' ? blastUrls.statusUrl(job.remoteID) : '';
    try {
      const { data: status } = await fetchData(
        url,
        { Accept: 'text/plain' },
        undefined,
        { responseType: 'text' }
      );
      // get a new reference to the job
      let currentStateOfJob = getJobWithID(job.internalID);
      // check that the job is still in the state (it might have been removed)
      if (!currentStateOfJob) return;
      // check that the status we got from the server is something expected
      if (!(Object.values(Status) as Array<string>).includes(status)) {
        throw new Error(
          `got an unexpected status of "${status}" from the server`
        );
      }
      if (status === Status.NOT_FOUND) {
        throw new Error('Job was not found on the server');
      }
      if (
        status === Status.RUNNING ||
        status === Status.FAILURE ||
        status === Status.ERRORED
      ) {
        dispatch(
          updateJob({
            ...currentStateOfJob,
            timeLastUpdate: Date.now(),
            status: status as Status.RUNNING | Status.FAILURE | Status.ERRORED,
          })
        );

        return;
      }
      // job finished
      const response = await fetchData(
        job.type === 'blast' ? blastUrls.resultUrl(job.remoteID) : ''
      );

      const results: BlastResults = response.data;

      // get a new reference to the job
      currentStateOfJob = getJobWithID(job.internalID);
      // check that the job is still in the state (it might have been removed)
      if (!currentStateOfJob) return;

      const now = Date.now();

      if (!results.hits) {
        dispatch(
          updateJob({
            ...currentStateOfJob,
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
        updateJob({
          ...currentStateOfJob,
          timeLastUpdate: now,
          timeFinished: now,
          status,
          data: { hits: results.hits.length },
        })
      );
      dispatch(
        addMessage({
          id: job.internalID,
          content: `Job "${job.title || job.remoteID}" finished, found ${
            results.hits.length
          } hit${results.hits.length === 1 ? '' : 's'}`,
          format: MessageFormat.POP_UP,
          level: MessageLevel.SUCCESS,
          tag: MessageTag.JOB,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const submitJob = async (job: CreatedJob) => {
    try {
      // specific logic to transform FormParameters to ServerParameters
      let formData;
      try {
        formData = convertFormParametersForServer(job.parameters);
      } catch {
        throw new Error('Internal error');
      }
      formData.delete('scores');
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
      const currentStateOfJob = getJobWithID(job.internalID);
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
      // get a new reference to the job
      const currentStateOfJob = getJobWithID(job.internalID);
      // check that the job is still in the state (it might have been removed)
      if (!currentStateOfJob) return;
      dispatch(
        updateJob({
          ...currentStateOfJob,
          status: Status.FAILURE,
          timeLastUpdate: Date.now(),
        })
      );
      dispatch(
        addMessage({
          id: job.internalID,
          content: `Could not run job: ${error.message}`,
          format: MessageFormat.POP_UP,
          level: MessageLevel.FAILURE,
          tag: MessageTag.JOB,
        })
      );
    }
  };

  // main loop
  const pollJobs = async () => {
    // Wait for browser idleness
    await schedule();

    const toolsState: ToolsState = getState().tools;

    const jobsToSubmit = Object.values(toolsState).filter(
      (job) => job.status === Status.CREATED
    ) as Array<CreatedJob>;
    const jobsToPoll = Object.values(toolsState).filter(
      (job) => job.status === Status.RUNNING
    ) as Array<RunningJob>;

    // nothing to check, early exit, no recursion
    if (!(jobsToSubmit.length || jobsToPoll.length)) {
      scheduledPollJobs = false;
      return;
    }

    for (const createdJob of jobsToSubmit) {
      // eslint-disable-next-line no-await-in-loop
      await submitJob(createdJob);
    }

    for (const runningJob of jobsToPoll) {
      // eslint-disable-next-line no-await-in-loop
      await checkJobStatus(runningJob);
    }

    // reset flag
    scheduledPollJobs = false;

    await sleep(POLLING_INTERVAL);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    schedulePollJobs();
  };

  const schedulePollJobs = async () => {
    if (scheduledPollJobs) return;
    scheduledPollJobs = true;
    await schedule(POLLING_INTERVAL);
    pollJobs();
  };

  return (next) => (action) => {
    switch (action.type) {
      case CREATE_JOB:
      case REHYDRATE_JOBS:
        schedulePollJobs();
        break;
      default:
      // do nothing
    }

    // state is not yet updated
    const returnValue = next(action);
    // state is now updated

    return returnValue;
  };
};

export default toolsMiddleware;
