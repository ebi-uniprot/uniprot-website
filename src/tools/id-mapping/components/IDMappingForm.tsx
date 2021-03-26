import { useRef, FormEvent, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { v1 } from 'uuid';
import {
  PageIntro,
  Message,
  TreeSelect,
  SpinnerIcon,
  Loader,
} from 'franklin-sites';
import { groupBy } from 'lodash-es';

import useDataApi from '../../../shared/hooks/useDataApi';
import useTextFileInput from '../../../shared/hooks/useTextFileInput';
import useReducedMotion from '../../../shared/hooks/useReducedMotion';

import infoMappings from '../../../shared/config/InfoMappings';
import apiUrls from '../../../shared/config/apiUrls';

import { JobTypes } from '../../types/toolsJobTypes';
import { addMessage } from '../../../messages/state/messagesActions';
import {
  MessageFormat,
  MessageLevel,
} from '../../../messages/types/messagesTypes';

import '../../../shared/styles/sticky.scss';
import '../../styles/ToolsForm.scss';
import idMappingFormStyle from './style/id-mapping-form.module.scss';

const reWhitespace = /\s+/;

const IDMappingForm = () => {
  const { name, links, info } = infoMappings[JobTypes.ID_MAPPING];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [textIDs, setTextIDs] = useState<string>('');
  const [ids, setIDs] = useState<string[]>([]);
  const [fromDb, setFromDb] = useState<string>('UniProtKB_AC-ID');
  const [toDb, setToDb] = useState<string>('UniRef90');
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

  const { loading, data, status, error } = useDataApi(apiUrls.idMappingFields);
  console.log(data);

  let treeData;
  let dbNameToInfo;
  if (data) {
    // group by groupName
    const groups = groupBy(data.fields, 'groupName');
    dbNameToInfo = Object.fromEntries(
      data.fields.map((item) => [item.name, item])
    );
    treeData = Object.entries(groups).map(([group, dbs]) => {
      // console.log(group);
      const items = dbs
        .map(
          ({ displayName, name, from }) =>
            from && {
              label: displayName,
              id: name,
            }
        )
        .filter(Boolean);
      return {
        label: group,
        id: group,
        items,
      };
    });
  }

  console.log(treeData);
  console.log(dbNameToInfo);
  console.log(dbNameToInfo?.[fromDb].displayName);

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
              . Separate IDs by whitespace (eg space, tab, newline characters).
            </legend>
            <textarea
              name="ids"
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
        {loading || !dbNameToInfo ? (
          <Loader />
        ) : (
          <fieldset>
            <section className="tools-form-section">
              <section className="tools-form-section__item">
                {treeData && (
                  <>
                    <label>From database</label>
                    <TreeSelect
                      data={treeData}
                      autocomplete
                      autocompleteFilter
                      autocompletePlaceholder="Search database name"
                      onSelect={({ id }) => {
                        setFromDb(id);
                      }}
                      label={dbNameToInfo?.[fromDb].displayName}
                      defaultActiveNodes={[fromDb]}
                    />
                  </>
                )}
              </section>
              <section className="tools-form-section__item">
                {treeData && (
                  <>
                    <label>To database</label>
                    <TreeSelect
                      data={treeData}
                      autocomplete
                      autocompleteFilter
                      autocompletePlaceholder="Search database name"
                      onSelect={({ id }) => {
                        setToDb(id);
                      }}
                      label={dbNameToInfo?.[toDb].displayName}
                      defaultActiveNodes={[toDb]}
                    />
                  </>
                )}
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
