import {
  FC,
  useState,
  useCallback,
  FormEvent,
  MouseEvent,
  useRef,
  Dispatch,
  SetStateAction,
  useReducer,
} from 'react';
import {
  Chip,
  SequenceSubmission,
  PageIntro,
  SpinnerIcon,
  sequenceProcessor,
} from 'franklin-sites';
import { useHistory } from 'react-router-dom';
import { sleep } from 'timing-functions';
import cn from 'classnames';
import { SequenceObject } from 'franklin-sites/dist/types/sequence-utils/sequence-processor';

import HTMLHead from '../../../shared/components/HTMLHead';
import AutocompleteWrapper from '../../../query-builder/components/AutocompleteWrapper';
import SequenceSearchLoader, {
  SequenceSearchLoaderInterface,
} from '../../components/SequenceSearchLoader';
import InitialFormParametersProvider from '../../components/InitialFormParametersProvider';

import { addMessage } from '../../../messages/state/messagesActions';
import {
  getBlastFormDataInit,
  getBlastFormDataReducer,
} from '../state/blastFormReducer';

import { useReducedMotion } from '../../../shared/hooks/useMatchMedia';
import useTextFileInput from '../../../shared/hooks/useTextFileInput';
import { useToolsDispatch } from '../../../shared/contexts/Tools';
import { useMessagesDispatch } from '../../../shared/contexts/Messages';

import { truncateTaxonLabel } from '../../utils';
import { createJob } from '../../state/toolsActions';
import { updateFormState } from '../state/blastFormActions';

import { JobTypes } from '../../types/toolsJobTypes';
import { FormParameters } from '../types/blastFormParameters';
import {
  SType,
  Sequence,
  Matrix,
  GapAlign,
  Database,
  Exp,
  Filter,
  Scores,
  HSPs,
} from '../types/blastServerParameters';

import { LocationToPath, Location } from '../../../app/config/urls';
import defaultFormValues, {
  BlastFormValues,
  BlastFormValue,
  BlastFields,
  excludeTaxonForDB,
} from '../config/BlastFormData';
import uniProtKBApiUrls from '../../../shared/config/apiUrls';
import { namespaceAndToolsLabels } from '../../../shared/types/namespaces';
import {
  MessageFormat,
  MessageLevel,
} from '../../../messages/types/messagesTypes';
import { SelectedTaxon } from '../../types/toolsFormData';

import sticky from '../../../shared/styles/sticky.module.scss';
import '../../styles/ToolsForm.scss';

export const BLAST_LIMIT = 20;

const title = namespaceAndToolsLabels[JobTypes.BLAST];

// https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3848038/
export const getAutoMatrixFor = (
  sequence?: string
): FormParameters['matrix'] => {
  if (!sequence?.length) {
    return 'BLOSUM62';
  }
  if (sequence.length <= 34) {
    return 'PAM30';
  }
  if (sequence.length <= 49) {
    return 'PAM70';
  }
  if (sequence.length <= 85) {
    return 'BLOSUM80';
  }
  return 'BLOSUM62';
};

