import { createContext, ReactNode } from 'react';

import useDataApi, { UseDataAPIState } from '../hooks/useDataApi';
import useJobFromUrl from '../hooks/useJobFromUrl';

import getContextHook from './getContextHook';
import toolsURLs from '../../tools/config/urls';

import { JobTypes } from '../../tools/types/toolsJobTypes';
import { MappingDetails } from '../../tools/id-mapping/types/idMappingSearchResults';
import { Location } from '../../app/config/urls';

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

// Need to put the hooks here, otherwise there's a circular dependency issue
export const useIDMappingDetails = getContextHook(IDMappingDetailsContext);
