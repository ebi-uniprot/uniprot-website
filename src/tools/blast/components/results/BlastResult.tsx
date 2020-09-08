import React, { useMemo, useEffect, useState, lazy, Suspense } from 'react';
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { Loader, PageIntro, Tabs, Tab } from 'franklin-sites';

import SideBarLayout from '../../../../shared/components/layouts/SideBarLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import BlastResultSidebar from './BlastResultSidebar';
import ResultButtons from '../../../components/ResultButtons';

import useDataApi, {
  UseDataAPIState,
} from '../../../../shared/hooks/useDataApi';
import {
  getParamsFromURL,
  URLResultParams,
} from '../../../../uniprotkb/utils/resultsUtils';
import {
  filterBlastDataForResults,
  filterBlastByFacets,
} from '../../utils/blastFacetDataUtils';

import inputParamsXMLToObject from '../../adapters/inputParamsXMLToObject';

import { Location, LocationToPath } from '../../../../app/config/urls';
import toolsURLs from '../../../config/urls';
import { getAccessionsURL } from '../../../../uniprotkb/config/apiUrls';

import { BlastResults, BlastHit } from '../../types/blastResults';
import Response from '../../../../uniprotkb/types/responseTypes';
import { JobTypes } from '../../../types/toolsJobTypes';
import { PublicServerParameters } from '../../types/blastServerParameters';
// what we import are types, even if they are in adapter file
import { UniProtkbAPIModel } from '../../../../uniprotkb/adapters/uniProtkbConverter';
import BlastResultLocalFacets from './BlastResultLocalFacets';
import ErrorBoundary from '../../../../shared/components/error-component/ErrorBoundary';
import HSPDetailPanel, { HSPDetailPanelProps } from './HSPDetailPanel';

import '../../../styles/ToolsResult.scss';

const jobType = JobTypes.BLAST;
const urls = toolsURLs(jobType);

// overview
const BlastResultTable = lazy(() =>
  import(/* webpackChunkName: "blast-result-page" */ './BlastResultTable')
);
// taxonomy
const BlastResultTaxonomy = lazy(() =>
  import(
    /* webpackChunkName: "blast-result-taxonomy" */ './BlastResultTaxonomy'
  )
);
// hit-distribution
const BlastResultHitDistribution = lazy(() =>
  import(
    /* webpackChunkName: "blast-result-hit-distribution" */ './BlastResultHitDistribution'
  )
);
// text-output
const TextOutput = lazy(() =>
  import(/* webpackChunkName: "text-output" */ '../../../components/TextOutput')
);
// input-parameters
const InputParameters = lazy(() =>
  import(
    /* webpackChunkName: "input-parameters" */ '../../../components/InputParameters'
  )
);
// input-parameters
const APIRequest = lazy(() =>
  import(/* webpackChunkName: "api-request" */ '../../../components/APIRequest')
);

enum TabLocation {
  Overview = 'overview',
  Taxonomy = 'taxonomy',
  HitDistribution = 'hit-distribution',
  TextOutput = 'text-output',
  InputParameters = 'input-parameters',
  APIRequest = 'api-request',
}

type Match = {
  params: {
    id: string;
    subPage?: TabLocation;
  };
};

// custom hook to get data from the input parameters endpoint, input sequence
// then parse it and merge it.
// This is kinda 'faking' useDataApi for the kind of object it outputs
const useParamsData = (
  id: string
): Partial<UseDataAPIState<PublicServerParameters>> => {
  const [paramsData, setParamsData] = useState<
    Partial<UseDataAPIState<PublicServerParameters>>
  >({});

  const paramsXMLData = useDataApi<string>(urls.resultUrl(id, 'parameters'));
  const sequenceData = useDataApi<string>(urls.resultUrl(id, 'sequence'));

  useEffect(() => {
    const loading = paramsXMLData.loading || sequenceData.loading;
    const error = paramsXMLData.error || sequenceData.error;
    const status = paramsXMLData.status || sequenceData.status;
    if (loading) {
      setParamsData({ loading });
    } else if (error) {
      setParamsData({ loading, error, status });
    } else if (paramsXMLData.data && sequenceData.data) {
      setParamsData({
        loading,
        data: inputParamsXMLToObject(paramsXMLData.data, sequenceData.data),
      });
    }
  }, [paramsXMLData, sequenceData]);

  return paramsData;
};

