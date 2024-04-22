import {
  FC,
  FormEvent,
  MouseEvent,
  useRef,
  useReducer,
  useEffect,
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

import HTMLHead from '../../../shared/components/HTMLHead';
import AutocompleteWrapper from '../../../query-builder/components/AutocompleteWrapper';
import SequenceSearchLoader, {
  SequenceSearchLoaderInterface,
} from '../../components/SequenceSearchLoader';
import InitialFormParametersProvider from '../../components/InitialFormParametersProvider';

import { addMessage } from '../../../messages/state/messagesActions';
import {
  getBlastFormInitialState,
  getBlastFormDataReducer,
} from '../state/blastFormReducer';

import { useReducedMotion } from '../../../shared/hooks/useMatchMedia';
import useTextFileInput from '../../../shared/hooks/useTextFileInput';
import useToolsDispatch from '../../../shared/hooks/useToolsDispatch';
import useMessagesDispatch from '../../../shared/hooks/useMessagesDispatch';

import { truncateTaxonLabel } from '../../utils';
import { createJob } from '../../state/toolsActions';
import {
  resetFormState,
  updateParsedSequences,
  updateSelected,
  updateSending,
} from '../state/blastFormActions';
import { getAutoMatrixFor } from '../utils';
import { sendGtagEventJobSubmit } from '../../../shared/utils/gtagEvents';

import { BLAST_LIMIT } from '../../../shared/config/limits';

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
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import { namespaceAndToolsLabels } from '../../../shared/types/namespaces';
import {
  MessageFormat,
  MessageLevel,
} from '../../../messages/types/messagesTypes';
import { SelectedTaxon } from '../../types/toolsFormData';

import sticky from '../../../shared/styles/sticky.module.scss';
import '../../styles/ToolsForm.scss';

const title = namespaceAndToolsLabels[JobTypes.BLAST];

const FormSelect: FC<{
  formValue: BlastFormValue;
  updateFormValue: (selected: BlastFormValue['selected']) => void;
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

  const [{ parsedSequences, formValues, sending, submitDisabled }, dispatch] =
    useReducer(
      getBlastFormDataReducer(defaultFormValues),
      initialFormValues,
      getBlastFormInitialState
    );

  useEffect(() => {
    dispatch(resetFormState(initialFormValues));
  }, [initialFormValues]);

  // actual form fields
  const excludeTaxonField = excludeTaxonForDB(
    formValues[BlastFields.database].selected
  );

  // TODO: eventually incorporate negativeTaxIDs into the form

  // taxon field handlers
  const updateTaxonFormValue = (path: string, id?: string) => {
    // Only proceed if a node is selected
    if (!id) {
      return;
    }

    const selected = (formValues[BlastFields.taxons].selected ||
      []) as SelectedTaxon[];

    // If already there, don't add again
    if (selected.some((taxon: SelectedTaxon) => taxon.id === id)) {
      return;
    }

    const label = truncateTaxonLabel(path);
    dispatch(updateSelected(BlastFields.taxons, [{ id, label }, ...selected]));
  };

  const removeTaxonFormValue = (id: string | number) => {
    const selected = (formValues[BlastFields.taxons].selected ||
      []) as SelectedTaxon[];
    dispatch(
      updateSelected(
        BlastFields.taxons,
        selected.filter((taxon: SelectedTaxon) => taxon.id !== id)
      )
    );
  };

  // form event handlers
  const handleReset = (event: FormEvent) => {
    event.preventDefault();

    // reset all form state to defaults
    dispatch(resetFormState());

    // imperatively reset SequenceSearchLoader... 😷
    // eslint-disable-next-line no-unused-expressions
    sslRef.current?.reset();
  };

  // the only thing to do here would be to check the values and prevent
  // and prevent submission if there is any issue
  const submitBlastJob = (event: FormEvent | MouseEvent) => {
    event.preventDefault();

    if (!formValues[BlastFields.sequence].selected) {
      return;
    }

    dispatch(updateSending());

    // here we should just transform input values into FormParameters,
    // transformation of FormParameters into ServerParameters happens in the
    // tools middleware
    const parameters: FormParameters = {
      stype: formValues[BlastFields.stype].selected as SType,
      program: formValues[BlastFields.program]
        .selected as FormParameters['program'],
      sequence: formValues[BlastFields.sequence].selected as Sequence,
      database: formValues[BlastFields.database].selected as Database,
      taxIDs: excludeTaxonField
        ? []
        : (formValues[BlastFields.taxons].selected as SelectedTaxon[]),
      negativeTaxIDs: excludeTaxonField
        ? []
        : (formValues[BlastFields.excludedtaxons].selected as SelectedTaxon[]),
      threshold: formValues[BlastFields.threshold].selected as Exp,
      // remove "auto", and transform into corresponding matrix
      matrix:
        formValues[BlastFields.matrix].selected === 'auto'
          ? getAutoMatrixFor(parsedSequences[0]?.sequence)
          : (formValues[BlastFields.matrix].selected as Matrix),
      filter: formValues[BlastFields.filter].selected as Filter,
      gapped: formValues[BlastFields.gapped].selected as GapAlign,
      // transform string into number
      hits: parseInt(
        formValues[BlastFields.hits].selected as string,
        10
      ) as Scores,
      hsps:
        formValues[BlastFields.hsps].selected === 'All'
          ? undefined
          : (parseInt(
              formValues[BlastFields.hsps].selected as string,
              10
            ) as HSPs),
    };

    const multipleParameters = parsedSequences.map((parsedSequence) => ({
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
      for (let i = 0; i < parsedSequences.length; i += 1) {
        // take extracted name by default
        let { name = '' } = parsedSequences[i];
        if (formValues[BlastFields.name].userSelected) {
          // if one was submitted by user, and we only have one sequence, use it
          if (parsedSequences.length === 1) {
            name = formValues[BlastFields.name].selected as string;
          } else {
            // if we have more sequences, append a counter
            name = `${formValues[BlastFields.name].selected as string} - ${
              i + 1
            }`;
          }
        }
        dispatchTools(
          createJob(
            multipleParameters[i],
            JobTypes.BLAST,
            name,
            parsedSequences.length > 1 ||
              formValues[BlastFields.database].selected === 'uniparc'
          )
        );
        sendGtagEventJobSubmit(JobTypes.BLAST, { target: parameters.database });
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
      <PageIntro translate="no" title={title} />
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
              <SequenceSearchLoader
                ref={sslRef}
                onLoad={(s) => dispatch(updateParsedSequences(s))}
              />
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
              onChange={(s) => dispatch(updateParsedSequences(s))}
              value={parsedSequences.map((sequence) => sequence.raw).join('\n')}
            />
          </section>
          <section className="tools-form-section">
            <FormSelect
              formValue={formValues[BlastFields.database]}
              updateFormValue={(value) =>
                dispatch(updateSelected(BlastFields.database, value))
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
                url={apiUrls.suggester.taxonomy}
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
                (formValues[BlastFields.taxons]?.selected as SelectedTaxon[]) ||
                []
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
                Name your <span translate="no">BLAST</span> job
                <input
                  name="title"
                  type="text"
                  autoComplete="off"
                  maxLength={100}
                  style={{
                    width: `${
                      (formValues[BlastFields.name].selected as string).length +
                      2
                    }ch`,
                  }}
                  placeholder={'"my job title"'}
                  value={formValues[BlastFields.name].selected as string}
                  onFocus={(event) => {
                    if (!formValues[BlastFields.name].userSelected) {
                      event.target.select();
                    }
                  }}
                  onChange={(event) =>
                    dispatch(
                      updateSelected(BlastFields.name, event.target.value)
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
                  key={(formValues[stateItem] as BlastFormValue).fieldName}
                  formValue={formValues[stateItem] as BlastFormValue}
                  updateFormValue={(value: BlastFormValue['selected']) =>
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
                onClick={submitBlastJob}
              >
                {parsedSequences.length <= 1 ? (
                  <>
                    Run <span translate="no">BLAST</span>
                  </>
                ) : (
                  <>
                    <span translate="no">BLAST</span>
                    {` ${parsedSequences.length} sequences`}
                  </>
                )}
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
