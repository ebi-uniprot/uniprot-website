import React, {
  useState,
  useCallback,
  FormEvent,
  MouseEvent,
  useMemo,
  useRef,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  SequenceSubmission,
  PageIntro,
  SpinnerIcon,
  sequenceProcessor,
} from 'franklin-sites';
import { useHistory } from 'react-router-dom';
import { sleep } from 'timing-functions';

import SequenceSearchLoader, {
  ParsedSequence,
} from '../../components/SequenceSearchLoader';

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
  // refs
  const sslRef = useRef<{ reset: () => void }>(null);

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
      const formValues: Partial<AlignFormValues> = {};
      const defaultValuesEntries = Object.entries(defaultFormValues) as [
        AlignFields,
        AlignFormValue
      ][];
      // for every field of the form, get its value from the history state if
      // present, otherwise go for the default one
      for (const [key, field] of defaultValuesEntries) {
        formValues[key] = Object.freeze({
          ...field,
          selected:
            parametersFromHistoryState[
              field.fieldName as keyof FormParameters
            ] || field.selected,
        }) as Readonly<AlignFormValue>;
      }
      return Object.freeze(formValues) as Readonly<AlignFormValues>;
    }
    // otherwise, pass the default values
    return defaultFormValues;
  }, [history]);

  // used when the form submission needs to be disabled
  const [submitDisabled, setSubmitDisabled] = useState(false);
  // used when the form is about to be submitted to the server
  const [sending, setSending] = useState(false);
  // flag to see if the user manually changed the title
  const [jobNameEdited, setJobNameEdited] = useState(false);
  // store parsed sequence objects
  const [parsedSequences, setParsedSequences] = useState<ParsedSequence[]>(
    sequenceProcessor(initialFormValues[AlignFields.sequence].selected)
  );

  // actual form fields
  const [sequence, setSequence] = useState<
    AlignFormValues[AlignFields.sequence]
  >(initialFormValues[AlignFields.sequence]);

  // extra job-related fields
  const [jobName, setJobName] = useState(initialFormValues[AlignFields.name]);

  // form event handlers
  const handleReset = (event: FormEvent) => {
    event.preventDefault();

    // reset all form state to defaults
    setParsedSequences([]);

    setSequence(defaultFormValues[AlignFields.sequence]);

    setJobName(defaultFormValues[AlignFields.name]);

    // imperatively reset SequenceSearchLoader... 😷
    // eslint-disable-next-line no-unused-expressions
    ((sslRef.current as unknown) as { reset: () => void }).reset();
  };

  // the only thing to do here would be to check the values and prevent
  // and prevent submission if there is any issue
  const submitAlignJob = (event: FormEvent | MouseEvent) => {
    event.preventDefault();

    if (!sequence.selected) {
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
      history.push(LocationToPath[Location.Dashboard], {
        parameters: [parameters],
      });
      // We emit an action containing only the parameters and the type of job
      // the reducer will be in charge of generating a proper job object for
      // internal state. Dispatching after history.push so that pop-up messages (as a
      // side-effect of createJob) cannot mount immediately before navigating away.
      dispatch(
        createJob(parameters, JobTypes.ALIGN, jobName.selected as string)
      );
    });
  };

  const onSequenceChange = useCallback(
    (parsedSequences: ParsedSequence[]) => {
      if (!jobNameEdited) {
        // if the user didn't manually change the title, autofill it
        const firstName = parsedSequences.find((item) => item.name)?.name;
        let potentialJobName = '';
        if (firstName) {
          potentialJobName = firstName;
          if (parsedSequences.length > 1) {
            potentialJobName += ` +${parsedSequences.length - 1}`;
          }
        } else if (parsedSequences.length) {
          potentialJobName = `${parsedSequences.length} sequence${
            parsedSequences.length === 1 ? '' : 's'
          }`;
        }
        setJobName((jobName) => {
          if (jobName.selected === potentialJobName) {
            // avoid unecessary rerender by keeping the same object
            return jobName;
          }
          return { ...jobName, selected: potentialJobName };
        });
      }

      setParsedSequences(parsedSequences);
      setSequence((sequence) => ({
        ...sequence,
        selected: parsedSequences
          .map((parsedSequence) => parsedSequence.raw)
          .join('\n'),
      }));
      setSubmitDisabled(
        parsedSequences.some((parsedSequence) => !parsedSequence.valid) ||
          parsedSequences.length === 1
      );
    },
    [jobNameEdited]
  );

  // specific logic to prepend loaded sequences instead of just replacing
  const onSequenceLoad = useCallback(
    (parsedRetrievedSequences: ParsedSequence[]) => {
      onSequenceChange([...parsedRetrievedSequences, ...parsedSequences]);
    },
    [onSequenceChange, parsedSequences]
  );

  const { name, links, info } = infoMappings[JobTypes.ALIGN];

  let submitButtonContent: string | JSX.Element = 'Run Align';
  if (parsedSequences.length > 1) {
    submitButtonContent = `Align ${parsedSequences.length} sequences`;
  }
  if (sending) {
    submitButtonContent = <SpinnerIcon />;
  }

  return (
    <>
      <PageIntro title={name} links={links}>
        {info}
      </PageIntro>
      <form onSubmit={submitAlignJob} onReset={handleReset}>
        <fieldset>
          <section className="tools-form-section__item">
            <legend>
              Find proteins to Align by UniProt ID{' '}
              <small>(e.g. P05067 or A4_HUMAN or UPI0000000001)</small>.
              <br />
              You can also paste a list of IDs.
            </legend>
            <div className="import-sequence-section">
              <SequenceSearchLoader ref={sslRef} onLoad={onSequenceLoad} />
            </div>
          </section>
        </fieldset>
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
              value={parsedSequences.map((sequence) => sequence.raw).join('\n')}
            />
          </section>
          <section className="tools-form-section">
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
                  onChange={(event) => {
                    setJobNameEdited(Boolean(event.target.value));
                    setJobName({ ...jobName, selected: event.target.value });
                  }}
                />
              </label>
            </section>
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
                {submitButtonContent}
              </button>
            </section>
          </section>
        </fieldset>
      </form>
    </>
  );
};

export default AlignForm;
