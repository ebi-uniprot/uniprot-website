import { createContext, FC } from 'react';
import { Loader } from 'franklin-sites';
import { JobTypes } from '../../tools/types/toolsJobTypes';
import useDataApi from '../hooks/useDataApi';
import { MappingDetails } from '../../tools/id-mapping/types/idMappingSearchResults';
import useJobFromUrl from '../hooks/useJobFromUrl';
import toolsURLs from '../../tools/config/urls';
import { Location } from '../../app/config/urls';
import ErrorHandler from '../components/error-pages/ErrorHandler';

const idMappingURLs = toolsURLs(JobTypes.ID_MAPPING);

export const IDMappingDetailsContext = createContext<
  MappingDetails | undefined
>(undefined);

export const IDMappingDetailsProvider: FC = ({ children }) => {
  const { jobId, jobResultsLocation } = useJobFromUrl();

  // If user is looking at ID mapping results fetch the job details and look
  // at if "to" is a UniProt DB
  const idMappingDetailsUrl =
    jobResultsLocation === Location.IDMappingResult &&
    jobId &&
    idMappingURLs.detailsUrl &&
    idMappingURLs?.detailsUrl(jobId);
  const { data, loading, error, status, progress } = useDataApi<MappingDetails>(
    idMappingDetailsUrl || ''
  );

  if (loading) {
    return <Loader progress={progress} />;
  }

  if (error || (idMappingDetailsUrl && !data)) {
    return <ErrorHandler status={status} />;
  }

  return (
    <IDMappingDetailsContext.Provider value={data}>
      {children}
    </IDMappingDetailsContext.Provider>
  );
};
