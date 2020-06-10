import React, {
  FC,
  useState,
  useEffect,
  useCallback,
  FormEvent,
  MouseEvent,
  useMemo,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  Chip,
  SequenceSubmission,
  PageIntro,
  SpinnerIcon,
  // extractNameFromFASTAHeader,
} from 'franklin-sites';
import { useHistory } from 'react-router-dom';
import { sleep } from 'timing-functions';

import AutocompleteWrapper from '../../../uniprotkb/components/query-builder/AutocompleteWrapper';

import { FormParameters } from '../types/blastFormParameters';
import { Job } from '../types/blastJob';
import {
  SType,
  Program,
  Sequence,
  Matrix,
  GapAlign,
  Database,
  Exp,
  Filter,
  Scores,
} from '../types/blastServerParameters';
import { Tool } from '../../types';

import * as actions from '../../state/toolsActions';

import { LocationToPath, Location } from '../../../app/config/urls';
import defaultFormValues, {
  BlastFormValues,
  BlastFormValue,
  BlastFields,
  SelectedTaxon,
} from '../config/BlastFormData';
import uniProtKBApiUrls from '../../../uniprotkb/config/apiUrls';
import infoMappings from '../../../shared/config/InfoMappings';

import SequenceSearchLoader, {
  SequenceSubmissionOnChangeEvent,
} from './SequenceSearchLoader';

import './styles/BlastForm.scss';

