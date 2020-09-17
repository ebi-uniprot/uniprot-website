import { ActionType } from 'typesafe-actions';
import * as searchActions from './searchActions';
import {
  createEmptyClause,
  createPreSelectedClauses,
} from '../../query-builder/utils/clause';
import searchInitialState, { SearchState } from './searchInitialState';
import { Clause } from '../types/searchTypes';

export type SearchAction = ActionType<typeof searchActions>;

export const clause = (state: Clause, action: SearchAction) => {
  switch (action.type) {
    case searchActions.SELECT_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
        queryInput: action.payload.queryInput,
      };
    case searchActions.UPDATE_INPUT_VALUE:
      return {
        ...state,
        queryInput: {
          ...state.queryInput,
          stringValue: action.payload.value,
          id: action.payload.id,
        },
      };
    case searchActions.UPDATE_RANGE_VALUE:
      return {
        ...state,
        queryInput: {
          ...state.queryInput,
          [action.payload.from ? 'rangeFrom' : 'rangeTo']: action.payload.value,
        },
      };
    case searchActions.UPDATE_EVIDENCE:
      return {
        ...state,
        queryInput: {
          ...state.queryInput,
          evidenceValue: action.payload.value,
        },
      };
    case searchActions.UPDATE_LOGIC_OPERATOR:
      return {
        ...state,
        logicOperator: action.payload.value,
      };
    default:
      return state;
  }
};

const searchReducers = (
  state: SearchState = searchInitialState,
  action: SearchAction
): SearchState => {
  switch (action.type) {
    case searchActions.SELECT_SEARCH_TERM:
    case searchActions.UPDATE_INPUT_VALUE:
    case searchActions.UPDATE_RANGE_VALUE:
    case searchActions.UPDATE_EVIDENCE:
    case searchActions.UPDATE_LOGIC_OPERATOR:
      return {
        ...state,
        clauses: state.clauses.map((c) => {
          if (c.id !== action.payload.clauseId) {
            return c;
          }
          return clause(c, action);
        }),
      };
    case searchActions.SUBMIT_ADVANCED_QUERY:
      return {
        ...state,
        // queryString: createQueryString(state.clauses),
      };
    case searchActions.SET_PRE_SELECTED_CLAUSES:
      return {
        ...state,
        clauses: createPreSelectedClauses(),
      };
    case searchActions.ADD_CLAUSE:
      return {
        ...state,
        clauses: [...state.clauses, createEmptyClause()],
      };
    case searchActions.REMOVE_CLAUSE:
      if (state.clauses.length === 1) {
        return {
          ...state,
          clauses: [createEmptyClause()],
        };
      }
      return {
        ...state,
        clauses: state.clauses.filter((c) => c.id !== action.payload.clauseId),
      };
    case searchActions.UPDATE_CLAUSES:
      return {
        ...state,
        clauses: action.payload.clauses,
      };
    case searchActions.UPDATE_QUERY_STRING:
      return {
        ...state,
        // queryString: action.payload.queryString,
      };
    case searchActions.RESET_SEARCH_INPUT:
      return {
        ...state,
        // queryString: '',
      };
    default:
      return state;
  }
};

export default searchReducers;
