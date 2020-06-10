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

import { BlastResults } from '../types/blastResults';
import { Facet } from '../../../uniprotkb/types/responseTypes';

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

const getFacetsFromData = (data?: BlastResults): Facet[] => {
  const facets: Facet[] = [];
  if (!data) {
    return facets;
  }

  return facets;
};

const BlastResult = () => {
  const match = useRouteMatch(LocationToPath[Location.BlastResult]) as Match;
  const { loading, data, error, status } = useDataApi<BlastResults>(
    blastUrls.resultUrl(match.params.id)
  );

  const facets = useMemo(() => getFacetsFromData(data), [data]);

  if (loading) return <Loader />;

  if (error) return <ErrorHandler status={status} />;

  if (!data) return <ErrorHandler status={404} />;

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
