import '../../styles/ToolsForm.scss';

import { Chip, LongNumber, Message, SpinnerIcon } from 'franklin-sites';
import { FormEvent, useCallback, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { sleep } from 'timing-functions';

import { Location, LocationToPath } from '../../../app/config/urls';
import useJobFromUrl from '../../../shared/hooks/useJobFromUrl';
import useJobsState from '../../../shared/hooks/useJobsState';
import { useReducedMotion } from '../../../shared/hooks/useMatchMedia';
import useScrollIntoViewRef from '../../../shared/hooks/useScrollIntoView';
import useSupportsJobs from '../../../shared/hooks/useSupportsJobs';
import helper from '../../../shared/styles/helper.module.scss';
import { Namespace } from '../../../shared/types/namespaces';
import { DownloadUrlOptions } from '../../../shared/types/results';
import { FileFormat } from '../../../shared/types/resultsDownload';
import { sendGtagEventJobSubmit } from '../../../shared/utils/gtagEvents';
import splitAndTidyText from '../../../shared/utils/splitAndTidyText';
import { dispatchJobs } from '../../../shared/workers/jobs/getJobSharedWorker';
import { createJob } from '../../../shared/workers/jobs/state/jobActions';
import { Status } from '../../../shared/workers/jobs/types/jobStatuses';
import { getJobName } from '../../id-mapping/state/idMappingFormReducer';
import { PublicServerParameters } from '../../types/jobsServerParameters';
import { JobTypes } from '../../types/jobTypes';
import initialFormValues, {
  AsyncDownloadFields,
} from '../config/asyncDownloadFormData';
import {
  updateConfirmation,
  updateDownloadUrlOptions,
  updateSelected,
  updateSending,
} from '../state/asyncDownloadFormActions';
import {
  asyncDownloadFormDataReducer,
  getAsyncDownloadFormInitialState,
  isExcel,
  isUncompressed,
} from '../state/asyncDownloadFormReducer';
import { FormParameters } from '../types/asyncDownloadFormParameters';
import AsyncDownloadConfirmation from './AsyncDownloadConfirmation';

const getJobParameters = (
  downloadUrlOptions: DownloadUrlOptions,
  isIdMappingResult: boolean,
  jobId?: string
): FormParameters => ({
  ...downloadUrlOptions,
  compressed: false,
  download: false,
  namespace: isIdMappingResult
    ? Namespace.idmapping
    : downloadUrlOptions.namespace,
  jobId: isIdMappingResult ? jobId : undefined,
});

type Props<T extends JobTypes> = {
  downloadUrlOptions: DownloadUrlOptions;
  count: number;
  onClose: () => void;
  onDisableForm: (disableForm: boolean) => void;
  jobType?: T;
  inputParamsData?: PublicServerParameters[T];
};

const AsyncDownloadForm = ({
  downloadUrlOptions,
  count,
  onClose,
  onDisableForm,
  jobType,
  inputParamsData,
}: Props<JobTypes>) => {
  const history = useHistory();
  const reducedMotion = useReducedMotion();
  const scrollRef = useScrollIntoViewRef<HTMLFormElement>();
  const { jobId } = useJobFromUrl();
  const tools = useJobsState();

  const supportsJobs = useSupportsJobs();

  const isIdMappingResult = Boolean(jobType === JobTypes.ID_MAPPING && jobId);
  let jobTitle = '';
  if (isIdMappingResult) {
    // If the user submitted the job, use the name they provided
    // otherwise recreate from the public server parameters.
    const idMappingJob =
      isIdMappingResult &&
      Object.values(tools || {}).find(
        (job) => job.status === Status.FINISHED && job.remoteID === jobId
      );
    if (idMappingJob && 'title' in idMappingJob) {
      jobTitle = idMappingJob.title;
    } else if (inputParamsData && 'from' in inputParamsData) {
      const { ids, from, to } = inputParamsData;
      jobTitle = getJobName(
        Array.from(new Set(splitAndTidyText(ids))),
        from,
        to
      );
    }
  }

  const [{ formValues, sending, submitDisabled, showConfirmation }, dispatch] =
    useReducer(
      asyncDownloadFormDataReducer,
      { initialFormValues, downloadUrlOptions, count, jobTitle },
      getAsyncDownloadFormInitialState
    );

  useEffect(() => {
    dispatch(updateDownloadUrlOptions(downloadUrlOptions));
  }, [downloadUrlOptions]);

  useEffect(() => {
    onDisableForm(showConfirmation);
  }, [onDisableForm, showConfirmation]);

  const onFormSubmit = useCallback((event: FormEvent | MouseEvent) => {
    event.preventDefault();
    dispatch(updateConfirmation(true));
  }, []);

  const submitAsyncDownloadJob = useCallback(
    (event?: FormEvent | MouseEvent) => {
      event?.preventDefault();
      dispatch(updateSending());

      // navigate to the dashboard, but not immediately, to give the impression that
      // something is happening
      sleep(1000).then(() => {
        history.push(LocationToPath[Location.Dashboard]);
        onClose();

        // We emit an action containing only the parameters and the type of job
        // the reducer will be in charge of generating a proper job object for
        // internal state. Dispatching after history.push so that pop-up messages (as a
        // side-effect of createJob) cannot mount immediately before navigating away.
        dispatchJobs(
          createJob(
            getJobParameters(downloadUrlOptions, isIdMappingResult, jobId),
            JobTypes.ASYNC_DOWNLOAD,
            formValues[AsyncDownloadFields.name].selected
          )
        );
        sendGtagEventJobSubmit(JobTypes.ASYNC_DOWNLOAD, {
          namespace: downloadUrlOptions.namespace,
          format: downloadUrlOptions.fileFormat,
        });
      });
    },
    // NOTE: maybe no point using useCallback if all the values of the form
    // cause this to be re-created. Maybe review submit callback in all 4 forms?
    [history, onClose, downloadUrlOptions, isIdMappingResult, jobId, formValues]
  );

  if (!supportsJobs) {
    return (
      <section ref={scrollRef} className={helper['padding-top-small']}>
        <Message level="failure">
          <h4>Job submission and results not available on this device</h4>
          <p className={helper['padding-top-small']}>
            This download request is too large (<LongNumber>{count}</LongNumber>
            ) for immediate download and requires a job submission, which
            isn&apos;t supported on your current device or browser. Please use a
            modern browser on a desktop or laptop to continue.
          </p>
        </Message>
      </section>
    );
  }
  if (showConfirmation) {
    return (
      <AsyncDownloadConfirmation
        jobParameters={getJobParameters(
          downloadUrlOptions,
          isIdMappingResult,
          jobId
        )}
        jobName={formValues[AsyncDownloadFields.name].selected}
        count={count}
        onCancel={() => dispatch(updateConfirmation(false))}
        onConfirm={() => submitAsyncDownloadJob()}
      />
    );
  }

  return (
    <form
      onSubmit={onFormSubmit}
      aria-label="Async download job submission form"
      ref={scrollRef}
    >
      <fieldset>
        <section className="tools-form-section tools-form-section--compact">
          <section className="tools-form-section__item tools-form-section__item--full-width">
            <h4>
              File Generation Needed <Chip compact>beta</Chip>
            </h4>
            {downloadUrlOptions.fileFormat === FileFormat.embeddings ? (
              <>This file format is unavailable</>
            ) : (
              <>
                Your download request is too large (
                <LongNumber>{count}</LongNumber>)
              </>
            )}{' '}
            for immediate download.
            <br />
            <span data-article-id="file-generation-download">
              Please submit a job to generate this file on the UniProt server
              which you can download when ready.
            </span>
          </section>
          <section className="tools-form-section__item tools-form-section__item--compact">
            <label>
              Name your File Generation job
              <input
                name="title"
                type="text"
                autoComplete="off"
                maxLength={100}
                style={{
                  width: `${
                    (formValues[AsyncDownloadFields.name].selected as string)
                      .length + 2
                  }ch`,
                }}
                placeholder="my job title"
                value={formValues[AsyncDownloadFields.name].selected as string}
                onFocus={(event) => {
                  if (!formValues[AsyncDownloadFields.name].userSelected) {
                    event.target.select();
                  }
                }}
                onChange={(event) =>
                  dispatch(
                    updateSelected(AsyncDownloadFields.name, event.target.value)
                  )
                }
                data-hj-allow
              />
            </label>
          </section>
        </section>
        {submitDisabled && (
          <section className="tools-form-section tools-form-section__item tools-form-section__item--full-width">
            {isExcel(downloadUrlOptions) && (
              <Message level="failure">
                <small>
                  Excel file format not supported for File Generation jobs.
                  Please select a different format. You can select TSV as an
                  alternative to Excel.
                </small>
              </Message>
            )}
            {isUncompressed(downloadUrlOptions) && (
              <Message level="failure">
                <small>
                  File must be compressed for File Generation jobs. Please
                  select compressed to proceed.
                </small>
              </Message>
            )}
            {!formValues[AsyncDownloadFields.name].selected && (
              <Message level="failure">Please name your job.</Message>
            )}
          </section>
        )}
        <section className="tools-form-section tools-form-section--right">
          <section className="button-group tools-form-section__buttons">
            {sending && !reducedMotion && (
              <>
                <SpinnerIcon />
                &nbsp;
              </>
            )}
            <button
              className="button primary"
              type="submit"
              disabled={submitDisabled}
              onClick={onFormSubmit}
            >
              Submit
            </button>
          </section>
        </section>
      </fieldset>
    </form>
  );
};

export default AsyncDownloadForm;
