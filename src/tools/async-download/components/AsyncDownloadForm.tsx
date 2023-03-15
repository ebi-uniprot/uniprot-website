import { FormEvent, useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { SpinnerIcon } from 'franklin-sites';
import { sleep } from 'timing-functions';
import cn from 'classnames';

import { useReducedMotion } from '../../../shared/hooks/useMatchMedia';
import { useToolsDispatch } from '../../../shared/contexts/Tools';
import useScrollIntoViewRef from '../../../shared/hooks/useScrollIntoView';

import { createJob } from '../../state/toolsActions';

import { DownloadUrlOptions } from '../../../shared/config/apiUrls';
import {
  AsyncDownloadFields,
  AsyncDownloadFormValue,
  AsyncDownloadFormValues,
} from '../config/asyncDownloadFormData';
import { LocationToPath, Location } from '../../../app/config/urls';

import { JobTypes } from '../../types/toolsJobTypes';
import { FileFormat } from '../../../shared/types/resultsDownload';

import sticky from '../../../shared/styles/sticky.module.scss';
import '../../styles/ToolsForm.scss';

const isExcel = (downloadOptions: DownloadUrlOptions) =>
  downloadOptions.fileFormat === FileFormat.excel;

const isUncompressed = (downloadOptions: DownloadUrlOptions) =>
  !downloadOptions.compressed;

const isInvalid = (name: string, downloadOptions: DownloadUrlOptions) =>
  !name || isExcel(downloadOptions) || isUncompressed(downloadOptions);

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
  const scrollRef = useScrollIntoViewRef();

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
    const potentialJobName = `${downloadUrlOptions.namespace}-${count}`;
    setJobName((jobName: AsyncDownloadFormValue) => {
      if (jobName.selected === potentialJobName) {
        // avoid unecessary rerender by keeping the same object
        return jobName;
      }
      return { ...jobName, selected: potentialJobName };
    });
  }, [count, downloadUrlOptions.namespace, jobNameEdited]);

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
        <section className="tools-form-section">
          <section className="tools-form-section__item">
            <label>
              Name your Generate File job
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
        <section
          className={cn('tools-form-section', sticky['sticky-bottom-right'])}
        >
          <section className="button-group tools-form-section__buttons">
            {sending && !reducedMotion && (
              <>
                <SpinnerIcon />
                &nbsp;
              </>
            )}
            <input className="button secondary" type="reset" />
            <button
              className="button primary"
              type="submit"
              disabled={submitDisabled}
              onClick={submitAsyncDownloadJob}
            >
              Submit Generate File Job
            </button>
          </section>
        </section>
      </fieldset>
    </form>
  );
};

export default AsyncDownloadForm;
