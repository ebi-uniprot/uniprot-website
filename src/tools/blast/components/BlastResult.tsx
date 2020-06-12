import React, { useMemo } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Loader, PageIntro, Tabs } from 'franklin-sites';

import SideBarLayout from '../../../shared/components/layouts/SideBarLayout';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import BlastResultTable from './BlastResultTable';
import ResultsFacets from '../../../uniprotkb/components/results/ResultsFacets';
import ResultsButtons from '../../../uniprotkb/components/results/ResultsButtons';

import useDataApi from '../../../shared/hooks/useDataApi';

import { Location, LocationToPath } from '../../../app/config/urls';
import blastUrls from '../config/blastUrls';
import { getAPIQueryUrl } from '../../../uniprotkb/config/apiUrls';

import { BlastResults, BlastHit } from '../types/blastResults';
import Response, {
  Facet,
  FacetValue,
} from '../../../uniprotkb/types/responseTypes';
// what we import are types, even if they are in adapter file
import {
  UniProtkbAPIModel,
  EntryType,
} from '../../../uniprotkb/adapters/uniProtkbConverter';

type Match = {
  params: {
    id: string;
  };
};

const getFacetsFromData = (data?: EnrichedData | null): Facet[] => {
  const facets: Facet[] = [];
  if (!data || !data.hits.length) {
    return facets;
  }

  console.table(data.hits);

  // status
  facets.push({
    label: 'Status',
    name: 'reviewed',
    allowMultipleSelection: false,
    values: [
      {
        label: 'Unreviewed (TrEMBL)',
        value: 'false',
        count: data.hits.filter(
          (hit) => hit.extra?.entryType === EntryType.TREMBL
        ).length,
      },
      {
        label: 'Reviewed (Swiss-Prot)',
        value: 'true',
        count: data.hits.filter(
          (hit) => hit.extra?.entryType === EntryType.SWISSPROT
        ).length,
      },
    ],
  });

  // organisms
  const organisms = new Map<string, FacetValue>();
  for (const { hit_uni_ox: value, hit_uni_os: label } of data.hits) {
    let organism = organisms.get(value);
    if (!organism) {
      // first time we see this organism
      organism = { label, value, count: 0 };
      organisms.set(value, organism);
    }
    organism.count += 1;
  }
  facets.push({
    label: 'Organisms',
    name: 'organism',
    allowMultipleSelection: true,
    values: Array.from(organisms.values()).sort((a, b) => b.count - a.count),
  });

  return facets;
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

interface EnrichedData extends BlastResults {
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
  } = useDataApi<BlastResults>(blastUrls.resultUrl(match.params.id));

  // corresponding data from API
  const { loading: apiLoading, data: apiData } = useDataApi<Response['data']>(
    useMemo(() => getEnrichApiUrl(blastData), [blastData])
  );

  const data = useMemo(() => enrich(blastData, apiData), [blastData, apiData]);

  const facets = useMemo(() => getFacetsFromData(data), [data]);

  if (blastLoading) return <Loader />;

  if (blastError || !blastData) return <ErrorHandler status={blastStatus} />;

  return (
    <SideBarLayout
      title={
        <PageIntro title="BLAST Results" resultsCount={blastData.hits.length} />
      }
      sidebar={apiLoading ? <Loader /> : <ResultsFacets facets={facets} />}
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
            content: 'Text output content',
            id: 'text-output',
          },
          {
            title: 'Tool input',
            content: 'Tool input content',
            id: 'tool-input',
          },
        ]}
      />
    </SideBarLayout>
  );
};

export default BlastResult;
