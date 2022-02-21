import { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { cloneDeep } from 'lodash-es';

import { sequenceProcessor } from 'franklin-sites';
import useDataApi from '../../shared/hooks/useDataApi';

import { parseIdsFromSearchParams } from '../utils/urls';
import { getAccessionsURL } from '../../shared/config/apiUrls';
import entryToFASTAWithHeaders from '../../shared/utils/entryToFASTAWithHeaders';

import { SelectedTaxon } from '../types/toolsFormData';
import { UniProtkbAPIModel } from '../../uniprotkb/adapters/uniProtkbConverter';

interface CustomLocationState<T> {
  parameters?: Partial<T>;
}

export type FormValue = {
  fieldName: string;
  selected?: Readonly<
    string | string[] | number | boolean | SelectedTaxon | SelectedTaxon[]
  >;
  values?: Readonly<
    Array<{ label?: string; value?: string | boolean | number }>
  >;
};

export type FormValues<Fields extends string> = Record<Fields, FormValue>;

function useInitialFormParameters<
  Fields extends string,
  FormParameters extends Record<Fields, unknown>
>(
  defaultFormValues: Readonly<FormValues<Fields>>
): {
  loading: boolean;
  initialFormValues: Readonly<FormValues<Fields>> | null;
} {
  const history = useHistory();
  const idsMaybeWithRange = useMemo(() => {
    // This only happens on first mount
    const urlSearchParams = new URLSearchParams(history.location?.search);
    for (const [key, value] of urlSearchParams) {
      if (key === 'ids') {
        return parseIdsFromSearchParams(value);
      }
    }
    return null;
  }, [history]);

  const accessionsFromParams = (idsMaybeWithRange || []).map(({ id }) => id);
  const url = getAccessionsURL(accessionsFromParams, { facets: null });
  const { loading: accessionsLoading, data: accessionsData } = useDataApi<{
    results: UniProtkbAPIModel[];
  }>(url);

  // Discard 'search' part of url to avoid url state issues.
  useEffect(() => {
    if (history.location?.search) {
      // eslint-disable-next-line uniprot-website/use-config-location
      history.replace({
        pathname: history.location.pathname,
      });
    }
  }, [history]);

  const initialFormValues = useMemo(() => {
    if (accessionsLoading) {
      return null;
    }

    // NOTE: we should use a similar logic to pre-fill fields based on querystring
    const parametersFromHistoryState = (
      history.location?.state as CustomLocationState<FormParameters>
    )?.parameters;

    // Might want to use structuredClone eventually, but it's really new and we
    // need to make sure that it's polyfilled by core-js first.
    // See: https://developer.mozilla.org/en-US/docs/Web/API/structuredClone
    const formValues: FormValues<Fields> = cloneDeep(defaultFormValues);
    // Parameters from state
    if (parametersFromHistoryState) {
      const defaultValuesEntries = Object.entries<FormValue>(defaultFormValues);
      // for every field of the form, get its value from the history state if
      // present, otherwise leave as the default value
      for (const [key, field] of defaultValuesEntries) {
        const fieldName = field.fieldName as keyof FormParameters;
        if (fieldName in parametersFromHistoryState) {
          formValues[key as Fields] = Object.freeze({
            ...field,
            selected: parametersFromHistoryState[fieldName],
          } as FormValue);
        }
      }
    }

    // ids parameter from the url has been passed so handle the fetched accessions once loaded
    if (!!accessionsData?.results?.length && idsMaybeWithRange) {
      const idToSequence = new Map(
        accessionsData.results.map((datum) => [datum.primaryAccession, datum])
      );
      const sequences = idsMaybeWithRange
        .map(({ id, start, end }) => {
          const entry = idToSequence.get(id);
          if (!entry) {
            // TODO: currently this will not be reached - if any accession fails in the accessions request
            // then the whole request fails. Leaving here in case this ever changes
            // dispatchMessages(
            //   addMessage({
            //     content: `ID ${id} not found`,
            //     format: MessageFormat.POP_UP,
            //     level: MessageLevel.WARNING,
            //   })
            // );
            return null;
          }
          const subsets = start && end ? [{ start, end }] : [];
          const fasta = entryToFASTAWithHeaders(entry, { subsets });
          return fasta;
        })
        .filter(Boolean)
        .join('\n\n');
      formValues['Sequence' as Fields] = Object.freeze({
        fieldName: 'sequence',
        selected: sequences,
      });
      const parsedSequences = sequenceProcessor(sequences);
      formValues['Name' as Fields] = Object.freeze({
        fieldName: 'name',
        selected: parsedSequences[0]?.name || '',
      });
    }

    return Object.freeze(formValues);
  }, [
    accessionsLoading,
    history.location?.state,
    defaultFormValues,
    accessionsData?.results,
    idsMaybeWithRange,
  ]);

  return {
    loading: !!idsMaybeWithRange?.length && accessionsLoading,
    initialFormValues,
  };
}

export default useInitialFormParameters;
