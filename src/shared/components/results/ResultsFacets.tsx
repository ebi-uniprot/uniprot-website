import { FC } from 'react';
import { Facets, Facet } from 'franklin-sites';

import TaxonomyFacet from './TaxonomyFacet';

import useNS from '../../hooks/useNS';
import { mainNamespaces } from '../../types/namespaces';

import { FacetObject } from '../../../uniprotkb/types/responseTypes';

import helper from '../../styles/helper.module.scss';
import './styles/results-view.scss';

const ResultsFacets: FC<{ facets: FacetObject[]; isStale?: boolean }> = ({
  facets,
  isStale,
}) => {
  const ns = useNS();

  const splitIndex = facets.findIndex(
    (facet) => facet.name === 'model_organism' || facet.name === 'superkingdom'
  );
  const before = splitIndex === -1 ? [] : facets.slice(0, splitIndex + 1);
  const after = splitIndex === -1 ? facets : facets.slice(splitIndex + 1);

  return (
    <Facets className={isStale ? helper.stale : undefined}>
      {before.map((facet) => (
        <Facet key={facet.name} data={facet} />
      ))}
      {ns && mainNamespaces.has(ns) && <TaxonomyFacet />}
      {after.map((facet) => (
        <Facet key={facet.name} data={facet} />
      ))}
    </Facets>
  );
};

export default ResultsFacets;
