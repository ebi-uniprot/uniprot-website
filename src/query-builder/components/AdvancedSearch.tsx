import React, { FC, FormEvent, MouseEvent, useState, useEffect } from 'react';
import { useHistory, useRouteMatch, generatePath } from 'react-router-dom';
import { PageIntro } from 'franklin-sites';

import ClauseList from './ClauseList';

import useDataApi from '../../shared/hooks/useDataApi';

import { createEmptyClause, createPreSelectedClauses } from '../utils/clause';
import { stringify } from '../utils/queryStringProcessor';

import apiUrls from '../../shared/config/apiUrls';
import { Namespace, NamespaceLabels } from '../../shared/types/namespaces';

import { Clause, SearchTermType } from '../types/searchTypes';

import '../../uniprotkb/components/search/styles/search-container.scss';
import './styles/advanced-search.scss';
import { LocationToPath, Location } from '../../app/config/urls';

const AdvancedSearch: FC = () => {
  const history = useHistory();
  const match = useRouteMatch<{ namespace?: Namespace }>(
    LocationToPath[Location.QueryBuilder]
  );

  // To be replaced by getting it from url
  const [clauses, setClauses] = useState<Clause[]>(createPreSelectedClauses());

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

  const handleSubmitClick = (event: FormEvent | MouseEvent) => {
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
        onSubmit={handleSubmitClick}
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
                    ...history.location,
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
