import { combineReducers } from 'redux';
import initialState, { RootState, RootAction } from './rootInitialState';
import searchReducers from '../../uniprotkb/state/searchReducers';
import resultsReducers from '../../uniprotkb/state/resultsReducers';
import entryReducers from '../../uniprotkb/state/entryReducers';
import messagesReducers from '../../messages/state/messagesReducers';

const appReducer = combineReducers({
  query: searchReducers,
  results: resultsReducers,
  entry: entryReducers,
  messages: messagesReducers,
});

const rootReducer = (state: RootState | undefined, action: RootAction) => {
  if (action.type === 'RESET') {
    return initialState;
  }

  return appReducer(state, action);
};

export default rootReducer;
