import { useRef, FormEvent, useState, useMemo, useEffect } from 'react';
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
import useDataApi from '../../../shared/hooks/useDataApi';
import useTextFileInput from '../../../shared/hooks/useTextFileInput';
import useReducedMotion from '../../../shared/hooks/useReducedMotion';

import { createJob } from '../../state/toolsActions';
import { parseIDs, getTreeData } from '../utils';

import infoMappings from '../../../shared/config/InfoMappings';
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
  IDMappingField,
} from '../types/idMappingFormConfig';
import { FormParameters } from '../types/idMappingFormParameters';

import '../../../shared/styles/sticky.scss';
import '../../styles/ToolsForm.scss';
import idMappingFormStyle from './style/id-mapping-form.module.scss';

export type TreeDataNode = {
  label: string;
  id: string;
};

export type TreeData = Array<TreeDataNode & { items?: Array<TreeDataNode> }>;

export type DbNameToDbInfo = {
  [dbName: string]: IDMappingField;
};

export type RuleIdToRuleInfo = {
  [k: number]: IDMappingRule;
};

const IDMappingForm = () => {
  // hooks
  const dispatch = useDispatch();
  const history = useHistory();
  const reducedMotion = useReducedMotion();

  // refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { name, links, info } = infoMappings[JobTypes.ID_MAPPING];
  // Text of IDs from textarea
  const [textIDs, setTextIDs] = useState<string>(
    defaultFormValues[IDMappingFields.ids].selected
  );
  // Parsed (by whitespace) IDs
  const [ids, setIDs] = useState<string[]>([]);
  const [fromDb, setFromDb] = useState<IDMappingFormValue>(
    defaultFormValues[IDMappingFields.fromDb]
  );
  const [toDb, setToDb] = useState<IDMappingFormValue>(
    defaultFormValues[IDMappingFields.toDb]
  );

  // extra job-related fields
  const [jobName, setJobName] = useState(
    defaultFormValues[IDMappingFields.name]
  );
  // flag to see if the user manually changed the title
  const [jobNameEdited, setJobNameEdited] = useState(false);

  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [sending, setSending] = useState(false);

  const submitIDMappingJob = (event: FormEvent | MouseEvent) => {
    event.preventDefault();

    if (!ids.length) {
      return;
    }

    setSubmitDisabled(true);
    setSending(true);

    // here we should just transform input values into FormParameters,
    // transformation of FormParameters into ServerParameters happens in the
    // tools middleware
    const parameters: FormParameters = {
      from: fromDb.selected,
      to: toDb.selected,
      ids,
    };

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
  };

  const handleIDTextChange = (text: string) => {
    setTextIDs(text);
    setIDs(parseIDs(text));
  };

  useEffect(() => {
    if (!jobNameEdited && ids.length > 0) {
      const potentialJobName = `${ids[0]}${
        ids.length > 1 ? ` +${ids.length - 1}` : ''
      } ${fromDb.selected} → ${toDb.selected}`;
      setJobName((jobName) => {
        if (jobName.selected === potentialJobName) {
          // avoid unecessary rerender by keeping the same object
          return jobName;
        }
        return { ...jobName, selected: potentialJobName };
      });
    }
  }, [fromDb, ids, jobNameEdited, toDb]);

  // useEffect(() => {
  //   toDb
  //   setToDb((toDb) => ({...toDb, selected: }))
  // },[fromDb])

  const handleReset = (event: FormEvent) => {
    event.preventDefault();

    // reset all form state to defaults
    setTextIDs(defaultFormValues[IDMappingFields.ids].selected);
    setIDs(parseIDs(defaultFormValues[IDMappingFields.ids].selected));
    setFromDb(defaultFormValues[IDMappingFields.fromDb]);
    setToDb(defaultFormValues[IDMappingFields.toDb]);
    setJobName(defaultFormValues[IDMappingFields.name]);
    setJobNameEdited(false);
  };

  useTextFileInput({
    input: fileInputRef.current,
    onFileContent: (content) => handleIDTextChange(content),
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
        data.fields.map((item) => [item.name, item])
      );
      ruleIdToRuleInfo = Object.fromEntries(
        data.rules.map((rule) => [rule.ruleId, rule])
      );
    }
    return [dbNameToDbInfo, ruleIdToRuleInfo];
  }, [data]);

  const fromTreeData =
    data && ruleIdToRuleInfo && getTreeData(data.fields, ruleIdToRuleInfo);
  const toTreeData =
    data &&
    ruleIdToRuleInfo &&
    dbNameToDbInfo &&
    getTreeData(
      data.fields,
      ruleIdToRuleInfo,
      dbNameToDbInfo[fromDb.selected].ruleId
    );

  if (error) {
    return <Message level="failure">{error?.message}</Message>;
  }

  return (
    <>
      <PageIntro title={name} links={links}>
        {info}
      </PageIntro>
      <form
        onSubmit={submitIDMappingJob}
        onReset={handleReset}
        aria-label="ID mapping job submission form"
      >
        <fieldset>
          <section className="tools-form-section__item">
            <legend>
              Enter your IDs or
              <label className="tools-form-section__file-input">
                load from a text file
                <input type="file" ref={fileInputRef} />
              </label>
              . Separate IDs by whitespace (space, tab, newline).
            </legend>
            <textarea
              name={defaultFormValues[IDMappingFields.ids].fieldName}
              autoComplete="false"
              spellCheck="false"
              placeholder="P31946 P62258 ALBU_HUMAN EFTU_ECOLI"
              className={idMappingFormStyle['id-text-input']}
              value={textIDs}
              onChange={(event) => {
                handleIDTextChange(event.target.value);
              }}
            />
            {ids.length > 0 && (
              <Message level="info">
                Your input contains {ids.length} ID
                {ids.length === 1 ? '' : 's'}
              </Message>
            )}
          </section>
        </fieldset>
        {loading ||
        !fromTreeData ||
        !toTreeData ||
        !dbNameToDbInfo ||
        !ruleIdToRuleInfo ? (
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
                      const toDbs = ruleIdToRuleInfo[dbNameToDbInfo[id].ruleId];
                      // If old "to" is in the new rule's too don't update otherwise select the first
                      // TODO: need the rule's initial choice as seen in https://www.uniprot.org/uploadlists/ either by selecting the first in "tos" or having an "initialTo" field
                      return toDbs.tos.includes(toDb.selected)
                        ? toDb
                        : { ...toDb, selected: toDbs.tos[0] };
                    });
                  }}
                  label={dbNameToDbInfo?.[fromDb.selected].displayName}
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
                  label={dbNameToDbInfo?.[toDb.selected].displayName}
                  defaultActiveNodes={[toDb.selected]}
                />
              </section>
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
                  {`Map ${ids.length ? `${ids.length} ` : ''} ID${
                    ids.length !== 1 ? 's' : ''
                  }`}
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
