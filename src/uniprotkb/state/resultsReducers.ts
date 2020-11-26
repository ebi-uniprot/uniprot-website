import { ActionType } from 'typesafe-actions';
import * as resultsActions from './resultsActions';
import resultsInitialState, { ResultsState } from './resultsInitialState';

export type ResultAction = ActionType<typeof resultsActions>;
const resultsReducers = (
  state: ResultsState = resultsInitialState,
  action: ResultAction
) => {
  switch (action.type) {
    case resultsActions.REQUEST_FIELDS:
      return {
        ...state,
        fields: { ...state.fields, isFetching: true },
      };
    case resultsActions.RECEIVE_FIELDS:
      return {
        ...state,
        fields: { data: action.payload.data, isFetching: false },
      };
    case resultsActions.UPDATE_TABLE_COLUMNS: {
      return {
        ...state,
        tableColumns: {
          [action.payload.namespace]: action.payload.tableColumns,
        },
      };
    }
    default:
      return state;
  }
};

export default resultsReducers;
