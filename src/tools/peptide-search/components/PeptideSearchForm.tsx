import {
  FC,
  useState,
  FormEvent,
  MouseEvent,
  useMemo,
  useRef,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';
import { useDispatch } from 'react-redux';
import { Chip, PageIntro, SpinnerIcon } from 'franklin-sites';
import { useHistory } from 'react-router-dom';
import { sleep } from 'timing-functions';
import { v1 } from 'uuid';

import AutocompleteWrapper from '../../../query-builder/components/AutocompleteWrapper';

import { addMessage } from '../../../messages/state/messagesActions';

import useReducedMotion from '../../../shared/hooks/useReducedMotion';
import useTextFileInput from '../../../shared/hooks/useTextFileInput';

import { truncateTaxonLabel } from '../../utils';
import splitAndTidyText from '../../../shared/utils/splitAndTidyText';
import { createJob } from '../../state/toolsActions';

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
import infoMappings from '../../../shared/config/InfoMappings';
import {
  MessageFormat,
  MessageLevel,
} from '../../../messages/types/messagesTypes';

import '../../styles/ToolsForm.scss';
import '../../../shared/styles/sticky.scss';

// just because, no known actual limit
const PEPTIDE_SEARCH_LIMIT = 100;

const FormSelect: FC<{
  formValue: PeptideSearchFormValue;
  updateFormValue: Dispatch<SetStateAction<PeptideSearchFormValue>>;
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
  parameters?: Partial<FormParameters>;
}

const PeptideSearchForm = () => {
  // refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  // hooks
  const dispatch = useDispatch();
  const history = useHistory();
  const reducedMotion = useReducedMotion();

  // state
  const initialFormValues = useMemo(() => {
    // NOTE: we should use a similar logic to pre-fill fields based on querystring
    const parametersFromHistoryState = (history.location
      ?.state as CustomLocationState)?.parameters;
    if (parametersFromHistoryState) {
      // if we get here, we got parameters passed with the location update to
      // use as pre-filled fields
      const formValues: Partial<PeptideSearchFormValues> = {};
      const defaultValuesEntries = Object.entries(defaultFormValues) as [
        PeptideSearchFields,
        PeptideSearchFormValue
      ][];
      // for every field of the form, get its value from the history state if
      // present, otherwise go for the default one
      for (const [key, field] of defaultValuesEntries) {
        formValues[key] = Object.freeze({
          ...field,
          selected:
            parametersFromHistoryState[
              field.fieldName as keyof FormParameters
            ] || field.selected,
        }) as Readonly<PeptideSearchFormValue>;
      }
      return Object.freeze(formValues) as Readonly<PeptideSearchFormValues>;
    }
    // otherwise, pass the default values
    return defaultFormValues;
  }, [history]);

  // used when the form submission needs to be disabled
  const [submitDisabled, setSubmitDisabled] = useState(false);
  // used when the form is about to be submitted to the server
  const [sending, setSending] = useState(false);
  // flag to see if the user manually changed the title
  // const [jobNameEdited, setJobNameEdited] = useState(false);

  // actual form fields
  const [peps, setPeps] = useState<
    PeptideSearchFormValues[PeptideSearchFields.peps]
  >(initialFormValues[PeptideSearchFields.peps]);
  const [taxIDs, setTaxIDs] = useState<
    PeptideSearchFormValues[PeptideSearchFields.taxIds]
  >(initialFormValues[PeptideSearchFields.taxIds]);
  const [lEQi, setLEQi] = useState<
    PeptideSearchFormValues[PeptideSearchFields.lEQi]
  >(initialFormValues[PeptideSearchFields.lEQi]);
  const [spOnly, setSpOnly] = useState<
    PeptideSearchFormValues[PeptideSearchFields.spOnly]
  >(initialFormValues[PeptideSearchFields.spOnly]);

  // extra job-related fields
  const [jobName, setJobName] = useState(
    initialFormValues[PeptideSearchFields.name]
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

    // Truncate label: Homo sapiens (Man/Human/HUMAN) [9606] --> Homo sapiens (Man/Human/HUMAN) [9606]
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

    setPeps(defaultFormValues[PeptideSearchFields.peps]);
    setTaxIDs(defaultFormValues[PeptideSearchFields.taxIds]);
    setLEQi(defaultFormValues[PeptideSearchFields.lEQi]);
    setSpOnly(defaultFormValues[PeptideSearchFields.spOnly]);

    setJobName(defaultFormValues[PeptideSearchFields.name]);
  };

  // the only thing to do here would be to check the values and prevent
  // and prevent submission if there is any issue
  const submitPeptideSearchJob = (event: FormEvent | MouseEvent) => {
    event.preventDefault();

    if (!peps.selected) {
      return;
    }

    setSubmitDisabled(true);
    setSending(true);

    // here we should just transform input values into FormParameters,
    // transformation of FormParameters into ServerParameters happens in the
    // tools middleware
    const parameters: FormParameters = {
      peps: peps.selected as PepS,
      taxIds: taxIDs.selected as SelectedTaxon[],
      lEQi: lEQi.selected as LEQi,
      spOnly: spOnly.selected as SpOnly,
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
        createJob(
          parameters,
          JobTypes.PEPTIDE_SEARCH,
          jobName.selected as string
        )
      );
    });
  };

  const parsedSequences = useMemo(
    () => splitAndTidyText(peps.selected as string),
    [peps.selected]
  );

  useEffect(() => {
    setSubmitDisabled(
      parsedSequences.length > PEPTIDE_SEARCH_LIMIT ||
        parsedSequences.some((parsedSequence) => parsedSequence.length < 2)
    );
  }, [parsedSequences]);

  // file handling
  useTextFileInput({
    inputRef: fileInputRef,
    onFileContent: (content) => {
      setPeps((peps) => ({ ...peps, selected: content }));
    },

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

  const { name, links, info } = infoMappings[JobTypes.PEPTIDE_SEARCH];

  return (
    <>
      <PageIntro title={name} links={links}>
        {info}
      </PageIntro>
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
              autoComplete="false"
              spellCheck="false"
              placeholder="Protein sequence(s) of at least 2 aminoacids"
              className="tools-form-raw-text-input"
              value={peps.selected as string}
              onChange={(event) =>
                setPeps((peps) => ({ ...peps, selected: event.target.value }))
              }
            />
          </section>
          <section className="tools-form-section">
            <section className="tools-form-section__item tools-form-section__item--taxon-select">
              <AutocompleteWrapper
                placeholder="Enter taxon names or IDs to include"
                url={uniProtKBApiUrls.taxonomySuggester}
                onSelect={updateTaxonFormValue}
                title="Restrict by taxonomy"
                clearOnSelect
              />
            </section>
            <section className="tools-form-section__item tools-form-section__item--selected-taxon">
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
                Name your Peptide Search job
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
                  onChange={(event) => {
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
                [lEQi, setLEQi],
                [spOnly, setSpOnly],
              ].map(([stateItem, setStateItem]) => (
                <FormSelect
                  key={(stateItem as PeptideSearchFormValue).fieldName}
                  formValue={stateItem as PeptideSearchFormValue}
                  updateFormValue={
                    setStateItem as Dispatch<
                      SetStateAction<PeptideSearchFormValue>
                    >
                  }
                />
              ))}
            </section>
          </details>
          <section className="tools-form-section sticky-bottom-right">
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

export default PeptideSearchForm;
