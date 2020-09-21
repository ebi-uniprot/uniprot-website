import { action } from 'typesafe-actions';
import {
  SearchTermType,
  Operator,
  Clause,
  dataType,
  Namespace,
} from '../types/searchTypes';

export const SELECT_SEARCH_TERM = 'SELECT_SEARCH_TERM';
export const UPDATE_INPUT_VALUE = 'UPDATE_INPUT_VALUE';
export const UPDATE_EVIDENCE = 'UPDATE_EVIDENCE';
export const UPDATE_RANGE_VALUE = 'UPDATE_RANGE_VALUE';
export const UPDATE_LOGIC_OPERATOR = 'UPDATE_LOGIC_OPERATOR';
export const HANDLE_FIELD_SELECT = 'HANDLE_FIELD_SELECT';
export const SUBMIT_ADVANCED_QUERY = 'SUBMIT_ADVANCED_QUERY';
export const SET_PRE_SELECTED_CLAUSES = 'SET_PRE_SELECTED_CLAUSES';
export const ADD_CLAUSE = 'ADD_CLAUSE';
export const REMOVE_CLAUSE = 'REMOVE_CLAUSE';
export const UPDATE_CLAUSES = 'UPDATE_CLAUSES';
export const UPDATE_QUERY_STRING = 'UPDATE_QUERY_STRING';
export const RESET = 'RESET';
export const RESET_SEARCH_INPUT = 'RESET_SEARCH_INPUT';
export const UPDATE_NAMESPACE = 'UPDATE_NAMESPACE';

export const selectSearchTerm = (
  clauseId: string,
  searchTerm: SearchTermType
) =>
  action(SELECT_SEARCH_TERM, {
    clauseId,
    searchTerm,
    queryInput:
      searchTerm.dataType === dataType.enum &&
      searchTerm.values &&
      searchTerm.values.length
        ? { stringValue: searchTerm.values[0].value }
        : {},
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

export const setPreSelectedClauses = () => action(SET_PRE_SELECTED_CLAUSES);

export const addClause = () => action(ADD_CLAUSE);

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
