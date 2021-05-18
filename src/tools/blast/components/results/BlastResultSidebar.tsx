import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader, Facets } from 'franklin-sites';

import BlastResultLocalFacets from './BlastResultLocalFacets';

import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';

import { getAccessionsURL } from '../../../../shared/config/apiUrls';
import { getParamsFromURL } from '../../../../uniprotkb/utils/resultsUtils';

import { BlastHit } from '../../types/blastResults';
import Response from '../../../../uniprotkb/types/responseTypes';

import ResultsFacets from '../../../../shared/components/results/ResultsFacets';

const facets = [
  'reviewed',
  'model_organism',
  'other_organism',
  'proteins_with',
  'existence',
  'annotation_score',
  'length',
];

type BlastResultSidebarProps = {
  accessions?: string[];
  allHits: BlastHit[];
};

const BlastResultSidebar = memo<BlastResultSidebarProps>(
  ({ accessions, allHits }) => {
    const { search } = useLocation();
    const { selectedFacets } = getParamsFromURL(search);
    const dataApiObject = useDataApiWithStale<Response['data']>(
      getAccessionsURL(accessions, { size: 0, facets, selectedFacets })
    );

    const { loading, isStale } = dataApiObject;
    if (loading && !isStale) {
      return <Loader />;
    }

    return (
      <Facets>
        <BlastResultLocalFacets allHits={allHits} />
        <ResultsFacets dataApiObject={dataApiObject} />
      </Facets>
    );
  }
);

export default BlastResultSidebar;
