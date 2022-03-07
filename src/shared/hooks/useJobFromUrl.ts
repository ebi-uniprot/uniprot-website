import { useMemo } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { getJobResultsLocation, LocationToPath } from '../../app/config/urls';

import { SearchableNamespace } from '../types/namespaces';

const useJobFromUrl = () => {
  const history = useHistory();
  const jobResultsLocation = useMemo(
    () => getJobResultsLocation(history.location.pathname),
    [history.location.pathname]
  );
  const match = useRouteMatch<{
    id: string;
    namespace?: string;
  }>(
    jobResultsLocation && jobResultsLocation in LocationToPath
      ? LocationToPath[jobResultsLocation]
      : []
  );
  const jobId = match?.params.id;
  const jobResultsNamespace = match?.params.namespace
    ? (match?.params.namespace as SearchableNamespace)
    : undefined;
  return { jobId, jobResultsLocation, jobResultsNamespace };
};

export default useJobFromUrl;
