import { useState, useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { Header } from 'franklin-sites';

import SearchContainer from '../search/SearchContainer';
import ReleaseInfo from './ReleaseInfo';
import secondaryItems from './SecondaryItems';

import useNS from '../../hooks/useNS';
import useJobFromUrl from '../../hooks/useJobFromUrl';

import { LocationToPath, Location } from '../../../app/config/urls';

import { Namespace, Searchspace, toolResults } from '../../types/namespaces';

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
  // namespace are proper namespaces of uniprot eg uniprotkb, uniref
  const namespace = useNS() || Namespace.uniprotkb;
  // searchspace is more general to include Tool results
  const searchspace = jobId ? toolResults : namespace;

  const [selectedSearchspace, setSelectedSearchspace] = useState(searchspace);

  useEffect(() => {
    if (searchspace) {
      setSelectedSearchspace(searchspace);
    }
  }, [searchspace]);

  return (
    <SearchContainer
      searchspace={selectedSearchspace as Searchspace}
      onSearchspaceChange={(searchspace: Searchspace) => {
        setSelectedSearchspace(searchspace);
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
