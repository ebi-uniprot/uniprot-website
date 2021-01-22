import { FC } from 'react';
import { Facets, Facet } from 'franklin-sites';

import TaxonomyFacet from './TaxonomyFacet';

import useNS from '../../hooks/useNS';

import { FacetObject } from '../../../uniprotkb/types/responseTypes';

import './styles/results-view.scss';

const ResultsFacets: FC<{ facets: FacetObject[]; isStale?: boolean }> = ({
  facets,
  isStale,
}) => {
  const isSearchPage = Boolean(useNS());

  const splitIndex = facets.findIndex(
    (facet) => facet.name === 'model_organism'
  );
  const before = splitIndex === -1 ? [] : facets.slice(0, splitIndex + 1);
  const after = splitIndex === -1 ? facets : facets.slice(splitIndex + 1);

  return (
    <Facets className={isStale ? 'is-stale' : undefined}>
      {before.map((facet) => (
        <Facet key={facet.name} data={facet} />
      ))}
      {isSearchPage && <TaxonomyFacet />}
      {after.map((facet) => (
        <Facet key={facet.name} data={facet} />
      ))}
    </Facets>
  );
};

export default ResultsFacets;
