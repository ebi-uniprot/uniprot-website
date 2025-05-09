import { useEffect } from 'react';

import { heuristic } from '../../../shared/workers/jobs/utils/heuristic';

// Need to rewrite this to communicate with the shared worker
const useDashboardPollingEffect = () => {
  useEffect(() => {
    // Visibility change event listener
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Do an immediate check when the dashboard gets visible
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
  }, []);
};

export default useDashboardPollingEffect;
