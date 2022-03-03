import {
  useState,
  useEffect,
  FC,
  Fragment,
  HTMLAttributes,
  useCallback,
  Suspense,
  SyntheticEvent,
  useMemo,
} from 'react';
import {
  matchPath,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import queryString from 'query-string';
import { MainSearch, Button, SlidingPanel } from 'franklin-sites';

import ErrorBoundary from '../error-component/ErrorBoundary';

import lazy from '../../utils/lazy';

import {
  Location,
  LocationToPath,
  SearchResultsLocations,
} from '../../../app/config/urls';
import {
  Namespace,
  searchableNamespaceLabels,
  SearchableNamespace,
} from '../../types/namespaces';

import './styles/search-container.scss';

const QueryBuilder = lazy(
  () =>
    import(
      /* webpackChunkName: "query-builder" */ '../../../query-builder/components/QueryBuilder'
    )
);

const examples: Record<SearchableNamespace, string[]> = {
  // Main data
  [Namespace.uniprotkb]: [
    'Insulin',
    'APP',
    'Human',
    'P05067',
    'organism_id:9606',
  ],
  [Namespace.uniref]: [
    'Transcription factors',
    'identity:1.0',
    'uniprot_id:q9h9k5 AND identity:1.0',
    'Human',
  ],
  [Namespace.uniparc]: ['UPI000000000B', 'P05067', 'APP', 'database:RefSeq'],
  [Namespace.proteomes]: ['Human', '9606', 'eukaryota', 'redundant:false'],
  // Supporting data
  [Namespace.taxonomy]: [
    'Human',
    'Homo sapiens',
    '9606',
    'Hominoidea',
    'rank:family AND hominidae',
  ],
  [Namespace.keywords]: [
    'Phosphoprotein',
    'Alternative splicing',
    'Mitochondrion',
    'Innate immunity',
  ],
  [Namespace.citations]: [
    'Thornton',
    'J. Exp. Biol.',
    'COVID-19',
    `${new Date().getFullYear()}`,
  ],
  [Namespace.diseases]: ['Alzheimer disease 3', 'Breast cancer', 'Dementia'],
  [Namespace.database]: ['PDB', 'IntAct', 'Pfam', 'GO', 'OMIM'],
  [Namespace.locations]: ['Cell membrane', 'Golgi apparatus', 'Nucleus'],
  // Annotations
  [Namespace.unirule]: ['Insulin', 'Eukaryota'],
  [Namespace.arba]: ['Insulin', 'Eukaryota'],
};

type Props = {
  isOnHomePage?: boolean;
  namespace: SearchableNamespace;
  onNamespaceChange: (namespace: SearchableNamespace) => void;
};

const SearchContainer: FC<
  Props & Exclude<HTMLAttributes<HTMLDivElement>, 'role'>
> = ({ isOnHomePage, namespace, onNamespaceChange, ...props }) => {
  const history = useHistory();
  const location = useLocation();
  const [displayQueryBuilder, setDisplayQueryBuilder] = useState(false);

  const handleClose = useCallback(() => setDisplayQueryBuilder(false), []);

  const toolResultsPage = useMemo(
    () =>
      [
        Location.AlignResult,
        Location.BlastResult,
        Location.IDMappingResult,
        Location.PeptideSearchResult,
      ].find((location) =>
        matchPath(history.location.pathname, { path: LocationToPath[location] })
      ),
    [history.location.pathname]
  );

  const match = useRouteMatch<{
    id: string;
  }>(
    toolResultsPage && toolResultsPage in LocationToPath
      ? LocationToPath[toolResultsPage]
      : []
  );
  const jobId = match?.params.id;

  // local state to hold the search value without modifying URL
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSubmit = (event: SyntheticEvent) => {
    // prevent normal browser submission
    event.preventDefault();

    // restringify the resulting search
    const stringifiedSearch = queryString.stringify(
      { query: searchTerm || '*' },
      { encode: true }
    );

    // push a new location to the history containing the modified search term
    history.push({
      pathname: SearchResultsLocations[namespace],
      search: stringifiedSearch,
    });
  };

  const setNamespace = (namespace: string) => {
    onNamespaceChange(namespace as SearchableNamespace);
  };

  const loadExample = (example: string) => {
    setSearchTerm(example);
  };

  const secondaryButtons = useMemo(() => {
    const buttons = [];
    if (toolResultsPage !== Location.AlignResult) {
      buttons.push({
        label:
          // TODO:
          // <span
          //   onPointerOver={QueryBuilder.preload}
          //   onFocus={QueryBuilder.preload}
          // >
          //   Advanced
          // </span>
          'Advanced',
        action: () => {
          setDisplayQueryBuilder((value) => !value);
        },
      });
    }
    buttons.push({
      label: 'List',
      action: () => {
        history.push({
          pathname: LocationToPath[Location.IDMapping],
        });
      },
    });
    return buttons;
  }, [history, toolResultsPage]);

  // reset the text content when there is a navigation to reflect what is in the
  // URL. That includes removing the text when browsing to a non-search page.
  useEffect(() => {
    const queryTokens = [];
    if (jobId) {
      queryTokens.push(`job:${jobId}`);
    }
    const { query } = queryString.parse(location.search, { decode: true });
    // Using history here because history won't change, while location will
    if (
      history.location.pathname.includes(LocationToPath[Location.HelpResults])
    ) {
      return;
    }
    // Don't add any query that may be in URL for Align results
    if (toolResultsPage !== Location.AlignResult) {
      if (Array.isArray(query)) {
        queryTokens.push(query[0]);
      } else if (query) {
        queryTokens.push(query);
      }
    }
    setSearchTerm(queryTokens.join(' AND '));
  }, [history, location.search, jobId, toolResultsPage]);

  return (
    <>
      <section role="search" {...props}>
        <MainSearch
          namespaces={searchableNamespaceLabels}
          searchTerm={searchTerm}
          onTextChange={setSearchTerm}
          onSubmit={handleSubmit}
          onNamespaceChange={setNamespace}
          selectedNamespace={namespace}
          secondaryButtons={secondaryButtons}
          autoFocus={isOnHomePage}
        />
        {isOnHomePage && (
          <div className="search-container-footer">
            <div>
              {examples[namespace] && (
                <>
                  Examples:{' '}
                  {examples[namespace]?.map((example, index) => (
                    <Fragment key={example}>
                      {index === 0 ? null : ', '}
                      <Button
                        variant="tertiary"
                        onClick={() => loadExample(example)}
                      >
                        {example}
                      </Button>
                    </Fragment>
                  ))}
                </>
              )}
            </div>
            {/* 
            Note: if user testing validates the "list" link in the input
            remove this
            <div>
              <Button
                variant="tertiary"
                element={Link}
                to={LocationToPath[Location.IDMapping]}
              >
                Search with a list of IDs
              </Button>
            </div> */}
          </div>
        )}
      </section>
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
                initialNamespace={namespace}
              />
            </ErrorBoundary>
          </SlidingPanel>
        </Suspense>
      )}
    </>
  );
};

export default SearchContainer;
