/* eslint-disable */
import { ReactElement } from 'react';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';

import rootReducer from '../../app/state/rootReducer';

type RenderOptions = {
  route?: string;
  history?: MemoryHistory<any>;
  path?: string;
  initialState?: any;
  store?: any;
};

/**
 * @deprecated You should probably use `customRender()` instead
 */
const renderWithRedux = (
  ui: ReactElement,
  {
    route = '',
    history = createMemoryHistory({ initialEntries: [route] }),
    path,
    initialState,
    store = createStore(rootReducer, initialState),
  }: RenderOptions = {}
) => {
  return {
    ...render(
      <Provider store={store}>
        <Router history={history}>
          {path ? <Route path={path} render={() => ui} /> : ui}
        </Router>
      </Provider>
    ),
    store,
    history,
  };
};

export default renderWithRedux;
