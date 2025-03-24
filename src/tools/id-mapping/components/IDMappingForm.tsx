import '../../styles/ToolsForm.scss';

import cn from 'classnames';
import {
  ExternalLink,
  Loader,
  LongNumber,
  Message,
  PageIntro,
  SpinnerIcon,
  TreeSelect,
} from 'franklin-sites';
import { FormEvent, useEffect, useMemo, useReducer, useRef } from 'react';
import { generatePath, Link, useHistory } from 'react-router-dom';
import { sleep } from 'timing-functions';

import { Location, LocationToPath } from '../../../app/config/urls';
import { addMessage } from '../../../messages/state/messagesActions';
import {
  MessageFormat,
  MessageLevel,
} from '../../../messages/types/messagesTypes';
import AutocompleteWrapper from '../../../query-builder/components/AutocompleteWrapper';
import HTMLHead from '../../../shared/components/HTMLHead';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import ftpUrls from '../../../shared/config/ftpUrls';
import { ID_MAPPING_LIMIT } from '../../../shared/config/limits';
import useDataApi from '../../../shared/hooks/useDataApi';
import { useReducedMotion } from '../../../shared/hooks/useMatchMedia';
import useMessagesDispatch from '../../../shared/hooks/useMessagesDispatch';
import useTextFileInput from '../../../shared/hooks/useTextFileInput';
import { namespaceAndToolsLabels } from '../../../shared/types/namespaces';
import { sendGtagEventJobSubmit } from '../../../shared/utils/gtagEvents';
import splitAndTidyText from '../../../shared/utils/splitAndTidyText';
import { dispatchJobs } from '../../../shared/workers/jobs/getSharedWorker';
import { createJob } from '../../../shared/workers/jobs/state/toolsActions';
import { JobTypes } from '../../types/toolsJobTypes';
import { truncateTaxonLabel } from '../../utils';
import defaultFormValues, {
  IDMappingFields,
  IDMappingFormValues,
} from '../config/idMappingFormData';
import {
  resetFormState,
  updateInputTextIDs,
  updateSelected,
  updateSending,
} from '../state/idMappingFormActions';
import {
  getIDMappingFormDataReducer,
  getIDMappingFormInitialState,
} from '../state/idMappingFormReducer';
import {
  IDMappingFormConfig,
  IDMappingGroupItem,
  IDMappingRule,
} from '../types/idMappingFormConfig';
import { FormParameters } from '../types/idMappingFormParameters';
import { getTreeData } from '../utils';

const title = namespaceAndToolsLabels[JobTypes.ID_MAPPING];

export type TreeDataNode = {
  label: string;
  id: string;
};

export type TreeData = Array<TreeDataNode & { items?: Array<TreeDataNode> }>;

export type DbNameToDbInfo = {
  [dbName: string]: IDMappingGroupItem;
};

export type RuleIdToRuleInfo = {
  [ruleID: number]: IDMappingRule;
};

type Props = {
  initialFormValues: Readonly<IDMappingFormValues>;
  formConfigData: IDMappingFormConfig;
};