const FormSelect: FC<{
  formValue: BlastFormValue;
  updateFormValue: Dispatch<SetStateAction<BlastFormValue>>;
}> = ({ formValue, updateFormValue }) => {
  if (!formValue) {
    return null;
  }
  const label = BlastFields[formValue.fieldName as keyof typeof BlastFields];
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

type Props = {
  initialFormValues: Readonly<BlastFormValues>;
};

const BlastForm = ({ initialFormValues }: Props) => {
  // refs
  const sslRef = useRef<SequenceSearchLoaderInterface>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // hooks
  const dispatchTools = useToolsDispatch();
  const dispatchMessages = useMessagesDispatch();
  const history = useHistory();
  const reducedMotion = useReducedMotion();

  const [state, dispatch] = useReducer(
    getBlastFormDataReducer(getBlastFormDataInit(defaultFormValues)),
    getBlastFormDataInit(defaultFormValues)
  );

  // used when the form is about to be submitted to the server
  const [sending, setSending] = useState(false);
  // flag to see if a title has been set (either user, or predefined)
  const [jobNameEdited, setJobNameEdited] = useState(
    // default to true if it's been set through the history state
    Boolean(initialFormValues[BlastFields.name].selected)
  );

  // actual form fields
  const excludeTaxonField = excludeTaxonForDB(
    state[BlastFields.database].selected
  );
  // TODO: to eventually incorporate negativeTaxIDs into the form

  const [gapped, setGapped] = useState(
    initialFormValues[BlastFields.gapped] as BlastFormValues[BlastFields.gapped]
  );
  const [hits, setHits] = useState(
    initialFormValues[BlastFields.hits] as BlastFormValues[BlastFields.hits]
  );
  const [hsps, setHsps] = useState(
    initialFormValues[BlastFields.hsps] as BlastFormValues[BlastFields.hsps]
  );

  console.log(state);

  // extra job-related fields
  const [jobName, setJobName] = useState(
    initialFormValues[BlastFields.name] as BlastFormValues[BlastFields.name]
  );

  // taxon field handlers
  const updateTaxonFormValue = (path: string, id?: string) => {
    // Only proceed if a node is selected
    if (!id) {
      return;
    }

    const selected = state[BlastFields.taxons].selected as SelectedTaxon[];

    // If already there, don't add again
    if (selected.some((taxon: SelectedTaxon) => taxon.id === id)) {
      return;
    }

    const label = truncateTaxonLabel(path);
    dispatch(updateFormState(BlastFields.taxons, [{ id, label }, ...selected]));
  };

  const removeTaxonFormValue = (id: string | number) => {
    const selected = state[BlastFields.taxons].selected as SelectedTaxon[];
    dispatch(
      updateFormState(BlastFields.taxons, {
        selected: selected.filter((taxon: SelectedTaxon) => taxon.id !== id),
      })
    );
  };

  // form event handlers
  const handleReset = (event: FormEvent) => {
    event.preventDefault();

    // reset all form state to defaults
    dispatch({ type: 'reset' });
    setGapped(defaultFormValues[BlastFields.gapped]);
    setHits(defaultFormValues[BlastFields.hits]);
    setHsps(defaultFormValues[BlastFields.hsps]);

    setJobName(defaultFormValues[BlastFields.name]);

    // imperatively reset SequenceSearchLoader... 😷
    // eslint-disable-next-line no-unused-expressions
    sslRef.current?.reset();
  };

  // the only thing to do here would be to check the values and prevent
  // and prevent submission if there is any issue
  const submitBlastJob = (event: FormEvent | MouseEvent) => {
    event.preventDefault();

    if (!state[BlastFields.sequence].selected) {
      return;
    }

    dispatch(updateFormState('submitDisabled', true));
    setSending(true);

    // here we should just transform input values into FormParameters,
    // transformation of FormParameters into ServerParameters happens in the
    // tools middleware
    const parameters: FormParameters = {
      stype: state[BlastFields.stype].selected as SType,
      program: state[BlastFields.program].selected as FormParameters['program'],
      sequence: state[BlastFields.sequence].selected as Sequence,
      database: state[BlastFields.database].selected as Database,
      taxIDs: excludeTaxonField
        ? []
        : (state[BlastFields.taxons].selected as SelectedTaxon[]),
      negativeTaxIDs: excludeTaxonField
        ? []
        : (state[BlastFields.excludedtaxons].selected as SelectedTaxon[]),
      threshold: state[BlastFields.threshold].selected as Exp,
      // remove "auto", and transform into corresponding matrix
      matrix:
        state[BlastFields.matrix].selected === 'auto'
          ? getAutoMatrixFor(state.parsedSequences[0]?.sequence)
          : (state[BlastFields.matrix].selected as Matrix),
      filter: state[BlastFields.filter].selected as Filter,
      gapped: gapped.selected as GapAlign,
      // transform string into number
      hits: parseInt(hits.selected as string, 10) as Scores,
      hsps: (parseInt(hsps.selected as string, 10) || undefined) as HSPs,
    };

    const multipleParameters = state.parsedSequences.map((parsedSequence) => ({
      ...parameters,
      sequence: parsedSequence.raw as Sequence,
    }));

    // navigate to the dashboard, not immediately, to give the impression that
    // something is happening
    sleep(1000).then(async () => {
      // We emit an action containing only the parameters and the type of job
      // the reducer will be in charge of generating a proper job object for
      // internal state. Dispatching after history.push so that pop-up messages (as a
      // side-effect of createJob) cannot mount immediately before navigating away.
      for (let i = 0; i < state.parsedSequences.length; i += 1) {
        // take extracted name by default
        let { name = '' } = state.parsedSequences[i];
        if (jobNameEdited) {
          // if one was submitted by user, and we only have one sequence, use it
          if (state.parsedSequences.length === 1) {
            name = jobName.selected as string;
          } else {
            // if we have more sequences, append a counter
            name = `${jobName.selected as string} - ${i + 1}`;
          }
        }
        dispatchTools(createJob(multipleParameters[i], JobTypes.BLAST, name));
        // Ensure there's a bit of wait between creating the jobs in order to
        // have different creation times and have consistent ordering.
        // eslint-disable-next-line no-await-in-loop
        await sleep(0);
      }

      history.push(LocationToPath[Location.Dashboard], {
        parameters: multipleParameters,
      });
    });
  };

  // effects
  const onSequenceChange = useCallback(
    (parsedSequences: SequenceObject[]) => {
      const rawSequence = parsedSequences
        .map((parsedSequence) => parsedSequence.raw)
        .join('\n');

      if (rawSequence === state[BlastFields.sequence]?.selected) {
        return;
      }

      if (!jobNameEdited) {
        // if the user didn't manually change the title, autofill it
        setJobName((jobName) => {
          const potentialJobName = parsedSequences[0]?.name || '';
          if (jobName.selected === potentialJobName) {
            // avoid unecessary rerender by keeping the same object
            return jobName;
          }
          return { ...jobName, selected: potentialJobName };
        });
      }
      dispatch(updateFormState('parsedSequences', parsedSequences));
      dispatch(updateFormState(BlastFields.sequence, rawSequence));
    },
    [jobNameEdited, state]
  );

  // file handling
  useTextFileInput({
    inputRef: fileInputRef,
    onFileContent: (content) => onSequenceChange(sequenceProcessor(content)),
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
      <PageIntro title={title} />
      <form
        onSubmit={submitBlastJob}
        onReset={handleReset}
        aria-label="BLAST job submission form"
      >
        <fieldset>
          <section className="tools-form-section__item">
            <legend>
              Find a protein sequence to run BLAST sequence similarity search by
              UniProt ID (e.g. P05067 or A4_HUMAN or UPI0000000001).
            </legend>
            <div className="import-sequence-section">
              <SequenceSearchLoader ref={sslRef} onLoad={onSequenceChange} />
            </div>
          </section>
        </fieldset>
        <section className="text-block">
          <strong>OR</strong>
        </section>
        <fieldset>
          <section className="text-block">
            <legend>
              Enter one or more sequences ({BLAST_LIMIT} max). You may also
              <label className="tools-form-section__file-input">
                load from a text file
                <input type="file" ref={fileInputRef} />
              </label>
              .
            </legend>
            <SequenceSubmission
              placeholder="Protein or nucleotide sequence(s) in FASTA format."
              onChange={onSequenceChange}
              value={state.parsedSequences
                .map((sequence) => sequence.raw)
                .join('\n')}
            />
          </section>
          <section className="tools-form-section">
            <FormSelect
              formValue={state[BlastFields.database]}
              updateFormValue={(value) =>
                dispatch(updateFormState(BlastFields.database, value))
              }
            />
            <section
              className={cn(
                'tools-form-section__item',
                'tools-form-section__item--taxon-select',
                {
                  'tools-form-section__item--hidden': excludeTaxonField,
                }
              )}
            >
              <AutocompleteWrapper
                placeholder="Enter taxon names or IDs to include"
                url={uniProtKBApiUrls.taxonomySuggester}
                onSelect={updateTaxonFormValue}
                title="Restrict by taxonomy"
                clearOnSelect
              />
            </section>
            <section
              className={cn(
                'tools-form-section__item',
                'tools-form-section__item--selected-taxon',
                {
                  'tools-form-section__item--hidden': excludeTaxonField,
                }
              )}
            >
              {(
                (state[BlastFields.taxons]?.selected as SelectedTaxon[]) || []
              ).map(({ label, id }: SelectedTaxon) => (
                <div key={label}>
                  <Chip
                    onRemove={() => removeTaxonFormValue(id)}
                    className="secondary"
                  >
                    {label}
                  </Chip>
                </div>
              ))}
            </section>
          </section>
          <section className="tools-form-section">
            <section className="tools-form-section__item">
              <label>
                Name your BLAST job
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
                  onFocus={(event) => {
                    if (!jobNameEdited) {
                      event.target.select();
                    }
                  }}
                  onChange={(event) => {
                    setJobNameEdited(Boolean(event.target.value));
                    setJobName({ ...jobName, selected: event.target.value });
                  }}
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
              {[
                BlastFields.stype,
                BlastFields.program,
                BlastFields.threshold,
                BlastFields.matrix,
                BlastFields.filter,
                BlastFields.gapped,
                BlastFields.hits,
                BlastFields.hsps,
              ].map((stateItem) => (
                <FormSelect
                  key={(state[stateItem] as BlastFormValue).fieldName}
                  formValue={state[stateItem] as BlastFormValue}
                  updateFormValue={(value) =>
                    dispatch(updateFormState(stateItem, value))
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
                disabled={state.submitDisabled}
                onClick={submitBlastJob}
              >
                {state.parsedSequences.length <= 1
                  ? 'Run BLAST'
                  : `BLAST ${state.parsedSequences.length} sequences`}
              </button>
            </section>
          </section>
        </fieldset>
      </form>
    </>
  );
};

const BlastFormWithProvider = () => (
  <InitialFormParametersProvider defaultFormValues={defaultFormValues}>
    {(initialFormValues) => <BlastForm initialFormValues={initialFormValues} />}
  </InitialFormParametersProvider>
);

export default BlastFormWithProvider;
