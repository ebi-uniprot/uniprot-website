import { Job } from '../types/toolsJob';

export type ToolsState = null | {
  [key: string]: Job;
};

const toolsInitialState: ToolsState = null;

export default toolsInitialState;