const IDMappingForm = ({ initialFormValues, formConfigData }: Props) => {
  // refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  // hooks
  const dispatchMessages = useMessagesDispatch();
  const history = useHistory();
  const reducedMotion = useReducedMotion();

  const [{ formValues, textIDs, sending, submitDisabled }, dispatch] =
    useReducer(
      getIDMappingFormDataReducer(defaultFormValues),
      initialFormValues,
      getIDMappingFormInitialState
    );

  useEffect(() => {
    dispatch(resetFormState(initialFormValues));
  }, [initialFormValues]);

  const [dbNameToDbInfo, ruleIdToRuleInfo]: [
    DbNameToDbInfo | undefined | null,
    RuleIdToRuleInfo | undefined | null,
  ] = useMemo(() => {
    const dbNameToDbInfo = Object.fromEntries(
      formConfigData.groups.flatMap(({ items }) =>
        items.map((item) => [item.name, item])
      )
    );
    const ruleIdToRuleInfo = Object.fromEntries(
      formConfigData.rules.map((rule) => [rule.ruleId, rule])
    );
    return [dbNameToDbInfo, ruleIdToRuleInfo];
  }, [formConfigData]);

  const parsedIDs = useMemo(
    () => Array.from(new Set(splitAndTidyText(textIDs))),
    [textIDs]
  );

  const geneWithoutTaxonWarning = Boolean(
    parsedIDs.length &&
      formValues['From Database'].selected === 'Gene_Name' &&
      !formValues.Taxons.selected
  );

  const submitIDMappingJob = (event: FormEvent | MouseEvent) => {
    event.preventDefault();

    if (!parsedIDs.length || !dbNameToDbInfo || !ruleIdToRuleInfo) {
      return;
    }

    dispatch(updateSending());

    const fromDbInfo =
      dbNameToDbInfo[formValues[IDMappingFields.fromDb].selected as string];
    const ruleInfo = fromDbInfo?.ruleId && ruleIdToRuleInfo[fromDbInfo.ruleId];

    // here we should just transform input values into FormParameters,
    // transformation of FormParameters into ServerParameters happens in the
    // tools middleware
    const parameters: FormParameters = {
      from: formValues[IDMappingFields.fromDb].selected as string,
      to: formValues[IDMappingFields.toDb].selected as string,
      ids: parsedIDs,
    };

    if (
      (ruleInfo as IDMappingRule)?.taxonId &&
      formValues[IDMappingFields.taxons].selected
    ) {
      parameters.taxId = formValues[IDMappingFields.taxons]
        .selected as SelectedTaxon;
    }

    // navigate to the dashboard, not immediately, to give the impression that
    // something is happening
    sleep(1000).then(() => {
      history.push(LocationToPath[Location.Dashboard], {
        parameters: [parameters],
      });

      // We emit an action containing only the parameters and the type of job
      // the reducer will be in charge of generating a proper job object for
      // internal state. Dispatching after history.push so that pop-up messages (as a
      // side-effect of createJob) cannot mount immediately before navigating away.
      dispatchJobs(
        createJob(
          parameters,
          JobTypes.ID_MAPPING,
          formValues[IDMappingFields.name].selected as string
        )
      );
      sendGtagEventJobSubmit(JobTypes.ID_MAPPING, {
        fromDB: parameters.from,
        toDB: parameters.to,
      });
    });
  };

  const handleReset = (event: FormEvent) => {
    event.preventDefault();

    // reset all form state to defaults
    dispatch(resetFormState());
  };

  const handleTaxonFormValue = (path: string, id?: string) => {
    const label = truncateTaxonLabel(path);

    dispatch(
      updateSelected(IDMappingFields.taxons, id ? { id, label } : undefined)
    );
  };

  useTextFileInput({
    inputRef: fileInputRef,
    onFileContent: (content) => dispatch(updateInputTextIDs(content)),
    onError: (error) =>
      dispatchMessages(
        addMessage({
          content: error.message,
          format: MessageFormat.POP_UP,
          level: MessageLevel.FAILURE,
        })
      ),
    dndOverlay: <span>Drop your input file anywhere on this page</span>,
  });

  const fromDbInfo =
    dbNameToDbInfo?.[formValues[IDMappingFields.fromDb].selected as string];
  const toDbInfo =
    dbNameToDbInfo?.[formValues[IDMappingFields.toDb].selected as string];
  const ruleInfo = fromDbInfo?.ruleId && ruleIdToRuleInfo?.[fromDbInfo.ruleId];
  const fromTreeData =
    ruleIdToRuleInfo && getTreeData(formConfigData.groups, ruleIdToRuleInfo);
  const toTreeData =
    ruleIdToRuleInfo &&
    fromDbInfo?.ruleId &&
    getTreeData(formConfigData.groups, ruleIdToRuleInfo, fromDbInfo.ruleId);

  if (
    !fromTreeData ||
    !toTreeData ||
    !dbNameToDbInfo ||
    !ruleIdToRuleInfo ||
    !ruleInfo ||
    !toDbInfo ||
    !fromDbInfo
  ) {
    return (
      <Message level="failure">
        <small>Something went wrong, please try reloading the page</small>
      </Message>
    );
  }

  return (
    <>
      <HTMLHead title={title} />
      <PageIntro heading={title} />
      <form
        onSubmit={submitIDMappingJob}
        onReset={handleReset}
        aria-label="ID mapping job submission form"
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
              <br />
              This service can also be used{' '}
              <Link
                to={generatePath(LocationToPath[Location.HelpEntry], {
                  accession: 'id_mapping',
                })}
              >
                programmatically
              </Link>
              . Alternatively, the{' '}
              <ExternalLink url={ftpUrls.idmapping} noIcon>
                underlying data
              </ExternalLink>
              &nbsp;can be downloaded.
            </legend>
            <textarea
              name={defaultFormValues[IDMappingFields.ids].fieldName}
              autoComplete="off"
              spellCheck="false"
              placeholder="P31946 P62258 ALBU_HUMAN EFTU_ECOLI"
              className="tools-form-raw-text-input"
              value={textIDs}
              onChange={(event) => {
                dispatch(updateInputTextIDs(event.target.value));
              }}
              data-hj-allow
            />
            {parsedIDs.length > 0 && (
              <Message
                level={parsedIDs.length > ID_MAPPING_LIMIT ? 'failure' : 'info'}
              >
                <small>
                  Your input contains{' '}
                  <LongNumber>{parsedIDs.length}</LongNumber> unique
                  {pluralise(' ID', parsedIDs.length)}
                  {parsedIDs.length > ID_MAPPING_LIMIT && (
                    <>
                      . Only up to <LongNumber>{ID_MAPPING_LIMIT}</LongNumber>{' '}
                      supported
                    </>
                  )}
                </small>
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
                  dispatch(updateSelected(IDMappingFields.fromDb, id));
                  const ruleId = dbNameToDbInfo[id]?.ruleId;
                  let nextToDb = formValues[IDMappingFields.toDb].selected;
                  if (ruleId) {
                    const newRuleInfo = ruleIdToRuleInfo[ruleId];
                    const newTos = newRuleInfo.tos;
                    // If old "to" is in the new rule's too don't update otherwise select defaultTo
                    if (
                      newTos.length > 0 &&
                      !newTos.includes(
                        formValues[IDMappingFields.toDb].selected as string
                      )
                    ) {
                      nextToDb = newRuleInfo.defaultTo;
                    }
                  }
                  dispatch(updateSelected(IDMappingFields.toDb, nextToDb));
                  dispatch(updateInputTextIDs(textIDs)); // Update the name based on the DB selection
                }}
                label={fromDbInfo.displayName}
                defaultActiveNodes={[
                  defaultFormValues[IDMappingFields.fromDb].selected as string,
                ]}
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
                  dispatch(updateSelected(IDMappingFields.toDb, id));
                  dispatch(updateInputTextIDs(textIDs)); // Update the name based on the DB selection
                }}
                label={toDbInfo.displayName}
                defaultActiveNodes={[
                  defaultFormValues[IDMappingFields.toDb].selected as string,
                ]}
              />
            </section>
            {ruleInfo.taxonId && (
              <section className="tools-form-section__item tools-form-section__item--taxon-select">
                <AutocompleteWrapper
                  placeholder="Enter organism name or ID"
                  url={apiUrls.suggester.organism}
                  onSelect={handleTaxonFormValue}
                  title="Restrict by organism"
                  value={
                    (
                      formValues[IDMappingFields.taxons]
                        .selected as SelectedTaxon
                    )?.label
                  }
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
                    width: `${
                      (formValues[IDMappingFields.name].selected as string)
                        .length + 2
                    }ch`,
                  }}
                  placeholder="my job title"
                  value={formValues[IDMappingFields.name].selected as string}
                  onFocus={(event) => {
                    if (!formValues[IDMappingFields.name].userSelected) {
                      event.target.select();
                    }
                  }}
                  onChange={(event) => {
                    dispatch(
                      updateSelected(IDMappingFields.name, event.target.value)
                    );
                  }}
                  data-hj-allow
                />
              </label>
            </section>
          </section>
          {geneWithoutTaxonWarning && (
            <Message level="warning">
              <small>
                You are about to submit a list of gene names without organism
                restriction. Are you sure you do not want to specify an
                organism?
                <br />
                Gene name mappings against all organisms can produce extremely
                long lists of UniProtKB entries and may even cause the mapping
                service to fail.
              </small>
            </Message>
          )}
          <section
            className={cn(
              'tools-form-section',
              geneWithoutTaxonWarning && 'tools-form-warning-submit',
              !geneWithoutTaxonWarning && sticky['sticky-bottom-right']
            )}
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
    </>
  );
};

const IDMappingFormWithProvider = () => {
  const { loading, progress, data, error } = useDataApi<IDMappingFormConfig>(
    apiUrls.configure.idMappingFields
  );

  if (loading) {
    return <Loader progress={progress} />;
  }

  if (error || !data) {
    return (
      <Message level="failure">
        <small>{error?.message}</small>
      </Message>
    );
  }

  return (
    <InitialFormParametersProvider defaultFormValues={defaultFormValues}>
      {(initialFormValues) => (
        <IDMappingForm
          initialFormValues={initialFormValues}
          formConfigData={data}
        />
      )}
    </InitialFormParametersProvider>
  );
};

export default IDMappingFormWithProvider;
