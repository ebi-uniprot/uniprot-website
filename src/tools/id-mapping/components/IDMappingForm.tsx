import { useRef, FormEvent, useState, useMemo } from 'react';
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

import '../../../shared/styles/sticky.scss';
import '../../styles/ToolsForm.scss';
import idMappingFormStyle from './style/id-mapping-form.module.scss';

type TreeDataNode = {
  label: string;
  id: string;
};

type TreeData = Array<TreeDataNode & { items?: Array<TreeDataNode> }>;

const getTreeData = memoize(
  (
    dbs: IDMappingField[],
    ruleIdToRuleInfo: { [k: number]: IDMappingRule },
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
  (_dbs, _ruleIdToRuleInfo, rule?: number) => rule ?? 0
);

const reWhitespace = /\s+/;

const IDMappingForm = () => {
  const { name, links, info } = infoMappings[JobTypes.ID_MAPPING];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [textIDs, setTextIDs] = useState<string>(
    defaultFormValues[IDMappingFields.ids].selected
  );
  const [ids, setIDs] = useState<string[]>([]);
  const [fromDb, setFromDb] = useState<string>(
    defaultFormValues[IDMappingFields.fromDb].selected
  );
  const [toDb, setToDb] = useState<string>(
    defaultFormValues[IDMappingFields.toDb].selected
  );
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [sending, setSending] = useState(false);
  const reducedMotion = useReducedMotion();

  const dispatch = useDispatch();

  const submitIDMappingJob = (event: FormEvent | MouseEvent) => {
    event.preventDefault();
  };

  const handleIDTextChange = (text: string) => {
    setTextIDs(text);
    setIDs(text.split(reWhitespace).filter(Boolean));
  };

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
    (
      | {
          [k: string]: IDMappingField;
        }
      | undefined
      | null
    ),
    (
      | {
          [k: number]: IDMappingRule;
        }
      | undefined
      | null
    )
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

  let treeData;
  if (data && ruleIdToRuleInfo) {
    treeData = getTreeData(data.fields, ruleIdToRuleInfo);
  }
  console.log(getTreeData.cache);
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
        {loading || !treeData || !dbNameToDbInfo ? (
          <Loader />
        ) : (
          <fieldset>
            <section className="tools-form-section">
              <section className="tools-form-section__item">
                <label>From database</label>
                <TreeSelect
                  data={treeData}
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
                  data={treeData}
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
