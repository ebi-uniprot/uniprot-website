import { Suspense, useState, useCallback, FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { parse as qsParse, stringify as qsStringify } from 'query-string';
import { Button, SlidingPanel } from 'franklin-sites';

import lazy from '../../utils/lazy';
import ErrorBoundary from '../error-component/ErrorBoundary';

import {
  parse,
  stringify,
} from '../../../query-builder/utils/queryStringProcessor';

import { SearchableNamespace } from '../../types/namespaces';

const QueryBuilder = lazy(
  () =>
    import(
      /* webpackChunkName: "query-builder" */ '../../../query-builder/components/QueryBuilder'
    )
);

const interestingTerms = /taxonomy|organism/;

const TaxonomyFacet: FC<{ namespace: SearchableNamespace }> = ({
  namespace,
}) => {
  const { search } = useLocation();

  const parsedSearch = qsParse(search);
  const parsedClauses = parse(parsedSearch?.query as string | undefined);
  const interestingClauses = parsedClauses.filter((clause) =>
    interestingTerms.test(clause.searchTerm.term)
  );

  const [displayQueryBuilder, setDisplayQueryBuilder] = useState(false);
  const handleClose = useCallback(() => setDisplayQueryBuilder(false), []);

  return (
    <div>
      <span className="facet-name">Taxonomy</span>
      <ul className="expandable-list no-bullet">
        {interestingClauses.map((clause) => {
          const textSearch = clause.searchTerm.term.includes('name');
          return (
            <li key={clause.id}>
              <Link
                className="facet-active"
                // eslint-disable-next-line uniprot-website/use-config-location
                to={(location) => ({
                  ...location,
                  search: qsStringify({
                    ...parsedSearch,
                    query: stringify(
                      // all clauses minus this active one
                      parsedClauses.filter((c) => c !== clause)
                    ),
                  }),
                })}
              >
                {textSearch && '"'}
                {clause.queryBits[clause.searchTerm.term]}
                {textSearch && '"'}
              </Link>
            </li>
          );
        })}
        <li>
          <Button
            variant="tertiary"
            className="expandable-list__action"
            onPointerOver={QueryBuilder.preload}
            onFocus={QueryBuilder.preload}
            onClick={() => setDisplayQueryBuilder(true)}
          >
            Filter by taxonomy
          </Button>
        </li>
      </ul>
      {displayQueryBuilder && (
        <Suspense fallback={null}>
          <SlidingPanel position="left" onClose={handleClose}>
            <ErrorBoundary>
              <QueryBuilder
                onCancel={handleClose}
                fieldToAdd="taxonomy_name"
                initialNamespace={namespace}
              />
            </ErrorBoundary>
          </SlidingPanel>
        </Suspense>
      )}
    </div>
  );
};

export default TaxonomyFacet;
