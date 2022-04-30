import { useEffect, useMemo, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { sequenceProcessor } from 'franklin-sites';

import useDataApi from '../../shared/hooks/useDataApi';
import { useMessagesDispatch } from '../../shared/contexts/Messages';

import { addMessage } from '../../messages/state/messagesActions';
import { parseIdsFromSearchParams } from '../utils/urls';
import { getAccessionsURL } from '../../shared/config/apiUrls';
import entryToFASTAWithHeaders from '../../shared/utils/entryToFASTAWithHeaders';

import { Location, LocationToPath } from '../../app/config/urls';

import { SelectedTaxon } from '../types/toolsFormData';
import { UniProtkbAPIModel } from '../../uniprotkb/adapters/uniProtkbConverter';
import { SearchResults } from '../../shared/types/results';
import {
  MessageFormat,
  MessageLevel,
} from '../../messages/types/messagesTypes';

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

const alignmentLocations = new Set([
  LocationToPath[Location.Blast],
  LocationToPath[Location.Align],
]);

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
  // Keep initial history.location?.search as we later remove this in a useEffect hook
  const historyLocationSearch = useRef(history.location?.search).current;
  const dispatchMessages = useMessagesDispatch();

  const parametersFromHistorySearch = useMemo(
    () => new URLSearchParams(historyLocationSearch),
    [historyLocationSearch]
  );

  const idsMaybeWithRange = useMemo(() => {
    if (!alignmentLocations.has(history.location.pathname)) {
      return null;
    }
    for (const [key, value] of parametersFromHistorySearch) {
      if (key === 'ids') {
        return parseIdsFromSearchParams(value);
      }
    }
    return null;
  }, [history.location.pathname, parametersFromHistorySearch]);

  const accessionsFromParams = (idsMaybeWithRange || []).map(({ id }) => id);
  const url = getAccessionsURL(accessionsFromParams, { facets: null });
  const { loading: accessionsLoading, data: accessionsData } =
    useDataApi<SearchResults<UniProtkbAPIModel>>(url);

  useEffect(() => {
    if (
      parametersFromHistorySearch.has('sequence') &&
      parametersFromHistorySearch.has('ids') &&
      idsMaybeWithRange?.length &&
      accessionsData
    ) {
      dispatchMessages(
        addMessage({
          content: (
            <>
              Found both <code>ids</code> and <code>sequence</code> in URL
              parameters. Sequence data will be loaded from <code>ids</code>:{' '}
              {`${idsMaybeWithRange
                .slice(0, 3)
                .map(({ id }) => id)
                .join(', ')}${idsMaybeWithRange.length > 3 ? ', …' : ''}`}
              .
            </>
          ),
          format: MessageFormat.POP_UP,
          level: MessageLevel.INFO,
          displayTime: 15_000,
        })
      );
    }
  }, [
    accessionsData,
    dispatchMessages,
    idsMaybeWithRange,
    parametersFromHistorySearch,
  ]);

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

    const parametersFromHistoryState = (
      history.location?.state as CustomLocationState<FormParameters>
    )?.parameters;

    // This will eventually be filled in
    const formValues: Partial<FormValues<Fields>> = {};
    if (parametersFromHistoryState || parametersFromHistorySearch) {
      const defaultValuesEntries = Object.entries<FormValue>(defaultFormValues);
      for (const [key, field] of defaultValuesEntries) {
        const fieldName = field.fieldName as keyof FormParameters;
        formValues[key as Fields] = Object.freeze({
          ...field,
          selected:
            // url params
            (parametersFromHistorySearch &&
              parametersFromHistorySearch.get(fieldName.toString())) ||
            // history state
            (parametersFromHistoryState &&
              parametersFromHistoryState[fieldName]) ||
            // default
            field.selected,
        } as FormValue);
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

    return Object.freeze(formValues as FormValues<Fields>);
  }, [
    accessionsLoading,
    history.location?.state,
    parametersFromHistorySearch,
    accessionsData?.results,
    idsMaybeWithRange,
    defaultFormValues,
  ]);

  return {
    loading: !!idsMaybeWithRange?.length && accessionsLoading,
    initialFormValues,
  };
}

export default useInitialFormParameters;
