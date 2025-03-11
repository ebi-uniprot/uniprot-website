import { useEffect } from 'react';

import { pollJobs } from '../../state/toolsActions';
import { heuristic } from '../../state/utils/heuristic';
import { dispatchJobs } from '../../../shared/hooks/useJobsState';

const useDashboardPollingEffect = () => {
  useEffect(() => {
    // Visibility change event listener
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Do an immediate check when the dashboard gets visible
        dispatchJobs(pollJobs());
        // Speed up polls
        heuristic.dashboardSpeedUpFactor = 4;
      } else {
        // if page is not visible
        // Reset poll frequency (although might not)
        heuristic.dashboardSpeedUpFactor = 1;
      }
    };
    // Add visibility change event listener
    document.addEventListener('visibilitychange', onVisibilityChange);

    // On mount
    // Speed up polls
    heuristic.dashboardSpeedUpFactor = 4;
    // Trigger visibility check
    onVisibilityChange();
    return () => {
      // On unmount
      // Reset poll frequency
      heuristic.dashboardSpeedUpFactor = 1;
      // Remove visibility change event listener
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [dispatch]);
};

export default useDashboardPollingEffect;
