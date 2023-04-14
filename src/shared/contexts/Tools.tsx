import {
  createContext,
  Dispatch,
  useReducer,
  useEffect,
  useRef,
  useMemo,
  ReactNode,
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
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const dispatchUsingMiddleware: Dispatch<ToolsAction> = useMemo(() => {
    const middleware = toolsMiddleware(dispatch, stateRef, messagesDispatch);

    return (action) => {
      middleware(action);
      dispatch(action);
    };
  }, [messagesDispatch]);

  return (
    <ToolsDispatchContext.Provider value={dispatchUsingMiddleware}>
      <ToolsStateContext.Provider value={state}>
        {children}
      </ToolsStateContext.Provider>
    </ToolsDispatchContext.Provider>
  );
};
