import { useHistory, useRouteMatch } from 'react-router-dom';
import {
  allSearchResultLocations,
  getToolResultsLocation,
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
  const toolResultsLocation = getToolResultsLocation(history.location.pathname);

  const toolMatch = useRouteMatch<{
    namespace?: string;
  }>(
    toolResultsLocation && toolResultsLocation in LocationToPath
      ? LocationToPath[toolResultsLocation]
      : []
  );
  const toolNamespace = toolMatch?.params.namespace;

  if (override) {
    return override;
  }

  if (toolNamespace) {
    return findNamespace(toolNamespace);
  }

  if (!match) {
    return undefined;
  }

  const potentialNS = match.params.namespace.toLowerCase();

  return findNamespace(potentialNS);
};

export default useNS;
