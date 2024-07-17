import { memo } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';
import { Loader } from 'franklin-sites';

import { Facets, Facet } from './Facets';
import TaxonomyFacet from './TaxonomyFacet';
import EntryTypeIcon from '../entry/EntryTypeIcon';
import UniProtKBGroupByFacet from '../../../uniprotkb/components/results/UniProtKBGroupByFacet';

import useNS from '../../hooks/useNS';

import {
  mainNamespaces,
  Namespace,
  SearchableNamespace,
} from '../../types/namespaces';

import { UseDataAPIWithStaleState } from '../../hooks/useDataApiWithStale';
import { FacetObject, FacetValue } from '../../types/results';
import { Location, LocationToPath } from '../../../app/config/urls';

import helper from '../../styles/helper.module.scss';
import baseLayoutStyles from '../layouts/styles/base-layout.module.scss';

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
  const uniprotKBResultsRoute = useRouteMatch(
    LocationToPath[Location.UniProtKBResults]
  );
  const { subPage } = useParams<{ subPage: string }>();

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

  const facetClickHandler: (
    event: React.MouseEvent<HTMLElement>
  ) => void = () =>
    document
      .querySelector(`.${baseLayoutStyles['main-content']}`)
      ?.scrollTo(0, 0);

  return (
    <Facets className={isStale ? helper.stale : undefined}>
      {before.map(
        (facet) =>
          facet.values && (
            <Facet
              key={facet.name}
              data={facet}
              facetClickHandler={facetClickHandler}
            />
          )
      )}
      {namespace &&
        mainNamespaces.has(namespace) &&
        subPage !== 'publications' && (
          <TaxonomyFacet namespace={namespace as SearchableNamespace} />
        )}
      {namespace === Namespace.uniprotkb && uniprotKBResultsRoute?.isExact && (
        <UniProtKBGroupByFacet />
      )}
      {after.map(
        (facet) =>
          facet.values && (
            <Facet
              key={facet.name}
              data={facet}
              facetClickHandler={facetClickHandler}
            />
          )
      )}
    </Facets>
  );
});

export default ResultsFacets;
