import { FC } from 'react';
import { Facets, Facet, Loader } from 'franklin-sites';

import useNS from '../../hooks/useNS';

import TaxonomyFacet from './TaxonomyFacet';

import { mainNamespaces } from '../../types/namespaces';

import { UseDataAPIWithStaleState } from '../../hooks/useDataApiWithStale';
import Response from '../../../uniprotkb/types/responseTypes';

import helper from '../../styles/helper.module.scss';
import './styles/results-data.scss';

const ResultsFacets: FC<{
  dataApiObject: UseDataAPIWithStaleState<Response['data']>;
}> = ({ dataApiObject }) => {
  const namespace = useNS();
  const { data, isStale, loading, progress } = dataApiObject;

  // TODO: show loading when a brand new search query (and not just a facet modification) is being fetched

  if (loading && !isStale) {
    return <Loader progress={progress} />;
  }

  if (!data?.facets) {
    return null;
  }

  const { facets } = data;

  const splitIndex = facets.findIndex(
    (facet) => facet.name === 'model_organism' || facet.name === 'superkingdom'
  );
  const before = splitIndex === -1 ? [] : facets.slice(0, splitIndex + 1);
  const after = splitIndex === -1 ? facets : facets.slice(splitIndex + 1);

  return (
    <Facets className={isStale ? helper.stale : undefined}>
      {before.map(
        (facet) => facet.values && <Facet key={facet.name} data={facet} />
      )}
      {namespace && mainNamespaces.has(namespace) && (
        <TaxonomyFacet namespace={namespace} />
      )}
      {after.map(
        (facet) => facet.values && <Facet key={facet.name} data={facet} />
      )}
    </Facets>
  );
};

export default ResultsFacets;
