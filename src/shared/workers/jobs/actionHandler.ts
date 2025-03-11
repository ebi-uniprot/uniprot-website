import { v1 } from 'uuid';
import { ActionType } from 'typesafe-actions';

import * as toolsActions from '../../../tools/state/toolsActions';

import { CreatedJob, Job } from '../../../tools/types/toolsJob';
import { Status } from '../../../tools/types/toolsStatuses';
import JobStore from '../../../tools/utils/storage';

export type ToolsAction = ActionType<typeof toolsActions>;

const actionHandler = (action: ToolsAction, store: JobStore): void => {
  console.log(action);
  switch (action.type) {
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
        lowPriority: action.payload.lowPriority,
      };
      store.set(newJob.internalID, newJob);
      break;
    }

    // remove job
    case toolsActions.DELETE_JOB: {
      store.del(action.payload);
      break;
    }

    // update job from internal ID and partial job info
    case toolsActions.UPDATE_JOB: {
      const originalJob = store.get(action.payload.id);
      // in case we try to update a job that doesn't exist anymore, just bail
      if (!originalJob) {
        break;
      }
      const updatedJob = {
        ...originalJob,
        ...action.payload.partialJob,
        timeLastUpdate: Date.now(),
      } as Job;
      store.set(action.payload.id, updatedJob);
      break;
    }

    default:
      break;
  }
};

export default actionHandler;
