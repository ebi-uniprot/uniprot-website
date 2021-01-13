import { useMemo, useState, Suspense, lazy } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Header } from 'franklin-sites';

import SlidingPanel, { Position } from './SlidingPanel';
import SearchContainer from '../../../uniprotkb/components/search/SearchContainer';

import useNS from '../../hooks/useNS';

import { LocationToPath, Location } from '../../../app/config/urls';

import { Namespace } from '../../types/namespaces';

import Logo from './svgs/uniprot-logo.svg';

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

const UniProtHeader = () => {
  const homeMatch = useRouteMatch(LocationToPath[Location.Home]);

  const namespace = useNS();

  const [selectedNamespace, setSelectedNamespace] = useState(
    namespace || Namespace.uniprotkb
  );
  const [displayQueryBuilder, setDisplayQueryBuilder] = useState(false);

  const isHomePage = Boolean(homeMatch?.isExact);

  const displayedLinks = useMemo(() => {
    const queryBuilderButton = {
      label: 'Query Builder',
      onClick: () => setDisplayQueryBuilder((flag) => !flag),
    };
    return isHomePage
      ? [...tools, queryBuilderButton, ...restOfItems]
      : [{ label: 'Tools', items: tools }, queryBuilderButton, ...restOfItems];
  }, [isHomePage]);

  return (
    <>
      <Header
        items={displayedLinks}
        isNegative={isHomePage}
        search={
          isHomePage ? undefined : (
            <SearchContainer
              namespace={selectedNamespace}
              onNamespaceChange={(namespace: Namespace) =>
                setSelectedNamespace(namespace)
              }
            />
          )
        }
        logo={<Logo width={120} height={50} />}
      />
      {displayQueryBuilder && (
        <Suspense fallback={null}>
          <SlidingPanel position={Position.left} yScrollable>
            <QueryBuilder onCancel={() => setDisplayQueryBuilder(false)} />
          </SlidingPanel>
        </Suspense>
      )}
    </>
  );
};
export default UniProtHeader;
