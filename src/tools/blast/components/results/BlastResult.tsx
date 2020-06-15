import React, { useMemo } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Loader, PageIntro, Tabs } from 'franklin-sites';

import SideBarLayout from '../../../../shared/components/layouts/SideBarLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import ResultsButtons from '../../../../uniprotkb/components/results/ResultsButtons';
import BlastResultSidebar from './BlastResultSidebar';
import BlastResultTable from './BlastResultTable';
import BlastResultTextOutput from './BlastResultTextOutput';
import BlastResultToolInput from './BlastResultToolInput';
// import BlastResultDownload from './BlastResultDownload';

import useDataApi from '../../../../shared/hooks/useDataApi';

import { Location, LocationToPath } from '../../../../app/config/urls';
import blastUrls from '../../config/blastUrls';
import { getAPIQueryUrl } from '../../../../uniprotkb/config/apiUrls';

import { BlastResults, BlastHit } from '../../types/blastResults';
import Response from '../../../../uniprotkb/types/responseTypes';
// what we import are types, even if they are in adapter file
import { UniProtkbAPIModel } from '../../../../uniprotkb/adapters/uniProtkbConverter';

type Match = {
  params: {
    id: string;
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
      <Tabs
        tabData={[
          {
            title: 'Overview',
            content: (
              <>
                {/* TODO: make that component more generic */}
                {/* @ts-ignore */}
                <ResultsButtons />
                <BlastResultTable data={data || blastData} />
              </>
            ),
            id: 'overview',
          },
          {
            title: 'Taxonomy',
            content: (
              <>
                {/* TODO: make that component more generic */}
                {/* @ts-ignore */}
                <ResultsButtons />
                Taxonomy content
              </>
            ),
            id: 'taxonomy',
          },
          {
            title: 'Hit Distribution',
            content: (
              <>
                {/* TODO: make that component more generic */}
                {/* @ts-ignore */}
                <ResultsButtons />
                Hit distribution content
              </>
            ),
            id: 'hit-distribution',
          },
          {
            title: 'Text Output',
            content: <BlastResultTextOutput id={match.params.id} />,
            id: 'text-output',
          },
          {
            title: 'Tool input',
            content: <BlastResultToolInput id={match.params.id} />,
            id: 'tool-input',
          },
          // {
          //   title: 'Download',
          //   content: <BlastResultDownload id={match.params.id} />,
          //   id: 'download',
          // },
        ]}
      />
    </SideBarLayout>
  );
};

export default BlastResult;
