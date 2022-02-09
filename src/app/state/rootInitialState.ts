import toolsInitialState, {
  ToolsState,
} from '../../tools/state/toolsInitialState';
import { ToolsAction } from '../../tools/state/toolsReducers';

export type RootState = {
  tools: ToolsState;
};

export type RootAction = ToolsAction;

const initialState = {
  tools: toolsInitialState,
};
export default initialState;
