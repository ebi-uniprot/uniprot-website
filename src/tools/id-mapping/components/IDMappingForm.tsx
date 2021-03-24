import { useRef, FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { v1 } from 'uuid';
import { PageIntro, Message } from 'franklin-sites';

import useTextFileInput from '../../../shared/hooks/useTextFileInput';

import infoMappings from '../../../shared/config/InfoMappings';

import { JobTypes } from '../../types/toolsJobTypes';
import { addMessage } from '../../../messages/state/messagesActions';
import {
  MessageFormat,
  MessageLevel,
} from '../../../messages/types/messagesTypes';

import '../../styles/ToolsForm.scss';
import idMappingFormStyle from './style/id-mapping-form.module.scss';

const reWhitespace = /\s+/;

const IDMappingForm = () => {
  const { name, links, info } = infoMappings[JobTypes.ID_MAPPING];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [textIDs, setTextIDs] = useState<string>('');
  const [ids, setIDs] = useState<string[]>([]);
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
              Enter your identifiers or
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
      </form>
    </>
  );
};

export default IDMappingForm;
