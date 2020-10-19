import React, { useMemo } from 'react';
import { useRouteMatch, generatePath } from 'react-router-dom';
import { Header } from 'franklin-sites';

import SearchContainer from '../../../uniprotkb/components/search/SearchContainer';
import { LocationToPath, Location } from '../../../app/config/urls';

import { Namespace } from '../../types/namespaces';

import Logo from './svgs/uniprot-logo.svg';
import useNS from '../../hooks/useNS';

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

const links = (namespace: Namespace) => [
  {
    label: 'Query Builder',
    path: generatePath(LocationToPath[Location.QueryBuilder], { namespace }),
  },
  {
    label: 'API',
    links: [
      {
        label: 'Programmatic access',
        path: '/',
      },
    ],
  },
  {
    label: 'Help',
    links: [
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

const UniProtHeader = () => {
  const advancedSearchMatch = useRouteMatch(
    LocationToPath[Location.QueryBuilder]
  );
  const homeMatch = useRouteMatch(LocationToPath[Location.Home]);

  const namespace = useNS() || Namespace.uniprotkb;

  const isHomePage = Boolean(homeMatch?.isExact);

  // only show search if not on home page, or not on advanced search pafe
  const shouldShowSearch = !(isHomePage || advancedSearchMatch);

  const displayedLinks = useMemo(
    () =>
      isHomePage
        ? [...tools, ...links(namespace)]
        : [{ label: 'Tools', links: tools }, ...links(namespace)],
    [isHomePage, namespace]
  );

  return (
    <Header
      links={displayedLinks}
      isNegative={isHomePage}
      search={shouldShowSearch && <SearchContainer />}
      logo={<Logo width={120} height={50} />}
    />
  );
};
export default UniProtHeader;
