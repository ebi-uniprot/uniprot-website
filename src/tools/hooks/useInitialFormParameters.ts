import { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import deepFreeze from 'deep-freeze';
import { keyBy } from 'lodash-es';

import useDataApi from '../../shared/hooks/useDataApi';

import { parseIdsFromSearchParams } from '../utils/urls';
import { getAccessionsURL } from '../../shared/config/apiUrls';
import entryToFASTAWithHeaders from '../../shared/utils/entryToFASTAWithHeaders';
import * as logging from '../../shared/utils/logging';

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
  const location = useLocation();
  const history = useHistory();

  const idsMaybeWithRange = useMemo(() => {
    const parametersFromSearch = new URLSearchParams(location?.search);
    for (const [key, value] of parametersFromSearch) {
      if (key === 'ids') {
        return parseIdsFromSearchParams(value);
      }
    }
    return null;
  }, [location?.search]);
  const accessions = (idsMaybeWithRange || []).map(({ id }) => id);
  const url = getAccessionsURL(accessions, { facets: null });
  const { loading: accessionsLoading, data: accessionsData } = useDataApi<{
    results: UniProtkbAPIModel[];
  }>(url);

  // Discard 'search' part of url to avoid url state issues.
  useEffect(() => {
    // eslint-disable-next-line uniprot-website/use-config-location
    history.replace({ pathname: history.location.pathname });
  }, [history]);

  const initialFormValues = useMemo(() => {
    if (idsMaybeWithRange?.length && accessionsLoading) {
      return null;
    }

    // NOTE: we should use a similar logic to pre-fill fields based on querystring
    const parametersFromHistoryState = (
      location?.state as CustomLocationState<FormParameters>
    )?.parameters;
    if (parametersFromHistoryState || accessionsData) {
      // if we get here, we got parameters passed with the location update to
      // use as pre-filled fields
      const formValues: Partial<FormValues<Fields>> = {};

      const defaultValuesEntries = Object.entries<FormValue>(defaultFormValues);
      // for every field of the form, get its value from the history state if
      // present, otherwise go for the default one
      for (const [key, field] of defaultValuesEntries) {
        formValues[key as Fields] = {
          ...field,
          selected:
            parametersFromHistoryState?.[
              field.fieldName as keyof FormParameters
            ] || field.selected,
        } as FormValue;
      }

      if (accessionsData && idsMaybeWithRange) {
        const idToSequence = keyBy(
          accessionsData.results,
          ({ primaryAccession }) => primaryAccession
        );
        const sequences = idsMaybeWithRange
          .map(({ id, start, end }) => {
            if (!idToSequence[id]) {
              logging.warn(`${id} not found in fetched sequences`);
              // TODO:
              return null;
            }
            const entry = idToSequence[id];
            const subsets = start && end ? [{ start, end }] : [];
            const fasta = entryToFASTAWithHeaders(entry, { subsets });
            return fasta;
          })
          .filter(Boolean)
          .join('\n\n');
        // TODO: fix this `as`
        formValues['Sequence' as Fields] = {
          fieldName: 'sequence',
          selected: sequences,
        };
      }
      return deepFreeze(formValues as FormValues<Fields>);
    }
    // otherwise, pass the default values
    return defaultFormValues;
  }, [
    accessionsLoading,
    defaultFormValues,
    accessionsData,
    location?.state,
    idsMaybeWithRange,
  ]);
  return {
    loading: !!idsMaybeWithRange?.length && accessionsLoading,
    initialFormValues,
  };
}

export default useInitialFormParameters;
