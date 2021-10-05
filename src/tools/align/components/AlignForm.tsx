import {
  useState,
  useCallback,
  FormEvent,
  MouseEvent,
  useRef,
  FC,
  Dispatch,
  SetStateAction,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  SequenceSubmission,
  PageIntro,
  SpinnerIcon,
  sequenceProcessor,
  ExternalLink,
} from 'franklin-sites';
import { useHistory } from 'react-router-dom';
import { sleep } from 'timing-functions';
import { v1 } from 'uuid';
import cn from 'classnames';

import HTMLHead from '../../../shared/components/HTMLHead';
import SequenceSearchLoader, {
  ParsedSequence,
} from '../../components/SequenceSearchLoader';

import { pluralise } from '../../../shared/utils/utils';

import { addMessage } from '../../../messages/state/messagesActions';

import useReducedMotion from '../../../shared/hooks/useReducedMotion';
import useTextFileInput from '../../../shared/hooks/useTextFileInput';
import useInitialFormParameters from '../../hooks/useInitialFormParameters';

import { createJob } from '../../state/toolsActions';

import { JobTypes } from '../../types/toolsJobTypes';
import { FormParameters } from '../types/alignFormParameters';
import { ServerParameters } from '../types/alignServerParameters';

import { LocationToPath, Location } from '../../../app/config/urls';
import defaultFormValues, {
  AlignFormValues,
  AlignFormValue,
  AlignFields,
} from '../config/AlignFormData';
import { namespaceAndToolsLabels } from '../../../shared/types/namespaces';
import {
  MessageFormat,
  MessageLevel,
} from '../../../messages/types/messagesTypes';

import sticky from '../../../shared/styles/sticky.module.scss';
import '../../styles/ToolsForm.scss';

const ALIGN_LIMIT = 100;
const isInvalid = (parsedSequences: ParsedSequence[]) =>
  parsedSequences.length > ALIGN_LIMIT ||
  parsedSequences.some((parsedSequence) => !parsedSequence.valid) ||
  parsedSequences.length <= 1;

const title = namespaceAndToolsLabels[JobTypes.ALIGN];

const FormSelect: FC<{
  formValue: AlignFormValue;
  updateFormValue: Dispatch<SetStateAction<AlignFormValue>>;
}> = ({ formValue, updateFormValue }) => {
  if (!formValue) {
    return null;
  }
  const label = AlignFields[formValue.fieldName as keyof typeof AlignFields];
  return (
    <section className="tools-form-section__item">
      <label>
        {label}
        <select
          value={formValue.selected as string}
          onChange={(e) =>
            updateFormValue({ ...formValue, selected: e.target.value })
          }
        >
          {formValue.values &&
            formValue.values.map((optionItem) => (
              <option
                value={String(optionItem.value)}
                key={String(optionItem.value)}
                data-testid={`${label}-${optionItem.value}`}
              >
                {optionItem.label ? optionItem.label : optionItem.value}
              </option>
            ))}
        </select>
      </label>
    </section>
  );
};

const AlignForm = () => {
  // refs
  const sslRef = useRef<{ reset: () => void }>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // hooks
  const dispatch = useDispatch();
  const history = useHistory();
  const reducedMotion = useReducedMotion();

  // state
  const initialFormValues = useInitialFormParameters(defaultFormValues);

  // used when the form submission needs to be disabled
  const [submitDisabled, setSubmitDisabled] = useState(() =>
    // default sequence value will tell us if submit should be disabled or not
    isInvalid(
      sequenceProcessor(initialFormValues[AlignFields.sequence].selected)
    )
  );
  // used when the form is about to be submitted to the server
  const [sending, setSending] = useState(false);
  // flag to see if the user manually changed the title
  const [jobNameEdited, setJobNameEdited] = useState(false);
  // store parsed sequence objects
  const [parsedSequences, setParsedSequences] = useState<ParsedSequence[]>(
    sequenceProcessor(initialFormValues[AlignFields.sequence].selected)
  );

  // actual form fields
  const [sequence, setSequence] = useState(
    initialFormValues[
      AlignFields.sequence
    ] as AlignFormValues[AlignFields.sequence]
  );
  const [order, setOrder] = useState(
    initialFormValues[AlignFields.order] as AlignFormValues[AlignFields.order]
  );
  const [iterations, setIterations] = useState(
    initialFormValues[
      AlignFields.iterations
    ] as AlignFormValues[AlignFields.iterations]
  );

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
    (sslRef.current as unknown as { reset: () => void }).reset();
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
      order: order.selected as ServerParameters['order'],
      iterations: iterations.selected as ServerParameters['iterations'],
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
          potentialJobName = `${parsedSequences.length} ${pluralise(
            'sequence',
            parsedSequences.length
          )}`;
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
      setSubmitDisabled(isInvalid(parsedSequences));
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

  // file handling
  useTextFileInput({
    inputRef: fileInputRef,
    onFileContent: (content) => onSequenceChange(sequenceProcessor(content)),
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
      <HTMLHead title={title} />
      <PageIntro title={title} />
      <form
        onSubmit={submitAlignJob}
        onReset={handleReset}
        aria-label="Align job submission form"
      >
        <fieldset>
          <section className="tools-form-section__item">
            <legend>
              Find a protein sequence by UniProt ID (e.g. P05067 or A4_HUMAN or
              UPI0000000001) to align with the{' '}
              <ExternalLink url="http://www.clustal.org/">
                Clustal Omega program
              </ExternalLink>
              .
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
              FASTA header. You may also
              <label className="tools-form-section__file-input">
                load from a text file
                <input type="file" ref={fileInputRef} />
              </label>
              .
            </legend>
            <SequenceSubmission
              placeholder="Protein or nucleotide sequences in FASTA format."
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
                  maxLength={100}
                  style={{
                    width: `${(jobName.selected as string).length + 2}ch`,
                  }}
                  placeholder="my job title"
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
          <details className="tools-form-advanced" open>
            <summary>
              <span>Advanced parameters</span>
            </summary>
            <section className="tools-form-section">
              {[
                [order, setOrder],
                [iterations, setIterations],
              ].map(([stateItem, setStateItem]) => (
                <FormSelect
                  key={(stateItem as AlignFormValue).fieldName}
                  formValue={stateItem as AlignFormValue}
                  updateFormValue={
                    setStateItem as Dispatch<SetStateAction<AlignFormValue>>
                  }
                />
              ))}
            </section>
          </details>
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
                onClick={submitAlignJob}
              >
                {parsedSequences.length <= 2
                  ? 'Run Align'
                  : `Align ${parsedSequences.length} sequences`}
              </button>
            </section>
          </section>
        </fieldset>
      </form>
    </>
  );
};

export default AlignForm;
