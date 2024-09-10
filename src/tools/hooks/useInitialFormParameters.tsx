import { useEffect, useMemo, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { sequenceProcessor } from 'franklin-sites';

import { parseIdsFromSearchParams } from '../utils/urls';

import { Location, LocationToPath } from '../../app/config/urls';

import { SelectedTaxon } from '../types/toolsFormData';
import useGetFASTAFromAccesion from '../../shared/hooks/useGetFASTAFromAccession';

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

const alignmentLocations = new Set([
  LocationToPath[Location.Blast],
  LocationToPath[Location.Align],
]);

function useInitialFormParameters<
  Fields extends string,
  FormParameters extends Record<Fields, unknown>,
>(
  defaultFormValues: Readonly<FormValues<Fields>>
): {
  loading: boolean;
  initialFormValues: Readonly<FormValues<Fields>> | null;
} {
  const history = useHistory();
  // Keep initial history.location?.search as we later remove this in a useEffect hook
  const historyLocationSearch = useRef(history.location?.search).current;

  const parametersFromHistorySearch = useMemo(() => {
    if (!historyLocationSearch) {
      return null;
    }
    const parameters = Object.fromEntries<SelectedType>(
      new URLSearchParams(historyLocationSearch).entries()
    );
    // At this point everything is strings, change/parse specific fields
    if (parameters.ids && typeof parameters.ids === 'string') {
      parameters.ids = parameters.ids.split(/(?:\s+|,)/);
    }
    return parameters;
  }, [historyLocationSearch]);

  const idsMaybeWithRange = useMemo(() => {
    if (!alignmentLocations.has(history.location.pathname)) {
      return null;
    }
    if (parametersFromHistorySearch?.ids) {
      return parseIdsFromSearchParams(
        parametersFromHistorySearch.ids as string[]
      );
    }
    return null;
  }, [history.location.pathname, parametersFromHistorySearch]);

  const { loading: fastaLoading, fasta } =
    useGetFASTAFromAccesion(idsMaybeWithRange);

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
    if (fastaLoading) {
      return null;
    }

    const parametersFromHistoryState = (
      history.location?.state as CustomLocationState<FormParameters>
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
      if (LocationToPath[Location.Align] === history.location.pathname) {
        name = `${parsedSequences[0]?.name} +${parsedSequences.length - 1}`;
      }
      // By default, job names should be after each submitted sequence for BLAST, hence do not set the name for multiple sequences.
      if (
        LocationToPath[Location.Blast] === history.location.pathname &&
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
    history.location,
    parametersFromHistorySearch,
    fasta,
    defaultFormValues,
  ]);

  return {
    loading: fastaLoading,
    initialFormValues,
  };
}

export default useInitialFormParameters;
