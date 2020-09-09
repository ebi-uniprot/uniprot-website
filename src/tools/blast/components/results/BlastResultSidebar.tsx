import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader } from 'franklin-sites';

import ResultsFacets from '../../../../uniprotkb/components/results/ResultsFacets';

import Response from '../../../../uniprotkb/types/responseTypes';
import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';
import { getAccessionsURL } from '../../../../uniprotkb/config/apiUrls';
import { getParamsFromURL } from '../../../../uniprotkb/utils/resultsUtils';

type BlastResultSidebarProps = {
  accessions?: string[];
};

const facets = [
  'reviewed',
  'model_organism',
  'other_organism',
  'proteins_with',
  'existence',
  'annotation_score',
  'length',
];

const BlastResultSidebar: FC<BlastResultSidebarProps> = ({ accessions }) => {
  const { search } = useLocation();
  const { selectedFacets } = getParamsFromURL(search);
  const { data, loading, isStale } = useDataApiWithStale<Response['data']>(
    getAccessionsURL(accessions, { size: 0, facets, selectedFacets })
  );

  if (loading && !isStale) {
    return <Loader />;
  }

  return <ResultsFacets facets={data?.facets || []} isStale={isStale} />;
};

export default BlastResultSidebar;
