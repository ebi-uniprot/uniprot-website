import { useHistory, useRouteMatch } from 'react-router-dom';
import {
  allSearchResultLocations,
  getJobResultsLocation,
  LocationToPath,
} from '../../app/config/urls';

import { Namespace } from '../types/namespaces';

const findNamespace = (potentialNS: string) =>
  Object.values(Namespace).find((ns) => ns === potentialNS);

const useNS = (override?: Namespace): Namespace | undefined => {
  const match = useRouteMatch<{
    namespace: Namespace;
  }>(allSearchResultLocations);

  const history = useHistory();
  const jobResultsLocation = getJobResultsLocation(history.location.pathname);

  const toolMatch = useRouteMatch<{
    namespace?: string;
  }>(
    jobResultsLocation && jobResultsLocation in LocationToPath
      ? LocationToPath[jobResultsLocation]
      : []
  );
  const jobResultsNamespace = toolMatch?.params.namespace;

  if (override) {
    return override;
  }

  if (jobResultsNamespace) {
    return findNamespace(jobResultsNamespace);
  }

  if (!match) {
    return undefined;
  }

  const potentialNS = match.params.namespace.toLowerCase();

  return findNamespace(potentialNS);
};

export default useNS;
