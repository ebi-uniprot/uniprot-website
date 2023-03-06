import { Dispatch, MutableRefObject } from 'react';

import getCheckJobAlignStatus from './getCheckAlignJobStatus';
import getCheckAsyncDownloadJobStatus from './getCheckAsyncDownloadJobStatus';
import getCheckBlastJobStatus from './getCheckBlastJobStatus';
import getCheckIdMappingJobStatus from './getCheckIdMappingJobStatus';
import getCheckPeptideSearchJobStatus from './getCheckPeptideSearchJobStatus';

import { ToolsState } from './toolsInitialState';
import { ToolsAction } from './toolsReducers';
import { MessagesAction } from '../../messages/state/messagesReducers';
import { RunningJob, FinishedJob } from '../types/toolsJob';
import { Status } from '../types/toolsStatuses';
import { JobTypes } from '../types/toolsJobTypes';

export const possibleStatuses = new Set(Object.values(Status));
export const unfinishedStatuses = new Set([
  Status.NOT_FOUND,
  Status.RUNNING,
  Status.FAILURE,
  Status.ERRORED,
]);

type Check = (
  dispatch: Dispatch<ToolsAction>,
  stateRef: MutableRefObject<ToolsState>,
  messagesDispatch: Dispatch<MessagesAction>
) => (job: RunningJob | FinishedJob<JobTypes>) => Promise<void>;

const jobTypeToCheck: Record<JobTypes, Check> = {
  [JobTypes.ALIGN]: getCheckJobAlignStatus,
  [JobTypes.ASYNC_DOWNLOAD]: getCheckAsyncDownloadJobStatus,
  [JobTypes.BLAST]: getCheckBlastJobStatus,
  [JobTypes.ID_MAPPING]: getCheckIdMappingJobStatus,
  [JobTypes.PEPTIDE_SEARCH]: getCheckPeptideSearchJobStatus,
};

const getCheckJobStatus =
  (
    dispatch: Dispatch<ToolsAction>,
    stateRef: MutableRefObject<ToolsState>,
    messagesDispatch: Dispatch<MessagesAction>
  ) =>
  (job: RunningJob | FinishedJob<JobTypes>) =>
    jobTypeToCheck[job.type](dispatch, stateRef, messagesDispatch)(job);

export default getCheckJobStatus;
