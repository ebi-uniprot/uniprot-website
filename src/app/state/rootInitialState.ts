import resultsInitialState, {
  ResultsState,
} from '../../uniprotkb/state/resultsInitialState';
import messagesInitialState, {
  MessagesState,
} from '../../messages/state/messagesInitialState';
import toolsInitialState, {
  ToolsState,
} from '../../tools/state/toolsInitialState';
import { ResultAction } from '../../uniprotkb/state/resultsReducers';
import { MessagesAction } from '../../messages/state/messagesReducers';
import { ToolsAction } from '../../tools/state/toolsReducers';

export type RootState = {
  results: ResultsState;
  messages: MessagesState;
  tools: ToolsState;
};

export type RootAction = ResultAction | MessagesAction | ToolsAction;

const initialState = {
  results: resultsInitialState,
  messages: messagesInitialState,
  tools: toolsInitialState,
};
export default initialState;
