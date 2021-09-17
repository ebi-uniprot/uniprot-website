import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { Loader } from 'franklin-sites';
import { truncate } from 'lodash-es';

import useDataApi from '../../../../shared/hooks/useDataApi';
import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';
import useNSQuery from '../../../../shared/hooks/useNSQuery';
import useItemSelect from '../../../../shared/hooks/useItemSelect';
import usePagination from '../../../../shared/hooks/usePagination';
import useMarkJobAsSeen from '../../../hooks/useMarkJobAsSeen';

import HTMLHead from '../../../../shared/components/HTMLHead';
import ResultsData from '../../../../shared/components/results/ResultsData';
import ResultsFacets from '../../../../shared/components/results/ResultsFacets';
import ResultsDataHeader from '../../../../shared/components/results/ResultsDataHeader';
import SideBarLayout from '../../../../shared/components/layouts/SideBarLayout';
import NoResultsPage from '../../../../shared/components/error-pages/NoResultsPage';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';

import toolsURLs from '../../../config/urls';
import { namespaceAndToolsLabels } from '../../../../shared/types/namespaces';
import { LocationToPath, Location } from '../../../../app/config/urls';

import Response from '../../../../uniprotkb/types/responseTypes';
import { PeptideSearchResults } from '../../types/peptideSearchResults';
import { JobTypes } from '../../../types/toolsJobTypes';
import { RootState } from '../../../../app/state/rootInitialState';
import { Job } from '../../../types/toolsJob';
import { Status } from '../../../types/toolsStatuses';

const jobType = JobTypes.PEPTIDE_SEARCH;
const urls = toolsURLs(jobType);
const title = `${namespaceAndToolsLabels[jobType]} results`;

const PeptideSearchResult: FC = () => {
  const [selectedEntries, handleEntrySelection] = useItemSelect();

  // Get list of accession from job
  const match = useRouteMatch<{ id: string }>(
    LocationToPath[Location.PeptideSearchResult]
  );
  const jobID = match?.params.id || '';
  const {
    data: jobData,
    loading: jobLoading,
    error: jobError,
    status: jobStatus,
  } = useDataApi<PeptideSearchResults>(urls.resultUrl(jobID, {}));

  const job = useSelector<RootState, Job | undefined>((state) =>
    Object.values(state.tools).find(
      (job) => job.status === Status.FINISHED && job?.remoteID === jobID
    )
  );
  const accessions = jobData?.split(',').filter(Boolean);

  // Query for facets
  const initialApiFacetUrl = useNSQuery({
    size: 0,
    withFacets: true,
    withColumns: false,
    accessions,
  });
  const facetApiObject =
    useDataApiWithStale<Response['data']>(initialApiFacetUrl);
  const {
    loading: facetInititialLoading,
    headers: facetHeaders,
    isStale: facetHasStaleData,
  } = facetApiObject;
  const facetTotal = facetHeaders?.['x-total-records'];

  // Query for results data
  const initialApiUrl = useNSQuery({ accessions });
  const resultsDataObject = usePagination(initialApiUrl);
  const {
    initialLoading: resultsDataInitialLoading,
    total: resultsDataTotal,
    progress: resultsDataProgress,
  } = resultsDataObject;

  useMarkJobAsSeen(resultsDataObject.allResults.length, match?.params.id);

  let total: undefined | number;
  if (facetTotal !== undefined) {
    total = +facetTotal;
  }
  if (resultsDataTotal !== undefined) {
    total = +resultsDataTotal;
  }

  if (jobError) {
    return <ErrorHandler status={jobStatus} />;
  }

  if (
    (!jobLoading &&
      !resultsDataInitialLoading &&
      !facetInititialLoading &&
      !total) ||
    (!jobLoading && accessions?.length === 0) ||
    total === 0
  ) {
    return <NoResultsPage />;
  }

  if (
    jobLoading ||
    (facetInititialLoading && resultsDataInitialLoading && !facetHasStaleData)
  ) {
    return <Loader progress={resultsDataProgress} />;
  }

  return (
    <SideBarLayout sidebar={<ResultsFacets dataApiObject={facetApiObject} />}>
      <HTMLHead title={title} />
      <ResultsDataHeader
        total={total}
        selectedEntries={selectedEntries}
        titlePostscript={
          total && (
            <small>
              {` found in peptide search ${
                truncate(job?.title, { length: 15 }) || ''
              }`}
            </small>
          )
        }
        accessions={accessions}
      />
      <ResultsData
        resultsDataObject={resultsDataObject}
        selectedEntries={selectedEntries}
        handleEntrySelection={handleEntrySelection}
      />
    </SideBarLayout>
  );
};

export default PeptideSearchResult;
