import searchInitialState, {
  SearchState,
} from '../../uniprotkb/state/searchInitialState';
import resultsInitialState, {
  ResultsState,
} from '../../uniprotkb/state/resultsInitialState';
import messagesInitialState, {
  MessagesState,
} from '../../messages/state/messagesInitialState';
import toolsInitialState, {
  ToolsState,
} from '../../tools/state/toolsInitialState';
import { SearchAction } from '../../uniprotkb/state/searchReducers';
import { ResultAction } from '../../uniprotkb/state/resultsReducers';
import { MessagesAction } from '../../messages/state/messagesReducers';
import { ToolsAction } from '../../tools/state/toolsReducers';

export type RootState = {
  query: SearchState;
  results: ResultsState;
  messages: MessagesState;
  tools: ToolsState;
};

export type RootAction =
  | SearchAction
  | ResultAction
  | MessagesAction
  | ToolsAction;

const initialState = {
  query: searchInitialState,
  results: resultsInitialState,
  messages: messagesInitialState,
  tools: toolsInitialState,
};
export default initialState;
