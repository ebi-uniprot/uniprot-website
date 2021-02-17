import { memo } from 'react';
import { useLocation } from 'react-router-dom';
import { Loader, Facets, Facet } from 'franklin-sites';

import BlastResultLocalFacets from './BlastResultLocalFacets';

import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';

import { getAccessionsURL } from '../../../../shared/config/apiUrls';
import { getParamsFromURL } from '../../../../uniprotkb/utils/resultsUtils';

import { BlastHit } from '../../types/blastResults';
import Response, {
  FacetObject,
} from '../../../../uniprotkb/types/responseTypes';

import '../../../../shared/components/results/styles/results-view.scss';

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
    const { data, loading, isStale } = useDataApiWithStale<Response['data']>(
      // NOTE: set size to 0 when backend supports it
      // NOTE: this is a regression, using 0 used to work before
      getAccessionsURL(accessions, { size: 1, facets, selectedFacets })
    );

    if (loading && !isStale) {
      return <Loader />;
    }

    return (
      <Facets>
        <BlastResultLocalFacets allHits={allHits} />
        {data?.facets?.map((facet: FacetObject) => (
          <Facet
            key={facet.name}
            data={facet}
            className={isStale ? 'is-stale' : undefined}
          />
        ))}
      </Facets>
    );
  }
);

export default BlastResultSidebar;
