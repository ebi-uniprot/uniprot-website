import { Button, SlidingPanel } from 'franklin-sites';
import { FC, Suspense, useCallback, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import {
  parse,
  stringify,
} from '../../../query-builder/utils/queryStringProcessor';
import useJobFromUrl from '../../hooks/useJobFromUrl';
import { SearchableNamespace } from '../../types/namespaces';
import lazy from '../../utils/lazy';
import { stringifyQuery } from '../../utils/url';
import ErrorBoundary from '../error-component/ErrorBoundary';
import facetsStyles from './styles/facets.module.scss';

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
  const { pathname, search } = useLocation();
  const { jobId } = useJobFromUrl();

  const parsedSearch = new URLSearchParams(search);
  const parsedClauses = parse(parsedSearch.get('query') || '');
  const interestingClauses = parsedClauses.filter((clause) =>
    interestingTerms.test(clause.searchTerm.term || '')
  );

  const [displayQueryBuilder, setDisplayQueryBuilder] = useState(false);
  const handleClose = useCallback(() => setDisplayQueryBuilder(false), []);

  return (
    <div>
      <span className={facetsStyles['facet-name']}>Taxonomy</span>
      <ul className="expandable-list no-bullet">
        {interestingClauses.map((clause) => {
          const textSearch = clause.searchTerm.term?.includes('name');
          return (
            <li key={clause.id}>
              <Link
                className={facetsStyles['facet-active']}
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
                {clause.searchTerm.term &&
                  clause.queryBits[clause.searchTerm.term]}
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
            title={
              <span data-article-id="advanced_search">Advanced Search</span>
            }
            position="left"
            onClose={handleClose}
            pathname={pathname}
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
