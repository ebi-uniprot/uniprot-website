/* eslint-disable uniprot-website/use-config-location */
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import cn from 'classnames';

const UniProtKBGroupByFacet = () => {
  const location = useLocation();
  const searchParams = Object.fromEntries(new URLSearchParams(location.search));

  const getTo = useMemo(
    () => (how: 'taxonomy') =>
      queryString.stringifyUrl({
        url: location.pathname,
        query: {
          ...searchParams,
          groupBy: searchParams.groupBy ? undefined : how,
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
            className={cn({ 'facet-active': searchParams.groupBy })}
            to={getTo('taxonomy')}
          >
            Taxonomy
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UniProtKBGroupByFacet;
