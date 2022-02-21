import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { useToolsState, useToolsDispatch } from '../../shared/contexts/Tools';

import { updateJob } from '../state/toolsActions';

import { Status } from '../types/toolsStatuses';
import { JobTypes } from '../types/toolsJobTypes';
import { FinishedJob } from '../types/toolsJob';

export type LocationStateFromJobLink = { internalID: string };

const useMarkJobAsSeen = (
  // anything that, testing as "truthy", indicates that there's result displayed
  dataOrDataPresence: unknown,
  id?: FinishedJob<JobTypes>['remoteID']
) => {
  const tools = useToolsState();
  const dispatch = useToolsDispatch();
  const location = useLocation<undefined | LocationStateFromJobLink>();

  const jobs = useMemo(() => {
    if (location.state?.internalID) {
      const job = tools[location.state.internalID];
      if (job) {
        if (job.status === Status.FINISHED && !job.seen) {
          return [job];
        }
        return [];
      }
    }
    return Object.values(tools).filter(
      (job): job is FinishedJob<JobTypes> =>
        !job.seen && job.status === Status.FINISHED && job.remoteID === id
    );
  }, [id, location, tools]);

  useEffect(() => {
    if (!id || !dataOrDataPresence || !jobs.length) {
      // if we don't have data, it means we're still loading the results
      // if we don't have "seen" flag at all, we have an issue
      // if we have already seen this job, we skip updating it
      return;
    }
    // But if we do get data, it means we can render the page and we can mark
    // the page result as "seen"
    for (const job of jobs) {
      dispatch(updateJob(job.internalID, { seen: true }));
    }
  }, [dispatch, dataOrDataPresence, jobs, id]);
};

export default useMarkJobAsSeen;
