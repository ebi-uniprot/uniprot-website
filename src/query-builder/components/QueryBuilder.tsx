import { FC, FormEvent, useState, useEffect } from 'react';
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
import { PageIntro, Loader } from 'franklin-sites';

import ClauseList from './ClauseList';

import useDataApi from '../../shared/hooks/useDataApi';

import { createEmptyClause, defaultQueryFor } from '../utils/clause';
import { stringify } from '../utils/queryStringProcessor';
import parseAndMatchQuery from '../utils/parseAndMatchQuery';

import { addMessage } from '../../messages/state/messagesActions';

import apiUrls from '../../shared/config/apiUrls';
import { Namespace, NamespaceLabels } from '../../shared/types/namespaces';
import {
  LocationToPath,
  Location,
  SearchResultsLocations,
} from '../../app/config/urls';

import {
  MessageFormat,
  MessageLevel,
} from '../../messages/types/messagesTypes';
import { Clause, SearchTermType } from '../types/searchTypes';

import '../../uniprotkb/components/search/styles/search-container.scss';
import './styles/query-builder.scss';

const QueryBuilder: FC = () => {
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
    namespace && apiUrls.queryBuilderTerms(namespace)
  );

  useEffect(() => {
    setClauses([]);
  }, [namespace]);

  // if URL doesn't finish with a namespace redirect to "uniprotkb" by default
  useEffect(() => {
    if (!namespace) {
      history.replace({
        ...history.location,
        pathname: generatePath(LocationToPath[Location.QueryBuilder], {
          namespace: Namespace.uniprotkb,
        }),
      });
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

      const query = qs.parse(location.search, { decode: true })?.query;

      const [validatedQuery, invalidClauses] = parseAndMatchQuery(
        query,
        searchTermsData
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

      return parseAndMatchQuery(defaultQueryFor(namespace), searchTermsData)[0];
    });
  }, [dispatch, location.search, loading, namespace, searchTermsData]);

  if (loading) {
    return (
      <>
        <PageIntro title="Advanced search" />
        <Loader />
      </>
    );
  }

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
    const queryString = stringify(clauses) || '*';
    history.push({
      pathname: SearchResultsLocations[namespace],
      search: `query=${queryString}`,
    });
  };

  return (
    <>
      <PageIntro title="Advanced search" />

      <form
        className="query-builder"
        onSubmit={handleSubmit}
        data-testid="query-builder-form"
      >
        <fieldset>
          <label htmlFor="namespace-select">
            Searching in
            <select
              id="namespace-select"
              onChange={(e) => {
                history.replace({
                  pathname: generatePath(
                    LocationToPath[Location.QueryBuilder],
                    { namespace: e.target.value }
                  ),
                });
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
        <div className="query-builder__actions">
          <button
            type="button"
            id="add-field"
            className="button tertiary"
            data-testid="query-builder-add-field"
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

export default QueryBuilder;
