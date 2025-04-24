import { supportsSharedWorker } from '../workers/jobs/utils';
import { useSmallScreen } from './useMatchMedia';

const useSupportsJobs = () => {
  const smallScreen = useSmallScreen();
  return !smallScreen && supportsSharedWorker;
};

export default useSupportsJobs;
