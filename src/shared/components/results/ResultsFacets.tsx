import { FC } from 'react';
import {
  Facets,
  Facet,
  Loader,
  SwissProtIcon,
  TremblIcon,
  ReferenceProteomeIcon,
} from 'franklin-sites';

import useNS from '../../hooks/useNS';

import TaxonomyFacet from './TaxonomyFacet';

import { mainNamespaces } from '../../types/namespaces';

import { UseDataAPIWithStaleState } from '../../hooks/useDataApiWithStale';
import Response, { FacetValue } from '../../../uniprotkb/types/responseTypes';

import helper from '../../styles/helper.module.scss';
import './styles/results-data.scss';

const ICON_HEIGHT = '1em';

const getDecoratedFacetLabel = (facetValue: FacetValue) => {
  switch (facetValue.value) {
    case 'true':
      return (
        <>
          <SwissProtIcon height={ICON_HEIGHT} className="icon--reviewed" />
          {facetValue.label}
        </>
      );
    case 'false':
      return (
        <>
          <TremblIcon height={ICON_HEIGHT} className="icon--unreviewed" />
          {facetValue.label}
        </>
      );
    case '1':
      return (
        <>
          <ReferenceProteomeIcon
            height={ICON_HEIGHT}
            className="icon--reference-proteome"
          />
          {facetValue.label}
        </>
      );
    default:
      return facetValue.label;
  }
};

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

  // Add relevant icons
  const facetsWithIcons = facets.map((facet) =>
    facet.name === 'reviewed' || facet.name === 'proteome_type'
      ? {
          ...facet,
          values: facet.values?.map((facetValue) => ({
            ...facetValue,
            label: getDecoratedFacetLabel(facetValue),
          })),
        }
      : facet
  );

  const splitIndex = facetsWithIcons.findIndex(
    (facet) => facet.name === 'model_organism' || facet.name === 'superkingdom'
  );
  const before =
    splitIndex === -1 ? [] : facetsWithIcons.slice(0, splitIndex + 1);
  const after =
    splitIndex === -1 ? facetsWithIcons : facetsWithIcons.slice(splitIndex + 1);

  return (
    <Facets className={isStale ? helper.stale : undefined}>
      {before.map(
        (facet) => facet.values && <Facet key={facet.name} data={facet} />
      )}
      {namespace && mainNamespaces.has(namespace) && <TaxonomyFacet />}
      {after.map(
        (facet) => facet.values && <Facet key={facet.name} data={facet} />
      )}
    </Facets>
  );
};

export default ResultsFacets;
