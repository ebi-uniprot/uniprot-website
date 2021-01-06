import {
  useMemo,
  useState,
  SetStateAction,
  Dispatch,
  Suspense,
  lazy,
} from 'react';
import { useRouteMatch, useLocation } from 'react-router-dom';
import { Header } from 'franklin-sites';

import SlidingPanel, { Position } from './SlidingPanel';
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

const items = (setDisplaySidePanel: Dispatch<SetStateAction<boolean>>) => [
  {
    label: 'Query Builder',
    onClick: () => setDisplaySidePanel((flag) => !flag),
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

const QueryBuilder = lazy(
  () =>
    import(
      /* webpackChunkName: "query-builder" */ '../../../query-builder/components/QueryBuilder'
    )
);

const UniProtHeader = () => {
  const { search } = useLocation();

  const homeMatch = useRouteMatch(LocationToPath[Location.Home]);
  const queryBuilderMatch = useRouteMatch<QBMatch>(
    LocationToPath[Location.QueryBuilder]
  );

  const namespace = useNS();

  const [selectedNamespace, setSelectedNamespace] = useState(
    namespace || Namespace.uniprotkb
  );
  const [displaySidePanel, setDisplaySidePanel] = useState(false);

  const isHomePage = Boolean(homeMatch?.isExact);

  // only show search if not on home page, or not on query builder page
  const shouldShowSearch = !(isHomePage || queryBuilderMatch);

  const displayedLinks = useMemo(
    () =>
      isHomePage
        ? [...tools, ...items(setDisplaySidePanel)]
        : [{ label: 'Tools', items: tools }, ...items(setDisplaySidePanel)],
    [isHomePage, namespace, search, queryBuilderMatch]
  );

  return (
    <>
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
      {displaySidePanel && (
        <Suspense fallback={null}>
          <SlidingPanel position={Position.left} yScrollable>
            <QueryBuilder />
          </SlidingPanel>
        </Suspense>
      )}
    </>
  );
};
export default UniProtHeader;
