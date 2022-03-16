import { createContext, FC } from 'react';

import useDataApi, { UseDataAPIState } from '../hooks/useDataApi';
import useJobFromUrl from '../hooks/useJobFromUrl';

import toolsURLs from '../../tools/config/urls';

import { JobTypes } from '../../tools/types/toolsJobTypes';
import { MappingDetails } from '../../tools/id-mapping/types/idMappingSearchResults';
import { Location } from '../../app/config/urls';

const idMappingURLs = toolsURLs(JobTypes.ID_MAPPING);

export const IDMappingDetailsContext =
  createContext<UseDataAPIState<MappingDetails> | null>(null);

export const IDMappingDetailsProvider: FC = ({ children }) => {
  const { jobId, jobResultsLocation } = useJobFromUrl();
  // If the user is looking at ID mapping results fetch the job details.
  // This is useful as a context as there are several places the "to" field
  // is checked to determine if the results are in a UniProt DB
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
