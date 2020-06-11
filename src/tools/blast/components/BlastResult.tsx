import React, { useMemo } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Loader, PageIntro } from 'franklin-sites';

import SideBarLayout from '../../../shared/components/layouts/SideBarLayout';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import BlastResultTable from './BlastResultTable';
import ResultsFacets from '../../../uniprotkb/components/results/ResultsFacets';

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

// const facets: Facet[] = [
//   {
//     label: 'Status',
//     name: 'reviewed',
//     allowMultipleSelection: false,
//     values: [
//       {
//         label: 'Unreviewed (TrEMBL)',
//         value: 'false',
//         count: 455,
//       },
//       {
//         label: 'Reviewed (Swiss-Prot)',
//         value: 'true',
//         count: 52,
//       },
//     ],
//   },
// ];

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
    blastData.hits.map((hit) => `(accession:${hit.hit_acc})`).join(' OR ')
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
  const {
    loading: apiLoading,
    data: apiData,
    error: apiError,
    status: apiStatus,
  } = useDataApi<Response['data']>(
    useMemo(() => getEnrichApiUrl(blastData), [blastData])
  );

  const loading = blastLoading || apiLoading;
  const data = useMemo(() => enrich(blastData, apiData), [blastData, apiData]);
  const error = blastError || apiError;
  const status = blastStatus || apiStatus || 404;

  const facets = useMemo(() => getFacetsFromData(data), [data]);

  if (loading) return <Loader />;

  if (error || !data) return <ErrorHandler status={status} />;

  return (
    <SideBarLayout
      title={
        <PageIntro title="BLAST Results" resultsCount={data.hits.length} />
      }
      sidebar={<ResultsFacets facets={facets} />}
    >
      <BlastResultTable data={data} />
    </SideBarLayout>
  );
};

export default BlastResult;
