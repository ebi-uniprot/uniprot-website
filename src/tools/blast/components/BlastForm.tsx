import React, { FC, useState, FormEvent, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { Chip, PageIntro } from 'franklin-sites';
import queryString from 'query-string';

import SingleColumnLayout from '../../../shared/components/layouts/SingleColumnLayout';

import { FormParameters } from '../types/blastFormParameters';

import * as actions from '../../state/toolsActions';

import initialFormValues, {
  BlastFormValues,
  BlastFields,
  SelectedTaxon,
} from '../config/BlastFormData';

import AutocompleteWrapper from '../../../uniprotkb/components/query-builder/AutocompleteWrapper';
import uniProtKBApiUrls from '../../../uniprotkb/config/apiUrls';
import fetchData from '../../../shared/utils/fetchData';
import { uniProtKBAccessionRegEx } from '../../../uniprotkb/utils';

import './styles/BlastForm.scss';

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
              >
                {formValue.label ? formValue.label : formValue.value}
              </option>
            ))}
        </select>
      </label>
    </section>
  );
};

const BlastForm = () => {
  const dispatch = useDispatch();

  const [displayAdvanced, setDisplayAdvanced] = useState(false);
  const [formValues, setFormValues] = useState<BlastFormValues>(
    initialFormValues
  );
  const [searchByIDValue, setSearchByIDValue] = useState('');
  const [sequenceData, setSequenceData] = useState(null);

  const updateFormValue = (type: BlastFields, value: string) => {
    const newFormValues = { ...formValues };
    newFormValues[type].selected = value;
    setFormValues(newFormValues);
  };

  const updateTaxonFormValue = (path: string, id: string) => {
    // Only proceed if a node is selected
    if (!id) return;

    const taxonFormValues = formValues[BlastFields.taxons];
    const { selected = [] } = taxonFormValues as { selected: SelectedTaxon[] };

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
    const { selected = [] } = taxonFormValues as { selected: SelectedTaxon[] };
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

    const parameters = {};

    // TODO: need to cast the values to the right types
    // e.g. hits 50 gets stored as a string somehow...
    for (const { fieldName, selected } of Object.values(formValues)) {
      if (selected) parameters[fieldName] = selected;
    }

    // we emit an action containing only the parameters and the type of job
    // the reducer will be in charge of generating a proper job object for
    // internal state
    dispatch(actions.createJob(parameters as FormParameters, 'blast'));
  };

  const getSequenceByAccessionOrID = (input: string) => {
    const query = queryString.stringify({
      query: uniProtKBAccessionRegEx.test(input.replace(/\s/g, ''))
        ? `accession:${input}`
        : `id:${input}`,
      fields: 'sequence, id',
    });

    const fetchUrl = fetchData(`${uniProtKBApiUrls.search}?${query}`)
      .then(({ data }) => {
        const { results } = data;
        if (results && results.length > 0) {
          setSequenceData(results[0]);
          updateFormValue(BlastFields.sequence, results[0].sequence.value);
        }
      })
      .catch((e) => {
        console.error("can't get the sequence:", e);
      });
  };
  console.log('sequence data:', sequenceData);
  const sequenceMetaData =
    sequenceData &&
    `(${sequenceData.uniProtkbId}:${sequenceData.primaryAccession})`;

  return (
    <SingleColumnLayout>
      <PageIntro title="BLAST" />
      <form onSubmit={submitBlastJob}>
        <fieldset>
          <section>
            <legend>
              Find a protein to BLAST by UniProtID or keyword (examples).
            </legend>
            <input
              type="text"
              onChange={({ target }) => setSearchByIDValue(target.value)}
              value={searchByIDValue}
            />
            <button
              className="button primary"
              type="button"
              onClick={() => getSequenceByAccessionOrID(searchByIDValue)}
            >
              Get Sequence
            </button>
          </section>
        </fieldset>
        <fieldset>
          <section>
            <legend>Sequence {sequenceData && sequenceMetaData}</legend>
            <textarea
              placeholder="MLPGLALLLL or AGTTTCCTCGGCAGCGGTAGGC"
              onChange={(e) =>
                updateFormValue(BlastFields.sequence, e.target.value)
              }
              className="blast-form-textarea"
            >
              {formValues[BlastFields.sequence].selected}
            </textarea>
          </section>
          <section className="blast-form-section">
            <FormSelect
              formValues={formValues}
              type={BlastFields.targetDb}
              updateFormValues={updateFormValue}
            />
            <section className="blast-form-section__item blast-form-section__item--taxon-select">
              <AutocompleteWrapper
                url={uniProtKBApiUrls.organismSuggester}
                onSelect={updateTaxonFormValue}
                title="Restrict to taxonomy"
                clearOnSelect
              />
            </section>
            <section className="blast-form-section__item blast-form-section__item--selected-taxon">
              {(formValues[BlastFields.taxons].selected || []).map(
                ({ label, id }: SelectedTaxon) => (
                  <Chip
                    key={label}
                    onRemove={() => removeTaxonFormValue(id)}
                    className="secondary"
                  >
                    {label}
                  </Chip>
                )
              )}
            </section>
          </section>
          <section>
            <section className="blast-form-section__item">
              <label>
                Name your BLAST job
                <input name="title" type="text" placeholder="my job title" />
              </label>
            </section>
            <section className="blast-form-section__item blast-form-section__submit">
              <input
                className="button primary"
                type="submit"
                onClick={submitBlastJob}
                value="Submit"
              />
            </section>
          </section>
          <button
            type="button"
            className="button tertiary"
            onClick={() => setDisplayAdvanced((display) => !display)}
          >
            Advanced {displayAdvanced ? '▾' : '▸'}
          </button>
          {displayAdvanced && (
            <>
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
              <section>
                <button className="button secondary" type="reset">
                  Reset form
                </button>
              </section>
            </>
          )}
        </fieldset>
      </form>
    </SingleColumnLayout>
  );
};

export default BlastForm;
