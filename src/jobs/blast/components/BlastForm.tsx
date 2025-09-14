import '../../styles/ToolsForm.scss';

import cn from 'classnames';
import {
  Chip,
  formatLargeNumber,
  Message,
  PageIntro,
  sequenceProcessor,
  SequenceSubmission,
  SpinnerIcon,
} from 'franklin-sites';
import {
  FC,
  FormEvent,
  MouseEvent,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { useHistory } from 'react-router-dom';
import { sleep } from 'timing-functions';
import joinUrl from 'url-join';

import { Location, LocationToPath } from '../../../app/config/urls';
import { addMessage } from '../../../messages/state/messagesActions';
import {
  MessageFormat,
  MessageLevel,
} from '../../../messages/types/messagesTypes';
import AutocompleteWrapper from '../../../query-builder/components/AutocompleteWrapper';
import HTMLHead from '../../../shared/components/HTMLHead';
import { apiPrefix } from '../../../shared/config/apiUrls/apiPrefix';
import apiUrls from '../../../shared/config/apiUrls/apiUrls';
import { BLAST_LIMIT } from '../../../shared/config/limits';
import { fileFormatToUrlParameter } from '../../../shared/config/resultsDownload';
import useDataApi from '../../../shared/hooks/useDataApi';
import { useReducedMotion } from '../../../shared/hooks/useMatchMedia';
import useMessagesDispatch from '../../../shared/hooks/useMessagesDispatch';
import useTextFileInput from '../../../shared/hooks/useTextFileInput';
import sticky from '../../../shared/styles/sticky.module.scss';
import { namespaceAndToolsLabels } from '../../../shared/types/namespaces';
import { FileFormat } from '../../../shared/types/resultsDownload';
import { sendGtagEventJobSubmit } from '../../../shared/utils/gtagEvents';
import { stringifyUrl } from '../../../shared/utils/url';
import { pluralise } from '../../../shared/utils/utils';
import { dispatchJobs } from '../../../shared/workers/jobs/getJobSharedWorker';
import { createJob } from '../../../shared/workers/jobs/state/jobActions';
import ChecksumSuggester from '../../components/ChecksumSuggester';
import InitialFormParametersProvider from '../../components/InitialFormParametersProvider';
import SequenceSearchLoader, {
  SequenceSearchLoaderInterface,
} from '../../components/SequenceSearchLoader';
import { SelectedTaxon } from '../../types/jobsFormData';
import { JobTypes } from '../../types/jobTypes';
import { truncateTaxonLabel } from '../../utils';
import defaultFormValues, {
  BlastFields,
  BlastFormValue,
  BlastFormValues,
  databaseValueToName,
  excludeTaxonForDB,
} from '../config/BlastFormData';
import {
  resetFormState,
  updateParsedSequences,
  updateSelected,
  updateSending,
} from '../state/blastFormActions';
import {
  getBlastFormDataReducer,
  getBlastFormInitialState,
} from '../state/blastFormReducer';
import { FormParameters } from '../types/blastFormParameters';
import {
  Database,
  Exp,
  Filter,
  GapAlign,
  HSPs,
  Matrix,
  Scores,
  Sequence,
  SType,
} from '../types/blastServerParameters';
import { getAutoMatrixFor } from '../utils';

const title = namespaceAndToolsLabels[JobTypes.BLAST];

const FormSelect: FC<
  React.PropsWithChildren<{
    formValue: BlastFormValue;
    updateFormValue: (selected: BlastFormValue['selected']) => void;
  }>
> = ({ formValue, updateFormValue }) => {
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

const baseQueryCountUrl = joinUrl(apiPrefix, 'uniprotkb', 'search');
const getQueryForCount = (database?: Database, taxons?: SelectedTaxon[]) => {
  if (!database || !taxons?.length || excludeTaxonForDB(database)) {
    return null;
  }
  const taxonomyQuery = taxons
    .map((taxon) => `taxonomy_id:${taxon.id}`)
    .join(' OR ');
  let databaseQuery = null;
  switch (database) {
    case 'uniprotkb_refprotswissprot':
      databaseQuery = 'keyword:KW-1185 OR reviewed:true';
      break;
    case 'uniprotkb_reference_proteomes':
      databaseQuery = 'keyword:KW-1185';
      break;
    case 'uniprotkb_swissprot':
      databaseQuery = 'reviewed:true';
      break;
    case 'uniprotkb_pdb':
      databaseQuery = 'structure_3d:true';
      break;
    case 'uniprotkb':
      // No extra filter
      break;
    default:
      return null;
  }
  return stringifyUrl(baseQueryCountUrl, {
    format: fileFormatToUrlParameter[FileFormat.fasta],
    includeIsoform: true,
    query: databaseQuery
      ? `(${taxonomyQuery}) AND (${databaseQuery})`
      : taxonomyQuery,
  });
};
const countFetchOptions = { method: 'HEAD' };

type Props = {
  initialFormValues: Readonly<BlastFormValues>;
};

const BlastForm = ({ initialFormValues }: Props) => {
  // refs
  const sslRef = useRef<SequenceSearchLoaderInterface>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // hooks
  const dispatchMessages = useMessagesDispatch();
  const history = useHistory();
  const reducedMotion = useReducedMotion();

  const [
    {
      parsedSequences,
      formValues,
      sending,
      submitDisabled,
      fromSequenceSearchLoader,
    },
    dispatch,
  ] = useReducer(
    getBlastFormDataReducer(defaultFormValues),
    initialFormValues,
    getBlastFormInitialState
  );

  // check number of results in the search space
  const database = formValues[BlastFields.database].selected as
    | Database
    | undefined;
  const taxons = formValues[BlastFields.taxons].selected as
    | SelectedTaxon[]
    | undefined;
  const countFetchUrl = useMemo(
    () => getQueryForCount(database, taxons),
    [database, taxons]
  );
  const { loading, headers } = useDataApi(countFetchUrl, countFetchOptions);
  const searchSpaceTotal = useMemo(() => {
    if (!loading && headers?.['x-total-results']) {
      return Number(headers['x-total-results']);
    }
    return Infinity;
  }, [loading, headers]);

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
        dispatchJobs(
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
      <PageIntro
        translate="no"
        heading={<span data-article-id="blast-submission">{title}</span>}
      />
      <form
        onSubmit={submitBlastJob}
        onReset={handleReset}
        aria-label="BLAST job submission form"
      >
        <fieldset>
          <section className="tools-form-section__item">
            <legend>
              <span>Find a protein sequence to run </span>
              <abbr title="Basic Local Alignment Search Tool">BLAST</abbr>
              <span>
                {' '}
                sequence similarity search by UniProt ID (e.g. P05067 or
                A4_HUMAN or UPI0000000001).
              </span>
            </legend>
            <div className="import-sequence-section">
              <SequenceSearchLoader
                ref={sslRef}
                onLoad={(s) => dispatch(updateParsedSequences(s, true))}
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
              maximumSequences={BLAST_LIMIT}
            />
            {fromSequenceSearchLoader || parsedSequences.length !== 1 ? null : (
              <ChecksumSuggester
                sequence={parsedSequences[0].sequence}
                name={parsedSequences[0].name}
              />
            )}
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
            {searchSpaceTotal !== Infinity &&
            (formValues[BlastFields.taxons]?.selected as SelectedTaxon[])
              ?.length ? (
              <Message
                level={searchSpaceTotal === 0 ? 'failure' : 'info'}
                className="taxonomy-selection-message"
              >
                {searchSpaceTotal === 0 ? (
                  <>
                    <strong>Search space has no protein sequences</strong>
                    <br />
                    Filtering the target database{' '}
                    {databaseValueToName(
                      formValues[BlastFields.database].selected as string
                    )}{' '}
                    by the selected{' '}
                    {
                      (
                        formValues[BlastFields.taxons]
                          ?.selected as SelectedTaxon[]
                      ).length
                    }{' '}
                    {pluralise(
                      'taxonomy',
                      (
                        formValues[BlastFields.taxons]
                          ?.selected as SelectedTaxon[]
                      ).length,
                      'taxa'
                    )}{' '}
                    returns no protein sequences. Adjust the target database or
                    taxonomy filters to continue.
                  </>
                ) : (
                  <>
                    <strong>
                      Search space: {formatLargeNumber(searchSpaceTotal)}{' '}
                      protein{' '}
                      {pluralise('sequence', searchSpaceTotal, 'sequences')}
                    </strong>
                    <br />
                    This is a filtered subset of the target database{' '}
                    {databaseValueToName(
                      formValues[BlastFields.database].selected as string
                    )}{' '}
                    based on your taxonomy filters
                  </>
                )}
              </Message>
            ) : null}
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
                  placeholder="my job title"
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
                disabled={
                  submitDisabled ||
                  (searchSpaceTotal === 0 &&
                    (
                      formValues[BlastFields.taxons]
                        ?.selected as SelectedTaxon[]
                    ).length > 0)
                }
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
