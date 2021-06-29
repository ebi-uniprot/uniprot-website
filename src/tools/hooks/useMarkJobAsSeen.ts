import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/state/rootInitialState';

import { updateJob } from '../state/toolsActions';

import { Status } from '../types/toolsStatuses';
import { JobTypes } from '../types/toolsJobTypes';
import { FinishedJob } from '../types/toolsJob';

const useMarkJobAsSeen = (
  // anything that, testing as "truthy", indicates that there's result displayed
  dataOrDataPresence: unknown,
  id?: FinishedJob<JobTypes>['remoteID']
) => {
  const dispatch = useDispatch();
  const job = useSelector<RootState, FinishedJob<JobTypes> | undefined>(
    (state) =>
      Object.values(state.tools).find(
        (job) => job.status === Status.FINISHED && job.remoteID === id
      ) as FinishedJob<JobTypes> | undefined
  );

  useEffect(() => {
    if (!id || !dataOrDataPresence || !job || job.seen !== false) {
      // if we don't have data, it means we're still loading the results
      // if we don't have "seen" flag at all, we have an issue
      // if we have already seen this job, we skip updating it
      return;
    }
    // But if we do get data, it means we can render the page and we can mark
    // the page result as "seen"
    dispatch(updateJob(job.internalID, { seen: true }));
  }, [dispatch, dataOrDataPresence, job, id]);
};

export default useMarkJobAsSeen;
