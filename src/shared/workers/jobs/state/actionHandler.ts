import { ActionType } from 'typesafe-actions';
import { v1 } from 'uuid';

import { JobSharedWorkerMessage } from '../jobSharedWorker';
import { CreatedJob, Job } from '../types/toolsJob';
import { Status } from '../types/toolsStatuses';
import JobStore from '../utils/storage';
import getJobs from './getJobs';
import * as toolsActions from './toolsActions';

export type ToolsAction = ActionType<typeof toolsActions>;

export const getActionHandler =
  (jobStore: JobStore, broadcast: (message: JobSharedWorkerMessage) => void) =>
  async (action: JobSharedWorkerMessage) => {
    const { jobAction, messageAction } = action;
    if (jobAction) {
      await actionHandler(jobAction, jobStore);
    }
    const jobs = await getJobs(jobStore);
    const m: JobSharedWorkerMessage = { state: jobs };
    if (messageAction) {
      m.messageAction = messageAction;
    }
    broadcast(m);
  };

async function actionHandler(action: ToolsAction, jobStore: JobStore) {
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
      await jobStore.set(newJob.internalID, newJob);
      break;
    }

    // remove job
    case toolsActions.DELETE_JOB: {
      await jobStore.del(action.payload);
      break;
    }

    // update job from internal ID and partial job info
    case toolsActions.UPDATE_JOB: {
      const originalJob = await jobStore.get(action.payload.id);
      // in case we try to update a job that doesn't exist anymore, just bail
      if (!originalJob) {
        break;
      }
      const updatedJob = {
        ...originalJob,
        ...action.payload.partialJob,
        timeLastUpdate: Date.now(),
      } as Job;
      await jobStore.set(action.payload.id, updatedJob);
      break;
    }

    default:
      break;
  }
}
