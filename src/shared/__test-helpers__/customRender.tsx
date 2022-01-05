/**
 * This tries to follow what is detailed here:
 * https://testing-library.com/docs/react-testing-library/setup#custom-render
 */
import { ReactElement, Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory, LocationState } from 'history';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore, Store } from 'redux';
import { HelmetProvider } from 'react-helmet-async';
import { render, RenderOptions } from '@testing-library/react';

import { SetRequired, JsonValue } from 'type-fest';

import { getDatabaseInfoMaps } from '../../uniprotkb/utils/database';

import rootReducer from '../../app/state/rootReducer';

import { RootState } from '../../app/state/rootInitialState';
import { DatabaseInfoMapsContext } from '../contexts/DatabaseInfoMaps';
import databaseInfo from '../../uniprotkb/utils/__tests__/__mocks__/databaseInfo';

type ExtraRenderOptions = {
  // For react-router
  history?: MemoryHistory<LocationState>;
  path?: string;
  /**
   * For custom user preferences (used by useLocalStorage)
   */
  initialLocalStorage?: Record<string, JsonValue>;
  // For redux
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  store?: Store<RootState>;
};

type WrapperProps = RenderOptions &
  SetRequired<ExtraRenderOptions, 'history' | 'initialLocalStorage' | 'store'>;

const dbInfoMaps = getDatabaseInfoMaps(databaseInfo);

class Wrapper extends Component<WrapperProps> {
  constructor(props: WrapperProps) {
    super(props);
    for (const [key, value] of Object.entries(props.initialLocalStorage)) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }

  componentWillUnmount() {
    window.localStorage.clear();
  }

  render() {
    const { children, path, history, store } = this.props;
    return (
      <HelmetProvider>
        <ReduxProvider store={store}>
          <DatabaseInfoMapsContext.Provider value={dbInfoMaps}>
            <Router history={history}>
              {path ? <Route path={path} render={() => children} /> : children}
            </Router>
          </DatabaseInfoMapsContext.Provider>
        </ReduxProvider>
      </HelmetProvider>
    );
  }
}

const customRender = (
  ui: ReactElement,
  {
    route = '',
    path,
    history = createMemoryHistory({ initialEntries: [route] }),
    initialLocalStorage = {},
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
        initialLocalStorage={initialLocalStorage}
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
