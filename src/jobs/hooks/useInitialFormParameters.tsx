import { sequenceProcessor } from 'franklin-sites';
import { useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';

import { Location, LocationToPath } from '../../app/config/urls';
import useGetFASTAFromAccesion from '../../shared/hooks/useGetFASTAFromAccession';
import { SelectedTaxon } from '../types/jobsFormData';
import { parseIdsFromSearchParams } from '../utils/urls';

interface CustomLocationState<T> {
  parameters?: Partial<T>;
}

type SelectedType =
  | string
  | string[]
  | number
  | boolean
  | SelectedTaxon
  | SelectedTaxon[];

export type FormValue = {
  fieldName: string;
  selected?: Readonly<SelectedType>;
  values?: Readonly<
    Array<{ label?: string; value?: string | boolean | number }>
  >;
};

export type FormValues<Fields extends string> = Record<Fields, FormValue>;

function useInitialFormParameters<
  Fields extends string,
  FormParameters extends Record<Fields, unknown>,
>(
  defaultFormValues: Readonly<FormValues<Fields>>
): {
  loading: boolean;
  initialFormValues: Readonly<FormValues<Fields>> | null;
} {
  const navigate = useNavigate();
  const { pathname, search, state } = useLocation();
  const [searchParams] = useSearchParams();
  // Keep initial searchParams as we later remove this in a useEffect hook
  const historyLocationSearch = useRef(searchParams).current;

  const parametersFromHistorySearch = useMemo(() => {
    const parameters = Object.fromEntries<SelectedType>(
      historyLocationSearch.entries()
    );
    // At this point everything is strings, change/parse specific fields
    if (parameters.ids && typeof parameters.ids === 'string') {
      parameters.ids = parameters.ids.split(/(?:\s+|,)/);
    }
    return parameters;
  }, [historyLocationSearch]);

  const idsMaybeWithRange = useMemo(() => {
    if (!(pathname.includes('blast') || pathname.includes('align'))) {
      return null;
    }
    if (parametersFromHistorySearch.ids) {
      return parseIdsFromSearchParams(
        parametersFromHistorySearch.ids as string[]
      );
    }
    return null;
  }, [pathname, parametersFromHistorySearch]);

  const { loading: fastaLoading, fasta } =
    useGetFASTAFromAccesion(idsMaybeWithRange);

  // Discard 'search' part of url to avoid url state issues.
  useEffect(() => {
    // If search and only has the initial '?'
    if (search && search.length > 1) {
      navigate(pathname, {
        replace: true,
      });
    }
  }, [navigate, pathname, search]);

  const initialFormValues = useMemo(() => {
    if (fastaLoading) {
      return null;
    }

    const parametersFromHistoryState = (
      state as CustomLocationState<FormParameters>
    )?.parameters;

    // This will eventually be filled in
    const formValues: Partial<FormValues<Fields>> = {};
    for (const [key, field] of Object.entries<FormValue>(defaultFormValues)) {
      formValues[key as Fields] = Object.freeze({
        ...field,
        selected:
          // url params
          parametersFromHistorySearch?.[field.fieldName] ||
          // history state
          parametersFromHistoryState?.[
            field.fieldName as keyof FormParameters
          ] ||
          // default
          field.selected,
      } as FormValue);
    }

    // ids parameter from the url has been passed so handle the fetched accessions once loaded
    if (fasta) {
      const sequences = [
        // load initial sequence value to prepend with the ones loaded from IDs
        (
          formValues['Sequence' as Fields]?.selected as string | undefined
        )?.trim(),
        fasta,
      ]
        .filter(Boolean)
        .join('\n\n');

      formValues['Sequence' as Fields] = Object.freeze({
        fieldName: 'sequence',
        selected: sequences,
      });
      const parsedSequences = sequenceProcessor(sequences);

      let name = parsedSequences[0]?.name;
      // Job name for Align is taken after the first sequence followed by number of sequences
      if (LocationToPath[Location.Align] === pathname) {
        name = `${parsedSequences[0]?.name} +${parsedSequences.length - 1}`;
      }
      // By default, job names should be after each submitted sequence for BLAST, hence do not set the name for multiple sequences.
      if (
        LocationToPath[Location.Blast] === pathname &&
        parsedSequences.length > 1
      ) {
        name = '';
      }
      formValues['Name' as Fields] = Object.freeze({
        fieldName: 'name',
        selected: name,
      });
    }

    return Object.freeze(formValues as FormValues<Fields>);
  }, [
    fastaLoading,
    state,
    fasta,
    defaultFormValues,
    parametersFromHistorySearch,
    pathname,
  ]);

  return {
    loading: fastaLoading,
    initialFormValues,
  };
}

export default useInitialFormParameters;
