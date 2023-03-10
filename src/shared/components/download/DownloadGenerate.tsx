import { Button, LongNumber } from 'franklin-sites';
import { useCallback, useEffect, useState } from 'react';

import { useMessagesDispatch } from '../../contexts/Messages';

import {
  copyFailureMessage,
  copySuccessMessage,
} from '../../../messages/state/messagesActions';

import { gtagFn } from '../../utils/logging';

import { Namespace } from '../../types/namespaces';
import { createJob } from '../../../tools/state/toolsActions';

import styles from './styles/download-generate.module.scss';
import { useToolsDispatch } from '../../contexts/Tools';
import { DownloadUrlOptions } from '../../config/apiUrls';
import { JobTypes } from '../../../tools/types/toolsJobTypes';

// NOTE: update as needed if backend limitations change!
export const DOWNLOAD_SIZE_LIMIT = 10_000_000 as const;

type Props = {
  downloadOptions: DownloadUrlOptions;
  onSubmit: () => void;
  onMount: () => void;
  count: number;
};

const DownloadGenerate = ({
  downloadOptions,
  onSubmit,
  onMount,
  count,
}: Props) => {
  useEffect(() => {
    onMount();
  }, [onMount]);
  const dispatchTools = useToolsDispatch();
  const [jobName, setJobName] = useState(
    `${downloadOptions.namespace}-${count}`
  );
  const disableSubmit = false;

  const handleSubmit = () => {
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
    onSubmit();
  };

  return (
    <form
      className={styles.generate}
      onSubmit={handleSubmit}
      aria-label="ID mapping job submission form"
    >
      <h4>Generate file</h4>
      Due to the number of results (<LongNumber>{count}</LongNumber>) in your
      search you can only download this by submitting a Generate File job.
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
      <section className="button-group">
        <Button
          variant="primary"
          className={styles['copy-button']}
          onClick={handleSubmit}
          disabled={disableSubmit}
          title={
            disableSubmit
              ? 'Download size is too big, please restrict your search'
              : undefined
          }
        >
          Generate File
        </Button>
      </section>
    </form>
  );
};

export default DownloadGenerate;
