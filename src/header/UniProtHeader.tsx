import React from 'react';
import { Header } from 'franklin-sites';

import SearchContainer from '../search/SearchContainer';

import Logo from '../svg/uniprot-rgb.svg';

const tools = [
  {
    label: 'BLAST',
    path: '/',
  },
  {
    label: 'Align',
    path: '/',
  },
  {
    label: 'Peptide Search',
    path: '/',
  },
  {
    label: 'Retrieve/ID Mapping',
    path: '/',
  },
];

const links = [
  {
    label: 'Query Builder',
    path: '/advancedSearch',
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

const UniProtHeader = ({ isHomePage = false, isSearchPage = false }) => {
  const shouldShowSearch = !isSearchPage && !isHomePage;
  return (
    <Header
      links={
        isHomePage
          ? [...tools, ...links]
          : [{ label: 'Tools', links: tools }, ...links]
      }
      isNegative={isHomePage}
      search={shouldShowSearch && <SearchContainer />}
      logo={<Logo width={120} height={50} />}
    />
  );
};
export default UniProtHeader;
