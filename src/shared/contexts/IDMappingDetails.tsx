import { createContext, ReactNode } from 'react';

import { Location } from '../../app/config/urls';
import toolsURLs from '../../jobs/config/urls';
import { MappingDetails } from '../../jobs/id-mapping/types/idMappingSearchResults';
import { JobTypes } from '../../jobs/types/jobTypes';
import useDataApi, { UseDataAPIState } from '../hooks/useDataApi';
import useJobFromUrl from '../hooks/useJobFromUrl';

const idMappingURLs = toolsURLs(JobTypes.ID_MAPPING);

export const IDMappingDetailsContext =
  createContext<UseDataAPIState<MappingDetails> | null>(null);

export const IDMappingDetailsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { jobId, jobResultsLocation } = useJobFromUrl();
  // If the user is looking at ID mapping results fetch the job details.
  // This is useful as a context as there are several places the "to" field
  // is checked to determine if the results are in a UniProt DB
  const idMappingDetailsUrl =
    jobResultsLocation === Location.IDMappingResult &&
    jobId &&
    idMappingURLs?.detailsUrl?.(jobId);
  const mappingDetails = useDataApi<MappingDetails>(idMappingDetailsUrl || '');

  return (
    <IDMappingDetailsContext.Provider value={mappingDetails}>
      {children}
    </IDMappingDetailsContext.Provider>
  );
};
