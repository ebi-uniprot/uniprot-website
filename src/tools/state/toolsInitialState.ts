import { Job } from '../types/toolsJob';

export interface ToolsState {
  [key: string]: Job;
}

const toolsInitialState: ToolsState = {};

export default toolsInitialState;
