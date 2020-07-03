import { Job } from '../types/toolsJob';

export type ToolsState = {
  [key: string]: Job;
};

const toolsInitialState: ToolsState = {};

export default toolsInitialState;
