import {
  createContext,
  Dispatch,
  FC,
  useReducer,
  useEffect,
  useRef,
  useMemo,
} from 'react';

import { useMessagesDispatch } from './Messages';

import toolsInitialState, {
  ToolsState,
} from '../../tools/state/toolsInitialState';
import toolsMiddleware from '../../tools/state/toolsMiddleware';
import toolsReducers, { ToolsAction } from '../../tools/state/toolsReducers';
import getContextHook from './getContextHook';

export const ToolsDispatchContext = createContext<Dispatch<ToolsAction>>(() => {
  /* */
});

export const ToolsStateContext = createContext<ToolsState>(toolsInitialState);

export const ToolsProvider: FC = ({ children }) => {
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

// Need to put the hooks here, otherwise there's a circular dependency issue
export const useToolsDispatch = getContextHook(ToolsDispatchContext);
export const useToolsState = getContextHook(ToolsStateContext);
