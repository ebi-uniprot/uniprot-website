import {
  createContext,
  Dispatch,
  useReducer,
  useEffect,
  useRef,
  ReactNode,
  useMemo,
} from 'react';

import useMessagesDispatch from '../hooks/useMessagesDispatch';

import toolsInitialState, {
  ToolsState,
} from '../../tools/state/toolsInitialState';
import toolsMiddleware from '../../tools/state/toolsMiddleware';
import toolsReducers, { ToolsAction } from '../../tools/state/toolsReducers';

export const ToolsDispatchContext = createContext<Dispatch<ToolsAction>>(() => {
  /* */
});

export const ToolsStateContext = createContext<ToolsState>(toolsInitialState);

export const ToolsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(toolsReducers, toolsInitialState);
  const messagesDispatch = useMessagesDispatch();

  const stateRef = useRef(state);
  // on state change
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // on unmount, to avoid the middleware to work on unmounted state
  useEffect(() => () => {
    stateRef.current = {};
  });

  const dispatchUsingMiddleware: Dispatch<ToolsAction> = useMemo(
    () => toolsMiddleware(dispatch, stateRef, messagesDispatch),
    [messagesDispatch]
  );

  return (
    <ToolsDispatchContext.Provider value={dispatchUsingMiddleware}>
      <ToolsStateContext.Provider value={state}>
        {children}
      </ToolsStateContext.Provider>
    </ToolsDispatchContext.Provider>
  );
};
