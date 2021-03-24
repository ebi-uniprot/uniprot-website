import { useRef, FormEvent, useState, ChangeEvent } from 'react';
import { PageIntro, Message } from 'franklin-sites';

import infoMappings from '../../../shared/config/InfoMappings';

import { JobTypes } from '../../types/toolsJobTypes';

import '../../styles/ToolsForm.scss';
import idMappingFormStyle from './style/id-mapping-form.module.scss';

const reWhitespace = /\s+/;

const IDMappingForm = () => {
  const { name, links, info } = infoMappings[JobTypes.ID_MAPPING];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [ids, setIDs] = useState<string[]>([]);

  const submitIDMappingJob = (event: FormEvent | MouseEvent) => {
    event.preventDefault();
  };

  const handleIDTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const text = event.target.value;
    setIDs(text.split(reWhitespace).filter(Boolean));
  };

  const handleReset = (event: FormEvent) => {
    event.preventDefault();
  };

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
              onChange={handleIDTextChange}
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
