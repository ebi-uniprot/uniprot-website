import {
  FormEvent,
  useState,
  useEffect,
  useMemo,
  useRef,
  CSSProperties,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'query-string';
import { frame } from 'timing-functions';
import { PageIntro, Loader, Button } from 'franklin-sites';

// eslint-disable-next-line import/no-relative-packages
import colors from '../../../node_modules/franklin-sites/src/styles/colours.json';

import ClauseList from './ClauseList';

import { useMessagesReducer } from '../../shared/hooks/useGlobalReducer';
import useDataApi from '../../shared/hooks/useDataApi';

import { createEmptyClause, defaultQueryFor, getNextId } from '../utils/clause';
import { pluralise } from '../../shared/utils/utils';
import { stringify } from '../utils/queryStringProcessor';
import parseAndMatchQuery from '../utils/parseAndMatchQuery';

import { addMessage } from '../../messages/state/messagesActions';

import apiUrls from '../../shared/config/apiUrls';
import {
  searchableNamespaceLabels,
  SearchableNamespace,
} from '../../shared/types/namespaces';
import { SearchResultsLocations } from '../../app/config/urls';

import {
  MessageFormat,
  MessageLevel,
} from '../../messages/types/messagesTypes';
import { Clause, SearchTermType } from '../types/searchTypes';

import '../../shared/components/search/styles/search-container.scss';
import './styles/query-builder.scss';

type Props = {
  /**
   * Will be called when clicking on cancel button, or outside the panel
   */
  onCancel: () => void;
  /**
   * Add the wanted field into the form when rendering
   */
  fieldToAdd?: string;
  /**
   * The namespace to initialise the dropdown with
   */
  initialNamespace: SearchableNamespace;
};
interface Style extends CSSProperties {
  // TODO: define and extend the supported custom properties in franklin
  // TODO: find a way to expose them globally when using franklin elements
  '--main-button-color': string;
}

const QueryBuilder = ({ onCancel, fieldToAdd, initialNamespace }: Props) => {
  const history = useHistory();
  const location = useLocation();
  const [, dispatch] = useMessagesReducer();

  const [clauses, setClauses] = useState<Clause[]>([]);

  const [namespace, setNamespace] = useState(initialNamespace);
  const style = useMemo<Style>(
    () => ({
      // change color of all buttons within this element to match the namespace
      '--main-button-color': (colors as Record<string, string>)[namespace],
    }),
    [namespace]
  );

  const { loading, data: searchTermsData } = useDataApi<SearchTermType[]>(
    namespace && apiUrls.queryBuilderTerms(namespace)
  );

  useEffect(() => {
    setClauses([]);
  }, [namespace]);

  useEffect(() => {
    if (!(searchTermsData && namespace) || loading) {
      return;
    }

    setClauses((clauses) => {
      if (clauses.length) {
        return clauses;
      }

      let query = qs.parse(location.search, { decode: true })?.query;
      if (query === '*') {
        // if the query is a star query, don't parse it, default to example form
        query = null;
      }

      const [validatedQuery, invalidClauses] = parseAndMatchQuery(
        query,
        searchTermsData,
        fieldToAdd
      );

      if (invalidClauses.length) {
        // wait for next frame because this was causing a React warning
        frame().then(() => {
          dispatch(
            addMessage({
              id: Array.isArray(query) ? query[0] : query || undefined,
              content: `Found ${
                invalidClauses.length
              } invalid query ${pluralise(
                'term',
                invalidClauses.length
              )} for ${namespace}: ${invalidClauses
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
  }, [
    dispatch,
    location.search,
    loading,
    namespace,
    searchTermsData,
    fieldToAdd,
  ]);

  // Has the input corresponding to the added field been focused already?
  const focusedFlag = useRef(false);
  // Effect to focus *only once* the added field whenever it gets added
  useEffect(() => {
    if (!fieldToAdd || !clauses.length || focusedFlag.current) {
      return;
    }
    const focusCandidates = document.querySelectorAll<HTMLInputElement>(
      `form [data-field="${fieldToAdd}"] input[type="text"]`
    );
    if (focusCandidates.length) {
      focusedFlag.current = true;
      // Focus the last one if there was multiple
      focusCandidates[focusCandidates.length - 1].focus();
    }
  }, [fieldToAdd, clauses]);

  if (loading) {
    return (
      <>
        <PageIntro title="Query builder" />
        <Loader />
      </>
    );
  }

  if (!searchTermsData || !namespace) {
    return null;
  }

  const addClause = () => {
    setClauses((clauses) => [
      ...clauses,
      createEmptyClause(getNextId(clauses)),
    ]);
  };

  const removeClause = (clauseId: number) => {
    setClauses((clauses) => {
      if (clauses.length === 1) {
        return [createEmptyClause(0)];
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
    onCancel();
  };

  return (
    <form
      className="query-builder"
      onSubmit={handleSubmit}
      data-testid="query-builder-form"
      aria-label="Query builder form"
      style={style}
    >
      <fieldset>
        <label htmlFor="namespace-select">
          Searching in
          <select
            id="namespace-select"
            onChange={(e) =>
              setNamespace(e.target.value as SearchableNamespace)
            }
            value={namespace}
          >
            {Object.keys(searchableNamespaceLabels).map((key) => (
              <option value={key} key={key}>
                {searchableNamespaceLabels[key as SearchableNamespace]}
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
      <div className="query-builder__actions button-group sliding-panel__button-row">
        <Button
          variant="tertiary"
          className="query-builder__add-field"
          data-testid="query-builder-add-field"
          onClick={addClause}
        >
          Add Field
        </Button>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Search</Button>
      </div>
      <small>
        Type * in the search box to search for all values for the selected
        field.
      </small>
    </form>
  );
};

export default QueryBuilder;
