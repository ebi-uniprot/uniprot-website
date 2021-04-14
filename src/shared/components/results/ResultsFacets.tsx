import React, { FC } from 'react';
import { Facets, Facet, Loader } from 'franklin-sites';

import TaxonomyFacet from './TaxonomyFacet';
import ErrorHandler from '../error-pages/ErrorHandler';
import useNS from '../../hooks/useNS';
import { mainNamespaces, Namespace } from '../../types/namespaces';

import Response from '../../../uniprotkb/types/responseTypes';

import helper from '../../styles/helper.module.scss';
import useDataApiWithStale from '../../hooks/useDataApiWithStale';
import useNSQuery from '../../hooks/useNSQuery';

import './styles/results-data.scss';

const ResultsFacets: FC = () => {
  const namespace = useNS() || Namespace.uniprotkb;

  const { url: initialApiUrl } = useNSQuery({ size: 0, withFacets: true });

  const {
    data,
    error,
    loading,
    progress,
    headers,
    status,
    isStale,
  } = useDataApiWithStale<Response['data']>(initialApiUrl);

  if (error || !(loading || data) || !namespace) {
    return <ErrorHandler status={status} />;
  }

  const total = headers?.['x-totalrecords']
    ? +headers['x-totalrecords']
    : undefined;

  if (loading && !data?.facets) {
    return <Loader progress={progress} />;
  }

  if (!total || !data?.facets) {
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
      {before.map((facet) => (
        <Facet key={facet.name} data={facet} />
      ))}
      {namespace && mainNamespaces.has(namespace) && <TaxonomyFacet />}
      {after.map((facet) => (
        <Facet key={facet.name} data={facet} />
      ))}
    </Facets>
  );
};

export default ResultsFacets;
