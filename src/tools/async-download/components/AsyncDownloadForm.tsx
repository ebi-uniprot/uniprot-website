import { FormEvent, useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Message,
  TreeSelect,
  SpinnerIcon,
  Loader,
  LongNumber,
} from 'franklin-sites';
import { sleep } from 'timing-functions';
import cn from 'classnames';

import InitialFormParametersProvider from '../../components/InitialFormParametersProvider';

import { useReducedMotion } from '../../../shared/hooks/useMatchMedia';
import { useToolsDispatch } from '../../../shared/contexts/Tools';
import { useMessagesDispatch } from '../../../shared/contexts/Messages';

import { addMessage } from '../../../messages/state/messagesActions';
import { createJob } from '../../state/toolsActions';

import { namespaceAndToolsLabels } from '../../../shared/types/namespaces';
import apiUrls, { DownloadUrlOptions } from '../../../shared/config/apiUrls';
import defaultFormValues, {
  IDMappingFields,
  IDMappingFormValue,
  IDMappingFormValues,
} from '../config/asyncDownloadFormData';
import { LocationToPath, Location } from '../../../app/config/urls';

import { JobTypes } from '../../types/toolsJobTypes';
import {
  MessageFormat,
  MessageLevel,
} from '../../../messages/types/messagesTypes';
import { AsyncDownloadFormValues } from '../types/asyncDownloadFormParameters';
import { FormParameters } from '../types/idMappingFormParameters';
import { SelectedTaxon } from '../../types/toolsFormData';
import { FileFormat } from '../../../shared/types/resultsDownload';

import '../../styles/ToolsForm.scss';

const isExcel = (downloadOptions: DownloadUrlOptions) =>
  downloadOptions.fileFormat === FileFormat.excel;

const isUncompressed = (downloadOptions: DownloadUrlOptions) =>
  !downloadOptions.compressed;

type Props = {
  initialFormValues: Readonly<AsyncDownloadFormValues>;
};

