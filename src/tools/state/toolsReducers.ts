import { ActionType } from 'typesafe-actions';
import { v1 } from 'uuid';

import { CreatedJob } from '../blast/types/blastJob';
import { Status } from '../blast/types/blastStatuses';
import { Stores } from '../utils/stores';

import JobStore from '../utils/storage';

import * as toolsActions from './toolsActions';
import toolsInitialState, { ToolsState } from './toolsInitialState';

export type ToolsAction = ActionType<typeof toolsActions>;

const store = new JobStore(Stores.METADATA);

const toolsReducers = (
  state: ToolsState = toolsInitialState,
  action: ToolsAction
) => {
  switch (action.type) {
    // rehydrate jobs
    case toolsActions.REHYDRATE_JOBS: {
      return {
        ...state,
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
      };

      store.set(newJob.internalID, newJob);

      return { ...state, [newJob.internalID]: newJob };
    }

    // remove job
    case toolsActions.DELETE_JOB: {
      const { [action.payload]: jobToRemove, ...newState } = state;

      store.del(jobToRemove.internalID);

      return newState;
    }

    // update job
    case toolsActions.UPDATE_JOB:
      store.set(action.payload.job.internalID, action.payload.job);

      return { ...state, [action.payload.job.internalID]: action.payload.job };

    // update job title
    case toolsActions.UPDATE_JOB_TITLE: {
      const updatedJob = {
        ...state[action.payload.id],
        title: action.payload.title,
      };

      store.set(action.payload.id, updatedJob);

      return { ...state, [action.payload.id]: updatedJob };
    }

    default:
      return state;
  }
};

export default toolsReducers;
