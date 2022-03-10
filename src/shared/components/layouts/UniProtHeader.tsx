import { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Header } from 'franklin-sites';

import SearchContainer from '../search/SearchContainer';
import ReleaseInfo from './ReleaseInfo';
import secondaryItems from './SecondaryItems';

import useNS from '../../hooks/useNS';
import useJobFromUrl from '../../hooks/useJobFromUrl';

import { LocationToPath, Location } from '../../../app/config/urls';

import {
  Namespace,
  SearchableNamespace,
  Searchspace,
  toolResults,
} from '../../types/namespaces';

import Logo from '../../../images/uniprot-logo-beta.svg';

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

const SearchContainerWithNamespace = () => {
  const { jobId } = useJobFromUrl();
  const searchspace = jobId ? toolResults : useNS() || Namespace.uniprotkb;

  const [selectedSearchspace, setSelectedSearchspace] = useState(searchspace);

  useEffect(() => {
    if (searchspace) {
      console.log(searchspace);
      setSelectedSearchspace(searchspace);
    }
  }, [searchspace]);

  console.log(selectedSearchspace);

  return (
    <SearchContainer
      searchspace={selectedSearchspace}
      onSearchspaceChange={(namespace: Searchspace) => {
        setSelectedSearchspace(namespace);
      }}
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
      secondaryItems={secondaryItems()}
    />
  );
};
export default UniProtHeader;
