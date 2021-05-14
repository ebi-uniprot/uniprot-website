import { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import {
  Header,
  HelpIcon,
  EnvelopeIcon,
  BasketIcon,
  ToolboxIcon,
} from 'franklin-sites';

import SearchContainer from '../search/SearchContainer';

import useNS from '../../hooks/useNS';

import { LocationToPath, Location } from '../../../app/config/urls';

import { Namespace } from '../../types/namespaces';

import Logo from '../../../images/uniprot-logo.svg';
import ReleaseInfo from './ReleaseInfo';

import './styles/uniprot-header.scss';

const secondaryItemIconSize = '1.4em';

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
  {
    label: (
      <span title="Help">
        <HelpIcon width={secondaryItemIconSize} />
      </span>
    ),
    href: '//www.uniprot.org/help',
  },
  {
    label: (
      <span title="Contact">
        <EnvelopeIcon width={secondaryItemIconSize} />
      </span>
    ),
    href: '//www.uniprot.org/contact',
  },
  {
    label: (
      <span title="Tools dashboard">
        <ToolboxIcon width={secondaryItemIconSize} />
      </span>
    ),
    path: LocationToPath[Location.Dashboard],
  },
  {
    label: (
      <span title="Basket">
        <BasketIcon width={secondaryItemIconSize} />
      </span>
    ),
    path: '/',
  },
];

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

  const isHomePage = Boolean(homeMatch?.isExact);

  return (
    <Header
      items={headerItems}
      isNegative={isHomePage}
      search={isHomePage ? <ReleaseInfo /> : <SearchContainerWithNamespace />}
      logo={<Logo width={120} height={50} aria-label="UniProt home page" />}
      secondaryItems={secondaryItems}
    />
  );
};
export default UniProtHeader;
