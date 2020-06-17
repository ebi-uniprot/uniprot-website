import React, { useMemo, useEffect, lazy, Suspense } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { Loader, PageIntro, Tabs, Tab } from 'franklin-sites';

import SideBarLayout from '../../../../shared/components/layouts/SideBarLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import ResultsButtons from '../../../../uniprotkb/components/results/ResultsButtons';
import BlastResultSidebar from './BlastResultSidebar';
// import BlastResultDownload from './BlastResultDownload';

import useDataApi from '../../../../shared/hooks/useDataApi';

import { Location, LocationToPath } from '../../../../app/config/urls';
import blastUrls from '../../config/blastUrls';
import { getAPIQueryUrl } from '../../../../uniprotkb/config/apiUrls';

import { BlastResults, BlastHit } from '../../types/blastResults';
import Response from '../../../../uniprotkb/types/responseTypes';
// what we import are types, even if they are in adapter file
import { UniProtkbAPIModel } from '../../../../uniprotkb/adapters/uniProtkbConverter';

const BlastResultTable = lazy(() =>
  import(/* webpackChunkName: "blast-result-page" */ './BlastResultTable')
);
const BlastResultTextOutput = lazy(() =>
  import(
    /* webpackChunkName: "blast-result-text-output" */ './BlastResultTextOutput'
  )
);
const BlastResultToolInput = lazy(() =>
  import(
    /* webpackChunkName: "blast-result-tool-input" */ './BlastResultToolInput'
  )
);

type Match = {
  params: {
    id: string;
    subPage?: string;
  };
};

const getEnrichApiUrl = (blastData?: BlastResults) => {
  if (!blastData) {
    return null;
  }
  return getAPIQueryUrl(
    blastData.hits.map((hit) => `(accession:${hit.hit_acc})`).join(' OR '),
    undefined,
    undefined,
    undefined,
    undefined,
    [],
    blastData.hits.length
  );
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

  // data from blast
  const {
    loading: blastLoading,
    data: blastData,
    error: blastError,
    status: blastStatus,
  } = useDataApi<BlastResults>(
    blastUrls.resultUrl(match.params.id, 'jdp?format=json')
  );

  console.log(match);

  useEffect(() => {
    if (!match.params.subPage) {
      history.replace(
        history.createHref({
          ...history.location,
          pathname: `${history.location.pathname}/overview`,
        })
      );
    }
  }, [match.params.subPage, history]);

  // corresponding data from API
  const { loading: apiLoading, data: apiData } = useDataApi<Response['data']>(
    useMemo(() => getEnrichApiUrl(blastData), [blastData])
  );

  const data = useMemo(() => enrich(blastData, apiData), [blastData, apiData]);

  if (blastLoading) return <Loader />;

  if (blastError || !blastData) return <ErrorHandler status={blastStatus} />;

  return (
    <SideBarLayout
      title={
        <PageIntro title="BLAST Results" resultsCount={blastData.hits.length} />
      }
      sidebar={<BlastResultSidebar loading={apiLoading} data={data} />}
    >
      <Tabs active={match.params.subPage}>
        <Tab
          id="overview"
          title={
            <Link to={`/blast/${match.params.id}/overview`}>Overview</Link>
          }
        >
          {/* TODO: make that component more generic */}
          {/* @ts-ignore */}
          <ResultsButtons />
          <Suspense fallback={<Loader />}>
            <BlastResultTable data={data || blastData} />
          </Suspense>
        </Tab>
        <Tab
          id="taxonomy"
          title={
            <Link to={`/blast/${match.params.id}/taxonomy`}>Taxonomy</Link>
          }
        >
          {/* TODO: make that component more generic */}
          {/* @ts-ignore */}
          <ResultsButtons />
          Taxonomy content
        </Tab>
        <Tab
          id="hit-distribution"
          title={
            <Link to={`/blast/${match.params.id}/hit-distribution`}>
              Hit Distribution
            </Link>
          }
        >
          {/* TODO: make that component more generic */}
          {/* @ts-ignore */}
          <ResultsButtons />
          Hit distribution content
        </Tab>
        <Tab
          id="text-output"
          title={
            <Link to={`/blast/${match.params.id}/text-output`}>
              Text Output
            </Link>
          }
        >
          <Suspense fallback={<Loader />}>
            <BlastResultTextOutput id={match.params.id} />
          </Suspense>
        </Tab>
        <Tab
          id="tool-input"
          title={
            <Link to={`/blast/${match.params.id}/tool-input`}>Tool Input</Link>
          }
        >
          <Suspense fallback={<Loader />}>
            <BlastResultToolInput id={match.params.id} />
          </Suspense>
        </Tab>
      </Tabs>
    </SideBarLayout>
  );
};

export default BlastResult;
