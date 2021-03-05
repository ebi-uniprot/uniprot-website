import { useMemo, useState, Suspense, useCallback } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Header } from 'franklin-sites';

import SlidingPanel, { Position } from './SlidingPanel';
import SearchContainer from '../search/SearchContainer';

import lazy from '../../utils/lazy';

import useNS from '../../hooks/useNS';

import { LocationToPath, Location } from '../../../app/config/urls';

import { Namespace } from '../../types/namespaces';

import Logo from '../../../images/uniprot-logo.svg';

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
    label: 'Retrieve/ID mapping',
    path: LocationToPath[Location.IDMapping],
  },
  {
    label: 'Peptide search',
    path: LocationToPath[Location.PeptideSearch],
  },
  {
    label: 'Tool results',
    path: LocationToPath[Location.Dashboard],
  },
];

// NOTE: all of those paths should eventually come from the Location config object
const restOfItems = [
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

const SearchContainerWithNamespace = () => {
  const namespace = useNS();

  const [selectedNamespace, setSelectedNamespace] = useState(
    namespace || Namespace.uniprotkb
  );

  return (
    <SearchContainer
      namespace={selectedNamespace}
      onNamespaceChange={(namespace: Namespace) =>
        setSelectedNamespace(namespace)
      }
    />
  );
};

const UniProtHeader = () => {
  const homeMatch = useRouteMatch(LocationToPath[Location.Home]);
  const [displayQueryBuilder, setDisplayQueryBuilder] = useState(false);

  const isHomePage = Boolean(homeMatch?.isExact);

  const displayedLinks = useMemo(() => {
    const queryBuilderButton = {
      label: (
        <span
          onPointerOver={QueryBuilder.preload}
          onFocus={QueryBuilder.preload}
        >
          Query builder
        </span>
      ),
      onClick: () => setDisplayQueryBuilder((flag) => !flag),
    };
    return isHomePage
      ? [...tools, queryBuilderButton, ...restOfItems]
      : [{ label: 'Tools', items: tools }, queryBuilderButton, ...restOfItems];
  }, [isHomePage]);

  const handleClose = useCallback(() => setDisplayQueryBuilder(false), []);

  return (
    <>
      <Header
        items={displayedLinks}
        isNegative={isHomePage}
        search={!isHomePage && <SearchContainerWithNamespace />}
        logo={<Logo width={120} height={50} aria-label="UniProt home page" />}
      />
      {displayQueryBuilder && (
        <Suspense fallback={null}>
          <SlidingPanel
            position={Position.left}
            yScrollable
            onClose={handleClose}
          >
            <QueryBuilder onCancel={handleClose} />
          </SlidingPanel>
        </Suspense>
      )}
    </>
  );
};
export default UniProtHeader;
