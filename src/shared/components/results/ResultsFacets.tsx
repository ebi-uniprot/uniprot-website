import { Loader } from 'franklin-sites';
import { memo } from 'react';
import { useParams, useRouteMatch } from 'react-router-dom';

import { Location, LocationToPath } from '../../../app/config/urls';
import {
  ProteomeFacetValue,
  proteomeFacetValueToLabel,
} from '../../../proteomes/config/ProteomesFacetConfiguration';
import UniProtKBGroupByFacet from '../../../uniprotkb/components/results/UniProtKBGroupByFacet';
import { type UseDataAPIWithStaleState } from '../../hooks/useDataApiWithStale';
import useNS from '../../hooks/useNS';
import helper from '../../styles/helper.module.scss';
import {
  mainNamespaces,
  Namespace,
  type SearchableNamespace,
} from '../../types/namespaces';
import { type FacetObject, type FacetValue } from '../../types/results';
import EntryTypeIcon from '../entry/EntryTypeIcon';
import baseLayoutStyles from '../layouts/styles/base-layout.module.scss';
import { Facet, Facets } from './Facets';
import TaxonomyFacet from './TaxonomyFacet';

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

const proteomeTypeOrder = [
  ProteomeFacetValue.REFERENCE,
  ProteomeFacetValue.NON_REFERENCE,
  ProteomeFacetValue.EXCLUDED,
];

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
  const decoratedFacets = facets.map((facet) => {
    switch (facet.name) {
      case 'reviewed':
      case 'types': // Types is Publication's source
        return {
          ...facet,
          values: facet.values?.map((facetValue) => ({
            ...facetValue,
            label: getDecoratedFacetLabel(facetValue),
          })),
        };
      case 'proteome_type':
        return {
          ...facet,
          values: facet.values
            ?.map((facetValue) => ({
              ...facetValue,
              label: getDecoratedFacetLabel({
                ...facetValue,
                label:
                  proteomeFacetValueToLabel[
                    facetValue.value as ProteomeFacetValue
                  ],
              }),
            }))
            .sort(
              (a, b) =>
                proteomeTypeOrder.indexOf(a.value as ProteomeFacetValue) -
                proteomeTypeOrder.indexOf(b.value as ProteomeFacetValue)
            ),
        };
      // TODO: Needs review of the use case. Delete if not needed
      case 'proteome': // uppercase value until backend returns it consistently
        return {
          ...facet,
          values: facet.values?.map((facetValue) => ({
            ...facetValue,
            value: facetValue.value.toUpperCase(),
            label: null,
          })),
        };
      case 'existence':
        return {
          ...facet,
          values: facet.values?.filter((value) => value.value !== '0'),
        };
      default:
        return facet;
    }
  });

  const splitIndex = decoratedFacets.findIndex(
    (facet) => facet.name === 'model_organism' || facet.name === 'superkingdom'
  );
  const before =
    splitIndex === -1 ? [] : decoratedFacets.slice(0, splitIndex + 1);
  const after =
    splitIndex === -1 ? decoratedFacets : decoratedFacets.slice(splitIndex + 1);

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
