import {
  FC,
  FormEvent,
  useState,
  useEffect,
  useMemo,
  useRef,
  CSSProperties,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import qs from 'query-string';
import { v1 } from 'uuid';
import { frame } from 'timing-functions';
import { PageIntro, Loader, Button } from 'franklin-sites';
import colors from '../../../node_modules/franklin-sites/src/styles/colours.json';

import ClauseList from './ClauseList';

import useDataApi from '../../shared/hooks/useDataApi';
import useNS from '../../shared/hooks/useNS';

import { createEmptyClause, defaultQueryFor } from '../utils/clause';
import { stringify } from '../utils/queryStringProcessor';
import parseAndMatchQuery from '../utils/parseAndMatchQuery';

import { addMessage } from '../../messages/state/messagesActions';

import apiUrls from '../../shared/config/apiUrls';
import { Namespace, NamespaceLabels } from '../../shared/types/namespaces';
import { SearchResultsLocations } from '../../app/config/urls';

import {
  MessageFormat,
  MessageLevel,
} from '../../messages/types/messagesTypes';
import { Clause, SearchTermType } from '../types/searchTypes';

import '../../uniprotkb/components/search/styles/search-container.scss';
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
};
interface Style extends CSSProperties {
  // TODO: define and extend the supported custom properties in franklin
  // TODO: find a way to expose them globally when using franklin elements
  '--main-button-color': string;
}

const QueryBuilder: FC<Props> = ({ onCancel, fieldToAdd }) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [clauses, setClauses] = useState<Clause[]>([]);

  const urlNamespace = useNS() || Namespace.uniprotkb;

  const [namespace, setNamespace] = useState(urlNamespace);
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

      const query = qs.parse(location.search, { decode: true })?.query;

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

      // TODO handle star query to fallback to default value
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

  const focusedFlag = useRef(false);
  useEffect(() => {
    if (!fieldToAdd || !clauses.length || focusedFlag.current) {
      return;
    }
    const focusCandidates = document.querySelectorAll<HTMLInputElement>(
      `form [data-field="${fieldToAdd}"] input[type="text"]`
    );
    console.log(
      `form [data-field="${fieldToAdd}"] input[type="text"]`,
      focusCandidates
    );
    if (focusCandidates.length) {
      focusedFlag.current = true;
      focusCandidates[focusCandidates.length - 1].focus();
    }
  }, [fieldToAdd, clauses]);

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
    onCancel();
  };

  return (
    <>
      <PageIntro title="Advanced search" />

      <form
        className="query-builder"
        onSubmit={handleSubmit}
        data-testid="query-builder-form"
        style={style}
      >
        <fieldset>
          <label htmlFor="namespace-select">
            Searching in
            <select
              id="namespace-select"
              onChange={(e) => setNamespace(e.target.value as Namespace)}
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
      </form>
    </>
  );
};

export default QueryBuilder;
