import { useLocation, useMatch } from 'react-router';

import {
  allSearchResultLocations,
  getJobResultsLocation,
  LocationToPath,
} from '../../app/config/urls';
import { Namespace } from '../types/namespaces';

const findNamespace = (potentialNS: string) =>
  Object.values(Namespace).find((ns) => ns === potentialNS);

const useNS = (override?: Namespace): Namespace | undefined => {
  const match = useMatch(allSearchResultLocations);

  const location = useLocation();
  const jobResultsLocation = getJobResultsLocation(location.pathname);

  const toolMatch = useMatch(
    jobResultsLocation && jobResultsLocation in LocationToPath
      ? LocationToPath[jobResultsLocation]
      : ''
  );
  const jobResultsNamespace = toolMatch?.params.namespace;

  if (override) {
    return override;
  }

  if (jobResultsNamespace) {
    return findNamespace(jobResultsNamespace);
  }

  if (!match?.params.namespace) {
    return undefined;
  }

  const potentialNS = match.params.namespace.toLowerCase();

  return findNamespace(potentialNS);
};

export default useNS;
