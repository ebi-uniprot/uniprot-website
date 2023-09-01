import { useMemo } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import {
  getJobResultsLocation,
  LocationToPath,
  Location,
  ToolsResultsLocations,
} from '../../app/config/urls';

import { Namespace, SearchableNamespace } from '../types/namespaces';

export type JobFromUrl = {
  jobId?: string;
  jobResultsLocation?: ToolsResultsLocations;
  jobResultsNamespace?: SearchableNamespace;
};

const useJobFromUrl = (): JobFromUrl => {
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
  let jobResultsNamespace: SearchableNamespace | undefined;
  if (match?.params.namespace) {
    jobResultsNamespace = match?.params.namespace as SearchableNamespace;
  } else if (jobResultsLocation === Location.PeptideSearchResult) {
    jobResultsNamespace = Namespace.uniprotkb;
  }

  return { jobId, jobResultsLocation, jobResultsNamespace };
};

export default useJobFromUrl;
