import {
  useRef,
  FormEvent,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import { useDispatch } from 'react-redux';
import { v1 } from 'uuid';
import {
  PageIntro,
  Message,
  TreeSelect,
  SpinnerIcon,
  Loader,
} from 'franklin-sites';
import { sleep } from 'timing-functions';
import { useHistory } from 'react-router-dom';

import AutocompleteWrapper from '../../../query-builder/components/AutocompleteWrapper';

import { pluralise } from '../../../shared/utils/utils';

import useDataApi from '../../../shared/hooks/useDataApi';
import useTextFileInput from '../../../shared/hooks/useTextFileInput';
import useReducedMotion from '../../../shared/hooks/useReducedMotion';
import useInitialFormParameters from '../../hooks/useInitialFormParameters';

import { createJob } from '../../state/toolsActions';
import { getTreeData } from '../utils';
import { truncateTaxonLabel } from '../../utils';
import splitAndTidyText from '../../../shared/utils/splitAndTidyText';

import namespaceToolTitles from '../../../shared/config/namespaceToolTitles';
import apiUrls from '../../../shared/config/apiUrls';
import defaultFormValues, {
  IDMappingFields,
  IDMappingFormValue,
} from '../config/idMappingFormData';
import { LocationToPath, Location } from '../../../app/config/urls';

import { JobTypes } from '../../types/toolsJobTypes';
import { addMessage } from '../../../messages/state/messagesActions';
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

import '../../../shared/styles/sticky.scss';
import '../../styles/ToolsForm.scss';

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

const IDMappingForm = () => {
  // refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  // hooks
  const dispatch = useDispatch();
  const history = useHistory();
  const reducedMotion = useReducedMotion();

  const initialFormValues = useInitialFormParameters(defaultFormValues);

  // actual form fields
  const initialIDs = initialFormValues[IDMappingFields.ids]
    .selected as string[];
  // Text of IDs from textarea
  const [textIDs, setTextIDs] = useState<string>(initialIDs.join('\n'));
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
  // flag to see if the user manually changed the title
  const [jobNameEdited, setJobNameEdited] = useState(false);

  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [sending, setSending] = useState(false);

  const { loading, data, error } = useDataApi<IDMappingFormConfig>(
    apiUrls.idMappingFields
  );

  const [dbNameToDbInfo, ruleIdToRuleInfo]: [
    DbNameToDbInfo | undefined | null,
    RuleIdToRuleInfo | undefined | null
  ] = useMemo(() => {
    if (!data) {
      return [null, null];
    }
    let dbNameToDbInfo;
    let ruleIdToRuleInfo;
    if (data) {
      dbNameToDbInfo = Object.fromEntries(
        data.groups.flatMap(({ items }) =>
          items.map((item) => [item.name, item])
        )
      );
      ruleIdToRuleInfo = Object.fromEntries(
        data.rules.map((rule) => [rule.ruleId, rule])
      );
    }
    return [dbNameToDbInfo, ruleIdToRuleInfo];
  }, [data]);

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
        dispatch(
          createJob(parameters, JobTypes.ID_MAPPING, jobName.selected as string)
        );
      });
    },
    // NOTE: maybe no point using useCallback if all the values of the form
    // cause this to be re-created. Maybe review submit callback in all 4 forms?
    [
      dbNameToDbInfo,
      dispatch,
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

  useTextFileInput({
    inputRef: fileInputRef,
    onFileContent: setTextIDs,
    onError: (error) =>
      dispatch(
        addMessage({
          id: v1(),
          content: error.message,
          format: MessageFormat.POP_UP,
          level: MessageLevel.FAILURE,
        })
      ),
    dndOverlay: <span>Drop your input file anywhere on this page</span>,
  });

  const title = namespaceToolTitles[JobTypes.ID_MAPPING];

  const fromDbInfo = dbNameToDbInfo?.[fromDb.selected as string];
  const toDbInfo = dbNameToDbInfo?.[toDb.selected as string];
  const ruleInfo = fromDbInfo?.ruleId && ruleIdToRuleInfo?.[fromDbInfo.ruleId];
  const fromTreeData =
    data && ruleIdToRuleInfo && getTreeData(data?.groups, ruleIdToRuleInfo);
  const toTreeData =
    data &&
    ruleIdToRuleInfo &&
    fromDbInfo?.ruleId &&
    getTreeData(data?.groups, ruleIdToRuleInfo, fromDbInfo.ruleId);

  if (error) {
    return <Message level="failure">{error?.message}</Message>;
  }

  return (
    <>
      <PageIntro title={title} />
      <form
        onSubmit={submitIDMappingJob}
        onReset={handleReset}
        aria-label="ID mapping job submission form"
      >
        <fieldset>
          <section className="tools-form-section__item tools-form-section__item--full-width">
            <legend>
              Enter your IDs or
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
            />
            {parsedIDs.length > 0 && (
              <Message level="info">
                Your input contains {parsedIDs.length}{' '}
                {pluralise('ID', parsedIDs.length)}
              </Message>
            )}
          </section>
        </fieldset>
        {loading ||
        !fromTreeData ||
        !toTreeData ||
        !dbNameToDbInfo ||
        !ruleIdToRuleInfo ||
        !ruleInfo ||
        !toDbInfo ||
        !fromDbInfo ? (
          <Loader />
        ) : (
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
                  defaultActiveNodes={[fromDb.selected]}
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
                  defaultActiveNodes={[toDb.selected]}
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
                  />
                </label>
              </section>
            </section>
            <section className="tools-form-section sticky-bottom-right">
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
                  {`Map ${
                    parsedIDs.length ? `${parsedIDs.length} ` : ''
                  } ${pluralise('ID', parsedIDs.length)}`}
                </button>
              </section>
            </section>
          </fieldset>
        )}
      </form>
    </>
  );
};

export default IDMappingForm;
