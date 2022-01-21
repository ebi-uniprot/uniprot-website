import {
  FC,
  useState,
  useEffect,
  useCallback,
  FormEvent,
  MouseEvent,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  Chip,
  SequenceSubmission,
  PageIntro,
  SpinnerIcon,
  sequenceProcessor,
} from 'franklin-sites';
import { useHistory } from 'react-router-dom';
import { sleep } from 'timing-functions';
import { v1 } from 'uuid';
import cn from 'classnames';
import { SequenceObject } from 'franklin-sites/dist/types/sequence-utils/sequence-processor';

import HTMLHead from '../../../shared/components/HTMLHead';
import AutocompleteWrapper from '../../../query-builder/components/AutocompleteWrapper';
import SequenceSearchLoader, {
  SequenceSearchLoaderInterface,
} from '../../components/SequenceSearchLoader';
import InitialFormParametersProvider from '../../components/InitialFormParametersProvider';

import { addMessage } from '../../../messages/state/messagesActions';

import useReducedMotion from '../../../shared/hooks/useReducedMotion';
import useTextFileInput from '../../../shared/hooks/useTextFileInput';

import { truncateTaxonLabel } from '../../utils';
import { createJob } from '../../state/toolsActions';

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

const BLAST_LIMIT = 20;
const isInvalid = (parsedSequences: SequenceObject[]) =>
  !parsedSequences.length ||
  parsedSequences.length > BLAST_LIMIT ||
  parsedSequences.some((parsedSequence) => !parsedSequence.valid);

const title = namespaceAndToolsLabels[JobTypes.BLAST];

