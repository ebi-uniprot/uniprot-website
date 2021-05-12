import { useState, Suspense, useCallback, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import {
  Header,
  HelpIcon,
  EnvelopeIcon,
  BasketIcon,
  ToolboxIcon,
} from 'franklin-sites';

import SlidingPanel, { Position } from './SlidingPanel';
import SearchContainer from '../search/SearchContainer';

import lazy from '../../utils/lazy';

import useNS from '../../hooks/useNS';

import { LocationToPath, Location } from '../../../app/config/urls';

import { Namespace } from '../../types/namespaces';

import Logo from '../../../images/uniprot-logo.svg';
import ReleaseInfo from './ReleaseInfo';

const headerItems = [
  {
    label: 'BLAST',
    path: LocationToPath[Location.Blast],
  },
  {
    label: 'Align',
    path: LocationToPath[Location.Align],
  },
  {
    label: 'Peptide search',
    path: LocationToPath[Location.PeptideSearch],
  },
  {
    label: 'ID mapping',
    path: LocationToPath[Location.IDMapping],
  },
  {
    label: 'SPARQL',
    href: 'https://sparql.uniprot.org/',
  },
];

const secondaryItems = [
  // TODO: update link
  { label: <HelpIcon aria-label="Help" />, href: '//www.uniprot.org/help' },
  {
    label: <EnvelopeIcon aria-label="Contact" />,
    href: '//www.uniprot.org/contact',
  },
  {
    label: <ToolboxIcon aria-label="Tools dashboard" />,
    path: LocationToPath[Location.Dashboard],
  },
  { label: <BasketIcon aria-label="Basket" />, path: '/' },
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

  useEffect(() => {
    if (namespace) {
      setSelectedNamespace(namespace);
    }
  }, [namespace]);

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

  const handleClose = useCallback(() => setDisplayQueryBuilder(false), []);

  return (
    <>
      <Header
        items={headerItems}
        isNegative={isHomePage}
        search={!isHomePage && <SearchContainerWithNamespace />}
        logo={<Logo width={120} height={50} aria-label="UniProt home page" />}
        secondaryItems={secondaryItems}
        subtext={isHomePage && <ReleaseInfo />}
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
