import messagesInitialState, {
  MessagesState,
} from '../../messages/state/messagesInitialState';
import toolsInitialState, {
  ToolsState,
} from '../../tools/state/toolsInitialState';
import { MessagesAction } from '../../messages/state/messagesReducers';
import { ToolsAction } from '../../tools/state/toolsReducers';

export type RootState = {
  messages: MessagesState;
  tools: ToolsState;
};

export type RootAction = MessagesAction | ToolsAction;

const initialState = {
  messages: messagesInitialState,
  tools: toolsInitialState,
};
export default initialState;
