/* eslint-disable react/no-unused-prop-types */
import { ChangeEvent, useCallback, useReducer } from 'react';
import { Location as HistoryLocation } from 'history';
import { generatePath, Link, useLocation } from 'react-router-dom';
import { Button, DownloadIcon, LongNumber, Message } from 'franklin-sites';
import cn from 'classnames';

import ColumnSelect from '../column-select/ColumnSelect';
import DownloadPreview from './DownloadPreview';
import DownloadAPIURL from './DownloadAPIURL';
import ExternalLink from '../ExternalLink';
import AsyncDownloadForm from '../../../tools/async-download/components/AsyncDownloadForm';

import useColumnNames from '../../hooks/useColumnNames';
import useJobFromUrl from '../../hooks/useJobFromUrl';

import {
  DownloadSelectOptions,
  downloadReducer,
  getDownloadInitialState,
} from './downloadReducer';
import {
  updateSelectedFileFormat,
  updateSelectedColumns,
  updateDownloadSelect,
  updateCompressed,
  updateExtraContent,
  updateDisableForm,
} from './downloadActions';

import { getDownloadUrl } from '../../config/apiUrls';
import { Location, LocationToPath } from '../../../app/config/urls';
import {
  getColumnsNamespace,
  getDownloadCount,
  getDownloadOptions,
  getPreviewOptions,
  getFtpFilenamesAndUrls,
  getIsAsyncDownload,
  getRedirectToIDMapping,
  getExtraContent,
  getIsEmbeddings,
  getPreviewCount,
  isAsyncDownloadIdMapping,
  showColumnSelect,
} from './downloadUtils';

import { MAX_PEPTIDE_FACETS_OR_DOWNLOAD } from '../../config/limits';

import { FileFormat } from '../../types/resultsDownload';
import { Namespace } from '../../types/namespaces';
import {
  DownloadMethod,
  DownloadPanelFormCloseReason,
} from '../../utils/gtagEvents';
import { JobTypes } from '../../../tools/types/toolsJobTypes';
import { PublicServerParameters } from '../../../tools/types/toolsServerParameters';

import sticky from '../../styles/sticky.module.scss';
import styles from './styles/download.module.scss';
import helper from '../../styles/helper.module.scss';

export type DownloadProps<T extends JobTypes> = {
  query?: string;
  selectedEntries?: string[];
  selectedQuery?: string;
  totalNumberResults: number;
  numberSelectedEntries?: number;
  namespace: Namespace;
  onClose: (
    panelCloseReason: DownloadPanelFormCloseReason,
    downloadMethod?: DownloadMethod
  ) => void;
  accessions?: string[];
  base?: string;
  notCustomisable?: boolean;
  inBasketMini?: boolean;
  jobType?: T;
  inputParamsData?: PublicServerParameters[T];
};

