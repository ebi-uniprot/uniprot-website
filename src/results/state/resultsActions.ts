import { action } from 'typesafe-actions';
import { Dispatch, Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import idx from 'idx';
import fetchData from '../../utils/fetchData';
import { RootState } from '../../state/state-types';
import 'regenerator-runtime/runtime';
import { UniProtkbAPIModel } from '../../model/uniprotkb/UniProtkbConverter';
import { Facet } from '../ResultsContainer';
import apiUrls from '../../utils/apiUrls';
import { Column } from '../../model/types/ColumnTypes';
import {
  ColumnSelectTab,
  FieldDatum,
  ReceivedFieldData,
  ReceivedField,
} from '../types/resultsTypes';

export const REQUEST_BATCH_OF_RESULTS = 'REQUEST_BATCH_OF_RESULTS';
export const RECEIVE_BATCH_OF_RESULTS = 'RECEIVE_BATCH_OF_RESULTS';
export const UPDATE_COLUMN_SORT = 'UPDATE_COLUMN_SORT';
export const CLEAR_RESULTS = 'CLEAR_RESULTS';
export const SWITCH_VIEW_MODE = 'SWITCH_VIEW_MODE';
export const RECEIVE_FIELDS = 'RECEIVE_FIELDS';
export const REQUEST_FIELDS = 'REQUEST_FIELDS';
export const UPDATE_SUMMARY_ACCESSION = 'UPDATE_SUMMARY_ACCESSION';
export const UPDATE_TABLE_COLUMNS = 'UPDATE_TABLE_COLUMNS';

export const receiveBatchOfResults = (
  url: string,
  data: Response['data'],
  nextUrl: string | undefined,
  totalNumberResults: number
) =>
  action(RECEIVE_BATCH_OF_RESULTS, {
    url,
    data,
    nextUrl,
    totalNumberResults,
    receivedAt: Date.now(),
  });
export const requestBatchOfResults = (url: string) =>
  action(REQUEST_BATCH_OF_RESULTS, { url });

const getNextUrlFromResponse = (
  link: string | null | undefined
): string | undefined => {
  if (!link) {
    return;
  }
  const re = /<([0-9a-zA-Z$\-_.+!*'(),?/:=&%]+)>; rel="next"/;
  const match = re.exec(link);
  if (match) {
    // eslint-disable-next-line consistent-return
    return match[1];
  }
};

export const clearResults = () => action(CLEAR_RESULTS);

type Response = {
  data: { results: UniProtkbAPIModel[]; facets: Facet[] };
  headers: {
    ['x-totalrecords']: number;
    link: string;
  };
};

export const fetchBatchOfResults = (url: string, state: RootState) => async (
  dispatch: Dispatch
) => {
  dispatch(requestBatchOfResults(url));
  fetchData(url).then((response: Response) => {
    const nextUrl = getNextUrlFromResponse(idx(response, o => o.headers.link));
    dispatch(
      receiveBatchOfResults(
        url,
        response.data,
        nextUrl,
        response.headers['x-totalrecords']
      )
    );
    if (response.data.results.length > 0 && !state.results.summaryAccession) {
      const firstAccession = response.data.results[0].primaryAccession;
      if (firstAccession) {
        dispatch(
          action(UPDATE_SUMMARY_ACCESSION, { accession: firstAccession })
        );
      }
    }
  });
  // .catch(error => console.error(error)); // the console creates a tslint ...
  // ... error but we want to catch this in the future
};

export const shouldFetchBatchOfResults = (url: string, state: RootState) => {
  const { isFetching, isFetched } = state.results.results;
  return !isFetching && !isFetched[url];
};

export const fetchBatchOfResultsIfNeeded = (url: string | undefined) => (
  dispatch: ThunkDispatch<RootState, void, Action>,
  getState: () => RootState
) => {
  if (url && shouldFetchBatchOfResults(url, getState())) {
    dispatch(fetchBatchOfResults(url, getState()));
  }
};

export const updateSummaryAccession = (accession: string) =>
  action(UPDATE_SUMMARY_ACCESSION, { accession });

export const switchViewMode = () => action(SWITCH_VIEW_MODE);

export const requestFields = () => action(REQUEST_FIELDS);

export const prepareFields = (fields: ReceivedField[]) =>
  fields.map(({ label, name }) => ({ id: name, label }));

export const prepareFieldData = (fieldData: ReceivedFieldData) => {
  const dataTab: FieldDatum[] = [];
  const linksTab: FieldDatum[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const linksAdded: any = {};
  fieldData.forEach(({ groupName, fields, isDatabase }) => {
    const group = {
      id: groupName,
      title: groupName,
      items: prepareFields(fields),
    };
    if (isDatabase) {
      if (!linksAdded[groupName]) {
        linksTab.push(group);
        linksAdded[groupName] = true;
      }
    } else {
      dataTab.push(group);
    }
  });
  return {
    [ColumnSelectTab.data]: dataTab,
    [ColumnSelectTab.links]: linksTab,
  };
};

export const receiveFields = (data: ReceivedFieldData) =>
  action(RECEIVE_FIELDS, {
    data: prepareFieldData(data),
    receivedAt: Date.now(),
  });

export const fetchFields = () => async (dispatch: Dispatch) => {
  dispatch(requestFields());
  return fetchData(apiUrls.resultsFields).then(response =>
    dispatch(receiveFields(response.data))
  );
};

export const shouldFetchFields = (state: RootState) => {
  const { fields } = state.results;
  return (
    !fields.isFetching &&
    (!fields.data.data.length || !fields.data.links.length)
  );
};

export const fetchFieldsIfNeeded = () => (
  dispatch: ThunkDispatch<RootState, void, Action>,
  getState: () => RootState
) => {
  if (shouldFetchFields(getState())) {
    dispatch(fetchFields());
  }
};

export const updateTableColumns = (tableColumns: Column[]) =>
  action(UPDATE_TABLE_COLUMNS, {
    tableColumns,
  });
