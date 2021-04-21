/**
 * This tries to follow what is detailed here:
 * https://testing-library.com/docs/react-testing-library/setup#custom-render
 */
import { FC, ReactElement } from 'react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory, LocationState } from 'history';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore } from 'redux';
import { render, RenderOptions } from '@testing-library/react';
import { SetRequired } from 'type-fest';

import rootReducer from '../../app/state/rootReducer';

type ExtraRenderOptions = {
  // For react-router
  history?: MemoryHistory<LocationState>;
  path?: string;
  // For redux
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  store?: any;
};

const Wrapper: FC<
  RenderOptions & SetRequired<ExtraRenderOptions, 'history' | 'store'>
> = ({ children, path, history, store }) => (
  <ReduxProvider store={store}>
    <Router history={history}>
      {path ? <Route path={path} render={() => children} /> : children}
    </Router>
  </ReduxProvider>
);

const customRender = (
  ui: ReactElement,
  {
    route = '',
    path,
    history = createMemoryHistory({ initialEntries: [route] }),
    initialState,
    store = createStore(rootReducer, initialState),
    ...options
  }: RenderOptions &
    ExtraRenderOptions & {
      route?: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      initialState?: any;
    } = {}
) => ({
  ...render(ui, {
    wrapper: (props) => (
      <Wrapper path={path} history={history} store={store} {...props} />
    ),
    ...options,
  }),
  history,
  store,
});

export default customRender;
