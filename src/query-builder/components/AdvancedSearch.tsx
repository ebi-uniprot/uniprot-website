import React, { FC, FormEvent, useState, useEffect } from 'react';
import { useHistory, useRouteMatch, generatePath } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import qs from 'query-string';
import { PageIntro } from 'franklin-sites';

import ClauseList from './ClauseList';

import useDataApi from '../../shared/hooks/useDataApi';

import { createEmptyClause, createPreSelectedClauses } from '../utils/clause';
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

const AdvancedSearch: FC = () => {
  const history = useHistory();
  const match = useRouteMatch<{ namespace?: Namespace }>(
    LocationToPath[Location.QueryBuilder]
  );
  const dispatch = useDispatch();

  // To be replaced by getting it from url
  const [clauses, setClauses] = useState<Clause[]>([]);

  const namespace = match?.params?.namespace;

  const { data: searchTermsData } = useDataApi<SearchTermType[]>(
    namespace && apiUrls.advancedSearchTerms(namespace)
  );

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
    if (!searchTermsData) {
      return;
    }
    const query = qs.parse(history.location.search, { decode: true })?.query;
    const parsedQuery =
      query && !Array.isArray(query) ? parse(query) : undefined;

    // flatten all the endpoint-described clauses to be able to to look-up
    const flattened = flatten(searchTermsData);
    // for each parsed clause, try to find the corresponding endpoint-described
    // clause to merge its 'searchTerm' field
    const validatedQuery: Clause[] = [];
    for (const clause of parsedQuery || []) {
      const found = flattened.find(
        (item) => item.term === clause.searchTerm.term
      );
      // if it exists, assign it 'searchTerm'
      if (found) {
        validatedQuery.push({ ...clause, searchTerm: found });
      } else {
        dispatch(
          addMessage({
            id: clause.searchTerm.term,
            content: `"${clause.searchTerm.term}" is not a valid query term for ${namespace}`,
            format: MessageFormat.POP_UP,
            level: MessageLevel.FAILURE,
          })
        );
      }
    }

    setClauses((clauses) => {
      if (clauses.length) {
        return clauses;
      }
      if (validatedQuery.length) {
        return validatedQuery;
      }
      return createPreSelectedClauses();
    });
  }, [dispatch, history.location.search, namespace, searchTermsData]);

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
