import { AnyAction, MiddlewareAPI, Dispatch } from 'redux';

import fetchData from '../../shared/utils/fetchData';
import { getStatusFromResponse, getJobMessage } from '../utils';

import toolsURLs from '../config/urls';

import { updateJob } from './toolsActions';
import { addMessage } from '../../messages/state/messagesActions';

import { RootState } from '../../app/state/rootInitialState';
import { RunningJob, FinishedJob } from '../types/toolsJob';
import { Status } from '../types/toolsStatuses';
import { BlastResults } from '../blast/types/blastResults';
import { JobTypes } from '../types/toolsJobTypes';

const possibleStatuses = new Set(Object.values(Status));

const getCheckJobStatus =
  ({ dispatch, getState }: MiddlewareAPI<Dispatch<AnyAction>, RootState>) =>
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
        redirect: job.type === JobTypes.ID_MAPPING ? 'follow' : 'manual',
      });

      const [status, idMappingResultsUrl] = await getStatusFromResponse(
        job.type,
        response
      );

      if (
        !response.ok &&
        status !== Status.FAILURE &&
        status !== Status.ERRORED
      ) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }

      // get a new reference to the job
      let currentStateOfJob = getState().tools[job.internalID];
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
          urlConfig.resultUrl(job.remoteID, { format: 'json' })
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
        dispatch(
          addMessage(
            getJobMessage({
              job: currentStateOfJob,
              nHits: results.hits.length,
            })
          )
        );
      } else if (job.type === JobTypes.ID_MAPPING && idMappingResultsUrl) {
        // only ID Mapping jobs
        const response = await fetchData(
          idMappingResultsUrl,
          undefined,
          undefined,
          { method: 'HEAD' }
        );

        // get a new reference to the job
        currentStateOfJob = getState().tools[job.internalID];
        // check that the job is still in the state (it might have been removed)
        if (!currentStateOfJob) {
          return;
        }

        const now = Date.now();

        const hits: string = response.headers['x-total-records'];

        if (!hits) {
          dispatch(
            updateJob(job.internalID, {
              timeLastUpdate: now,
              status: Status.FAILURE,
            })
          );
          throw new Error('There was no valid results for this job');
        }

        dispatch(
          updateJob(job.internalID, {
            timeLastUpdate: now,
            timeFinished: now,
            seen: false,
            status,
            data: { hits: +hits },
          })
        );
        dispatch(
          addMessage(getJobMessage({ job: currentStateOfJob, nHits: +hits }))
        );
      } else if (job.type === JobTypes.PEPTIDE_SEARCH) {
        // Only Peptide Search jobs
        const now = Date.now();

        let hits = 0;
        if (!response.bodyUsed) {
          hits = ((await response.text()).match(/,/)?.length || 0) + 1;
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
        dispatch(addMessage(getJobMessage({ job: currentStateOfJob })));
      } else {
        // Align
        const now = Date.now();
        dispatch(
          updateJob(job.internalID, {
            timeLastUpdate: now,
            timeFinished: now,
            seen: false,
            status,
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
