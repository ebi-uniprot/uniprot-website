/**
 * This tries to follow what is detailed here:
 * https://testing-library.com/docs/react-testing-library/setup#custom-render
 */
import { ReactElement, Component, Dispatch } from 'react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory, LocationState } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import { render, RenderOptions } from '@testing-library/react';

import { SetRequired, JsonValue } from 'type-fest';

import { getDatabaseInfoMaps } from '../../uniprotkb/utils/database';

import {
  MessagesDispatchContext,
  MessagesStateContext,
} from '../contexts/Messages';
import { ToolsDispatchContext, ToolsStateContext } from '../contexts/Tools';
import { DatabaseInfoMapsContext } from '../contexts/DatabaseInfoMaps';

import { MessagesState } from '../../messages/state/messagesInitialState';
import { MessagesAction } from '../../messages/state/messagesReducers';
import { ToolsState } from '../../tools/state/toolsInitialState';
import { ToolsAction } from '../../tools/state/toolsReducers';

import databaseInfo from '../../uniprotkb/utils/__tests__/__mocks__/databaseInfo';

type ExtraRenderOptions = {
  // For react-router
  history?: MemoryHistory<LocationState>;
  path?: string;
  // For custom user preferences (used by useLocalStorage)
  initialLocalStorage?: Record<string, JsonValue>;
  // For app context
  messagesState?: MessagesState;
  messagesDispatch?: jest.Mock<Dispatch<MessagesAction>>;
  toolsState?: ToolsState;
  toolsDispatch?: jest.Mock<Dispatch<ToolsAction>>;
};

type WrapperProps = RenderOptions &
  SetRequired<
    ExtraRenderOptions,
    | 'history'
    | 'initialLocalStorage'
    | 'messagesState'
    | 'messagesDispatch'
    | 'toolsState'
    | 'toolsDispatch'
  >;

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
    const {
      children,
      path,
      history,
      messagesDispatch,
      messagesState,
      toolsDispatch,
      toolsState,
    } = this.props;
    return (
      <HelmetProvider>
        <Router history={history}>
          <MessagesDispatchContext.Provider value={messagesDispatch}>
            <MessagesStateContext.Provider value={messagesState}>
              <ToolsDispatchContext.Provider value={toolsDispatch}>
                <ToolsStateContext.Provider value={toolsState}>
                  <DatabaseInfoMapsContext.Provider value={dbInfoMaps}>
                    {path ? (
                      <Route path={path} render={() => children} />
                    ) : (
                      children
                    )}
                  </DatabaseInfoMapsContext.Provider>
                </ToolsStateContext.Provider>
              </ToolsDispatchContext.Provider>
            </MessagesStateContext.Provider>
          </MessagesDispatchContext.Provider>
        </Router>
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
    messagesState = {},
    messagesDispatch = jest.fn(),
    toolsState = {},
    toolsDispatch = jest.fn(),
    ...options
  }: RenderOptions &
    ExtraRenderOptions & {
      route?: string;
    } = {}
) => ({
  ...render(ui, {
    wrapper: (props) => (
      <Wrapper
        path={path}
        history={history}
        initialLocalStorage={initialLocalStorage}
        messagesState={messagesState}
        messagesDispatch={messagesDispatch}
        toolsState={toolsState}
        toolsDispatch={toolsDispatch}
        {...props}
      />
    ),
    ...options,
  }),
  history,
  messagesDispatch,
  toolsDispatch,
});

export default customRender;
