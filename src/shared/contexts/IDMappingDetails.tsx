import { createContext, FC } from 'react';
import { JobTypes } from '../../tools/types/toolsJobTypes';
import useDataApi, { UseDataAPIState } from '../hooks/useDataApi';
import { MappingDetails } from '../../tools/id-mapping/types/idMappingSearchResults';
import useJobFromUrl from '../hooks/useJobFromUrl';
import toolsURLs from '../../tools/config/urls';
import { Location } from '../../app/config/urls';

const idMappingURLs = toolsURLs(JobTypes.ID_MAPPING);

export const IDMappingDetailsContext =
  createContext<UseDataAPIState<MappingDetails> | null>(null);

export const IDMappingDetailsProvider: FC = ({ children }) => {
  const { jobId, jobResultsLocation } = useJobFromUrl();

  // If user is looking at ID mapping results fetch the job details and look
  // at if "to" is a UniProt DB
  const idMappingDetailsUrl =
    jobResultsLocation === Location.IDMappingResult &&
    jobId &&
    idMappingURLs.detailsUrl &&
    idMappingURLs?.detailsUrl(jobId);
  const mappingDetails = useDataApi<MappingDetails>(idMappingDetailsUrl || '');

  return (
    <IDMappingDetailsContext.Provider value={mappingDetails}>
      {children}
    </IDMappingDetailsContext.Provider>
  );
};
