import { FC, FormEvent, MouseEvent, useMemo, useRef, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import { Chip, PageIntro, SpinnerIcon } from 'franklin-sites';
import { sleep } from 'timing-functions';
import cn from 'classnames';

import HTMLHead from '../../../shared/components/HTMLHead';
import AutocompleteWrapper from '../../../query-builder/components/AutocompleteWrapper';
import InitialFormParametersProvider from '../../components/InitialFormParametersProvider';

import { useReducedMotion } from '../../../shared/hooks/useMatchMedia';
import useTextFileInput from '../../../shared/hooks/useTextFileInput';
import useToolsDispatch from '../../../shared/hooks/useToolsDispatch';
import useMessagesDispatch from '../../../shared/hooks/useMessagesDispatch';

import { addMessage } from '../../../messages/state/messagesActions';
import { createJob } from '../../state/toolsActions';
import {
  getPeptideSearchFormDataReducer,
  getPeptideSearchFormInitialState,
} from '../state/peptideSearchFormReducer';
import {
  resetFormState,
  updatePeptideSequences,
  updateSelected,
  updateSending,
} from '../state/peptideSearchFormActions';

import { truncateTaxonLabel } from '../../utils';
import splitAndTidyText from '../../../shared/utils/splitAndTidyText';

import { JobTypes } from '../../types/toolsJobTypes';
import { FormParameters } from '../types/peptideSearchFormParameters';
import { PepS, LEQi, SpOnly } from '../types/peptideSearchServerParameters';

import { LocationToPath, Location } from '../../../app/config/urls';
import defaultFormValues, {
  PeptideSearchFormValues,
  PeptideSearchFormValue,
  PeptideSearchFields,
} from '../config/PeptideSearchFormData';
import { SelectedTaxon } from '../../types/toolsFormData';
import uniProtKBApiUrls from '../../../shared/config/apiUrls';
import { namespaceAndToolsLabels } from '../../../shared/types/namespaces';
import {
  MessageFormat,
  MessageLevel,
} from '../../../messages/types/messagesTypes';

import sticky from '../../../shared/styles/sticky.module.scss';
import '../../styles/ToolsForm.scss';

// just because, no actual known limit
export const PEPTIDE_SEARCH_LIMIT = 100;

const title = namespaceAndToolsLabels[JobTypes.PEPTIDE_SEARCH];

const FormSelect: FC<{
  formValue: PeptideSearchFormValue;
  updateFormValue: (selected: PeptideSearchFormValue['selected']) => void;
}> = ({ formValue, updateFormValue }) => {
  if (!formValue) {
    return null;
  }
  const label =
    PeptideSearchFields[
      formValue.fieldName as keyof typeof PeptideSearchFields
    ];
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
  initialFormValues: Readonly<PeptideSearchFormValues>;
};

const PeptideSearchForm = ({ initialFormValues }: Props) => {
  // refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  // hooks
  const dispatchTools = useToolsDispatch();
  const dispatchMessages = useMessagesDispatch();
  const history = useHistory();
  const reducedMotion = useReducedMotion();

  const [{ peptideSequence, formValues, sending, submitDisabled }, dispatch] =
    useReducer(
      getPeptideSearchFormDataReducer(defaultFormValues),
      getPeptideSearchFormInitialState(initialFormValues)
    );

  // taxon field handlers
  const updateTaxonFormValue = (path: string, id?: string) => {
    // Only proceed if a node is selected
    if (!id) {
      return;
    }

    const selected = (formValues[PeptideSearchFields.taxIds].selected ||
      []) as SelectedTaxon[];

    // If already there, don't add again
    if (selected.some((taxon: SelectedTaxon) => taxon.id === id)) {
      return;
    }

    // Truncate label: Homo sapiens (Man/Human/HUMAN) [9606] --> Homo sapiens (Man/Human/HUMAN) [9606]
    const label = truncateTaxonLabel(path);

    dispatch(
      updateSelected(PeptideSearchFields.taxIds, [{ id, label }, ...selected])
    );
  };

  const removeTaxonFormValue = (id: string | number) => {
    const selected = (formValues[PeptideSearchFields.taxIds].selected ||
      []) as SelectedTaxon[];
    dispatch(
      updateSelected(
        PeptideSearchFields.taxIds,
        selected.filter((taxon: SelectedTaxon) => taxon.id !== id)
      )
    );
  };

  const parsedSequences = useMemo(
    () => splitAndTidyText(peptideSequence),
    [peptideSequence]
  );

  // form event handlers
  const handleReset = (event: FormEvent) => {
    event.preventDefault();

    // reset all form state to defaults
    dispatch(resetFormState());
  };

  // the only thing to do here would be to check the values and prevent
  // and prevent submission if there is any issue
  const submitPeptideSearchJob = (event: FormEvent | MouseEvent) => {
    event.preventDefault();

    if (!parsedSequences.length) {
      return;
    }

    dispatch(updateSending());

    // here we should just transform input values into FormParameters,
    // transformation of FormParameters into ServerParameters happens in the
    // tools middleware
    const parameters: FormParameters = {
      peps: formValues[PeptideSearchFields.peps].selected as PepS,
      taxIds: formValues[PeptideSearchFields.taxIds]
        .selected as SelectedTaxon[],
      lEQi: formValues[PeptideSearchFields.lEQi].selected as LEQi,
      spOnly: formValues[PeptideSearchFields.spOnly].selected as SpOnly,
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
      dispatchTools(
        createJob(
          parameters,
          JobTypes.PEPTIDE_SEARCH,
          formValues[PeptideSearchFields.name].selected as string
        )
      );
    });
  };

  // file handling
  useTextFileInput({
    inputRef: fileInputRef,
    onFileContent: (content) => {
      dispatch(updatePeptideSequences(content));
    },
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
        onSubmit={submitPeptideSearchJob}
        onReset={handleReset}
        aria-label="Peptide Search job submission form"
      >
        <fieldset>
          <section className="text-block">
            <legend>
              Find UniProt entries through parts of their peptide sequences,
              each more than two amino acids long (e.g. RVLSLGR). Enter one or
              more sequences ({PEPTIDE_SEARCH_LIMIT} max). You may also
              <label className="tools-form-section__file-input">
                load from a text file
                <input type="file" ref={fileInputRef} />
              </label>
              .
            </legend>
            <textarea
              name={defaultFormValues[PeptideSearchFields.peps].fieldName}
              autoComplete="off"
              spellCheck="false"
              aria-label="Protein sequence(s) of at least 2 aminoacids"
              placeholder="Protein sequence(s) of at least 2 aminoacids"
              className="tools-form-raw-text-input"
              value={peptideSequence}
              onChange={(event) =>
                dispatch(updatePeptideSequences(event.target.value))
              }
              data-hj-allow
            />
          </section>
          <section className="tools-form-section">
            <section className="tools-form-section__item tools-form-section__item--taxon-select">
              <AutocompleteWrapper
                placeholder="Enter taxon names or IDs to include"
                url={uniProtKBApiUrls.organismSuggester}
                onSelect={updateTaxonFormValue}
                title="Restrict by taxonomy"
                clearOnSelect
              />
            </section>
            <section className="tools-form-section__item tools-form-section__item--selected-taxon">
              {(
                (formValues[PeptideSearchFields.taxIds]
                  .selected as SelectedTaxon[]) || []
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
                Name your Peptide Search job
                <input
                  name="title"
                  type="text"
                  autoComplete="off"
                  maxLength={100}
                  style={{
                    width: `${
                      (formValues[PeptideSearchFields.name].selected as string)
                        .length + 2
                    }ch`,
                  }}
                  placeholder={'"my job title"'}
                  value={
                    formValues[PeptideSearchFields.name].selected as string
                  }
                  onFocus={(event) => {
                    if (!formValues[PeptideSearchFields.name].userSelected) {
                      event.target.select();
                    }
                  }}
                  onChange={(event) => {
                    dispatch(
                      updateSelected(
                        PeptideSearchFields.name,
                        event.target.value
                      )
                    );
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
              {[PeptideSearchFields.lEQi, PeptideSearchFields.spOnly].map(
                (stateItem) => (
                  <FormSelect
                    key={
                      (formValues[stateItem] as PeptideSearchFormValue)
                        .fieldName
                    }
                    formValue={formValues[stateItem] as PeptideSearchFormValue}
                    updateFormValue={(
                      value: PeptideSearchFormValue['selected']
                    ) => dispatch(updateSelected(stateItem, value))}
                  />
                )
              )}
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
                onClick={submitPeptideSearchJob}
              >
                {parsedSequences.length <= 1
                  ? 'Run Peptide Search'
                  : `Run Peptide Search on ${parsedSequences.length} sequences`}
              </button>
            </section>
          </section>
        </fieldset>
      </form>
    </>
  );
};

const PeptideSearchFormWithProvider = () => (
  <InitialFormParametersProvider defaultFormValues={defaultFormValues}>
    {(initialFormValues) => (
      <PeptideSearchForm initialFormValues={initialFormValues} />
    )}
  </InitialFormParametersProvider>
);

export default PeptideSearchFormWithProvider;
