import { AxiosResponse } from 'axios';

import { addMessage } from '../../../messages/state/messagesActions';
import { updateJob } from '../../../tools/state/toolsActions';
import * as logging from '../../utils/logging';

import toolsURLs, {
  asyncDownloadUrlObjectCreator,
} from '../../../tools/config/urls';
import {
  getStatusFromResponse,
  checkForResponseError,
  isJobAlreadyFinished,
  isJobIncomplete,
  getJobMessage,
} from '../../../tools/utils';
import fetchData from '../../utils/fetchData';

import { BlastResults } from '../../../tools/blast/types/blastResults';
import { MappingError } from '../../../tools/id-mapping/types/idMappingSearchResults';
import { FormParameters } from '../../../tools/types/toolsFormParameters';
import {
  NewJob,
  RunningJob,
  FinishedJob,
  Job,
} from '../../../tools/types/toolsJob';
import { JobTypes } from '../../../tools/types/toolsJobTypes';
import { Status } from '../../../tools/types/toolsStatuses';
import JobStore from '../../../tools/utils/storage';

const checkJobStatus = async (
  job: NewJob | RunningJob | FinishedJob<JobTypes>,
  store: JobStore,
  port: MessagePort
) => {
  const urlConfig =
    job.type === JobTypes.ASYNC_DOWNLOAD
      ? asyncDownloadUrlObjectCreator(
          (job.parameters as FormParameters[JobTypes.ASYNC_DOWNLOAD]).namespace
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
    const [status, progress, idMappingResultsUrl] = await getStatusFromResponse(
      job.type,
      response,
      job.remoteID
    );

    if (
      // When doing Peptide Search weird redirects happen and mess this up
      job.type !== JobTypes.PEPTIDE_SEARCH
    ) {
      checkForResponseError(response, status);
    }

    // get a new reference to the job
    let currentStateOfJob = await store.get<Job>(job.internalID);
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
        port.postMessage(
          updateJob(job.internalID, {
            timeLastUpdate: Date.now(),
            status,
            errorDescription: error.message,
          })
        );
      }
    }
    if (isJobIncomplete(status)) {
      port.postMessage(
        updateJob(job.internalID, {
          status,
          progress,
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
      currentStateOfJob = await store.get<Job>(job.internalID);
      // check that the job is still in the state (it might have been removed)
      if (!currentStateOfJob) {
        return;
      }

      if (!results?.hits) {
        port.postMessage({
          jobAction: updateJob(job.internalID, {
            status: Status.FAILURE,
          }),
        });
        throw new Error(
          response?.data &&
            `"${JSON.stringify(
              response?.data
            )}" is not a valid result for this job`
        );
      }

      port.postMessage({
        jobAction: updateJob(job.internalID, {
          timeFinished: Date.now(),
          seen: false,
          status,
          data: { hits: results.hits.length },
        }),
        messageAction: addMessage(
          getJobMessage({
            job: currentStateOfJob,
            nHits: results.hits.length,
          })
        ),
      });
    } else if (job.type === JobTypes.ID_MAPPING && idMappingResultsUrl) {
      // only ID Mapping jobs
      const response = await fetchData(idMappingResultsUrl, undefined, {
        method: 'HEAD',
      });

      // get a new reference to the job
      currentStateOfJob = await store.get<Job>(job.internalID);
      // check that the job is still in the state (it might have been removed)
      // TODO: I don't think we need to be so careful about state updates so consider removing all of these refetches for job state
      if (!currentStateOfJob) {
        return;
      }

      const hits: string = response.headers['x-total-results'] || '0';

      port.postMessage({
        jobAction: updateJob(job.internalID, {
          timeFinished: Date.now(),
          seen: false,
          status,
          data: { hits: +hits },
        }),
        messageAction: addMessage(
          getJobMessage({ job: currentStateOfJob, nHits: +hits })
        ),
      });
    } else if (job.type === JobTypes.ASYNC_DOWNLOAD) {
      // Only Async Download jobs
      const resultUrl = urlConfig.resultUrl(job.remoteID, {});
      // HEAD the generated file to get file size
      const response = await fetchData(resultUrl, undefined, {
        method: 'HEAD',
      });

      // get a new reference to the job
      currentStateOfJob = await store.get<Job>(job.internalID);
      if (!currentStateOfJob) {
        return;
      }

      const fileSizeBytes = +response.headers['content-length'] || 0;

      port.postMessage({
        jobAction: updateJob(job.internalID, {
          timeFinished: Date.now(),
          seen: false,
          status,
          data: { fileSizeBytes },
        }),
        messageAction: addMessage(
          getJobMessage({
            job: currentStateOfJob,
            fileSizeBytes,
            url: resultUrl,
          })
        ),
      });
    } else if (job.type === JobTypes.PEPTIDE_SEARCH) {
      // Only Peptide Search jobs
      let hits = 0;
      if (!response.bodyUsed) {
        hits =
          (await response.text()).split(/\s*,\s*/).filter(Boolean)?.length || 0;
      }
      port.postMessage({
        jobAction: updateJob(job.internalID, {
          timeFinished: Date.now(),
          seen: false,
          status,
          data: { hits },
        }),
        messageAction: addMessage(
          getJobMessage({ job: currentStateOfJob, nHits: hits })
        ),
      });
    } else {
      // Align
      port.postMessage({
        jobAction: updateJob(job.internalID, {
          timeFinished: Date.now(),
          seen: false,
          status,
        }),
        messageAction: addMessage(getJobMessage({ job: currentStateOfJob })),
      });
    }
  } catch (error) {
    if (error instanceof Error || typeof error === 'string') {
      logging.error(error);
    }
  }
};

export default checkJobStatus;
