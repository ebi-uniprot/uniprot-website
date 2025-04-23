import './styles/search-container.scss';

import { Button, MainSearch, SlidingPanel } from 'franklin-sites';
import {
  Fragment,
  HTMLAttributes,
  Suspense,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { SearchAction, WebSite, WithContext } from 'schema-dts';

import {
  Location,
  LocationToPath,
  SearchResultsLocations,
} from '../../../app/config/urls';
import { addMessage } from '../../../messages/state/messagesActions';
import {
  MessageFormat,
  MessageLevel,
} from '../../../messages/types/messagesTypes';
import { rawDBToNamespace } from '../../../tools/id-mapping/utils';
import { JobTypes } from '../../../tools/types/toolsJobTypes';
import useIDMappingDetails from '../../hooks/useIDMappingDetails';
import useJobFromUrl from '../../hooks/useJobFromUrl';
import { useSmallScreen } from '../../hooks/useMatchMedia';
import useMessagesDispatch from '../../hooks/useMessagesDispatch';
import useStructuredData from '../../hooks/useStructuredData';
import {
  Namespace,
  SearchableNamespace,
  searchableNamespaceLabels,
  Searchspace,
  searchspaceLabels,
  toolResults,
} from '../../types/namespaces';
import {
  PanelFormCloseReason,
  sendGtagEventPanelAdvancedSearchClose,
  sendGtagEventPanelOpen,
} from '../../utils/gtagEvents';
import lazy from '../../utils/lazy';
import { stringifyQuery } from '../../utils/url';
import ErrorBoundary from '../error-component/ErrorBoundary';

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
    'uniprotkb:q9h9k5 AND identity:1.0',
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
    `published:${new Date().getFullYear()}`,
  ],
  [Namespace.diseases]: ['Alzheimer disease 3', 'Breast cancer', 'Dementia'],
  [Namespace.database]: ['PDB', 'IntAct', 'Pfam', 'GO', 'OMIM'],
  [Namespace.locations]: ['Cell membrane', 'Golgi apparatus', 'Nucleus'],
  // Annotations
  [Namespace.unirule]: ['Insulin', 'Eukaryota'],
  [Namespace.arba]: ['Insulin', 'Eukaryota'],
};

export const cannotQueryMessages = {
  [JobTypes.ID_MAPPING]:
    'Search queries are not possible for ID mapping results which map to an external database.',
  [JobTypes.ALIGN]:
    'Filtering Align results is not possible as all of its sequences constitute the alignment.',
};

const reSearchSpecialWords = /(^| )(or|and|not) /gi;
const rawQueryClean = (raw: string) =>
  raw
    // "     app " -> "app"
    .trim()
    .replace(/\s+/g, ' ')
    // "not app and human oR whatever" -> "NOT app AND human OR whatever"
    .replace(reSearchSpecialWords, (match) => match.toUpperCase()) || '*';

const webSiteSchemaFor = (namespace: Searchspace): WithContext<WebSite> => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: 'https://www.uniprot.org',
  name: 'UniProt',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `https://www.uniprot.org/${
        namespace === toolResults ? Namespace.uniprotkb : namespace
      }?query={q}`,
    },
    'query-input': 'required name=q',
  } as SearchAction,
});

type MainSearchSecondaryButton = {
  label: string;
  action: () => void;
};

type Props = {
  isOnHomePage?: boolean;
  searchspace: Searchspace;
  onSearchspaceChange: (searchspace: Searchspace) => void;
} & Exclude<HTMLAttributes<HTMLDivElement>, 'role'>;

