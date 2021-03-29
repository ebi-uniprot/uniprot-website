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
import { groupBy, memoize } from 'lodash-es';

import { sleep } from 'timing-functions';
import { useHistory } from 'react-router-dom';
import useDataApi from '../../../shared/hooks/useDataApi';
import useTextFileInput from '../../../shared/hooks/useTextFileInput';
import useReducedMotion from '../../../shared/hooks/useReducedMotion';

import infoMappings from '../../../shared/config/InfoMappings';
import apiUrls from '../../../shared/config/apiUrls';
import defaultFormValues, {
  IDMappingFields,
} from '../config/idMappingFormData';

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
import { LocationToPath, Location } from '../../../app/config/urls';
import { createJob } from '../../state/toolsActions';

type TreeDataNode = {
  label: string;
  id: string;
};

type TreeData = Array<TreeDataNode & { items?: Array<TreeDataNode> }>;

type DbNameToDbInfo = {
  [dbName: string]: IDMappingField;
};

type RuleIdToRuleInfo = {
  [k: number]: IDMappingRule;
};

// Memoize this as there could be lots of calls to this function as the user explores
// the various from-to combinations. Also, the rule is an ideal key for the memoize's WeakMap.
// Better to use memoize than react's useMemo as we are not concerned with dependency/arg diffs
// but having to reconstruct the tree data for the same rule.
const getTreeData = memoize(
  (
    dbs: IDMappingField[],
    ruleIdToRuleInfo: RuleIdToRuleInfo,
    rule?: number
  ) => {
    let tos: IDMappingRule['tos'];
    if (rule) {
      ({ tos } = ruleIdToRuleInfo[rule]);
    }
    const filteredDbs = dbs.filter(({ name, from, to }) =>
      tos ? tos.includes(name) && to : from
    );

    const groupNameToDbs = groupBy(filteredDbs, 'groupName');

    const treeData: TreeData = Object.entries(groupNameToDbs).map(
      ([groupName, groupDbs]) => ({
        label: groupName,
        id: groupName,
        items: groupDbs.map(({ displayName, name }) => ({
          label: displayName,
          id: name,
        })),
      })
    );
    return treeData;
  },
  // In the case tree data is being built for the "from" tree select no rule is passed
  // so let 0 be the memoize's WeakMap key for quick retrieval
  (_dbs, _ruleIdToRuleInfo, rule?: number) => rule ?? 0
);

const reWhitespace = /\s+/;

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
  const [fromDb, setFromDb] = useState<string>(
    defaultFormValues[IDMappingFields.fromDb].selected
  );
  const [toDb, setToDb] = useState<string>(
    defaultFormValues[IDMappingFields.toDb].selected
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
      from: fromDb,
      to: toDb,
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
    setIDs(text.split(reWhitespace).filter(Boolean));
  };

  useEffect(() => {
    if (!jobNameEdited && ids.length) {
      const potentialJobName = `${ids[0]}${
        ids.length > 1 ? ` +${ids.length - 1}` : ''
      } ${fromDb} → ${toDb}`;
      setJobName((jobName) => {
        if (jobName.selected === potentialJobName) {
          // avoid unecessary rerender by keeping the same object
          return jobName;
        }
        return { ...jobName, selected: potentialJobName };
      });
    }
  }, [fromDb, ids, jobNameEdited, toDb]);

  const handleReset = (event: FormEvent) => {
    event.preventDefault();
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
    getTreeData(data.fields, ruleIdToRuleInfo, dbNameToDbInfo[fromDb].ruleId);

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
        {loading || !fromTreeData || !toTreeData || !dbNameToDbInfo ? (
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
                  onSelect={(node: TreeDataNode) => {
                    setFromDb(node.id);
                  }}
                  label={dbNameToDbInfo?.[fromDb].displayName}
                  defaultActiveNodes={[fromDb]}
                />
              </section>
              <section className="tools-form-section__item">
                <label>To database</label>
                <TreeSelect
                  data={toTreeData}
                  autocomplete
                  autocompleteFilter
                  autocompletePlaceholder="Search database name"
                  onSelect={(node: TreeDataNode) => {
                    setToDb(node.id);
                  }}
                  label={dbNameToDbInfo?.[toDb].displayName}
                  defaultActiveNodes={[toDb]}
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
