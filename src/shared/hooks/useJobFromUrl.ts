import { useMemo } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { getToolResultsLocation, LocationToPath } from '../../app/config/urls';

import { SearchableNamespace } from '../types/namespaces';

const useJobFromUrl = () => {
  const history = useHistory();
  const toolResultsLocation = useMemo(
    () => getToolResultsLocation(history.location.pathname),
    [history.location.pathname]
  );
  const match = useRouteMatch<{
    id: string;
    namespace?: string;
  }>(
    toolResultsLocation && toolResultsLocation in LocationToPath
      ? LocationToPath[toolResultsLocation]
      : []
  );
  const jobId = match?.params.id;
  const toolNamespace = match?.params.namespace
    ? (match?.params.namespace as SearchableNamespace)
    : undefined;
  return { jobId, toolResultsLocation, toolNamespace };
};

export default useJobFromUrl;
