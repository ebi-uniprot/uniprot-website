import { action } from 'typesafe-actions';
import { Clause } from '../../query-builder/types/searchTypes';
import { Namespace } from '../../shared/types/namespaces';

export const UPDATE_EVIDENCE = 'UPDATE_EVIDENCE';
export const UPDATE_RANGE_VALUE = 'UPDATE_RANGE_VALUE';
export const HANDLE_FIELD_SELECT = 'HANDLE_FIELD_SELECT';
export const SUBMIT_ADVANCED_QUERY = 'SUBMIT_ADVANCED_QUERY';
export const SET_PRE_SELECTED_CLAUSES = 'SET_PRE_SELECTED_CLAUSES';
export const REMOVE_CLAUSE = 'REMOVE_CLAUSE';
export const UPDATE_CLAUSES = 'UPDATE_CLAUSES';
export const UPDATE_QUERY_STRING = 'UPDATE_QUERY_STRING';
export const RESET = 'RESET';
export const RESET_SEARCH_INPUT = 'RESET_SEARCH_INPUT';
export const UPDATE_NAMESPACE = 'UPDATE_NAMESPACE';

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

export const submitAdvancedQuery = () => action(SUBMIT_ADVANCED_QUERY);

export const setPreSelectedClauses = () => action(SET_PRE_SELECTED_CLAUSES);

export const removeClause = (clauseId: string) =>
  action(REMOVE_CLAUSE, {
    clauseId,
  });

export const updateClauses = (clauses: Clause[]) =>
  action(UPDATE_CLAUSES, {
    clauses,
  });

export const updateQueryString = (queryString: string) =>
  action(UPDATE_QUERY_STRING, {
    queryString,
  });

export const reset = () => action(RESET);

export const resetSearchInput = () => action(RESET_SEARCH_INPUT);

export const updateNamespace = (namespace: Namespace) =>
  action(UPDATE_NAMESPACE, { namespace });
