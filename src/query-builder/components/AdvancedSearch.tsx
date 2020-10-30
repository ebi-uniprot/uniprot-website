import React, { FC, FormEvent, useState, useEffect } from 'react';
import {
  useHistory,
  useRouteMatch,
  generatePath,
  useLocation,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import qs from 'query-string';
import { v1 } from 'uuid';
import { frame } from 'timing-functions';
import { PageIntro } from 'franklin-sites';

import ClauseList from './ClauseList';

import useDataApi from '../../shared/hooks/useDataApi';

import { createEmptyClause, defaultQueryFor } from '../utils/clause';
import { stringify, parse } from '../utils/queryStringProcessor';

import { addMessage } from '../../messages/state/messagesActions';

import apiUrls from '../../shared/config/apiUrls';
import { Namespace, NamespaceLabels } from '../../shared/types/namespaces';
import { LocationToPath, Location } from '../../app/config/urls';

import {
  MessageFormat,
  MessageLevel,
} from '../../messages/types/messagesTypes';
import { Clause, SearchTermType } from '../types/searchTypes';

import '../../uniprotkb/components/search/styles/search-container.scss';
import './styles/advanced-search.scss';

const flatten = (searchTermData: SearchTermType[]): SearchTermType[] => {
  return searchTermData.flatMap((searchTermDatum: SearchTermType) => {
    if (searchTermDatum.siblings) {
      return flatten(searchTermDatum.siblings);
    }
    if (searchTermDatum.items) {
      return flatten(searchTermDatum.items);
    }
    return searchTermDatum;
  });
};

const parseAndMatchQuery = (
  query: string | string[] | null | undefined,
  possibleSearchTerms: SearchTermType[]
): [valid: Clause[], invalid: Clause[]] => {
  const parsedQuery = query && !Array.isArray(query) ? parse(query) : undefined;
  // for each parsed clause, try to find the corresponding endpoint-described
  // clause to merge its 'searchTerm' field
  const validatedQuery: Clause[] = [];
  const invalid: Clause[] = [];
  for (const clause of parsedQuery || []) {
    if (clause.searchTerm.term === 'All') {
      validatedQuery.push(clause);
      continue; // eslint-disable-line no-continue
    }
    const matching = possibleSearchTerms.filter(
      ({ term }) => term === clause.searchTerm.term
    );
    // if it exists, assign it 'searchTerm'
    if (matching.length) {
      if (matching.length === 1) {
        // only one search term matching
        validatedQuery.push({ ...clause, searchTerm: matching[0] });
      } else if (clause.searchTerm.term === 'xref') {
        // specific case for crosss-references
        const [prefix, ...rest] = clause.queryBits.xref.split('-');
        const matchingXref = matching.find(
          ({ valuePrefix }) => valuePrefix === `${prefix}-`
        );
        if (matchingXref) {
          validatedQuery.push({
            ...clause,
            searchTerm: matchingXref,
            queryBits: { xref: rest.join('-') },
          });
        } else {
          // invalid xref prefix
          invalid.push(clause);
        }
      } else {
        invalid.push(clause);
      }
    } else {
      invalid.push(clause);
    }
  }
  return [validatedQuery, invalid];
};

const AdvancedSearch: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch<{ namespace?: Namespace }>(
    LocationToPath[Location.QueryBuilder]
  );
  const dispatch = useDispatch();

  // To be replaced by getting it from url
  const [clauses, setClauses] = useState<Clause[]>([]);

  const namespace = match?.params?.namespace;

  const { loading, data: searchTermsData } = useDataApi<SearchTermType[]>(
    namespace && apiUrls.advancedSearchTerms(namespace)
  );

  useEffect(() => {
    setClauses([]);
  }, [namespace]);

  // if URL doesn't finish with a namespace redirect to "uniprotkb" by default
  useEffect(() => {
    if (!namespace) {
      history.replace(
        history.createHref({
          ...history.location,
          pathname: generatePath(LocationToPath[Location.QueryBuilder], {
            namespace: Namespace.uniprotkb,
          }),
        })
      );
    }
  }, [history, namespace]);

  useEffect(() => {
    if (!(searchTermsData && namespace) || loading) {
      return;
    }

    setClauses((clauses) => {
      if (clauses.length) {
        return clauses;
      }

      // flatten all the endpoint-described clauses to be able to to look-up
      const flattened = flatten(searchTermsData);

      const query = qs.parse(location.search, { decode: true })?.query;
      const [validatedQuery, invalidClauses] = parseAndMatchQuery(
        query,
        flattened
      );

      if (invalidClauses.length) {
        // wait for next frame because this was causing a React warning
        frame().then(() => {
          dispatch(
            addMessage({
              id: Array.isArray(query) ? query[0] : query ?? v1(),
              content: `Found ${invalidClauses.length} invalid query term${
                invalidClauses.length === 1 ? '' : 's'
              } for ${namespace}: ${invalidClauses
                .map((invalid) => `"${invalid.searchTerm.term}"`)
                .join(', ')}`,
              format: MessageFormat.POP_UP,
              level: MessageLevel.FAILURE,
            })
          );
        });
      }

      if (validatedQuery.length) {
        return validatedQuery;
      }

      return parseAndMatchQuery(defaultQueryFor(namespace), flattened)[0];
    });
  }, [dispatch, location.search, loading, namespace, searchTermsData]);

  if (!searchTermsData || !namespace) {
    return null;
  }

  const addClause = () => {
    setClauses((clauses) => [...clauses, createEmptyClause()]);
  };

  const removeClause = (clauseId: string) => {
    setClauses((clauses) => {
      if (clauses.length === 1) {
        return [createEmptyClause()];
      }
      return clauses.filter((clause) => clause.id !== clauseId);
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const queryString = stringify(clauses);
    history.push({
      pathname: `/${namespace}`,
      search: queryString && `query=${queryString}`,
    });
  };

  return (
    <>
      <PageIntro title="Advanced search" />

      <form
        className="advanced-search"
        onSubmit={handleSubmit}
        data-testid="advanced-search-form"
      >
        <fieldset>
          <label htmlFor="namespace-select">
            Searching in
            <select
              id="namespace-select"
              onChange={(e) => {
                history.replace(
                  history.createHref({
                    pathname: generatePath(
                      LocationToPath[Location.QueryBuilder],
                      { namespace: e.target.value }
                    ),
                  })
                );
              }}
              value={namespace}
            >
              {Object.keys(NamespaceLabels).map((key) => (
                <option value={key} key={key}>
                  {NamespaceLabels[key as Namespace]}
                </option>
              ))}
            </select>
          </label>
        </fieldset>
        <fieldset>
          <ClauseList
            removeClause={removeClause}
            clauses={clauses}
            setClauses={setClauses}
            searchTerms={searchTermsData}
          />
        </fieldset>
        <div className="advanced-search__actions">
          <button
            type="button"
            id="add-field"
            className="button tertiary"
            data-testid="advanced-search-add-field"
            onClick={addClause}
          >
            Add Field
          </button>
          <button type="submit" id="submit-query" className="button">
            Search
          </button>
        </div>
      </form>
    </>
  );
};

export default AdvancedSearch;