const AsyncDownloadForm = ({ initialFormValues }: Props) => {
  // hooks
  const dispatchTools = useToolsDispatch();
  const dispatchMessages = useMessagesDispatch();
  const history = useHistory();
  const reducedMotion = useReducedMotion();

  // used when the form submission needs to be disabled
  const [submitDisabled, setSubmitDisabled] = useState(() =>
    // default ids value will tell us if submit should be disabled or not
    isInvalid(initialFormValues[IDMappingFields.ids].selected)
  );
  // used when the form is about to be submitted to the server
  const [sending, setSending] = useState(false);
  // flag to see if a title has been set (either user, or predefined)
  const [jobNameEdited, setJobNameEdited] = useState(
    // default to true if it's been set through the history state
    Boolean(initialFormValues[IDMappingFields.name].selected)
  );

  // extra job-related fields
  const [jobName, setJobName] = useState(
    initialFormValues[IDMappingFields.name]
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
            { ...downloadOptions, compressed: false, download: false },
            JobTypes.ASYNC_DOWNLOAD,
            jobName || new Date().toLocaleString()
          )
        );
      });
    },
    // NOTE: maybe no point using useCallback if all the values of the form
    // cause this to be re-created. Maybe review submit callback in all 4 forms?
    [history, dispatchTools, jobName]
  );

  useEffect(() => {
    if (jobNameEdited) {
      return;
    }
    if (parsedIDs.length > 0) {
      const potentialJobName = `${downloadOptions.namespace}-${count}`;
      setJobName((jobName) => {
        if (jobName.selected === potentialJobName) {
          // avoid unecessary rerender by keeping the same object
          return jobName;
        }
        return { ...jobName, selected: potentialJobName };
      });
    } else {
      setJobName((jobName) => ({ ...jobName, selected: '' }));
    }
  }, [jobNameEdited]);

  useEffect(() => {
    setSubmitDisabled(
      isExcel(downloadOptions) || isUncompressed(downloadOptions)
    );
  }, [downloadOptions]);

  return (
    <form
      onSubmit={submitAsyncDownloadJob}
      aria-label="Async download job submission form"
    >
      <fieldset>
        <section className="tools-form-section__item tools-form-section__item--full-width">
          <legend>
            Enter one of more IDs (<LongNumber>{ID_MAPPING_LIMIT}</LongNumber>{' '}
            max). You may also
            <label className="tools-form-section__file-input">
              load from a text file
              <input type="file" ref={fileInputRef} />
            </label>
            . Separate IDs by whitespace (space, tab, newline) or commas.
          </legend>
          <textarea
            name={defaultFormValues[IDMappingFields.ids].fieldName}
            autoComplete="off"
            spellCheck="false"
            placeholder="P31946 P62258 ALBU_HUMAN EFTU_ECOLI"
            className="tools-form-raw-text-input"
            value={textIDs}
            onChange={(event) => setTextIDs(event.target.value)}
            data-hj-allow
          />
          {parsedIDs.length > 0 && (
            <Message
              level={parsedIDs.length > ID_MAPPING_LIMIT ? 'failure' : 'info'}
            >
              Your input contains <LongNumber>{parsedIDs.length}</LongNumber>
              {pluralise(' ID', parsedIDs.length)}
              {parsedIDs.length > ID_MAPPING_LIMIT && (
                <>
                  . Only up to <LongNumber>{ID_MAPPING_LIMIT}</LongNumber>{' '}
                  supported
                </>
              )}
            </Message>
          )}
        </section>
      </fieldset>
      <fieldset>
        <section className="tools-form-section">
          <section className="tools-form-section__item">
            <label>From database</label>
            <TreeSelect
              data={fromTreeData}
              autocomplete
              autocompleteFilter
              autocompletePlaceholder="Search database name"
              onSelect={({ id }: TreeDataNode) => {
                setFromDb((fromDb) => ({ ...fromDb, selected: id }));
                setToDb((toDb) => {
                  const ruleId = dbNameToDbInfo[id]?.ruleId;
                  let nextToDb = toDb;
                  if (ruleId) {
                    const newRuleInfo = ruleIdToRuleInfo[ruleId];
                    const newTos = newRuleInfo.tos;
                    // If old "to" is in the new rule's too don't update otherwise select defaultTo
                    if (
                      newTos.length > 0 &&
                      !newTos.includes(toDb.selected as string)
                    ) {
                      nextToDb = {
                        ...toDb,
                        selected: newRuleInfo.defaultTo,
                      };
                    }
                  }
                  return nextToDb;
                });
              }}
              label={fromDbInfo.displayName}
              defaultActiveNodes={[fromDb.selected as string]}
            />
          </section>
          <section className="tools-form-section__item">
            <label>To database</label>
            <TreeSelect
              data={toTreeData}
              autocomplete
              autocompleteFilter
              autocompletePlaceholder="Search database name"
              onSelect={({ id }: TreeDataNode) => {
                setToDb((toDb) => ({ ...toDb, selected: id }));
              }}
              label={toDbInfo.displayName}
              defaultActiveNodes={[toDb.selected as string]}
            />
          </section>
          {ruleInfo.taxonId && (
            <section className="tools-form-section__item tools-form-section__item--taxon-select">
              <AutocompleteWrapper
                placeholder="Enter taxon name or ID"
                url={apiUrls.taxonomySuggester}
                onSelect={handleTaxonFormValue}
                title="Restrict by taxonomy"
                value={(taxID.selected as SelectedTaxon)?.label}
              />
            </section>
          )}
        </section>
        <section className="tools-form-section">
          <section className="tools-form-section__item">
            <label>
              Name your ID Mapping job
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
            {!sending && !reducedMotion && (
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
              onClick={submitIDMappingJob}
            >
              Map{' '}
              {parsedIDs.length ? (
                <LongNumber>{parsedIDs.length}</LongNumber>
              ) : null}
              {pluralise(' ID', parsedIDs.length)}
            </button>
          </section>
        </section>
      </fieldset>
    </form>
  );
};

export default AsyncDownloadForm;
