import { memo } from 'react';
import { Facets, Facet, Loader } from 'franklin-sites';

import useNS from '../../hooks/useNS';

import TaxonomyFacet from './TaxonomyFacet';
import EntryTypeIcon from '../entry/EntryTypeIcon';
import UniProtKBGroupByFacet from '../../../uniprotkb/components/results/UniProtKBGroupByFacet';

import {
  mainNamespaces,
  Namespace,
  SearchableNamespace,
} from '../../types/namespaces';

import { UseDataAPIWithStaleState } from '../../hooks/useDataApiWithStale';
import { FacetObject, FacetValue } from '../../types/results';

import helper from '../../styles/helper.module.scss';

const getDecoratedFacetLabel = (facetValue: FacetValue) => {
  const { label } = facetValue;
  if (typeof label === 'string') {
    return (
      <>
        <EntryTypeIcon entryType={label} />
        {label}
      </>
    );
  }
  return label;
};

type Props = {
  dataApiObject: UseDataAPIWithStaleState<{ facets?: FacetObject[] }>;
  namespaceOverride?: Namespace;
};

const ResultsFacets = memo<Props>(({ dataApiObject, namespaceOverride }) => {
  const namespace = useNS(namespaceOverride);
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
    facet.name === 'reviewed' ||
    facet.name === 'proteome_type' ||
    facet.name === 'types' || // Types is Publication's source
    facet.name === 'proteome' // Not icon but change letter casing until returned otherwise by the backend (better if there is proteometype returned)
      ? {
          ...facet,
          values: facet.values?.map((facetValue) => ({
            ...facetValue,
            value:
              facet.name === 'proteome'
                ? facetValue.value.toUpperCase()
                : facetValue.value,
            label:
              facet.name !== 'proteome'
                ? getDecoratedFacetLabel(facetValue)
                : null,
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
      {namespace && mainNamespaces.has(namespace) && (
        <TaxonomyFacet namespace={namespace as SearchableNamespace} />
      )}
      {namespace === Namespace.uniprotkb && <UniProtKBGroupByFacet />}
      {after.map(
        (facet) => facet.values && <Facet key={facet.name} data={facet} />
      )}
    </Facets>
  );
});

export default ResultsFacets;
