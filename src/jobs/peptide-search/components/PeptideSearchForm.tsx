import '../../styles/ToolsForm.scss';

import cn from 'classnames';
import { Chip, Message, PageIntro, SpinnerIcon } from 'franklin-sites';
import {
  FC,
  FormEvent,
  MouseEvent,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { useNavigate } from 'react-router';
import { sleep } from 'timing-functions';

import { Location, LocationToPath } from '../../../app/config/urls';
import { addMessage } from '../../../messages/state/messagesActions';
import {
  MessageFormat,
  MessageLevel,
} from '../../../messages/types/messagesTypes';
import AutocompleteWrapper from '../../../query-builder/components/AutocompleteWrapper';
import ExternalLink from '../../../shared/components/ExternalLink';
import HTMLHead from '../../../shared/components/HTMLHead';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import {
  PEPTIDE_SEARCH_SEQ_MINIMUM_LENGTH,
  PEPTIDE_SEARCH_SEQUENCES_COUNT,
} from '../../../shared/config/limits';
import { useReducedMotion } from '../../../shared/hooks/useMatchMedia';
import useMessagesDispatch from '../../../shared/hooks/useMessagesDispatch';
import useTextFileInput from '../../../shared/hooks/useTextFileInput';
import sticky from '../../../shared/styles/sticky.module.scss';
import { namespaceAndToolsLabels } from '../../../shared/types/namespaces';
import { sendGtagEventJobSubmit } from '../../../shared/utils/gtagEvents';
import { dispatchJobs } from '../../../shared/workers/jobs/getJobSharedWorker';
import { createJob } from '../../../shared/workers/jobs/state/jobActions';
import ChecksumSuggester from '../../components/ChecksumSuggester';
import InitialFormParametersProvider from '../../components/InitialFormParametersProvider';
import { SelectedTaxon } from '../../types/jobsFormData';
import { JobTypes } from '../../types/jobTypes';
import { truncateTaxonLabel } from '../../utils';
import defaultFormValues, {
  PeptideSearchFields,
  PeptideSearchFormValue,
  PeptideSearchFormValues,
} from '../config/PeptideSearchFormData';
import {
  resetFormState,
  updatePeptideSequences,
  updateSelected,
  updateSending,
} from '../state/peptideSearchFormActions';
import {
  getPeptideSearchFormDataReducer,
  getPeptideSearchFormInitialState,
} from '../state/peptideSearchFormReducer';
import { FormParameters } from '../types/peptideSearchFormParameters';
import { lEQi, peps, spOnly } from '../types/peptideSearchServerParameters';

const title = namespaceAndToolsLabels[JobTypes.PEPTIDE_SEARCH];

const FormSelect: FC<
  React.PropsWithChildren<{
    formValue: PeptideSearchFormValue;
    updateFormValue: (selected: PeptideSearchFormValue['selected']) => void;
  }>
> = ({ formValue, updateFormValue }) => {
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
  const dispatchMessages = useMessagesDispatch();
  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();

  const [{ parsedSequences, formValues, sending, submitDisabled }, dispatch] =
    useReducer(
      getPeptideSearchFormDataReducer(defaultFormValues),
      initialFormValues,
      getPeptideSearchFormInitialState
    );

  useEffect(() => {
    dispatch(resetFormState(initialFormValues));
  }, [initialFormValues]);

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

  const peptideWithoutTaxonWarning = Boolean(
    formValues[PeptideSearchFields.peps].selected &&
      !(
        formValues[PeptideSearchFields.taxIds].selected as
          | undefined
          | SelectedTaxon[]
      )?.length
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
      peps: formValues[PeptideSearchFields.peps].selected as peps,
      taxIds: formValues[PeptideSearchFields.taxIds]
        .selected as SelectedTaxon[],
      lEQi: formValues[PeptideSearchFields.lEQi].selected as lEQi,
      spOnly: formValues[PeptideSearchFields.spOnly].selected as spOnly,
    };

    // navigate to the dashboard, not immediately, to give the impression that
    // something is happening
    sleep(1000).then(() => {
      navigate(LocationToPath[Location.Dashboard], {
        state: {
          parameters: [parameters],
        },
      });
      // We emit an action containing only the parameters and the type of job
      // the reducer will be in charge of generating a proper job object for
      // internal state. Dispatching after navigate so that pop-up messages (as a
      // side-effect of createJob) cannot mount immediately before navigating away.
      dispatchJobs(
        createJob(
          parameters,
          JobTypes.PEPTIDE_SEARCH,
          formValues[PeptideSearchFields.name].selected as string
        )
      );
      sendGtagEventJobSubmit(JobTypes.PEPTIDE_SEARCH);
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
      <PageIntro
        heading={<span data-article-id="peptide_search">{title}</span>}
      />
      <form
        onSubmit={submitPeptideSearchJob}
        onReset={handleReset}
        aria-label="Peptide Search job submission form"
      >
        <fieldset>
          <section className="text-block">
            <legend>
              Find UniProt entries through parts of their peptide sequences,
              each at least {PEPTIDE_SEARCH_SEQ_MINIMUM_LENGTH} amino acids
              long. Enter one or more sequences (
              {PEPTIDE_SEARCH_SEQUENCES_COUNT} max). You may also
              <label className="tools-form-section__file-input">
                load from a text file
                <input type="file" ref={fileInputRef} />
              </label>
              .
              <br />
              For submissions involving shorter peptides or more than 100
              sequences, or in case of server problems, a{' '}
              <ExternalLink
                url="https://proteininformationresource.org/download/peptide_match/"
                noIcon
              >
                downloadable tool
              </ExternalLink>
              &nbsp;is available to run locally.
            </legend>
            <textarea
              name={defaultFormValues[PeptideSearchFields.peps].fieldName}
              autoComplete="off"
              spellCheck="false"
              aria-label="Protein sequence(s) of at least 7 aminoacids"
              placeholder="e.g. RVLSLGR"
              className="tools-form-raw-text-input"
              value={formValues[PeptideSearchFields.peps].selected as string}
              onChange={(event) =>
                dispatch(updatePeptideSequences(event.target.value))
              }
              data-hj-allow
            />
          </section>
          {parsedSequences.length === 1 ? (
            <ChecksumSuggester sequence={parsedSequences[0]} />
          ) : null}
          <section className="tools-form-section">
            <section className="tools-form-section__item tools-form-section__item--taxon-select">
              <AutocompleteWrapper
                placeholder="Enter organism names or IDs to include"
                url={apiUrls.suggester.organism}
                onSelect={updateTaxonFormValue}
                title="Restrict by organism"
                clearOnSelect
              />
            </section>
            <section className="tools-form-section__item tools-form-section__item--selected-taxon">
              {(
                (formValues[PeptideSearchFields.taxIds].selected ||
                  []) as SelectedTaxon[]
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
                  placeholder="my job title"
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
          {peptideWithoutTaxonWarning && (
            <Message level="warning">
              <small>
                You are about to submit a peptide search without organism
                restriction. Are you sure you do not want to specify an
                organism?
                <br />
                Peptide searches against all organisms can produce extremely
                long lists of UniProtKB entries and may even cause the search to
                fail.
              </small>
            </Message>
          )}
          <section
            className={cn(
              'tools-form-section',
              peptideWithoutTaxonWarning && 'tools-form-warning-submit',
              !peptideWithoutTaxonWarning && sticky['sticky-bottom-right']
            )}
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
