import { combineReducers, Reducer } from 'redux';

import { RootState, RootAction } from './rootInitialState';

import resultsReducers from '../../uniprotkb/state/resultsReducers';
import messagesReducers from '../../messages/state/messagesReducers';
import toolsReducers from '../../tools/state/toolsReducers';

const appReducer = combineReducers<RootState>({
  results: resultsReducers,
  messages: messagesReducers,
  tools: toolsReducers,
});

const rootReducer: Reducer<RootState, RootAction> = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
