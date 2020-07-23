import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader } from 'franklin-sites';

import ResultsFacets from '../../../../uniprotkb/components/results/ResultsFacets';
import BlastResultsParametersFacets from './BlastResultsParametersFacets';

import { BlastHitFacetParameters } from '../../utils/blastFacetDataUtils';
import Response from '../../../../uniprotkb/types/responseTypes';
import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';
import { getAccessionsURL } from '../../../../uniprotkb/config/apiUrls';
import { getParamsFromURL } from '../../../../uniprotkb/utils/resultsUtils';

type BlastResultSidebarProps = {
  accessions?: string[];
  histogramSettings?: BlastHitFacetParameters;
};

const BlastResultSidebar: FC<BlastResultSidebarProps> = ({
  accessions,
  histogramSettings,
}) => {
  const { search } = useLocation();
  const { selectedFacets } = getParamsFromURL(search);
  const { data, loading, isStale } = useDataApiWithStale<Response['data']>(
    getAccessionsURL(accessions, { size: 0, selectedFacets })
  );

  if (!accessions || !histogramSettings || (loading && !isStale)) {
    return <Loader />;
  }

  return (
    <>
      <ResultsFacets facets={data?.facets || []} isStale={isStale} />
      <BlastResultsParametersFacets
        parameters={histogramSettings}
        isStale={isStale}
      />
    </>
  );
};

export default BlastResultSidebar;
