import { FormEvent, useCallback, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { LongNumber, Message, SpinnerIcon, Chip } from 'franklin-sites';
import { sleep } from 'timing-functions';

import AsyncDownloadConfirmation from './AsyncDownloadConfirmation';

import { useReducedMotion } from '../../../shared/hooks/useMatchMedia';
import useToolsDispatch from '../../../shared/hooks/useToolsDispatch';
import useScrollIntoViewRef from '../../../shared/hooks/useScrollIntoView';
import useJobFromUrl from '../../../shared/hooks/useJobFromUrl';
import useToolsState from '../../../shared/hooks/useToolsState';

import {
  asyncDownloadFormDataReducer,
  getAsyncDownloadFormInitialState,
  isExcel,
  isUncompressed,
} from '../state/asyncDownloadFormReducer';
import { createJob } from '../../state/toolsActions';
import {
  updateSelected,
  updateSending,
  updateDownloadUrlOptions,
  updateConfirmation,
} from '../state/asyncDownloadFormActions';
import initialFormValues, {
  AsyncDownloadFields,
} from '../config/asyncDownloadFormData';
import { getJobName } from '../../id-mapping/state/idMappingFormReducer';
import splitAndTidyText from '../../../shared/utils/splitAndTidyText';

import { LocationToPath, Location } from '../../../app/config/urls';
import { DownloadUrlOptions } from '../../../shared/config/apiUrls';
import { FileFormat } from '../../../shared/types/resultsDownload';
import { JobTypes } from '../../types/toolsJobTypes';
import { Namespace } from '../../../shared/types/namespaces';
import { Status } from '../../types/toolsStatuses';
import { PublicServerParameters } from '../../types/toolsServerParameters';

import '../../styles/ToolsForm.scss';

type Props<T extends JobTypes> = {
  downloadUrlOptions: DownloadUrlOptions;
  count: number;
  onClose: () => void;
  jobType?: T;
  inputParamsData?: PublicServerParameters[T];
};

const AsyncDownloadForm = ({
  downloadUrlOptions,
  count,
  onClose,
  jobType,
  inputParamsData,
}: Props<JobTypes>) => {
  const dispatchTools = useToolsDispatch();
  const history = useHistory();
  const reducedMotion = useReducedMotion();
  const scrollRef = useScrollIntoViewRef<HTMLFormElement>();
  const { jobId } = useJobFromUrl();
  const tools = useToolsState();

  const isIdMappingResult = jobType === JobTypes.ID_MAPPING && jobId;

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

  const submitAsyncDownloadJob = useCallback(
    (event: FormEvent | MouseEvent) => {
      event.preventDefault();
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
        dispatchTools(
          createJob(
            {
              ...downloadUrlOptions,
              compressed: false,
              download: false,
              namespace: isIdMappingResult
                ? Namespace.idmapping
                : downloadUrlOptions.namespace,
              jobId: isIdMappingResult ? jobId : undefined,
            },
            JobTypes.ASYNC_DOWNLOAD,
            formValues[AsyncDownloadFields.name].selected
          )
        );
      });
    },
    // NOTE: maybe no point using useCallback if all the values of the form
    // cause this to be re-created. Maybe review submit callback in all 4 forms?
    [
      history,
      onClose,
      dispatchTools,
      downloadUrlOptions,
      isIdMappingResult,
      jobId,
      formValues,
    ]
  );

  if (showConfirmation) {
    return <AsyncDownloadConfirmation formValues={formValues} />;
  }

  return (
    <form
      onSubmit={() => dispatch(updateConfirmation(true))}
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
                placeholder={'"my job title"'}
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
              onClick={() => dispatch(updateConfirmation(true))}
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
