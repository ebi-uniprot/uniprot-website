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

import {
  UserPreferences,
  UserPreferencesProvider,
} from '../contexts/UserPreferences';

type ExtraRenderOptions = {
  // For react-router
  history?: MemoryHistory<LocationState>;
  path?: string;
  // For custom user preferences context
  initialUserPreferences?: UserPreferences;
  // For redux
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  store?: any;
};

const Wrapper: FC<
  RenderOptions &
    SetRequired<
      ExtraRenderOptions,
      'history' | 'initialUserPreferences' | 'store'
    >
> = ({ children, path, history, initialUserPreferences, store }) => (
  <UserPreferencesProvider initialState={initialUserPreferences}>
    <ReduxProvider store={store}>
      <Router history={history}>
        {path ? <Route path={path} render={() => children} /> : children}
      </Router>
    </ReduxProvider>
  </UserPreferencesProvider>
);

const customRender = (
  ui: ReactElement,
  {
    route = '',
    path,
    history = createMemoryHistory({ initialEntries: [route] }),
    initialUserPreferences = {},
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
      <Wrapper
        path={path}
        history={history}
        initialUserPreferences={initialUserPreferences}
        store={store}
        {...props}
      />
    ),
    ...options,
  }),
  history,
  store,
});

export default customRender;
