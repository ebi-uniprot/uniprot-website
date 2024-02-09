import { Suspense, useState, useCallback, FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, SlidingPanel } from 'franklin-sites';

import ErrorBoundary from '../error-component/ErrorBoundary';

import useJobFromUrl from '../../hooks/useJobFromUrl';

import lazy from '../../utils/lazy';

import {
  parse,
  stringify,
} from '../../../query-builder/utils/queryStringProcessor';
import { stringifyQuery } from '../../utils/url';

import { SearchableNamespace } from '../../types/namespaces';

const QueryBuilder = lazy(
  () =>
    import(
      /* webpackChunkName: "query-builder" */ '../../../query-builder/components/QueryBuilder'
    )
);

const interestingTerms = /taxonomy|organism/;

const TaxonomyFacet: FC<
  React.PropsWithChildren<{ namespace: SearchableNamespace }>
> = ({ namespace }) => {
  const { search } = useLocation();
  const { jobId } = useJobFromUrl();

  const parsedSearch = new URLSearchParams(search);
  const parsedClauses = parse(parsedSearch.get('query') || '');
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
                  search: stringifyQuery({
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
            onClick={() => setDisplayQueryBuilder((value) => !value)}
          >
            Filter by taxonomy
          </Button>
        </li>
      </ul>
      {displayQueryBuilder && (
        <Suspense fallback={null}>
          <SlidingPanel
            title="Advanced Search"
            position="left"
            onClose={handleClose}
          >
            <ErrorBoundary>
              <QueryBuilder
                onCancel={handleClose}
                fieldToAdd="taxonomy_name"
                initialSearchspace={jobId ? 'toolResults' : namespace}
              />
            </ErrorBoundary>
          </SlidingPanel>
        </Suspense>
      )}
    </div>
  );
};

export default TaxonomyFacet;