const Download = (props: DownloadProps<JobTypes>) => {
  const {
    totalNumberResults,
    onClose,
    namespace,
    accessions,
    jobType,
    inputParamsData,
    notCustomisable,
  } = props;
  const job = useJobFromUrl();
  const columnsNamespace = getColumnsNamespace(props, job);
  const { columnNames } = useColumnNames({
    namespaceOverride: columnsNamespace,
  });
  const location: HistoryLocation<unknown> = useLocation();
  const [state, dispatch] = useReducer(
    downloadReducer,
    { props, job, selectedColumns: columnNames },
    getDownloadInitialState
  );

  const handleDownloadAllChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(updateDownloadSelect(e.target.name as DownloadSelectOptions));
  };
  const handleCompressedChange = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch(updateCompressed(e.target.value === 'true'));

  const handleDisableForm = useCallback((disableForm) => {
    dispatch(updateDisableForm(disableForm));
  }, []);

  // Variables derived from state, props, location and/or job
  const downloadCount = getDownloadCount(state, props);
  const downloadOptions = getDownloadOptions(state, props, location, job);
  const downloadUrl = getDownloadUrl(downloadOptions);
  const previewOptions = getPreviewOptions(state, props, location, job);
  const previewUrl = previewOptions && getDownloadUrl(previewOptions);
  const ftpFilenamesAndUrls = getFtpFilenamesAndUrls(
    state,
    props,
    location,
    job
  );
  const isEmbeddings = getIsEmbeddings(state);
  const isAsyncDownload = getIsAsyncDownload(state, props, location, job);
  const redirectToIDMapping = getRedirectToIDMapping(state, props, job);

  let extraContentNode: JSX.Element | null = null;
  switch (getExtraContent(state, props, location, job)) {
    case 'ftp': {
      const isMultipleFiles =
        (ftpFilenamesAndUrls || [])?.length > 1 ||
        (ftpFilenamesAndUrls?.length === 1 &&
          ftpFilenamesAndUrls[0].filename.endsWith('/'));
      extraContentNode = (
        <>
          <h4 data-article-id="downloads" className={styles['ftp-header']}>
            Download Available On FTP Server
          </h4>
          This download is available on the{' '}
          <Link
            to={generatePath(LocationToPath[Location.HelpEntry], {
              accession: 'downloads',
            })}
          >
            UniProt FTP server
          </Link>
          {` as a ${isMultipleFiles ? 'set of ' : 'single '} ${
            isEmbeddings ? '' : 'compressed'
          } file${
            isMultipleFiles
              ? 's which can be combined to obtain the full result set'
              : ''
          }`}
          :
          <ul className="no-bullet">
            {ftpFilenamesAndUrls?.map(({ url, filename }) => (
              <li className={styles['ftp-url']} key={url}>
                <ExternalLink
                  url={url || ''}
                  noIcon
                  onClick={() => onClose('download', 'ftp')}
                >
                  <DownloadIcon width="1em" />
                  {filename}
                </ExternalLink>
              </li>
            ))}
          </ul>
        </>
      );
      break;
    }
    case 'url':
      extraContentNode = (
        <DownloadAPIURL
          // Remove the download attribute as it's unnecessary for API access
          apiURL={downloadUrl.replace('download=true&', '')}
          onCopy={() => onClose('copy', 'api-url')}
          disableSearch={
            isEmbeddings ||
            redirectToIDMapping ||
            isAsyncDownloadIdMapping(state, props, job)
          }
          disableStream={isEmbeddings || redirectToIDMapping || isAsyncDownload}
        />
      );
      break;
    case 'generate':
      extraContentNode = (
        <AsyncDownloadForm
          downloadUrlOptions={downloadOptions}
          count={downloadCount}
          onClose={() => onClose('submit', 'async')}
          inputParamsData={inputParamsData}
          jobType={jobType}
          onDisableForm={handleDisableForm}
        />
      );
      break;
    case 'preview':
      extraContentNode = (
        <DownloadPreview
          previewUrl={previewUrl}
          previewFileFormat={previewOptions?.fileFormat}
        />
      );
      break;
    default:
      // No extra content needed
      break;
  }

  return (
    <>
      {notCustomisable ? (
        <div className={styles['not-selectable']}>
          Download <LongNumber>{totalNumberResults}</LongNumber> results
        </div>
      ) : (
        <>
          <label htmlFor="data-selection-false">
            <input
              id="data-selection-false"
              type="radio"
              name="selected"
              value="false"
              checked={state.downloadSelect === 'selected'}
              onChange={handleDownloadAllChange}
              disabled={
                state.nSelectedEntries === 0 ||
                redirectToIDMapping ||
                state.disableForm
              }
            />
            Download selected (<LongNumber>{state.nSelectedEntries}</LongNumber>
            )
          </label>
          <label htmlFor="data-selection-true">
            <input
              id="data-selection-true"
              type="radio"
              name="all"
              value="true"
              checked={state.downloadSelect === 'all'}
              onChange={handleDownloadAllChange}
              disabled={redirectToIDMapping || state.disableForm}
            />
            Download all (<LongNumber>{totalNumberResults}</LongNumber>)
          </label>
        </>
      )}
      <fieldset disabled={state.disableForm}>
        <label>
          Format
          <select
            id="file-format-select"
            data-testid="file-format-select"
            value={state.selectedFileFormat}
            onChange={(e) =>
              dispatch(updateSelectedFileFormat(e.target.value as FileFormat))
            }
            disabled={redirectToIDMapping}
          >
            {state.fileFormatOptions.map((format) => (
              <option value={format} key={format}>
                {format}
              </option>
            ))}
          </select>
        </label>
      </fieldset>
      {/* compressed not supported in UniSave */}
      {namespace !== Namespace.unisave && (
        <fieldset disabled={state.disableForm}>
          <legend data-article-id="compression">Compressed</legend>
          <label>
            <input
              aria-label="compressed"
              type="radio"
              name="compressed"
              value="true"
              checked={state.compressed}
              onChange={handleCompressedChange}
              disabled={redirectToIDMapping}
            />
            Yes
          </label>
          <label>
            <input
              aria-label="not compressed"
              type="radio"
              name="compressed"
              value="false"
              checked={!state.compressed}
              onChange={handleCompressedChange}
              disabled={redirectToIDMapping}
            />
            No
          </label>
        </fieldset>
      )}
      {/* Peptide search download for matches exceeding the threshold */}
      {redirectToIDMapping && (
        <Message level="warning">
          <small>
            To download peptide search results of more than{' '}
            <LongNumber>{MAX_PEPTIDE_FACETS_OR_DOWNLOAD}</LongNumber> matches,
            please use the{' '}
            <Link
              to={{
                pathname: LocationToPath[Location.IDMapping],
                state: {
                  parameters: {
                    ids: accessions,
                    name: `Peptide search matches`,
                  },
                },
              }}
            >
              ID Mapping
            </Link>{' '}
            service.
          </small>
        </Message>
      )}

      {showColumnSelect(state, props, job) && (
        <>
          <legend>Customize columns</legend>
          <ColumnSelect
            onChange={(columns) => dispatch(updateSelectedColumns(columns))}
            selectedColumns={state.selectedColumns}
            namespace={columnsNamespace}
          />
        </>
      )}
      <section
        className={cn(
          'button-group',
          'sliding-panel__button-row',
          sticky['sticky-bottom-right'],
          styles['action-buttons']
        )}
      >
        <Button
          variant="tertiary"
          onClick={() => dispatch(updateExtraContent('url'))}
          disabled={state.disableForm}
        >
          Generate URL for API
        </Button>
        <Button
          variant="tertiary"
          onClick={() => dispatch(updateExtraContent('preview'))}
          disabled={redirectToIDMapping || state.disableForm}
        >
          Preview {getPreviewCount(state, props, location, job)}
        </Button>
        <Button
          variant="secondary"
          onClick={() => onClose('cancel')}
          disabled={state.disableForm}
        >
          Cancel
        </Button>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href={
            isAsyncDownload || ftpFilenamesAndUrls ? undefined : downloadUrl
          }
          className={cn('button', 'primary', {
            [helper.disabled]: state.disableForm,
          })}
          title={
            isAsyncDownload
              ? 'Download with a File Generation job'
              : 'Download file'
          }
          target="_blank"
          rel="noreferrer"
          onClick={() => {
            if (ftpFilenamesAndUrls) {
              dispatch(updateExtraContent('ftp'));
            } else if (isAsyncDownload) {
              dispatch(updateExtraContent('generate'));
            } else {
              onClose('download', 'sync');
            }
          }}
        >
          Download
        </a>
      </section>
      <section>{extraContentNode}</section>
    </>
  );
};

export default Download;
