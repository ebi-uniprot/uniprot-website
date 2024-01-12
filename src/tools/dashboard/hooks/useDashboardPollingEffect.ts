import { useEffect } from 'react';

import useToolsDispatch from '../../../shared/hooks/useToolsDispatch';

import { pollJobs } from '../../state/toolsActions';
import { heuristic } from '../../state/utils/heuristic';

const useDashboardPollingEffect = () => {
  const dispatch = useToolsDispatch();

  useEffect(() => {
    // Visibility change event listener
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // Do an immediate check when the dashboard gets visible
        dispatch(pollJobs());
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
