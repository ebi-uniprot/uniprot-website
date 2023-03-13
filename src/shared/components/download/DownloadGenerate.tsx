import { Button, LongNumber, Message, SpinnerIcon } from 'franklin-sites';
import { useCallback, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import { sleep } from 'timing-functions';
import { useMessagesDispatch } from '../../contexts/Messages';

import {
  copyFailureMessage,
  copySuccessMessage,
} from '../../../messages/state/messagesActions';

import { gtagFn } from '../../utils/logging';

import { Namespace } from '../../types/namespaces';
import { createJob } from '../../../tools/state/toolsActions';

import { useToolsDispatch } from '../../contexts/Tools';
import { DownloadUrlOptions } from '../../config/apiUrls';
import { JobTypes } from '../../../tools/types/toolsJobTypes';
import { useReducedMotion } from '../../hooks/useMatchMedia';
import { LocationToPath, Location } from '../../../app/config/urls';

import styles from './styles/download-generate.module.scss';
import '../../../tools/styles/ToolsForm.scss';
import { FileFormat } from '../../types/resultsDownload';

type Props = {
  downloadOptions: DownloadUrlOptions;
  onMount: () => void;
  count: number;
};

const isExcel = (downloadOptions: DownloadUrlOptions) =>
  downloadOptions.fileFormat === FileFormat.excel;

const isUncompressed = (downloadOptions: DownloadUrlOptions) =>
  !downloadOptions.compressed;

const DownloadGenerate = ({ downloadOptions, onMount, count }: Props) => {
  useEffect(() => {
    onMount();
  }, [onMount]);
  const dispatchTools = useToolsDispatch();
  const history = useHistory();
  const reducedMotion = useReducedMotion();
  const [jobName, setJobName] = useState(
    `${downloadOptions.namespace}-${count}`
  );
  // used when the form is about to be submitted to the server
  const [sending, setSending] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(false);

  useEffect(() => {
    setSubmitDisabled(
      isExcel(downloadOptions) || isUncompressed(downloadOptions)
    );
  }, [downloadOptions]);

  const handleSubmit = () => {
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
          { ...downloadOptions, compressed: false, download: false },
          JobTypes.ASYNC_DOWNLOAD,
          jobName || new Date().toLocaleString()
        )
      );
    });
  };

  return (
    <form
      className={styles.generate}
      onSubmit={handleSubmit}
      aria-label="ID mapping job submission form"
    >
      <h4>Generate file</h4>
      Due to the number of results in your search (
      <LongNumber>{count}</LongNumber>) you can only download a file by
      submitting a Generate File job.
      <section className="tools-form-section">
        <section className="tools-form-section__item">
          <label className={styles.name}>
            Name your Generate File job
            <input
              name="title"
              type="text"
              autoComplete="off"
              maxLength={100}
              style={{
                width: `${jobName.length + 2}ch`,
              }}
              placeholder={'"my job title"'}
              value={jobName}
              onChange={(event) => {
                setJobName(event.target.value);
              }}
              data-hj-allow
            />
          </label>
        </section>
      </section>
      <section className="tools-form-section">
        <section className="tools-form-section__item tools-form-section__item--full-width">
          {isExcel(downloadOptions) && (
            <Message level="failure">
              Excel file format not supported for Generate File jobs.
            </Message>
          )}
          {isUncompressed(downloadOptions) && (
            <Message level="failure">
              File must be compressed for Generate File jobs.
            </Message>
          )}
          <section className="button-group tools-form-section__buttons">
            {sending && !reducedMotion && (
              <>
                <SpinnerIcon />
                &nbsp;
              </>
            )}
            <Button
              variant="primary"
              className={styles['copy-button']}
              onClick={handleSubmit}
              disabled={submitDisabled}
              title={
                submitDisabled
                  ? 'Download size is too big, please restrict your search'
                  : undefined
              }
            >
              Submit Job
            </Button>
          </section>
        </section>
      </section>
    </form>
  );
};

export default DownloadGenerate;
