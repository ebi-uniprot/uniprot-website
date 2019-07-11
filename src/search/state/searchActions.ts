import 'regenerator-runtime/runtime';
import { Dispatch, Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { action } from 'typesafe-actions';
import fetchData from '../../utils/fetchData';
import apiUrls from '../../utils/apiUrls';
import {
  SearchTermType,
  Operator,
  EvidenceType,
  Clause,
} from '../types/searchTypes';
import { RootState } from '../../state/state-types';

export const SELECT_SEARCH_TERM = 'SELECT_SEARCH_TERM';
export const UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE';
export const UPDATE_EVIDENCE = 'UPDATE_EVIDENCE';
export const UPDATE_RANGE_VALUE = 'UPDATE_RANGE_VALUE';
export const UPDATE_LOGIC_OPERATOR = 'UPDATE_LOGIC_OPERATOR';
export const HANDLE_FIELD_SELECT = 'HANDLE_FIELD_SELECT';
export const SUBMIT_ADVANCED_QUERY = 'SUBMIT_ADVANCED_QUERY';
export const ADD_CLAUSE = 'ADD_CLAUSE';
export const REMOVE_CLAUSE = 'REMOVE_CLAUSE';
export const REQUEST_SEARCH_TERMS = 'REQUEST_SEARCH_TERMS';
export const RECEIVE_SEARCH_TERMS = 'RECEIVE_SEARCH_TERMS';
export const REQUEST_EVIDENCES = 'REQUEST_EVIDENCES';
export const RECEIVE_EVIDENCES = 'RECEIVE_EVIDENCES';
export const UPDATE_CLAUSES = 'UPDATE_CLAUSES';
export const UPDATE_QUERY_STRING = 'UPDATE_QUERY_STRING';
export const RESET = 'RESET';

export const selectSearchTerm = (
  clauseId: string,
  searchTerm: SearchTermType
) =>
  action(SELECT_SEARCH_TERM, {
    clauseId,
    searchTerm,
  });

export const updateInputValue = (
  clauseId: string,
  value: string,
  id?: string
) =>
  action(UPDATE_INPUT_VALUE, {
    clauseId,
    value,
    id,
  });

export const updateEvidence = (clauseId: string, value: string) =>
  action(UPDATE_EVIDENCE, {
    clauseId,
    value,
  });

export const updateRangeValue = (
  clauseId: string,
  value: string,
  from?: boolean
) =>
  action(UPDATE_RANGE_VALUE, {
    clauseId,
    value,
    from,
  });

export const updateLogicOperator = (clauseId: string, value: Operator) =>
  action(UPDATE_LOGIC_OPERATOR, {
    clauseId,
    value,
  });

export const submitAdvancedQuery = () => action(SUBMIT_ADVANCED_QUERY);

export const addClause = () => action(ADD_CLAUSE);

export const removeClause = (clauseId: string) =>
  action(REMOVE_CLAUSE, {
    clauseId,
  });

export const requestSearchTerms = () => action(REQUEST_SEARCH_TERMS);

export const receiveSearchTerms = (data: SearchTermType[]) =>
  action(RECEIVE_SEARCH_TERMS, {
    data,
    receivedAt: Date.now(),
  });

export const updateClauses = (clauses: Clause[]) =>
  action(UPDATE_CLAUSES, {
    clauses,
  });

export const fetchSearchTerms = () => async (dispatch: Dispatch) => {
  dispatch(requestSearchTerms());
  return fetchData(apiUrls.advanced_search_terms).then(response =>
    dispatch(receiveSearchTerms(response.data))
  );
};

export const shouldFetchSearchTerms = (state: RootState) => {
  const { searchTerms } = state.query;
  return !searchTerms.isFetching && !searchTerms.data.length;
};

export const fetchSearchTermsIfNeeded = () => (
  dispatch: ThunkDispatch<RootState, void, Action>,
  getState: () => RootState
) => {
  if (shouldFetchSearchTerms(getState())) {
    dispatch(fetchSearchTerms());
  }
};

export const requestEvidences = (evidencesType: EvidenceType) =>
  action(REQUEST_EVIDENCES, {
    evidencesType,
  });

export const receiveEvidences = (data: any, evidencesType: EvidenceType) =>
  action(RECEIVE_EVIDENCES, {
    data,
    evidencesType,
    receivedAt: Date.now(),
  });

export const fetchEvidences = (evidencesType: EvidenceType) => async (
  dispatch: ThunkDispatch<RootState, void, Action>
) => {
  const url = apiUrls.evidences[evidencesType];
  dispatch(requestEvidences(evidencesType));
  return fetchData(url).then(response =>
    dispatch(receiveEvidences(response.data, evidencesType))
  );
};

export const shouldFetchEvidences = (
  state: RootState,
  evidenceType: EvidenceType
) => {
  const evidences = state.query.evidences[evidenceType];
  return !evidences.isFetching && !evidences.data.length;
};

export const fetchEvidencesIfNeeded = (evidencesType: EvidenceType) => (
  dispatch: ThunkDispatch<RootState, void, Action>,
  getState: () => RootState
) => {
  if (shouldFetchEvidences(getState(), evidencesType)) {
    dispatch(fetchEvidences(evidencesType));
  }
};

export const updateQueryString = (queryString: string) =>
  action(UPDATE_QUERY_STRING, {
    queryString,
  });

export const reset = () => action(RESET);
