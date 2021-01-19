import { FC, ReactElement, useMemo } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Facets } from 'franklin-sites';

import TaxonomyFacet from './TaxonomyFacet';

import { Location, LocationToPath } from '../../../app/config/urls';

import { Facet } from '../../../uniprotkb/types/responseTypes';

import './styles/results-view.scss';

const ResultsFacets: FC<{ facets: Facet[]; isStale?: boolean }> = ({
  facets,
  isStale,
}) => {
  const match = useRouteMatch<{ subPage?: string }>(
    LocationToPath[Location.BlastResult]
  );
  const extraActionsFor: Map<string, ReactElement> | undefined = useMemo(() => {
    if (!match || match.params.subPage === 'taxonomy') {
      return;
    }
    // TODO: will change with proper implementation of taxonomy facets
    // eslint-disable-next-line consistent-return
    return new Map([
      [
        'other_organism',
        <Link
          className="button tertiary expandable-list__action"
          // eslint-disable-next-line uniprot-website/use-config-location
          to={(location) => ({
            ...location,
            pathname: location.pathname.replace(
              match.params?.subPage || '',
              'taxonomy'
            ),
          })}
        >
          Link to full taxonomy
        </Link>,
      ],
    ]);
  }, [match]);

  const splitIndex = facets.findIndex(
    (facet) => facet.name === 'model_organism'
  );
  const before = splitIndex === -1 ? [] : facets.slice(0, splitIndex + 1);
  const after = splitIndex === -1 ? facets : facets.slice(splitIndex + 1);

  return (
    <div className={isStale ? 'is-stale' : undefined}>
      <Facets data={before} extraActionsFor={extraActionsFor} />
      <TaxonomyFacet />
      <Facets data={after} extraActionsFor={extraActionsFor} />
    </div>
  );
};

export default ResultsFacets;
