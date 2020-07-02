import { Job } from './toolsJob';

export type ToolsState = {
  [key: string]: Job;
};

const toolsInitialState: ToolsState = {};

export default toolsInitialState;