// probably going to change with the custom endpoint to enrich data, so keep it
// here for now, enventually might be a new type in a type folder
export interface EnrichedData extends BlastResults {
  hits: Array<BlastHit & { extra?: UniProtkbAPIModel }>;
}

const enrich = (
  blastData?: BlastResults,
  apiData?: Response['data']
): EnrichedData | null => {
  if (!(blastData && apiData)) {
    return null;
  }
  const output: EnrichedData = { ...blastData };
  output.hits = output.hits.map((hit) => ({
    ...hit,
    extra: (apiData.results as UniProtkbAPIModel[]).find(
      (entry) => hit.hit_acc === entry.primaryAccession
    ),
  }));
  return output;
};

const BlastResult = () => {
  const history = useHistory();
  const match = useRouteMatch(LocationToPath[Location.BlastResult]) as Match;
  const location = useLocation();

  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);
  const [
    hspDetailPanel,
    setHspDetailPanel,
  ] = useState<HSPDetailPanelProps | null>();

  // if URL doesn't finish with "overview" redirect to /overview by default
  useEffect(() => {
    if (!match.params.subPage) {
      history.replace(
        history.createHref({
          ...history.location,
          pathname: `${history.location.pathname}/${TabLocation.Overview}`,
        })
      );
    }
  }, [match.params.subPage, history]);

  // get data from the blast endpoint
  const {
    loading: blastLoading,
    data: blastData,
    error: blastError,
    status: blastStatus,
  } = useDataApi<BlastResults>(urls.resultUrl(match.params.id, 'json'));

  // extract facets and other info from URL querystring
  const urlParams: URLResultParams = useMemo(
    () => getParamsFromURL(location.search),
    [location.search]
  );

  // filter the blast results by local facets
  const hitsFilteredByLocalFacets = useMemo(
    () =>
      (blastData &&
        blastData.hits.filter(filterBlastByFacets(urlParams.selectedFacets))) ||
      [],
    [blastData, urlParams.selectedFacets]
  );

  // accessions of the blast results filtered by local facets
  const accessionsFilteredByLocalFacets = useMemo(
    () => hitsFilteredByLocalFacets.map((hit) => hit.hit_acc),
    [hitsFilteredByLocalFacets]
  );

  // get data from accessions endpoint with facets applied
  const { loading: accessionsLoading, data: accessionsData } = useDataApi<
    Response['data']
  >(
    useMemo(
      () =>
        getAccessionsURL(accessionsFilteredByLocalFacets, {
          selectedFacets: urlParams.selectedFacets,
          facets: [],
        }),
      [accessionsFilteredByLocalFacets, urlParams.selectedFacets]
    )
  );

  // list of all the accessions returned by the accessions endpoint
  const accessionsFilteredByServer = useMemo(
    () =>
      new Set(
        (accessionsData &&
          accessionsData.results.map(
            ({ primaryAccession }) => primaryAccession
          )) ||
          []
      ),
    [accessionsData]
  );

  // additionally filter the blast results by server-calculated facets
  const hitsFiltered = useMemo(
    () =>
      (accessionsFilteredByServer.size &&
        hitsFilteredByLocalFacets.filter((hit) =>
          accessionsFilteredByServer.has(hit.hit_acc)
        )) ||
      [],
    [accessionsFilteredByServer, hitsFilteredByLocalFacets]
  );

  // filter BLAST results according facets (through accession endpoint and other BLAST facets facets)
  const filteredBlastData =
    blastData &&
    urlParams &&
    filterBlastDataForResults(blastData, urlParams.selectedFacets);

  const data = useMemo(
    () => enrich(filteredBlastData || undefined, accessionsData),
    [filteredBlastData, accessionsData]
  );

  const inputParamsData = useParamsData(match.params.id);

  // Note: this function is duplicated in ResultsContainer.tsx
  const handleSelectedEntries = (rowId: string) => {
    const filtered = selectedEntries.filter((id) => id !== rowId);
    setSelectedEntries(
      filtered.length === selectedEntries.length
        ? [...selectedEntries, rowId]
        : filtered
    );
  };

  if (blastLoading) {
    return <Loader />;
  }

  if (blastError || !blastData) {
    return <ErrorHandler status={blastStatus} />;
  }

  // Deciding what should be displayed on the sidebar
  const facetsSidebar = (
    <>
      <ErrorBoundary>
        <BlastResultLocalFacets allHits={blastData.hits} />
      </ErrorBoundary>
      <ErrorBoundary>
        <BlastResultSidebar accessions={accessionsFilteredByLocalFacets} />
      </ErrorBoundary>
    </>
  );

  const emptySidebar = (
    <div className="sidebar-layout__sidebar-content--empty" />
  );
  let sidebar;

  switch (match.params.subPage) {
    case TabLocation.TextOutput:
    case TabLocation.InputParameters:
      sidebar = emptySidebar;
      break;

    default:
      sidebar = facetsSidebar;
      break;
  }

  const actionBar = (
    <ResultButtons
      jobType={jobType}
      jobId={match.params.id}
      selectedEntries={selectedEntries}
      inputParamsData={inputParamsData.data}
      nHits={blastData.hits.length}
      isTableResultsFiltered={blastData?.hits.length !== hitsFiltered.length}
    />
  );

  return (
    <SideBarLayout
      title={
        <PageIntro title="BLAST Results" resultsCount={blastData.hits.length} />
      }
      sidebar={sidebar}
      className="tools-result"
    >
      <Tabs active={match.params.subPage}>
        <Tab
          id={TabLocation.Overview}
          title={
            <Link
              to={(location) => ({
                ...location,
                pathname: `/blast/${match.params.id}/${TabLocation.Overview}`,
              })}
            >
              Overview
            </Link>
          }
        >
          {actionBar}
          <Suspense fallback={<Loader />}>
            <BlastResultTable
              loading={blastLoading || accessionsLoading}
              data={{ ...blastData, hits: hitsFiltered }}
              selectedEntries={selectedEntries}
              handleSelectedEntries={handleSelectedEntries}
              setHspDetailPanel={setHspDetailPanel}
            />
          </Suspense>
        </Tab>
        <Tab
          id={TabLocation.Taxonomy}
          title={
            <Link
              to={(location) => ({
                ...location,
                pathname: `/blast/${match.params.id}/${TabLocation.Taxonomy}`,
              })}
            >
              Taxonomy
            </Link>
          }
        >
          {actionBar}
          <BlastResultTaxonomy data={data} />
        </Tab>
        <Tab
          id={TabLocation.HitDistribution}
          title={
            <Link
              to={(location) => ({
                ...location,
                pathname: `/blast/${match.params.id}/${TabLocation.HitDistribution}`,
              })}
            >
              Hit Distribution
            </Link>
          }
        >
          {actionBar}
          <BlastResultHitDistribution
            loading={blastLoading || accessionsLoading}
            allHits={blastData?.hits || []}
            filteredHits={hitsFiltered}
          />
        </Tab>
        <Tab
          id={TabLocation.TextOutput}
          title={
            <Link
              to={(location) => ({
                ...location,
                pathname: `/blast/${match.params.id}/${TabLocation.TextOutput}`,
              })}
            >
              Text Output
            </Link>
          }
        >
          <Suspense fallback={<Loader />}>
            <TextOutput id={match.params.id} jobType={jobType} />
          </Suspense>
        </Tab>
        <Tab
          id={TabLocation.InputParameters}
          title={
            <Link
              to={(location) => ({
                ...location,
                pathname: `/blast/${match.params.id}/${TabLocation.InputParameters}`,
              })}
            >
              Input Parameters
            </Link>
          }
        >
          <Suspense fallback={<Loader />}>
            <InputParameters
              id={match.params.id}
              inputParamsData={inputParamsData}
            />
          </Suspense>
        </Tab>
        <Tab
          id={TabLocation.APIRequest}
          title={
            <Link
              to={(location) => ({
                ...location,
                pathname: `/blast/${match.params.id}/${TabLocation.APIRequest}`,
              })}
            >
              API Request
            </Link>
          }
        >
          <Suspense fallback={<Loader />}>
            <APIRequest jobType={jobType} inputParamsData={inputParamsData} />
          </Suspense>
        </Tab>
      </Tabs>
      {hspDetailPanel && (
        <HSPDetailPanel
          {...hspDetailPanel}
          onClose={() => setHspDetailPanel(null)}
        />
      )}
    </SideBarLayout>
  );
};

export default BlastResult;
