import { combineReducers, Reducer } from 'redux';

import { RootState, RootAction } from './rootInitialState';

import toolsReducers from '../../tools/state/toolsReducers';

const appReducer = combineReducers<RootState>({
  tools: toolsReducers,
});

const rootReducer: Reducer<RootState, RootAction> = (state, action) =>
  appReducer(state, action);

export default rootReducer;