// https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3848038/
const getAutoMatrixFor = (sequence: string): FormParameters['matrix'] => {
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
  updateFormValue: React.Dispatch<React.SetStateAction<BlastFormValue>>;
}> = ({ formValue, updateFormValue }) => {
  if (!formValue) {
    return null;
  }
  const label = BlastFields[formValue.fieldName as keyof typeof BlastFields];
  return (
    <section className="blast-form-section__item">
      <label htmlFor={label}>
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

interface CustomLocationState {
  parameters?: Job['parameters'];
}

const BlastForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const initialFormValues = useMemo(() => {
    // NOTE: we should use a similar logic to pre-fill fields based on querystring
    const parametersFromHistoryState: FormParameters | undefined = (history
      .location?.state as CustomLocationState)?.parameters;
    if (parametersFromHistoryState) {
      // if we get here, we got parameters passed with the location update to
      // use as pre-filled fields
      // yes, I'm doing that in one go to avoid having typescript complain about
      // the object not being of the right shape even though I want to construct
      // it in multiple steps 🙄
      return Object.freeze(
        Object.fromEntries(
          Object.entries(defaultFormValues as BlastFormValues).map(
            ([key, field]) => [
              key,
              Object.freeze({
                ...field,
                selected:
                  parametersFromHistoryState[
                    field.fieldName as keyof FormParameters
                  ],
              }) as Readonly<BlastFormValue>,
            ]
          )
        )
      ) as Readonly<BlastFormValues>;
    }
    // otherwise, pass the default values
    return defaultFormValues;
  }, [history]);

  // used when the form submission needs to be disabled
  const [submitDisabled, setSubmitDisabled] = useState(false);
  // used when the form is about to be submitted to the server
  const [sending, setSending] = useState(false);

  const [stype, setSType] = useState<BlastFormValues[BlastFields.stype]>(
    initialFormValues[BlastFields.stype]
  );
  const [program, setProgram] = useState<BlastFormValues[BlastFields.program]>(
    initialFormValues[BlastFields.program]
  );
  const [sequence, setSequence] = useState<
    BlastFormValues[BlastFields.sequence]
  >(initialFormValues[BlastFields.sequence]);
  const [jobName, setJobName] = useState(initialFormValues[BlastFields.name]);
  const [database, setDatabase] = useState<
    BlastFormValues[BlastFields.database]
  >(initialFormValues[BlastFields.database]);
  const [taxIDs, setTaxIDs] = useState<BlastFormValues[BlastFields.taxons]>(
    initialFormValues[BlastFields.taxons]
  );
  const [threshold, setThreshold] = useState<
    BlastFormValues[BlastFields.threshold]
  >(initialFormValues[BlastFields.threshold]);
  const [matrix, setMatrix] = useState<BlastFormValues[BlastFields.matrix]>(
    initialFormValues[BlastFields.matrix]
  );
  const [filter, setFilter] = useState<BlastFormValues[BlastFields.filter]>(
    initialFormValues[BlastFields.filter]
  );
  const [gapped, setGapped] = useState<BlastFormValues[BlastFields.gapped]>(
    initialFormValues[BlastFields.gapped]
  );
  const [hits, setHits] = useState<BlastFormValues[BlastFields.hits]>(
    initialFormValues[BlastFields.hits]
  );

  const updateTaxonFormValue = (path: string, id: string) => {
    // Only proceed if a node is selected
    if (!id) return;

    const selected = (taxIDs.selected || []) as SelectedTaxon[];

    // If already there, don't add again
    if (selected.some((taxon: SelectedTaxon) => taxon.id === id)) return;

    // Truncate label: Homo sapiens (Man/Human/HUMAN) [9606] --> Homo sapiens (Man/Human/HUMAN) [9606]
    const label = path.replace(/ *\([^)]*\) */g, ' ');

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

  // the only thing to do here would be to check the values and prevent
  // and prevent submission if there is any issue
  const submitBlastJob = (event: FormEvent | MouseEvent) => {
    event.preventDefault();

    if (!sequence) return;

    setSubmitDisabled(true);
    setSending(true);

    // here we should just transform input values into FormParameters,
    // transformation of FormParameters into ServerParameters happens in the
    // tools middleware
    const parameters: FormParameters = {
      stype: stype.selected as SType,
      program: program.selected as Program,
      sequence: sequence.selected as Sequence,
      database: database.selected as Database,
      taxIDs: taxIDs.selected as SelectedTaxon[],
      threshold: threshold.selected as Exp,
      // remove "auto", and transform into corresponding matrix
      matrix:
        matrix.selected === 'auto'
          ? getAutoMatrixFor(sequence.selected as string)
          : (matrix.selected as Matrix),
      filter: filter.selected as Filter,
      // transform string into boolean
      gapped: (gapped.selected === 'true') as GapAlign,
      // transform string into number
      hits: parseInt(hits.selected as string, 10) as Scores,
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
        actions.createJob(parameters, 'blast', jobName.selected as string)
      );
    });
  };

  // set the "Auto" matrix to the have the correct label depending on sequence
  useEffect(() => {
    const autoMatrix = getAutoMatrixFor(sequence.selected as string);
    // eslint-disable-next-line no-shadow
    setMatrix((matrix) => ({
      ...matrix,
      values: [
        { label: `Auto - ${autoMatrix}`, value: 'auto' },
        ...(matrix.values || []).filter((option) => option.value !== 'auto'),
      ],
    }));
  }, [sequence.selected]);

  const { name, links, info } = infoMappings[Tool.blast];

  // const currentSequence = formValues[BlastFields.sequence].selected;
  const onSequenceChange = useCallback(
    (e: SequenceSubmissionOnChangeEvent) => {
      if (e.sequence === sequence.selected) {
        return;
      }

      setJobName({ ...jobName, selected: e.name || '' });
      setSequence({ ...sequence, selected: e.sequence });

      if (e.likelyType === 'na') {
        setSType({ ...stype, selected: 'dna' });
      } else {
        // we want protein by default
        setSType({ ...stype, selected: 'protein' });
      }

      setSubmitDisabled(!e.valid);
    },
    [jobName, sequence, stype]
  );

  return (
    <>
      <PageIntro title={name} links={links}>
        {info}
      </PageIntro>
      <form onSubmit={submitBlastJob}>
        <fieldset>
          <section className="blast-form-section__item">
            <legend>
              Find a protein to BLAST by UniProt ID{' '}
              <small>(e.g. P05067 or A4_HUMAN or UPI0000000001)</small>.
            </legend>
            <div className="import-sequence-section">
              <SequenceSearchLoader onLoad={onSequenceChange} />
            </div>
          </section>
        </fieldset>
        <section className="text-block">
          <strong>OR</strong>
        </section>
        <fieldset>
          <section className="text-block">
            <legend>Enter either a protein or nucleotide sequence.</legend>
            <SequenceSubmission
              placeholder="MLPGLALLLL or AGTTTCCTCGGCAGCGGTAGGC"
              onChange={onSequenceChange}
              value={sequence.selected}
            />
          </section>
          <section className="blast-form-section">
            <FormSelect formValue={database} updateFormValue={setDatabase} />
            <section className="blast-form-section__item blast-form-section__item--taxon-select">
              <AutocompleteWrapper
                placeholder="Homo sapiens, 9606,..."
                url={uniProtKBApiUrls.organismSuggester}
                onSelect={updateTaxonFormValue}
                title="Restrict by taxonomy"
                clearOnSelect
              />
            </section>
            <section className="blast-form-section__item blast-form-section__item--selected-taxon">
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
          <section>
            <section className="blast-form-section">
              {[
                [stype, setSType],
                [program, setProgram],
                [threshold, setThreshold],
                [matrix, setMatrix],
                [filter, setFilter],
                [gapped, setGapped],
                [hits, setHits],
              ].map(([stateItem, setStateItem]) => (
                <FormSelect
                  key={(stateItem as BlastFormValue).fieldName}
                  formValue={stateItem as BlastFormValue}
                  updateFormValue={
                    setStateItem as React.Dispatch<
                      React.SetStateAction<BlastFormValue>
                    >
                  }
                />
              ))}
            </section>
          </section>
          <section>
            <section className="blast-form-section__item">
              <label>
                Name your BLAST job
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
          </section>
          <section className="blast-form-section">
            <section className="button-group blast-form-section__buttons">
              <input className="button secondary" type="reset" />
              <button
                className="button primary blast-form-section__submit"
                type="submit"
                disabled={submitDisabled}
                onClick={submitBlastJob}
              >
                {sending ? <SpinnerIcon /> : 'Run Blast'}
              </button>
            </section>
          </section>
        </fieldset>
      </form>
    </>
  );
};

export default BlastForm;
