/* eslint-disable uniprot-website/use-config-location */
import { Link, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useMemo } from 'react';

const UniProtKBViewBySelection = () => {
  const location = useLocation();
  const searchParams = Object.fromEntries(new URLSearchParams(location.search));
  const getTo = useMemo(
    () => (how: 'taxonomy') =>
      queryString.stringifyUrl({
        url: location.pathname,
        query: { ...searchParams, viewBy: how },
      }),
    [location.pathname, searchParams]
  );
  return (
    <div>
      <span className="facet-name">View by</span>
      <ul className="expandable-list no-bullet">
        <li>
          <Link className="facet-active" to={getTo('taxonomy')}>
            Taxonomy
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UniProtKBViewBySelection;
