/* eslint-disable uniprot-website/use-config-location */
import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import { stringifyUrl } from '../../../shared/utils/url';

import { GroupBy } from '../../config/apiUrls/groupBy';

import facetsStyles from '../../../shared/components/results/styles/facets.module.scss';

const groupByLabelAndParams: [string, GroupBy][] = [
  ['Taxonomy', 'taxonomy'],
  ['Keywords', 'keyword'],
  ['Gene Ontology', 'go'],
  ['Enzyme Class', 'ec'],
];

const UniProtKBGroupByFacet = () => {
  const location = useLocation();
  const searchParams = Object.fromEntries(new URLSearchParams(location.search));

  const getTo = useMemo(
    () => (groupBy: GroupBy) =>
      stringifyUrl(location.pathname, searchParams, {
        groupBy: searchParams.groupBy === groupBy ? undefined : groupBy,
        parent: undefined,
      }),
    [location.pathname, searchParams]
  );

  return (
    <div>
      <span className={facetsStyles['facet-name']}>Group by</span>
      <ul className="expandable-list no-bullet">
        {groupByLabelAndParams.map(([label, param]) => (
          <li key={param}>
            <Link
              className={cn({
                [facetsStyles['facet-active']]: searchParams.groupBy === param,
              })}
              to={getTo(param)}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UniProtKBGroupByFacet;
