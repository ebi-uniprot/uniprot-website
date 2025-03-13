import { v1 } from 'uuid';
import { ActionType } from 'typesafe-actions';

import * as toolsActions from '../../../tools/state/toolsActions';

import { CreatedJob, Job } from '../../../tools/types/toolsJob';
import { Status } from '../../../tools/types/toolsStatuses';
import JobStore from '../../../tools/utils/storage';
import getJobs from './getJobs';
import { ActionFoo } from './sharedWorker';

export type ToolsAction = ActionType<typeof toolsActions>;

export const getActionHandler =
  (store: JobStore, port: MessagePort) => async (action: ActionFoo) => {
    const { jobAction, messageAction } = action;
    if (jobAction) {
      await actionHandler(jobAction, store);
    }
    const jobs = await getJobs(store);
    const m = { state: jobs };
    if (messageAction) {
      m.messageAction = messageAction;
    }
    port.postMessage(m);
  };

async function actionHandler(action: ToolsAction, store: JobStore) {
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
      await store.set(newJob.internalID, newJob);
      break;
    }

    // remove job
    case toolsActions.DELETE_JOB: {
      await store.del(action.payload);
      break;
    }

    // update job from internal ID and partial job info
    case toolsActions.UPDATE_JOB: {
      const originalJob = await store.get(action.payload.id);
      // in case we try to update a job that doesn't exist anymore, just bail
      if (!originalJob) {
        break;
      }
      const updatedJob = {
        ...originalJob,
        ...action.payload.partialJob,
        timeLastUpdate: Date.now(),
      } as Job;
      await store.set(action.payload.id, updatedJob);
      break;
    }

    default:
      break;
  }
}
