/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import {
  createWhitelistFilter,
  createBlacklistFilter,
} from 'redux-persist-transform-filter';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from './rootReducer';
import initialState, { RootAction, RootState } from './rootInitialState';
import toolsMiddleware from '../../tools/state/toolsMiddleware';

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  transforms: [
    createWhitelistFilter(
      'results',
      ['tableColumns', 'viewMode'], // save
      ['tableColumns', 'viewMode'] // load
    ),
    createBlacklistFilter(
      'query',
      ['clauses', 'queryString', 'namespace', 'searchTerms', 'evidences'] // ignore,
    ),
    createWhitelistFilter(
      'blast',
      ['jobs'], // save
      ['jobs'] // load
    ),
    createBlacklistFilter('entry', ['accession', 'data', 'publicationsData']),
  ],
};

// eslint-disable-next-line
const persistorReducer = persistReducer<any, RootAction>(
  persistConfig,
  rootReducer
);

function configureStore() {
  let store;

  if (process.env.NODE_ENV === 'development') {
    const debug = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    store = createStore<RootState, RootAction, any, any>(
      rootReducer,
      initialState,
      debug
        ? debug(applyMiddleware(thunkMiddleware, toolsMiddleware))
        : applyMiddleware(thunkMiddleware, toolsMiddleware)
    );
  } else {
    // store = createStore(
    //   persistorReducer,
    //   undefined,
    //   applyMiddleware(thunkMiddleware, toolsMiddleware)
    // );
    store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(thunkMiddleware, toolsMiddleware)
    );
  }
  return store;
}

export const store = configureStore();
export const persistor = persistStore(store);

export default store;
