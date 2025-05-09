import '../../styles/ToolsForm.scss';

import cn from 'classnames';
import {
  PageIntro,
  sequenceProcessor,
  SequenceSubmission,
  SpinnerIcon,
} from 'franklin-sites';
import { SequenceObject } from 'franklin-sites/dist/types/sequence-utils/sequence-processor'; // TODO: find a way to export this transparently from franklin
import {
  FC,
  FormEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { useHistory } from 'react-router-dom';
import { sleep } from 'timing-functions';

import { Location, LocationToPath } from '../../../app/config/urls';
import { addMessage } from '../../../messages/state/messagesActions';
import {
  MessageFormat,
  MessageLevel,
} from '../../../messages/types/messagesTypes';
import ExternalLink from '../../../shared/components/ExternalLink';
import HTMLHead from '../../../shared/components/HTMLHead';
import { ALIGN_LIMIT } from '../../../shared/config/limits';
import { useReducedMotion } from '../../../shared/hooks/useMatchMedia';
import useMessagesDispatch from '../../../shared/hooks/useMessagesDispatch';
import useTextFileInput from '../../../shared/hooks/useTextFileInput';
import sticky from '../../../shared/styles/sticky.module.scss';
import { namespaceAndToolsLabels } from '../../../shared/types/namespaces';
import { sendGtagEventJobSubmit } from '../../../shared/utils/gtagEvents';
import { dispatchJobs } from '../../../shared/workers/jobs/getJobSharedWorker';
import { createJob } from '../../../shared/workers/jobs/state/jobActions';
import InitialFormParametersProvider from '../../components/InitialFormParametersProvider';
import SequenceSearchLoader from '../../components/SequenceSearchLoader';
import { JobTypes } from '../../types/jobTypes';
import defaultFormValues, {
  AlignFields,
  AlignFormValue,
  AlignFormValues,
} from '../config/AlignFormData';
import {
  resetFormState,
  updateParsedSequences,
  updateSelected,
  updateSending,
} from '../state/alignFormActions';
import {
  getAlignFormDataReducer,
  getAlignFormInitialState,
} from '../state/alignFormReducer';
import { FormParameters } from '../types/alignFormParameters';
import { ServerParameters } from '../types/alignServerParameters';

const title = namespaceAndToolsLabels[JobTypes.ALIGN];

const FormSelect: FC<
  React.PropsWithChildren<{
    formValue: AlignFormValue;
    updateFormValue: (selected: AlignFormValue['selected']) => void;
  }>
> = ({ formValue, updateFormValue }) => {
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
          onChange={(e) => updateFormValue(e.target.value)}
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

type Props = {
  initialFormValues: Readonly<AlignFormValues>;
};

const AlignForm = ({ initialFormValues }: Props) => {
  // refs
  const sslRef = useRef<{ reset: () => void }>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // hooks
  const dispatchMessages = useMessagesDispatch();
  const history = useHistory();
  const reducedMotion = useReducedMotion();

  const [{ parsedSequences, formValues, sending, submitDisabled }, dispatch] =
    useReducer(
      getAlignFormDataReducer(defaultFormValues),
      initialFormValues,
      getAlignFormInitialState
    );

  useEffect(() => {
    dispatch(resetFormState(initialFormValues));
  }, [initialFormValues]);

  // form event handlers
  const handleReset = (event: FormEvent) => {
    event.preventDefault();

    // reset all form state to defaults
    dispatch(resetFormState());

    // imperatively reset SequenceSearchLoader... 😷

    (sslRef.current as unknown as { reset: () => void }).reset();
  };

  // the only thing to do here would be to check the values and prevent
  // and prevent submission if there is any issue
  const submitAlignJob = (event: FormEvent | MouseEvent) => {
    event.preventDefault();

    if (!formValues[AlignFields.sequence].selected) {
      return;
    }

    dispatch(updateSending());

    // here we should just transform input values into FormParameters,
    // transformation of FormParameters into ServerParameters happens in the
    // tools middleware
    const parameters: FormParameters = {
      sequence: formValues[AlignFields.sequence]
        .selected as ServerParameters['sequence'],
      order: formValues[AlignFields.order]
        .selected as ServerParameters['order'],
      iterations: formValues[AlignFields.iterations]
        .selected as ServerParameters['iterations'],
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
      dispatchJobs(
        createJob(
          parameters,
          JobTypes.ALIGN,
          formValues[AlignFields.name].selected as string
        )
      );
      sendGtagEventJobSubmit(JobTypes.ALIGN);
    });
  };

  // specific logic to prepend loaded sequences instead of just replacing
  const onSequenceLoad = useCallback(
    (parsedRetrievedSequences: SequenceObject[]) => {
      dispatch(
        updateParsedSequences([...parsedRetrievedSequences, ...parsedSequences])
      );
    },
    [parsedSequences]
  );

  // file handling
  useTextFileInput({
    inputRef: fileInputRef,
    onFileContent: (content) =>
      dispatch(updateParsedSequences(sequenceProcessor(content))),
    onError: (error) =>
      dispatchMessages(
        addMessage({
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
      <PageIntro
        heading={<span data-article-id="sequence-alignments">{title}</span>}
      />
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
              Enter multiple protein or nucleotide sequences ({ALIGN_LIMIT}{' '}
              max), separated by a FASTA header. You may also
              <label className="tools-form-section__file-input">
                load from a text file
                <input type="file" ref={fileInputRef} />
              </label>
              .
            </legend>
            <SequenceSubmission
              placeholder="Protein or nucleotide sequences in FASTA format."
              onChange={(s) => dispatch(updateParsedSequences(s))}
              value={parsedSequences.map((sequence) => sequence.raw).join('\n')}
              minimumSequences={2}
              maximumSequences={ALIGN_LIMIT}
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
                    width: `${
                      (formValues[AlignFields.name].selected as string).length +
                      2
                    }ch`,
                  }}
                  placeholder="my job title"
                  value={formValues[AlignFields.name].selected as string}
                  onFocus={(event) => {
                    if (!formValues[AlignFields.name].userSelected) {
                      event.target.select();
                    }
                  }}
                  onChange={(event) =>
                    dispatch(
                      updateSelected(AlignFields.name, event.target.value)
                    )
                  }
                  data-hj-allow
                />
              </label>
            </section>
          </section>
          <details className="tools-form-advanced" open>
            <summary>
              <span>Advanced parameters</span>
            </summary>
            <section className="tools-form-section">
              {[AlignFields.order, AlignFields.iterations].map((stateItem) => (
                <FormSelect
                  key={(formValues[stateItem] as AlignFormValue).fieldName}
                  formValue={formValues[stateItem] as AlignFormValue}
                  updateFormValue={(value: AlignFormValue['selected']) =>
                    dispatch(updateSelected(stateItem, value))
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

const AlignFormWithProvider = () => (
  <InitialFormParametersProvider defaultFormValues={defaultFormValues}>
    {(initialFormValues) => <AlignForm initialFormValues={initialFormValues} />}
  </InitialFormParametersProvider>
);

export default AlignFormWithProvider;