const SearchContainer = ({
  isOnHomePage,
  searchspace,
  onSearchspaceChange,
  ...props
}: Props) => {
  const history = useHistory();
  const location = useLocation();
  const [displayQueryBuilder, setDisplayQueryBuilder] = useState(false);
  // local state to hold the search value without modifying URL
  const [searchTerm, setSearchTerm] = useState<string>('');

  useStructuredData(webSiteSchemaFor(searchspace));

  const dispatch = useMessagesDispatch();
  const idMappingDetails = useIDMappingDetails();
  const { jobId, jobResultsLocation } = useJobFromUrl();

  const handleSubmit = (event: SyntheticEvent) => {
    // prevent normal browser submission
    event.preventDefault();

    if (
      searchspace === toolResults &&
      jobResultsLocation === Location.AlignResult
    ) {
      dispatch(
        addMessage({
          format: MessageFormat.POP_UP,
          level: MessageLevel.INFO,
          content: cannotQueryMessages[JobTypes.ALIGN],
          displayTime: 5_000,
        })
      );
      return;
    }
    if (
      searchspace === toolResults &&
      jobResultsLocation === Location.IDMappingResult &&
      idMappingDetails?.data?.to &&
      rawDBToNamespace(idMappingDetails.data.to) === Namespace.idmapping
    ) {
      dispatch(
        addMessage({
          format: MessageFormat.POP_UP,
          level: MessageLevel.INFO,
          content: cannotQueryMessages[JobTypes.ID_MAPPING],
          displayTime: 5_000,
        })
      );
      return;
    }

    // restringify the resulting search
    const stringifiedSearch = stringifyQuery({
      query: rawQueryClean(searchTerm),
    });

    // push a new location to the history containing the modified search term
    history.push({
      // If there was a job ID in the search bar, keep the same URL (job result)
      pathname:
        searchspace === toolResults
          ? location.pathname
          : SearchResultsLocations[searchspace as SearchableNamespace],
      search: stringifiedSearch,
    });
  };

  const handleToggleQueryBuilder = useCallback(
    (reason: PanelFormCloseReason) => {
      if (displayQueryBuilder) {
        const sp = new URLSearchParams(location.search);
        sendGtagEventPanelAdvancedSearchClose(reason, sp.get('query'));
        setDisplayQueryBuilder(false);
      } else {
        sendGtagEventPanelOpen('advanced_search');
        setDisplayQueryBuilder(true);
      }
    },
    [displayQueryBuilder, location.search]
  );

  const setSearchspace = (searchspace: string) => {
    onSearchspaceChange(searchspace as Searchspace);
  };

  const loadExample = (example: string) => {
    setSearchTerm(example);
  };

  const smallScreen = useSmallScreen();
  const secondaryButtons = useMemo(
    () =>
      [
        {
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
            handleToggleQueryBuilder('toggle');
          },
        },
        smallScreen
          ? null
          : {
              label: 'List',
              action: () => {
                history.push({
                  pathname: LocationToPath[Location.IDMapping],
                });
              },
            },
      ].filter(
        (x: MainSearchSecondaryButton | null): x is MainSearchSecondaryButton =>
          Boolean(x)
      ),
    [handleToggleQueryBuilder, history, smallScreen]
  );

  // reset the text content when there is a navigation to reflect what is in the
  // URL. That includes removing the text when browsing to a non-search page.
  useEffect(() => {
    const sp = new URLSearchParams(location.search);
    const query = sp.get('query');
    // Using history here because history won't change, while location will
    if (
      history.location.pathname.includes(
        LocationToPath[Location.HelpResults]
      ) ||
      history.location.pathname.includes(
        LocationToPath[Location.ReleaseNotesResults]
      )
    ) {
      return;
    }
    setSearchTerm(query || '');
  }, [history, location.search]);

  const searchspaces = jobId ? searchspaceLabels : searchableNamespaceLabels;

  return (
    <>
      <section role="search" {...props}>
        <MainSearch
          namespaces={searchspaces}
          searchTerm={searchTerm}
          onTextChange={setSearchTerm}
          onSubmit={handleSubmit}
          onNamespaceChange={setSearchspace}
          selectedNamespace={searchspace}
          secondaryButtons={secondaryButtons}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={isOnHomePage}
        />
        {isOnHomePage && (
          <div className="search-container-footer">
            <div>
              {examples[searchspace as SearchableNamespace] && (
                <>
                  Examples:{' '}
                  <span translate="no">
                    {examples[searchspace as SearchableNamespace]?.map(
                      (example, index) => (
                        <Fragment key={example}>
                          {index === 0 ? null : ', '}
                          <Button
                            variant="tertiary"
                            onClick={() => loadExample(example)}
                          >
                            {example}
                          </Button>
                        </Fragment>
                      )
                    )}
                  </span>
                </>
              )}
            </div>
          </div>
        )}
      </section>
      {displayQueryBuilder && (
        <Suspense fallback={null}>
          <SlidingPanel
            title={
              <span data-article-id="advanced_search">Advanced Search</span>
            }
            position="left"
            onClose={handleToggleQueryBuilder}
            pathname={location.pathname}
          >
            <ErrorBoundary>
              <QueryBuilder
                onCancel={() => handleToggleQueryBuilder('cancel')}
                initialSearchspace={searchspace}
              />
            </ErrorBoundary>
          </SlidingPanel>
        </Suspense>
      )}
    </>
  );
};

// Used everywhere, but somehow pulls a lot of uniprotkb code with it.
// At the moment used lazy-loaded (but not much advantage, it's always used).
// TODO: investigate why this component pulls so much with it
export default SearchContainer;
