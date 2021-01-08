import { useMemo, useState } from 'react';
import {
  useRouteMatch,
  generatePath,
  useHistory,
  match,
} from 'react-router-dom';
import { History } from 'history';
import qs from 'query-string';
import { Header } from 'franklin-sites';

import SearchContainer from '../../../uniprotkb/components/search/SearchContainer';

import useNS from '../../hooks/useNS';

import { LocationToPath, Location } from '../../../app/config/urls';

import { Namespace } from '../../types/namespaces';

import Logo from './svgs/uniprot-logo.svg';

type QBMatch = { namespace?: Namespace };

// NOTE: all of those paths should eventually come from the Location config object
const tools = [
  {
    label: 'BLAST',
    path: LocationToPath[Location.Blast],
  },
  {
    label: 'Align',
    path: LocationToPath[Location.Align],
  },
  {
    label: 'Peptide Search',
    path: '/',
  },
  {
    label: 'Retrieve/ID Mapping',
    path: '/',
  },
  {
    label: 'Tool Results',
    path: LocationToPath[Location.Dashboard],
  },
];

const links = (
  history: History,
  search: string,
  queryBuilderMatch: match<QBMatch> | null,
  namespace?: Namespace
) => {
  let query: string | string[] | undefined;
  // only in the case we are not already on the query builder page
  if (!queryBuilderMatch) {
    // extract only the possible query key in the search string
    query = qs.parse(search, { decode: true })?.query || undefined;
  }
  let ns = namespace;
  if (!ns) {
    if (queryBuilderMatch?.params.namespace) {
      ns = queryBuilderMatch.params.namespace;
    } else {
      ns = Namespace.uniprotkb;
    }
  }

  return [
    {
      label: 'Query Builder',
      path: {
        // only interested in "query"
        search: qs.stringify({ query }, { encode: false }),
        pathname: generatePath(LocationToPath[Location.QueryBuilder], {
          namespace: ns,
        }),
      },
    },
    {
      label: 'API',
      items: [
        {
          label: 'Programmatic access',
          path: '/',
        },
      ],
    },
    {
      label: 'Help',
      items: [
        {
          label: 'Help',
          path: '/',
        },
        {
          label: 'Contact',
          path: '/',
        },
        {
          label: 'About UniProt',
          path: '/',
        },
        {
          label: 'Cite us',
          path: '/',
        },
      ],
    },
  ];
};

const UniProtHeader = () => {
  const history = useHistory();
  const { search } = history.location;

  const homeMatch = useRouteMatch(LocationToPath[Location.Home]);
  const queryBuilderMatch = useRouteMatch<QBMatch>(
    LocationToPath[Location.QueryBuilder]
  );

  const namespace = useNS();

  const [selectedNamespace, setSelectedNamespace] = useState(
    namespace || Namespace.uniprotkb
  );

  const isHomePage = Boolean(homeMatch?.isExact);

  // only show search if not on home page, or not on query builder page
  const shouldShowSearch = !(isHomePage || queryBuilderMatch);

  const displayedLinks = useMemo(
    () =>
      isHomePage
        ? [...tools, ...links(history, search, queryBuilderMatch, namespace)]
        : [
            { label: 'Tools', items: tools },
            ...links(history, search, queryBuilderMatch, namespace),
          ],
    [isHomePage, namespace, history, search, queryBuilderMatch]
  );

  return (
    <Header
      items={displayedLinks}
      isNegative={isHomePage}
      search={
        shouldShowSearch ? (
          <SearchContainer
            namespace={selectedNamespace}
            onNamespaceChange={(namespace: Namespace) =>
              setSelectedNamespace(namespace)
            }
          />
        ) : undefined
      }
      logo={<Logo width={120} height={50} />}
    />
  );
};
export default UniProtHeader;
