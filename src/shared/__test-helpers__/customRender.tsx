/**
 * This tries to follow what is detailed here:
 * https://testing-library.com/docs/react-testing-library/setup#custom-render
 */
import { render, type RenderOptions } from '@testing-library/react';
import {
  createMemoryHistory,
  type LocationState,
  type MemoryHistory,
} from 'history';
import {
  Component,
  type Dispatch,
  type ReactElement,
  type ReactNode,
} from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Route, Router } from 'react-router-dom';
import { type JsonValue, type SetRequired } from 'type-fest';

import { type MessagesState } from '../../messages/state/messagesInitialState';
import { type MessagesAction } from '../../messages/state/messagesReducers';
import databaseInfo from '../../uniprotkb/utils/__tests__/__mocks__/databaseInfo';
import { getDatabaseInfoMaps } from '../../uniprotkb/utils/database';
import { BotDetectionContext } from '../contexts/BotDetection';
import {
  MessagesDispatchContext,
  MessagesStateContext,
} from '../contexts/Messages';
import {
  DatabaseInfoMapsContext,
  UniProtDataVersionContext,
} from '../contexts/UniProtData';
import { type JobAction } from '../workers/jobs/state/actionHandler';
import { type JobsState } from '../workers/jobs/state/jobsInitialState';

type ExtraRenderOptions = {
  // For react-router
  history?: MemoryHistory<LocationState>;
  path?: string;
  // For custom user preferences (used by useLocalStorage)
  initialLocalStorage?: Record<string, JsonValue>;
  // For app context
  messagesState?: MessagesState;
  messagesDispatch?: jest.Mock<Dispatch<MessagesAction>>;
  JobsState?: JobsState;
  toolsDispatch?: jest.Mock<Dispatch<JobAction>>;
};

type WrapperProps = { children: ReactNode } & RenderOptions &
  SetRequired<
    ExtraRenderOptions,
    | 'history'
    | 'initialLocalStorage'
    | 'messagesState'
    | 'messagesDispatch'
    | 'JobsState'
    | 'toolsDispatch'
  >;

const dbInfoMaps = getDatabaseInfoMaps(databaseInfo);
const uniProtDataVersion = {
  releaseNumber: '2023_01',
  releaseDate: new Date('01-March-2023'),
};

class Wrapper extends Component<WrapperProps> {
  constructor(props: WrapperProps) {
    super(props);
    for (const [key, value] of Object.entries(props.initialLocalStorage)) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }

  // eslint-disable-next-line class-methods-use-this
  componentWillUnmount() {
    window.localStorage.clear();
  }

  render() {
    const { children, path, history, messagesDispatch, messagesState } =
      this.props;
    return (
      <HelmetProvider>
        <Router history={history}>
          <BotDetectionContext.Provider value="human">
            <MessagesDispatchContext.Provider value={messagesDispatch}>
              <MessagesStateContext.Provider value={messagesState}>
                <DatabaseInfoMapsContext.Provider value={dbInfoMaps}>
                  <UniProtDataVersionContext.Provider
                    value={uniProtDataVersion}
                  >
                    {path ? (
                      <Route path={path} render={() => children} />
                    ) : (
                      children
                    )}
                  </UniProtDataVersionContext.Provider>
                </DatabaseInfoMapsContext.Provider>
              </MessagesStateContext.Provider>
            </MessagesDispatchContext.Provider>
          </BotDetectionContext.Provider>
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
    JobsState = {},
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
        JobsState={JobsState}
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
