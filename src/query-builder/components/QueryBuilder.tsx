import {
  FormEvent,
  useState,
  useEffect,
  useMemo,
  useRef,
  CSSProperties,
  useCallback,
} from 'react';
import { generatePath, useHistory, useLocation } from 'react-router-dom';
import qs from 'query-string';
import { frame } from 'timing-functions';
import { PageIntro, Loader, Button, Message } from 'franklin-sites';

// eslint-disable-next-line import/no-relative-packages
import colors from '../../../node_modules/franklin-sites/src/styles/colours.json';

import ClauseList from './ClauseList';

import { useMessagesDispatch } from '../../shared/contexts/Messages';
import useDataApi from '../../shared/hooks/useDataApi';
import useJobFromUrl from '../../shared/hooks/useJobFromUrl';
import useIDMappingDetails from '../../shared/hooks/useIDMappingDetails';

import { createEmptyClause, defaultQueryFor, getNextId } from '../utils/clause';
import { pluralise } from '../../shared/utils/utils';
import { stringify } from '../utils/queryStringProcessor';
import parseAndMatchQuery from '../utils/parseAndMatchQuery';
import { rawDBToNamespace } from '../../tools/id-mapping/utils';

import { addMessage } from '../../messages/state/messagesActions';

import apiUrls from '../../shared/config/apiUrls';
import {
  Namespace,
  SearchableNamespace,
  searchableNamespaceLabels,
  Searchspace,
  searchspaceLabels,
  toolResults,
} from '../../shared/types/namespaces';
import {
  Location,
  LocationToPath,
  SearchResultsLocations,
  toolsResultsLocationToLabel,
} from '../../app/config/urls';
import { cannotQueryMessages } from '../../shared/components/search/SearchContainer';

import {
  MessageFormat,
  MessageLevel,
} from '../../messages/types/messagesTypes';
import { Clause, SearchTermType } from '../types/searchTypes';
import { JobTypes } from '../../tools/types/toolsJobTypes';

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
  initialSearchspace: Searchspace;
};
interface Style extends CSSProperties {
  // TODO: define and extend the supported custom properties in franklin
  // TODO: find a way to expose them globally when using franklin elements
  '--main-button-color': string;
}

const QueryNotPossibleMessage = ({
  text,
  onCancel,
}: {
  text: string;
  onCancel: () => void;
}) => (
  <>
    <Message level="info">{text}</Message>
    <div className="query-builder__actions button-group sliding-panel__button-row">
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  </>
);

const QueryBuilder = ({ onCancel, fieldToAdd, initialSearchspace }: Props) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useMessagesDispatch();
  const [clauses, setClauses] = useState<Clause[]>([]);
  const { jobId, jobResultsNamespace, jobResultsLocation } = useJobFromUrl();
  const [searchspace, setSearchspace] =
    useState<Searchspace>(initialSearchspace);

  const namespace =
    searchspace === toolResults ? jobResultsNamespace : searchspace;

  const style = useMemo<Style>(
    () => ({
      // change color of all buttons within this element to match the namespace
      '--main-button-color': (colors as Record<string, string>)[searchspace],
    }),
    [searchspace]
  );

  const { data: idMappingDetailsData, loading: idMappingDetailsLoading } =
    useIDMappingDetails() || {};
  const { data: searchTermsData, loading: searchTermsLoading } = useDataApi<
    SearchTermType[]
  >(namespace ? apiUrls.queryBuilderTerms(namespace) : undefined);

  const loading = idMappingDetailsLoading || searchTermsLoading;
  useEffect(() => {
    setClauses([]);
  }, [searchspace]);

  useEffect(() => {
    if (
      !(searchTermsData && namespace) ||
      (!idMappingDetailsData && idMappingDetailsLoading) ||
      loading
    ) {
      return;
    }

    setClauses((clauses) => {
      if (clauses.length) {
        return clauses;
      }

      let query = qs
        .parse(location.search, { decode: true })
        ?.query.filter((q: string | null): q is string => !!q);
      if (query === '*') {
        // if the query is a star query, don't parse it, default to example form
        query = null;
      }
      if (query === null) {
        query = 'a';
      }
      if (Array.isArray(query)) {
        const t = query.filter((q: string | null): q is string => !!q);
        query = t as string[];
        query = false;
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
    searchTermsData,
    fieldToAdd,
    searchspace,
    jobResultsNamespace,
    namespace,
    idMappingDetailsData,
    idMappingDetailsLoading,
  ]);

  const searchSpaceOptions = useMemo(() => {
    const options = [];
    // If the user is looking at a job result populate the "Searching in" with this
    // as an option just before the corresponding namespace
    if (jobResultsLocation && jobId) {
      const pathParts = [
        toolsResultsLocationToLabel[jobResultsLocation],
        jobResultsNamespace && searchableNamespaceLabels[jobResultsNamespace],
        jobId,
      ].filter(Boolean);
      options.push({
        label: `${searchspaceLabels[toolResults]}: ${pathParts.join(' / ')}`,
        value: toolResults,
      });
    }
    for (const [ns, label] of Object.entries(searchableNamespaceLabels)) {
      options.push({ label, value: ns });
    }
    return options;
  }, [jobId, jobResultsNamespace, jobResultsLocation]);

  const onSearchSpaceChange = useCallback(
    ({ target: { value } }: React.ChangeEvent<HTMLSelectElement>) => {
      setSearchspace(value as Searchspace);
    },
    []
  );

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

  if ((namespace && !searchTermsData) || !searchspace) {
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
    const pathname =
      searchspace === toolResults && jobId && jobResultsLocation
        ? generatePath(LocationToPath[jobResultsLocation], {
            id: jobId,
            namespace: jobResultsNamespace,
          })
        : SearchResultsLocations[searchspace as SearchableNamespace];
    history.push({
      pathname,
      search: `query=${queryString}`,
    });
    onCancel();
  };

  let queryNotPossibleMessage: JSX.Element | null = null;
  if (
    searchspace === toolResults &&
    jobResultsLocation === Location.AlignResult
  ) {
    queryNotPossibleMessage = (
      <QueryNotPossibleMessage
        text={cannotQueryMessages[JobTypes.ALIGN]}
        onCancel={onCancel}
      />
    );
  } else if (
    searchspace === toolResults &&
    jobResultsLocation === Location.IDMappingResult &&
    idMappingDetailsData &&
    rawDBToNamespace(idMappingDetailsData.to) === Namespace.idmapping
  ) {
    queryNotPossibleMessage = (
      <QueryNotPossibleMessage
        text={cannotQueryMessages[JobTypes.ID_MAPPING]}
        onCancel={onCancel}
      />
    );
  }

  const clauseListWithButtons = searchTermsData && (
    <>
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
    </>
  );

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
            onChange={onSearchSpaceChange}
            value={searchspace}
          >
            {searchSpaceOptions.map(({ value, label }) => (
              <option value={value} key={label}>
                {label}
              </option>
            ))}
          </select>
        </label>
      </fieldset>
      {queryNotPossibleMessage || clauseListWithButtons}
    </form>
  );
};

export default QueryBuilder;
