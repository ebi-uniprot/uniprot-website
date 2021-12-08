import { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import deepFreeze from 'deep-freeze';
import { keyBy, cloneDeep } from 'lodash-es';

import useDataApi from '../../shared/hooks/useDataApi';

import { parseIdsFromSearchParams } from '../utils/urls';
import { getAccessionsURL } from '../../shared/config/apiUrls';
import entryToFASTAWithHeaders from '../../shared/utils/entryToFASTAWithHeaders';

import { SelectedTaxon } from '../types/toolsFormData';
import { UniProtkbAPIModel } from '../../uniprotkb/adapters/uniProtkbConverter';

interface CustomLocationState<T> {
  parameters?: Partial<T>;
}

type FormValue = {
  fieldName: string;
  selected?: Readonly<
    string | string[] | number | boolean | SelectedTaxon | SelectedTaxon[]
  >;
  values?: Readonly<
    Array<{ label?: string; value?: string | boolean | number }>
  >;
};

type FormValues<Fields extends string> = Record<Fields, FormValue>;

function useInitialFormParameters<
  Fields extends string,
  FormParameters extends Record<Fields, unknown>
>(defaultFormValues: Readonly<FormValues<Fields>>) {
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
    // eslint-disable-next-line uniprot-website/use-config-location
    history.replace({ pathname: history.location.pathname });
  }, [history]);

  const initialFormValues = useMemo(() => {
    if (accessionsLoading) {
      return null;
    }

    // NOTE: we should use a similar logic to pre-fill fields based on querystring
    const parametersFromHistoryState = (
      history.location?.state as CustomLocationState<FormParameters>
    )?.parameters;

    const formValues: FormValues<Fields> = cloneDeep(defaultFormValues);

    // Parameters from state
    if (parametersFromHistoryState) {
      const defaultValuesEntries = Object.entries<FormValue>(defaultFormValues);
      // for every field of the form, get its value from the history state if
      // present, otherwise go for the default one
      // TODO: only overwrite the values provided by the state
      for (const [key, field] of defaultValuesEntries) {
        formValues[key as Fields] = {
          ...field,
          selected:
            parametersFromHistoryState?.[
              field.fieldName as keyof FormParameters
            ] || field.selected,
        } as FormValue;
      }
    }

    // ids parameter from the url has been passed so handle the fetched accessions once loaded
    if (!!accessionsData?.results?.length && idsMaybeWithRange) {
      const idToSequence = keyBy(
        accessionsData.results,
        ({ primaryAccession }) => primaryAccession
      );
      const sequences = idsMaybeWithRange
        .map(({ id, start, end }) => {
          if (!idToSequence[id]) {
            // TODO: show user a message
            return null;
          }
          const entry = idToSequence[id];
          const subsets = start && end ? [{ start, end }] : [];
          const fasta = entryToFASTAWithHeaders(entry, { subsets });
          return fasta;
        })
        .filter(Boolean)
        .join('\n\n');
      formValues['Sequence' as Fields] = {
        fieldName: 'sequence',
        selected: sequences,
      };
    }

    return deepFreeze(formValues);
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
