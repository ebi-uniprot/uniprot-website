import {
  FC,
  ReactElement,
  Suspense,
  useMemo,
  useState,
  useCallback,
} from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import cn from 'classnames';
import { Facets, Button } from 'franklin-sites';

import SlidingPanel, { Position } from '../layouts/SlidingPanel';
import QueryBuilder from '../../../query-builder/components/QueryBuilder';

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

  const [displayQueryBuilder, setDisplayQueryBuilder] = useState(false);
  const handleClose = useCallback(() => setDisplayQueryBuilder(false), []);

  return (
    <div className={isStale ? 'is-stale' : undefined}>
      <div className={cn('facets')}>
        <ul className="no-bullet">
          <li>
            <span className="facet-name">Taxonomy</span>

            <ul className="expandable-list no-bullet">
              <li>
                <Link to={(location) => location /* same without this */}>
                  Homo sapiens
                </Link>
              </li>
              <li>
                <Button
                  variant="tertiary"
                  className="expandable-list__action"
                  onClick={() => setDisplayQueryBuilder(true)}
                >
                  Filter by taxonomy
                </Button>
              </li>
            </ul>
          </li>
        </ul>
        {displayQueryBuilder && (
          <Suspense fallback={null}>
            <SlidingPanel
              position={Position.left}
              yScrollable
              onClose={handleClose}
            >
              <QueryBuilder onCancel={handleClose} fieldToAdd="taxonomy_name" />
            </SlidingPanel>
          </Suspense>
        )}
      </div>
      <Facets data={facets} extraActionsFor={extraActionsFor} />
    </div>
  );
};

export default ResultsFacets;
