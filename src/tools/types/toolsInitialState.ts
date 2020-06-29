import { Job } from './toolsJob';

export interface ToolsState {
  [key: string]: Job;
}

const toolsInitialState: ToolsState = {};

export default toolsInitialState;
