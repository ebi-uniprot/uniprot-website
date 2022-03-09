import { useMemo, useRef } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Loader } from 'franklin-sites';
import { partialRight } from 'lodash-es';

import useDataApi from '../../../../shared/hooks/useDataApi';
import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';
import useNSQuery from '../../../../shared/hooks/useNSQuery';
import useItemSelect from '../../../../shared/hooks/useItemSelect';
import usePagination from '../../../../shared/hooks/usePagination';
import useMarkJobAsSeen from '../../../hooks/useMarkJobAsSeen';
import { useToolsState } from '../../../../shared/contexts/Tools';

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
import peptideSearchConverter from '../../adapters/peptideSearchConverter';

import Response from '../../../../uniprotkb/types/responseTypes';
import { PeptideSearchResults } from '../../types/peptideSearchResults';
import { JobTypes } from '../../../types/toolsJobTypes';
import { Status } from '../../../types/toolsStatuses';
import { FinishedJob, Job } from '../../../types/toolsJob';

const jobType = JobTypes.PEPTIDE_SEARCH;
const urls = toolsURLs(jobType);
const title = `${namespaceAndToolsLabels[jobType]} results`;

const PeptideSearchResult = ({
  toolsState,
}: {
  toolsState: { [key: string]: Job };
}) => {
  const [selectedEntries, setSelectedItemFromEvent, setSelectedEntries] =
    useItemSelect();
  const jobSubmission = useRef<FinishedJob<JobTypes.PEPTIDE_SEARCH>>();

  const match = useRouteMatch<{ id: string }>(
    LocationToPath[Location.PeptideSearchResult]
  );
  const jobID = match?.params.id || '';
  const {
    data: jobResultData,
    loading: jobResultLoading,
    error: jobResultError,
    status: jobResultStatus,
  } = useDataApi<PeptideSearchResults>(urls.resultUrl(jobID, {}));

  // Get the job mission from local tools state. Save this in a reference as
  // the job may change with useMarkJobAsSeen but we don't want to have to
  // recreate the converter which will cause usePagination to duplicate rows
  if (!jobSubmission.current) {
    const found = Object.values(toolsState).find(
      (jobSubmission) =>
        jobSubmission.status === Status.FINISHED &&
        jobSubmission?.remoteID === jobID
    );
    jobSubmission.current = found
      ? (found as FinishedJob<JobTypes.PEPTIDE_SEARCH>)
      : undefined;
  }

  const accessions = useMemo(
    () => jobResultData?.split(',').filter(Boolean),
    [jobResultData]
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

  const converter = useMemo(() => {
    const peps = jobSubmission.current?.parameters.peps;
    return peps ? partialRight(peptideSearchConverter, peps) : undefined;
  }, [jobSubmission]);

  // Query for results data
  const initialApiUrl = useNSQuery({ accessions, getSequence: true });
  // TODO: if the user didn't submit this jobSubmission there is no way to get the initial sequence. In the
  // future the API may provide this information in which case we would want to fetch and show
  const resultsDataObject = usePagination(initialApiUrl, converter);
  const {
    initialLoading: resultsDataInitialLoading,
    total: resultsDataTotal,
    progress: resultsDataProgress,
  } = resultsDataObject;

  const sortedResultsDataObject = useMemo(
    () => ({
      ...resultsDataObject,
      // sort according to original order in jobSubmission result payload
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

  if (jobResultError) {
    return <ErrorHandler status={jobResultStatus} />;
  }

  if (
    (!jobResultLoading &&
      !resultsDataInitialLoading &&
      !facetInititialLoading &&
      !total) ||
    (!jobResultLoading && accessions?.length === 0) ||
    total === 0
  ) {
    return <NoResultsPage />;
  }

  if (
    jobResultLoading ||
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
        accessions={accessions}
      />
      <ResultsData
        resultsDataObject={sortedResultsDataObject}
        setSelectedItemFromEvent={setSelectedItemFromEvent}
        setSelectedEntries={setSelectedEntries}
        // TODO: change logic when peptide search API is able to return submitted jobSubmission information
        displayPeptideSearchMatchColumns={Boolean(jobSubmission.current)}
      />
    </SideBarLayout>
  );
};

const PeptideSearchResultWithToolsState = () => {
  const toolsState = useToolsState();
  return toolsState === null ? (
    <Loader />
  ) : (
    <PeptideSearchResult toolsState={toolsState} />
  );
};

export default PeptideSearchResultWithToolsState;