// https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3848038/
const getAutoMatrixFor = (sequence?: string): FormParameters['matrix'] => {
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
  const dispatch = useDispatch();
  const history = useHistory();
  const reducedMotion = useReducedMotion();

  // used when the form submission needs to be disabled
  const [submitDisabled, setSubmitDisabled] = useState(() =>
    // default sequence value will tell us if submit should be disabled or not
    isInvalid(
      sequenceProcessor(
        `${initialFormValues[BlastFields.sequence].selected || ''}`
      )
    )
  );
  // used when the form is about to be submitted to the server
  const [sending, setSending] = useState(false);
  // flag to see if the user manually changed the title
  const [jobNameEdited, setJobNameEdited] = useState(false);
  // store parsed sequence objects
  const [parsedSequences, setParsedSequences] = useState<SequenceObject[]>(
    sequenceProcessor(
      `${initialFormValues[BlastFields.sequence].selected || ''}`
    )
  );

  // actual form fields
  const [stype, setSType] = useState(
    initialFormValues[BlastFields.stype] as BlastFormValues[BlastFields.stype]
  );
  const [program, setProgram] = useState(
    initialFormValues[
      BlastFields.program
    ] as BlastFormValues[BlastFields.program]
  );
  const [sequence, setSequence] = useState(
    initialFormValues[
      BlastFields.sequence
    ] as BlastFormValues[BlastFields.sequence]
  );
  const [database, setDatabase] = useState(
    initialFormValues[
      BlastFields.database
    ] as BlastFormValues[BlastFields.database]
  );
  const excludeTaxonField = excludeTaxonForDB(database.selected);
  const [taxIDs, setTaxIDs] = useState(
    initialFormValues[BlastFields.taxons] as BlastFormValues[BlastFields.taxons]
  );
  // TODO: to eventually incorporate into the form
  const [negativeTaxIDs, setNegativeTaxIDs] = useState(
    initialFormValues[
      BlastFields.excludedtaxons
    ] as BlastFormValues[BlastFields.excludedtaxons]
  );
  const [threshold, setThreshold] = useState(
    initialFormValues[
      BlastFields.threshold
    ] as BlastFormValues[BlastFields.threshold]
  );
  const [matrix, setMatrix] = useState(
    initialFormValues[BlastFields.matrix] as BlastFormValues[BlastFields.matrix]
  );
  const [filter, setFilter] = useState(
    initialFormValues[BlastFields.filter] as BlastFormValues[BlastFields.filter]
  );
  const [gapped, setGapped] = useState(
    initialFormValues[BlastFields.gapped] as BlastFormValues[BlastFields.gapped]
  );
  const [hits, setHits] = useState(
    initialFormValues[BlastFields.hits] as BlastFormValues[BlastFields.hits]
  );
  const [hsps, setHsps] = useState(
    initialFormValues[BlastFields.hsps] as BlastFormValues[BlastFields.hsps]
  );

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

    const selected = (taxIDs.selected || []) as SelectedTaxon[];

    // If already there, don't add again
    if (selected.some((taxon: SelectedTaxon) => taxon.id === id)) {
      return;
    }

    const label = truncateTaxonLabel(path);

    setTaxIDs({
      ...taxIDs,
      selected: [{ id, label }, ...selected],
    });
  };

  const removeTaxonFormValue = (id: string | number) => {
    const selected = (taxIDs.selected || []) as SelectedTaxon[];
    setTaxIDs({
      ...taxIDs,
      selected: selected.filter((taxon: SelectedTaxon) => taxon.id !== id),
    });
  };

  // form event handlers
  const handleReset = (event: FormEvent) => {
    event.preventDefault();

    // reset all form state to defaults
    setParsedSequences([]);

    setSType(defaultFormValues[BlastFields.stype]);
    setProgram(defaultFormValues[BlastFields.program]);
    setSequence(defaultFormValues[BlastFields.sequence]);
    setDatabase(defaultFormValues[BlastFields.database]);
    setTaxIDs(defaultFormValues[BlastFields.taxons]);
    setNegativeTaxIDs(defaultFormValues[BlastFields.excludedtaxons]);
    setThreshold(defaultFormValues[BlastFields.threshold]);
    setMatrix(defaultFormValues[BlastFields.matrix]);
    setFilter(defaultFormValues[BlastFields.filter]);
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

    if (!sequence.selected) {
      return;
    }

    setSubmitDisabled(true);
    setSending(true);

    // here we should just transform input values into FormParameters,
    // transformation of FormParameters into ServerParameters happens in the
    // tools middleware
    const parameters: FormParameters = {
      stype: stype.selected as SType,
      program: program.selected as FormParameters['program'],
      sequence: sequence.selected as Sequence,
      database: database.selected as Database,
      taxIDs: excludeTaxonField ? [] : (taxIDs.selected as SelectedTaxon[]),
      negativeTaxIDs: excludeTaxonField
        ? []
        : (negativeTaxIDs.selected as SelectedTaxon[]),
      threshold: threshold.selected as Exp,
      // remove "auto", and transform into corresponding matrix
      matrix:
        matrix.selected === 'auto'
          ? getAutoMatrixFor(parsedSequences[0]?.sequence)
          : (matrix.selected as Matrix),
      filter: filter.selected as Filter,
      gapped: gapped.selected as GapAlign,
      // transform string into number
      hits: parseInt(hits.selected as string, 10) as Scores,
      hsps: (parseInt(hsps.selected as string, 10) || undefined) as HSPs,
    };

    const multipleParameters = parsedSequences.map((parsedSequence) => ({
      ...parameters,
      sequence: parsedSequence.raw as Sequence,
    }));

    // navigate to the dashboard, not immediately, to give the impression that
    // something is happening
    sleep(1000).then(() => {
      // We emit an action containing only the parameters and the type of job
      // the reducer will be in charge of generating a proper job object for
      // internal state. Dispatching after history.push so that pop-up messages (as a
      // side-effect of createJob) cannot mount immediately before navigating away.
      for (let i = 0; i < parsedSequences.length; i += 1) {
        // take extracted name by default
        let { name = '' } = parsedSequences[i];
        if (jobNameEdited) {
          // if one was submitted by user, and we only have one sequence, use it
          if (parsedSequences.length === 1) {
            name = jobName.selected as string;
          } else {
            // if we have more sequences, append a counter
            name = `${jobName.selected as string} - ${i + 1}`;
          }
        }
        dispatch(createJob(multipleParameters[i], JobTypes.BLAST, name));
      }

      history.push(LocationToPath[Location.Dashboard], {
        parameters: multipleParameters,
      });
    });
  };

  // effects
  // set the "Auto" matrix to the have the correct label depending on sequence
  useEffect(() => {
    const autoMatrix = getAutoMatrixFor(parsedSequences[0]?.sequence);
    setMatrix((matrix) => ({
      ...matrix,
      values: [
        { label: `Auto - ${autoMatrix}`, value: 'auto' },
        ...(matrix.values || []).filter((option) => option.value !== 'auto'),
      ],
    }));
  }, [parsedSequences]);

  const onSequenceChange = useCallback(
    (parsedSequences: SequenceObject[]) => {
      const rawSequence = parsedSequences
        .map((parsedSequence) => parsedSequence.raw)
        .join('\n');

      if (rawSequence === sequence.selected) {
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

      setParsedSequences(parsedSequences);
      setSequence((sequence) => ({ ...sequence, selected: rawSequence }));
      setSubmitDisabled(isInvalid(parsedSequences));

      const mightBeDNA = parsedSequences[0]?.likelyType === 'na';

      setSType((stype) => {
        // we want protein by default
        const selected = mightBeDNA ? 'dna' : 'protein';
        if (stype.selected === selected) {
          // avoid unecessary rerender by keeping the same object
          return stype;
        }
        return { ...stype, selected };
      });
      setProgram((program) => {
        // we want protein by default
        const selected = mightBeDNA ? 'blastx' : 'blastp';
        if (program.selected === selected) {
          // avoid unecessary rerender by keeping the same object
          return program;
        }
        return { ...program, selected };
      });
    },
    [jobNameEdited, sequence.selected]
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
              value={parsedSequences.map((sequence) => sequence.raw).join('\n')}
            />
          </section>
          <section className="tools-form-section">
            <FormSelect formValue={database} updateFormValue={setDatabase} />
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
              {((taxIDs.selected as SelectedTaxon[]) || []).map(
                ({ label, id }: SelectedTaxon) => (
                  <div key={label}>
                    <Chip
                      onRemove={() => removeTaxonFormValue(id)}
                      className="secondary"
                    >
                      {label}
                    </Chip>
                  </div>
                )
              )}
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
                [stype, setSType],
                [program, setProgram],
                [threshold, setThreshold],
                [matrix, setMatrix],
                [filter, setFilter],
                [gapped, setGapped],
                [hits, setHits],
                [hsps, setHsps],
              ].map(([stateItem, setStateItem]) => (
                <FormSelect
                  key={(stateItem as BlastFormValue).fieldName}
                  formValue={stateItem as BlastFormValue}
                  updateFormValue={
                    setStateItem as Dispatch<SetStateAction<BlastFormValue>>
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
                {parsedSequences.length <= 1
                  ? 'Run BLAST'
                  : `BLAST ${parsedSequences.length} sequences`}
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
