import React, {
  useState,
  // useEffect,
  useCallback,
  FormEvent,
  MouseEvent,
  useMemo,
  // useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  SequenceSubmission,
  PageIntro,
  SpinnerIcon,
  // extractNameFromFASTAHeader,
} from 'franklin-sites';
import { useHistory } from 'react-router-dom';
import { sleep } from 'timing-functions';

import { JobTypes } from '../../types/toolsJobTypes';
import { FormParameters } from '../types/alignFormParameters';
import { ServerParameters } from '../types/alignServerParameters';

import { createJob } from '../../state/toolsActions';

import { LocationToPath, Location } from '../../../app/config/urls';
import defaultFormValues, {
  AlignFormValues,
  AlignFormValue,
  AlignFields,
} from '../config/AlignFormData';
import infoMappings from '../../../shared/config/InfoMappings';

import '../../styles/ToolsForm.scss';

interface CustomLocationState {
  parameters?: Partial<FormParameters>;
}

const AlignForm = () => {
  // // refs
  // const sslRef = useRef<{ reset: () => void }>(null);

  // hooks
  const dispatch = useDispatch();
  const history = useHistory();

  // state
  const initialFormValues = useMemo(() => {
    // NOTE: we should use a similar logic to pre-fill fields based on querystring
    const parametersFromHistoryState = (history.location
      ?.state as CustomLocationState)?.parameters;
    if (parametersFromHistoryState) {
      // if we get here, we got parameters passed with the location update to
      // use as pre-filled fields
      // yes, I'm doing that in one go to avoid having typescript complain about
      // the object not being of the right shape even though I want to construct
      // it in multiple steps 🙄
      return Object.freeze(
        Object.fromEntries(
          Object.entries(defaultFormValues as AlignFormValues).map(
            ([key, field]) => [
              key,
              Object.freeze({
                ...field,
                selected:
                  parametersFromHistoryState[
                    field.fieldName as keyof FormParameters
                  ] || field.selected,
              }) as Readonly<AlignFormValue>,
            ]
          )
        )
      ) as Readonly<AlignFormValues>;
    }
    // otherwise, pass the default values
    return defaultFormValues;
  }, [history]);

  // used when the form submission needs to be disabled
  const [submitDisabled, setSubmitDisabled] = useState(false);
  // used when the form is about to be submitted to the server
  const [sending, setSending] = useState(false);

  const [sequence, setSequence] = useState<
    AlignFormValues[AlignFields.sequence]
  >(initialFormValues[AlignFields.sequence]);
  const [jobName, setJobName] = useState(initialFormValues[AlignFields.name]);

  // form event handlers
  const handleReset = (event: FormEvent) => {
    event.preventDefault();

    // reset all form state to defaults
    setSequence(defaultFormValues[AlignFields.sequence]);
    setJobName(defaultFormValues[AlignFields.name]);
  };

  // the only thing to do here would be to check the values and prevent
  // and prevent submission if there is any issue
  const submitAlignJob = (event: FormEvent | MouseEvent) => {
    event.preventDefault();

    if (!sequence) {
      return;
    }

    setSubmitDisabled(true);
    setSending(true);

    // here we should just transform input values into FormParameters,
    // transformation of FormParameters into ServerParameters happens in the
    // tools middleware
    const parameters: FormParameters = {
      sequence: sequence.selected as ServerParameters['sequence'],
    };

    // navigate to the dashboard, not immediately, to give the impression that
    // something is happening
    sleep(1000).then(() => {
      history.push(LocationToPath[Location.Dashboard], { parameters });
      // We emit an action containing only the parameters and the type of job
      // the reducer will be in charge of generating a proper job object for
      // internal state. Dispatching after history.push so that pop-up messages (as a
      // side-effect of createJob) cannot mount immediately before navigating away.
      dispatch(
        createJob(parameters, JobTypes.ALIGN, jobName.selected as string)
      );
    });
  };

  const { name, links, info } = infoMappings[JobTypes.ALIGN];

  // const currentSequence = formValues[BlastFields.sequence].selected;
  const onSequenceChange = useCallback(
    (e) => {
      if (e.sequence === sequence.selected) {
        return;
      }

      setJobName({ ...jobName, selected: e.name || '' });
      setSequence({ ...sequence, selected: e.sequence });

      setSubmitDisabled(!e.valid);
    },
    [jobName, sequence]
  );

  return (
    <>
      <PageIntro title={name} links={links}>
        {info}
      </PageIntro>
      <form onSubmit={submitAlignJob} onReset={handleReset}>
        {/* <fieldset>
          <section className="tools-form-section__item">
            <legend>
              Find a protein to BLAST by UniProt ID{' '}
              <small>(e.g. P05067 or A4_HUMAN or UPI0000000001)</small>.
            </legend>
            <div className="import-sequence-section">
              <SequenceSearchLoader ref={sslRef} onLoad={onSequenceChange} />
            </div>
          </section>
        </fieldset> */}
        <section className="text-block">
          <strong>OR</strong>
        </section>
        <fieldset>
          <section className="text-block">
            <legend>
              Enter multiple protein or nucleotide sequences, separated by a
              FASTA header.
            </legend>
            <SequenceSubmission
              placeholder="MLPGLALLLL or AGTTTCCTCGGCAGCGGTAGGC"
              onChange={onSequenceChange}
              value={sequence.selected}
            />
          </section>
          <section className="tools-form-section__item">
            <label>
              Name your Align job
              <input
                name="title"
                type="text"
                autoComplete="off"
                maxLength={22}
                placeholder="my job title"
                value={jobName.selected as string}
                onChange={(e) =>
                  setJobName({ ...jobName, selected: e.target.value })
                }
              />
            </label>
          </section>
          <section className="tools-form-section tools-form-section__main_actions">
            <section className="button-group tools-form-section__buttons">
              <input className="button secondary" type="reset" />
              <button
                className="button primary"
                type="submit"
                disabled={submitDisabled}
                onClick={submitAlignJob}
              >
                {sending ? <SpinnerIcon /> : 'Run Align'}
              </button>
            </section>
          </section>
        </fieldset>
      </form>
    </>
  );
};

export default AlignForm;
