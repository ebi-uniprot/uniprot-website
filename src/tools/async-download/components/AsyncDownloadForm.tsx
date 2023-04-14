import { FormEvent, useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { LongNumber, Message, SpinnerIcon, Chip } from 'franklin-sites';
import { sleep } from 'timing-functions';

import { useReducedMotion } from '../../../shared/hooks/useMatchMedia';
import useToolsDispatch from '../../../shared/hooks/useToolsDispatch';
import useScrollIntoViewRef from '../../../shared/hooks/useScrollIntoView';

import { createJob } from '../../state/toolsActions';

import { LocationToPath, Location } from '../../../app/config/urls';

import { DownloadUrlOptions } from '../../../shared/config/apiUrls';
import {
  AsyncDownloadFields,
  AsyncDownloadFormValue,
  AsyncDownloadFormValues,
} from '../config/asyncDownloadFormData';
import { JobTypes } from '../../types/toolsJobTypes';
import { FileFormat } from '../../../shared/types/resultsDownload';

import '../../styles/ToolsForm.scss';

const isExcel = (downloadUrlOptions: DownloadUrlOptions) =>
  downloadUrlOptions.fileFormat === FileFormat.excel;

const isUncompressed = (downloadUrlOptions: DownloadUrlOptions) =>
  !downloadUrlOptions.compressed;

const isInvalid = (name: string, downloadUrlOptions: DownloadUrlOptions) =>
  !name || isExcel(downloadUrlOptions) || isUncompressed(downloadUrlOptions);

const getPotentialJobName = (
  count: number,
  downloadUrlOptions: DownloadUrlOptions
) => `${downloadUrlOptions.namespace}-${count}`;

type Props = {
  initialFormValues: Readonly<AsyncDownloadFormValues>;
  downloadUrlOptions: DownloadUrlOptions;
  count: number;
};

const AsyncDownloadForm = ({
  initialFormValues,
  downloadUrlOptions,
  count,
}: Props) => {
  // hooks
  const dispatchTools = useToolsDispatch();
  const history = useHistory();
  const reducedMotion = useReducedMotion();
  const scrollRef = useScrollIntoViewRef<HTMLFormElement>();

  // used when the form submission needs to be disabled
  const [submitDisabled, setSubmitDisabled] = useState(() =>
    // default ids value will tell us if submit should be disabled or not
    isInvalid(
      initialFormValues[AsyncDownloadFields.name].selected,
      downloadUrlOptions
    )
  );
  // used when the form is about to be submitted to the server
  const [sending, setSending] = useState(false);
  // flag to see if a title has been set (either user, or predefined)
  const [jobNameEdited, setJobNameEdited] = useState(
    // default to true if it's been set through the history state
    Boolean(initialFormValues[AsyncDownloadFields.name].selected)
  );

  // extra job-related fields
  const [jobName, setJobName] = useState(
    initialFormValues[AsyncDownloadFields.name]
  );

  const submitAsyncDownloadJob = useCallback(
    (event: FormEvent | MouseEvent) => {
      event.preventDefault();

      setSubmitDisabled(true);
      setSending(true);

      // navigate to the dashboard, not immediately, to give the impression that
      // something is happening
      sleep(1000).then(() => {
        history.push(LocationToPath[Location.Dashboard]);

        // We emit an action containing only the parameters and the type of job
        // the reducer will be in charge of generating a proper job object for
        // internal state. Dispatching after history.push so that pop-up messages (as a
        // side-effect of createJob) cannot mount immediately before navigating away.
        dispatchTools(
          createJob(
            { ...downloadUrlOptions, compressed: false, download: false },
            JobTypes.ASYNC_DOWNLOAD,
            jobName.selected
          )
        );
      });
    },
    // NOTE: maybe no point using useCallback if all the values of the form
    // cause this to be re-created. Maybe review submit callback in all 4 forms?
    [history, dispatchTools, downloadUrlOptions, jobName]
  );

  useEffect(() => {
    if (jobNameEdited) {
      return;
    }
    const potentialJobName = getPotentialJobName(count, downloadUrlOptions);
    setJobName((jobName: AsyncDownloadFormValue) => {
      if (jobName.selected === potentialJobName) {
        // avoid unecessary rerender by keeping the same object
        return jobName;
      }
      return { ...jobName, selected: potentialJobName };
    });
  }, [count, downloadUrlOptions, downloadUrlOptions.namespace, jobNameEdited]);

  useEffect(() => {
    setSubmitDisabled(isInvalid(jobName.selected, downloadUrlOptions));
  }, [downloadUrlOptions, jobName]);

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
            Your download request is too large (<LongNumber>{count}</LongNumber>
            ) for immediate download.
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
                  width: `${(jobName.selected as string).length + 2}ch`,
                }}
                placeholder={'"my job title"'}
                value={jobName.selected as string}
                onFocus={(event) => {
                  if (!jobNameEdited) {
                    event.target.select();
                  }
                }}
                onChange={(event) => {
                  setJobNameEdited(Boolean(event.target.value));
                  setJobName({ ...jobName, selected: event.target.value });
                }}
                data-hj-allow
              />
            </label>
          </section>
        </section>
        {isInvalid(jobName.selected, downloadUrlOptions) && (
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
