import React, { FC, ReactElement, useMemo } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Facets } from 'franklin-sites';

import { Facet } from '../../types/responseTypes';

import './styles/results-view.scss';
import { Location, LocationToPath } from '../../../app/config/urls';

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
    // eslint-disable-next-line consistent-return
    return new Map([
      [
        'model_organism',
        <Link
          className="button tertiary expandable-list__action"
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

  return (
    <div className={isStale ? 'is-stale' : undefined}>
      <Facets data={facets} extraActionsFor={extraActionsFor} />
    </div>
  );
};

export default ResultsFacets;
