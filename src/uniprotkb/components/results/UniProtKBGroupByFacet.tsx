/* eslint-disable uniprot-website/use-config-location */
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import cn from 'classnames';
import { GroupBy } from '../../config/apiUrls';

const UniProtKBGroupByFacet = () => {
  const location = useLocation();
  const searchParams = Object.fromEntries(new URLSearchParams(location.search));

  const getTo = useMemo(
    () => (groupBy: GroupBy) =>
      queryString.stringifyUrl({
        url: location.pathname,
        query: {
          ...searchParams,
          groupBy: searchParams.groupBy ? undefined : groupBy,
          parent: undefined,
        },
      }),
    [location.pathname, searchParams]
  );

  return (
    <div>
      <span className="facet-name">Group by</span>
      <ul className="expandable-list no-bullet">
        <li>
          <Link
            className={cn({
              'facet-active': searchParams.groupBy === 'taxonomy',
            })}
            to={getTo('taxonomy')}
          >
            Taxonomy
          </Link>
        </li>
        <li>
          <Link
            className={cn({
              'facet-active': searchParams.groupBy === 'keyword',
            })}
            to={getTo('keyword')}
          >
            Keywords
          </Link>
        </li>
        <li>
          <Link
            className={cn({ 'facet-active': searchParams.groupBy === 'go' })}
            to={getTo('go')}
          >
            Gene Ontology
          </Link>
        </li>
        <li>
          <Link
            className={cn({ 'facet-active': searchParams.groupBy === 'ec' })}
            to={getTo('ec')}
          >
            Enzyme Class
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UniProtKBGroupByFacet;
