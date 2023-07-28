import { FormEvent, useCallback, useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { LongNumber, Message, SpinnerIcon, Chip } from 'franklin-sites';
import { sleep } from 'timing-functions';

import { useReducedMotion } from '../../../shared/hooks/useMatchMedia';
import useToolsDispatch from '../../../shared/hooks/useToolsDispatch';
import useScrollIntoViewRef from '../../../shared/hooks/useScrollIntoView';

import {
  getAsyncDownloadFormDataReducer,
  getAsyncDownloadFormInitialState,
  isExcel,
  isUncompressed,
} from '../state/asyncDownloadFormReducer';
import { createJob } from '../../state/toolsActions';
import {
  updateSelected,
  updateSending,
  updateDownloadUrlOptions,
} from '../state/asyncDownloadFormActions';

import { LocationToPath, Location } from '../../../app/config/urls';
import { DownloadUrlOptions } from '../../../shared/config/apiUrls';
import {
  AsyncDownloadFields,
  AsyncDownloadFormValues,
} from '../config/asyncDownloadFormData';
import { FileFormat } from '../../../shared/types/resultsDownload';
import { JobTypes } from '../../types/toolsJobTypes';

import '../../styles/ToolsForm.scss';

type Props = {
  initialFormValues: Readonly<AsyncDownloadFormValues>;
  downloadUrlOptions: DownloadUrlOptions;
  count: number;
  onClose: () => void;
};

const AsyncDownloadForm = ({
  initialFormValues,
  downloadUrlOptions,
  count,
  onClose,
}: Props) => {
  // hooks
  const dispatchTools = useToolsDispatch();
  const history = useHistory();
  const reducedMotion = useReducedMotion();
  const scrollRef = useScrollIntoViewRef<HTMLFormElement>();

  const [{ formValues, sending, submitDisabled }, dispatch] = useReducer(
    getAsyncDownloadFormDataReducer(),
    { initialFormValues, downloadUrlOptions, count },
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
            { ...downloadUrlOptions, compressed: false, download: false },
            JobTypes.ASYNC_DOWNLOAD,
            formValues[AsyncDownloadFields.name].selected
          )
        );
      });
    },
    // NOTE: maybe no point using useCallback if all the values of the form
    // cause this to be re-created. Maybe review submit callback in all 4 forms?
    [history, onClose, dispatchTools, downloadUrlOptions, formValues]
  );

  // useEffect(() => {
  //   if (jobNameEdited) {
  //     return;
  //   }
  //   const potentialJobName = getPotentialJobName(count, downloadUrlOptions);
  //   setJobName((jobName: AsyncDownloadFormValue) => {
  //     if (formValues[AsyncDownloadFields.name].selected === potentialJobName) {
  //       // avoid unecessary rerender by keeping the same object
  //       return jobName;
  //     }
  //     return { ...jobName, selected: potentialJobName };
  //   });
  // }, [count, downloadUrlOptions, downloadUrlOptions.namespace, jobNameEdited]);

  // useEffect(() => {
  //   setSubmitDisabled(isInvalid(formValues[AsyncDownloadFields.name].selected, downloadUrlOptions));
  // }, [downloadUrlOptions, jobName]);

  return (
    <form
      onSubmit={submitAsyncDownloadJob}
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
                Excel file format not supported for File Generation jobs. Please
                select a different format. You can select TSV as an alternative
                to Excel.
              </Message>
            )}
            {isUncompressed(downloadUrlOptions) && (
              <Message level="failure">
                File must be compressed for File Generation jobs. Please select
                compressed to proceed.
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
              onClick={submitAsyncDownloadJob}
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
