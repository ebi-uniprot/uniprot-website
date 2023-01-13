import {
  useRef,
  FormEvent,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import { useHistory } from 'react-router-dom';
import {
  PageIntro,
  Message,
  TreeSelect,
  SpinnerIcon,
  Loader,
  LongNumber,
} from 'franklin-sites';
import { sleep } from 'timing-functions';
import cn from 'classnames';

import HTMLHead from '../../../shared/components/HTMLHead';
import AutocompleteWrapper from '../../../query-builder/components/AutocompleteWrapper';
import InitialFormParametersProvider from '../../components/InitialFormParametersProvider';

import { pluralise } from '../../../shared/utils/utils';

import { useReducedMotion } from '../../../shared/hooks/useMatchMedia';
import useTextFileInput from '../../../shared/hooks/useTextFileInput';
import { useToolsDispatch } from '../../../shared/contexts/Tools';
import { useMessagesDispatch } from '../../../shared/contexts/Messages';
import useDataApi from '../../../shared/hooks/useDataApi';

import { addMessage } from '../../../messages/state/messagesActions';
import { createJob } from '../../state/toolsActions';

import { getTreeData } from '../utils';
import { truncateTaxonLabel } from '../../utils';
import splitAndTidyText from '../../../shared/utils/splitAndTidyText';

import { namespaceAndToolsLabels } from '../../../shared/types/namespaces';
import apiUrls from '../../../shared/config/apiUrls';
import defaultFormValues, {
  IDMappingFields,
  IDMappingFormValue,
  IDMappingFormValues,
} from '../config/idMappingFormData';
import { LocationToPath, Location } from '../../../app/config/urls';

import { JobTypes } from '../../types/toolsJobTypes';
import {
  MessageFormat,
  MessageLevel,
} from '../../../messages/types/messagesTypes';
import {
  IDMappingFormConfig,
  IDMappingRule,
  IDMappingGroupItem,
} from '../types/idMappingFormConfig';
import { FormParameters } from '../types/idMappingFormParameters';
import { SelectedTaxon } from '../../types/toolsFormData';

import sticky from '../../../shared/styles/sticky.module.scss';
import '../../styles/ToolsForm.scss';

const ID_MAPPING_LIMIT = 100_000;
const isInvalid = (ids: IDMappingFormValue['selected']) =>
  !Array.isArray(ids) || !ids.length || ids.length > ID_MAPPING_LIMIT;

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

  // actual form fields
  // Text of IDs from textarea
  const [textIDs, setTextIDs] = useState<string>(
    (initialFormValues[IDMappingFields.ids]?.selected as string[])?.join('\n')
  );
  const [fromDb, setFromDb] = useState(
    initialFormValues[IDMappingFields.fromDb] as IDMappingFormValue
  );
  const [toDb, setToDb] = useState(
    initialFormValues[IDMappingFields.toDb] as IDMappingFormValue
  );
  const [taxID, setTaxID] = useState(
    initialFormValues[IDMappingFields.taxons] as IDMappingFormValue
  );

  // extra job-related fields
  const [jobName, setJobName] = useState(
    initialFormValues[IDMappingFields.name]
  );

  const [dbNameToDbInfo, ruleIdToRuleInfo]: [
    DbNameToDbInfo | undefined | null,
    RuleIdToRuleInfo | undefined | null
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

  const submitIDMappingJob = useCallback(
    (event: FormEvent | MouseEvent) => {
      event.preventDefault();

      if (!parsedIDs.length || !dbNameToDbInfo || !ruleIdToRuleInfo) {
        return;
      }

      setSubmitDisabled(true);
      setSending(true);

      const fromDbInfo = dbNameToDbInfo[fromDb.selected as string];
      const ruleInfo =
        fromDbInfo?.ruleId && ruleIdToRuleInfo[fromDbInfo.ruleId];

      // here we should just transform input values into FormParameters,
      // transformation of FormParameters into ServerParameters happens in the
      // tools middleware
      const parameters: FormParameters = {
        from: fromDb.selected as string,
        to: toDb.selected as string,
        ids: parsedIDs,
      };

      if ((ruleInfo as IDMappingRule)?.taxonId && taxID.selected) {
        parameters.taxId = taxID.selected as SelectedTaxon;
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
        dispatchTools(
          createJob(parameters, JobTypes.ID_MAPPING, jobName.selected as string)
        );
      });
    },
    // NOTE: maybe no point using useCallback if all the values of the form
    // cause this to be re-created. Maybe review submit callback in all 4 forms?
    [
      dbNameToDbInfo,
      dispatchTools,
      fromDb.selected,
      history,
      parsedIDs,
      jobName.selected,
      ruleIdToRuleInfo,
      taxID.selected,
      toDb.selected,
    ]
  );

  const firstParsedID = parsedIDs[0];
  useEffect(() => {
    if (jobNameEdited) {
      return;
    }
    if (parsedIDs.length > 0) {
      const potentialJobName = `${firstParsedID}${
        parsedIDs.length > 1 ? ` +${parsedIDs.length - 1}` : ''
      } ${fromDb.selected} → ${toDb.selected}`;
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
  }, [fromDb, firstParsedID, parsedIDs.length, jobNameEdited, toDb]);

  const handleReset = (event: FormEvent) => {
    event.preventDefault();

    // reset all form state to defaults
    const defaultIDs = defaultFormValues[IDMappingFields.ids]
      .selected as string[];
    setTextIDs(defaultIDs.join('\n'));
    setFromDb(defaultFormValues[IDMappingFields.fromDb]);
    setToDb(defaultFormValues[IDMappingFields.toDb]);
    setJobName(defaultFormValues[IDMappingFields.name]);
    setTaxID(defaultFormValues[IDMappingFields.taxons]);
  };

  const handleTaxonFormValue = (path: string, id?: string) => {
    // Only proceed if a node is selected
    if (!id) {
      return;
    }

    const label = truncateTaxonLabel(path);

    setTaxID({
      ...taxID,
      selected: { id, label },
    });
  };

  useEffect(() => setSubmitDisabled(isInvalid(parsedIDs)), [parsedIDs]);

  useTextFileInput({
    inputRef: fileInputRef,
    onFileContent: setTextIDs,
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

  const fromDbInfo = dbNameToDbInfo?.[fromDb.selected as string];
  const toDbInfo = dbNameToDbInfo?.[toDb.selected as string];
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
        Something went wrong, please try reloading the page
      </Message>
    );
  }

  return (
    <>
      <HTMLHead title={title} />
      <PageIntro title={title} />
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
    apiUrls.idMappingFields
  );

  if (loading) {
    return <Loader progress={progress} />;
  }

  if (error || !data) {
    return <Message level="failure">{error?.message}</Message>;
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
