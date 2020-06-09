import React, {
  FC,
  useState,
  useEffect,
  useCallback,
  FormEvent,
  MouseEvent,
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
import initialFormValues, {
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
  formValues: BlastFormValues;
  type: BlastFields;
  updateFormValues: (type: BlastFields, value: string) => void;
}> = ({ formValues, type, updateFormValues }) => {
  const formObject = formValues[type];
  if (!formObject) {
    return null;
  }
  return (
    <section className="blast-form-section__item">
      <label htmlFor={type}>
        {type}
        <select
          id={type}
          value={formValues[type].selected as string}
          onChange={(e) => updateFormValues(type, e.target.value)}
        >
          {formObject.values &&
            formObject.values.map((formValue) => (
              <option
                value={String(formValue.value)}
                key={String(formValue.value)}
                data-testid={`${type}-${formValue.value}`}
              >
                {formValue.label ? formValue.label : formValue.value}
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

  // used when the form submission needs to be disabled
  const [submitDisabled, setSubmitDisabled] = useState(false);
  // used when the form is about to be submitted to the server
  const [sending, setSending] = useState(false);

  const [formValues, setFormValues] = useState<Readonly<BlastFormValues>>(
    () => {
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
            Object.entries(initialFormValues as BlastFormValues).map(
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
      return initialFormValues;
    }
  );

  const updateFormValue = useCallback((type: BlastFields, value: string) => {
    // eslint-disable-next-line no-shadow
    setFormValues((formValues) => ({
      ...formValues,
      [type]: { ...formValues[type], selected: value },
    }));
  }, []);

  const updateTaxonFormValue = (path: string, id: string) => {
    // Only proceed if a node is selected
    if (!id) return;

    const taxonFormValues = formValues[BlastFields.taxons];
    const selected = (taxonFormValues.selected || []) as SelectedTaxon[];

    // If already there, don't add again
    if (selected.some((taxon: SelectedTaxon) => taxon.id === id)) return;

    // Truncate label: Homo sapiens (Man/Human/HUMAN) [9606] --> Homo sapiens (Man/Human/HUMAN) [9606]
    const label = path.replace(/ *\([^)]*\) */g, ' ');

    setFormValues({
      ...formValues,
      [BlastFields.taxons]: {
        ...taxonFormValues,
        selected: [{ id, label }, ...selected],
      },
    });
  };

  const removeTaxonFormValue = (id: string | number) => {
    const taxonFormValues = formValues[BlastFields.taxons];
    const selected = (taxonFormValues.selected || []) as SelectedTaxon[];
    setFormValues({
      ...formValues,
      [BlastFields.taxons]: {
        ...taxonFormValues,
        selected: selected.filter((taxon: SelectedTaxon) => taxon.id !== id),
      },
    });
  };

  // the only thing to do here would be to check the values and prevent
  // and prevent submission if there is any issue
  const submitBlastJob = (event: FormEvent | MouseEvent) => {
    event.preventDefault();

    const sequence = formValues[BlastFields.sequence].selected as Sequence;
    if (!sequence) return;

    setSubmitDisabled(true);
    setSending(true);

    // here we should just transform input values into FormParameters,
    // transformation of FormParameters into ServerParameters happens in the
    // tools middleware
    const parameters: FormParameters = {
      stype: formValues[BlastFields.stype].selected as SType,
      program: formValues[BlastFields.program].selected as Program,
      sequence,
      database: formValues[BlastFields.targetDb].selected as Database,
      taxIDs: formValues[BlastFields.taxons].selected as SelectedTaxon[],
      threshold: formValues[BlastFields.threshold].selected as Exp,
      // remove "auto", and transform into corresponding matrix
      matrix:
        formValues[BlastFields.matrix].selected === 'auto'
          ? getAutoMatrixFor(
              formValues[BlastFields.sequence].selected as string
            )
          : (formValues[BlastFields.matrix].selected as Matrix),
      filter: formValues[BlastFields.filter].selected as Filter,
      // transform string into boolean
      gapped: (formValues[BlastFields.gapped].selected === 'true') as GapAlign,
      // transform string into number
      hits: parseInt(
        formValues[BlastFields.hits].selected as string,
        10
      ) as Scores,
    };

    const jobName = formValues[BlastFields.name].selected as string;

    // we emit an action containing only the parameters and the type of job
    // the reducer will be in charge of generating a proper job object for
    // internal state
    dispatch(actions.createJob(parameters, 'blast', jobName));
    // navigate to the dashboard, not immediately, to give the impression that
    // something is happening
    sleep(1000).then(() => {
      history.push(LocationToPath[Location.Dashboard], { parameters });
    });
  };

  // set the "Auto" matrix to the have the correct label depending on sequence
  useEffect(() => {
    const matrix = getAutoMatrixFor(formValues.Sequence.selected as string);
    // eslint-disable-next-line no-shadow
    setFormValues((formValues: BlastFormValues) => ({
      ...formValues,
      [BlastFields.matrix]: {
        ...formValues[BlastFields.matrix],
        values: [
          { label: `Auto - ${matrix}`, value: 'auto' },
          ...(formValues[BlastFields.matrix].values || []).filter(
            (option) => option.value !== 'auto'
          ),
        ],
      },
    }));
  }, [formValues[BlastFields.sequence].selected]);

  const { name, links, info } = infoMappings[Tool.blast];

  const currentSequence = formValues[BlastFields.sequence].selected;
  const onSequenceChange = useCallback(
    (e: SequenceSubmissionOnChangeEvent) => {
      if (e.sequence === currentSequence) {
        return;
      }

      updateFormValue(BlastFields.name, e.name || '');
      updateFormValue(BlastFields.sequence, e.sequence);

      if (e.likelyType === 'na') {
        updateFormValue(BlastFields.stype, 'dna');
      } else {
        // we want protein by default
        updateFormValue(BlastFields.stype, 'protein');
      }

      setSubmitDisabled(!e.valid);
    },
    [currentSequence, updateFormValue]
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
              value={String(formValues[BlastFields.sequence].selected)}
            />
          </section>
          <section className="blast-form-section">
            <FormSelect
              formValues={formValues}
              type={BlastFields.targetDb}
              updateFormValues={updateFormValue}
            />
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
              {(
                (formValues[BlastFields.taxons].selected as SelectedTaxon[]) ||
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
          <section>
            <section className="blast-form-section">
              {[
                BlastFields.stype,
                BlastFields.program,
                BlastFields.threshold,
                BlastFields.matrix,
                BlastFields.filter,
                BlastFields.gapped,
                BlastFields.hits,
              ].map((blastField) => (
                <FormSelect
                  key={blastField}
                  formValues={formValues}
                  type={blastField}
                  updateFormValues={updateFormValue}
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
                  value={formValues[BlastFields.name].selected as string}
                  onChange={(e) =>
                    updateFormValue(BlastFields.name, e.target.value)
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
                // disabled={submitDisabled}
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
