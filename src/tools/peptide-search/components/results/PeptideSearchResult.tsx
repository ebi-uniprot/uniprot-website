import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { Loader } from 'franklin-sites';
import { partialRight, truncate } from 'lodash-es';

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
import { FinishedJob } from '../../../types/toolsJob';
import { Status } from '../../../types/toolsStatuses';
import peptideSearchConverter from '../../adapters/peptideSearchConverter';

const jobType = JobTypes.PEPTIDE_SEARCH;
const urls = toolsURLs(jobType);
const title = `${namespaceAndToolsLabels[jobType]} results`;

const PeptideSearchResult = () => {
  const [selectedEntries, setSelectedItemFromEvent, setSelectedEntries] =
    useItemSelect();

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
  const job = useSelector<
    RootState,
    FinishedJob<JobTypes.PEPTIDE_SEARCH> | undefined
  >((state) => {
    const found = Object.values(state.tools).find(
      (job) =>
        job.status === Status.FINISHED &&
        'remoteID' in job &&
        job?.remoteID === jobID
    );
    return found ? (found as FinishedJob<JobTypes.PEPTIDE_SEARCH>) : undefined;
  });

  const accessions = useMemo(
    () => jobData?.split(',').filter(Boolean),
    [jobData]
  );

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

  const converter = useMemo(
    () => partialRight(peptideSearchConverter, job?.parameters.peps),
    [job?.parameters.peps]
  );

  // Query for results data
  const initialApiUrl = useNSQuery({ accessions, getSequence: true });
  // TODO: if the user didn't submit this job there is no way to get the initial sequence. In the
  // future the API may provide this information in which case we would want to fetch and show
  const resultsDataObject = usePagination(initialApiUrl, job && converter);
  const {
    initialLoading: resultsDataInitialLoading,
    total: resultsDataTotal,
    progress: resultsDataProgress,
  } = resultsDataObject;

  const sortedResultsDataObject = useMemo(
    () => ({
      ...resultsDataObject,
      // sort according to original order in job result payload
      allResults: Array.from(resultsDataObject.allResults).sort((a, b) => {
        const accessionA = 'primaryAccession' in a && a.primaryAccession;
        const accessionB = 'primaryAccession' in b && b.primaryAccession;
        if (accessions && accessionA && accessionB) {
          return (
            accessions.indexOf(accessionA) - accessions.indexOf(accessionB)
          );
        }
        return 0;
      }),
    }),
    [accessions, resultsDataObject]
  );

  useMarkJobAsSeen(
    sortedResultsDataObject?.allResults.length,
    match?.params.id
  );

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
        loadedTotal={sortedResultsDataObject.allResults.length}
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
        resultsDataObject={sortedResultsDataObject}
        setSelectedItemFromEvent={setSelectedItemFromEvent}
        setSelectedEntries={setSelectedEntries}
        // TODO: change logic when peptide search API is able to return submitted job information
        displayPeptideSearchMatchColumns={Boolean(job)}
      />
    </SideBarLayout>
  );
};

export default PeptideSearchResult;
