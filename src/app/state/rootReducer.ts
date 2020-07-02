import { combineReducers, Reducer } from 'redux';

import initialState, { RootState, RootAction } from './rootInitialState';

import searchReducers from '../../uniprotkb/state/searchReducers';
import resultsReducers from '../../uniprotkb/state/resultsReducers';
import messagesReducers from '../../messages/state/messagesReducers';
import toolsReducers from '../../tools/state/toolsReducers';

const appReducer = combineReducers<RootState>({
  query: searchReducers,
  results: resultsReducers,
  messages: messagesReducers,
  tools: toolsReducers,
});

const rootReducer: Reducer<RootState, RootAction> = (state, action) => {
  if (action.type === 'RESET') {
    return initialState;
  }

  return appReducer(state, action);
};

export default rootReducer;
