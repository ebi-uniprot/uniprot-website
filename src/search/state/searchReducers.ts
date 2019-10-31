import { ActionType } from 'typesafe-actions';
import * as searchActions from './searchActions';
import { createEmptyClause, createPreSelectedClauses } from '../utils/clause';
import createQueryString from '../utils/QueryStringGenerator';
import searchInitialState, { SearchState } from './searchInitialState';
import { Clause } from '../types/searchTypes';

export type SearchAction = ActionType<typeof searchActions>;

export const clause = (state: Clause, action: SearchAction) => {
  switch (action.type) {
    case searchActions.SELECT_SEARCH_TERM:
      return {
        ...state,
        searchTerm: action.payload.searchTerm,
        queryInput: {},
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

export const searchTerms = (
  state: SearchState['searchTerms'],
  action: SearchAction
) => {
  switch (action.type) {
    case searchActions.REQUEST_SEARCH_TERMS:
      return {
        ...state,
        isFetching: true,
      };
    case searchActions.RECEIVE_SEARCH_TERMS:
      return {
        ...state,
        isFetching: false,
        data: action.payload.data,
        lastUpdated: action.payload.receivedAt,
      };
    default:
      return state;
  }
};

export const evidences = (
  state: SearchState['evidences'],
  action: SearchAction
) => {
  switch (action.type) {
    case searchActions.REQUEST_EVIDENCES:
      return {
        ...state,
        [action.payload.evidencesType]: {
          ...state[action.payload.evidencesType],
          isFetching: true,
        },
      };
    case searchActions.RECEIVE_EVIDENCES:
      return {
        ...state,
        [action.payload.evidencesType]: {
          isFetching: false,
          data: action.payload.data,
          lastUpdated: action.payload.receivedAt,
        },
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
        clauses: state.clauses.map(c => {
          if (c.id !== action.payload.clauseId) {
            return c;
          }
          return clause(c, action);
        }),
      };
    case searchActions.SUBMIT_ADVANCED_QUERY:
      return {
        ...state,
        queryString: createQueryString(state.clauses),
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
        clauses: state.clauses.filter(c => c.id !== action.payload.clauseId),
      };
    case searchActions.UPDATE_CLAUSES:
      return {
        ...state,
        clauses: action.payload.clauses,
      };
    case searchActions.REQUEST_SEARCH_TERMS:
    case searchActions.RECEIVE_SEARCH_TERMS:
      return {
        ...state,
        searchTerms: searchTerms(state.searchTerms, action),
      };
    case searchActions.REQUEST_EVIDENCES:
    case searchActions.RECEIVE_EVIDENCES:
      return {
        ...state,
        evidences: evidences(state.evidences, action),
      };
    case searchActions.UPDATE_QUERY_STRING: {
      return {
        ...state,
        queryString: action.payload.queryString,
      };
    }
    default:
      return state;
  }
};

export default searchReducers;
