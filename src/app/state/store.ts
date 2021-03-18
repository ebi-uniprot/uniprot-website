import { createStore, applyMiddleware, compose } from 'redux';

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
  composeEnhancers(applyMiddleware(toolsMiddleware))
);

export default store;
