/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './rootReducer';
import initialState from './rootInitialState';

import toolsMiddleware from '../../tools/state/toolsMiddleware';

type WindowWithMaybeDevtools = typeof window & {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
};

let composeEnhancers = compose;
if (process.env.NODE_ENV === 'development') {
  composeEnhancers =
    (window as WindowWithMaybeDevtools).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    compose;
}

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunkMiddleware, toolsMiddleware))
);

export default store;
