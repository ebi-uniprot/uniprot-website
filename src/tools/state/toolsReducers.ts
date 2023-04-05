import { ActionType } from 'typesafe-actions';
import { v1 } from 'uuid';

import JobStore from '../utils/storage';

import * as toolsActions from './toolsActions';

import toolsInitialState, { ToolsState } from './toolsInitialState';

import { CreatedJob, Job } from '../types/toolsJob';
import { Status } from '../types/toolsStatuses';
import { Stores } from '../utils/stores';

export type ToolsAction = ActionType<typeof toolsActions>;

const store = new JobStore(Stores.METADATA);

const toolsReducers = (
  // eslint-disable-next-line default-param-last
  state: ToolsState = toolsInitialState,
  action: ToolsAction
): ToolsState => {
  switch (action.type) {
    // rehydrate jobs
    case toolsActions.REHYDRATE_JOBS: {
      return {
        ...(state ?? {}),
        ...action.payload.jobs,
      };
    }

    // add job
    case toolsActions.CREATE_JOB: {
      const now = Date.now();
      const newJob: CreatedJob = {
        status: Status.CREATED,
        internalID: `local-${v1()}`,
        title: action.payload.jobName,
        type: action.payload.jobType,
        parameters: action.payload.parameters,
        timeCreated: now,
        timeLastUpdate: now,
        saved: false,
        seen: false,
      };

      store.set(newJob.internalID, newJob);

      return { ...state, [newJob.internalID]: newJob };
    }

    // remove job
    case toolsActions.DELETE_JOB: {
      if (!state) {
        return state;
      }
      const { [action.payload]: jobToRemove, ...newState } = state;
      // Because these things happen async it might already be gone, check again
      store.del(jobToRemove?.internalID);

      return newState;
    }

    // update job from internal ID and partial job info
    case toolsActions.UPDATE_JOB: {
      const originalJob = state?.[action.payload.id];
      // in case we try to update a job that doesn't exist anymore, just bail
      if (!originalJob) {
        return state;
      }
      const updatedJob = {
        ...originalJob,
        ...action.payload.partialJob,
        timeLastUpdate: Date.now(),
      } as Job;

      store.set(action.payload.id, updatedJob);

      return { ...state, [action.payload.id]: updatedJob };
    }

    default:
      return state;
  }
};

export default toolsReducers;
