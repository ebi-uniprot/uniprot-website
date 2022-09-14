import { useState, useEffect, lazy, Suspense } from 'react';
import { Link, useRouteMatch, useLocation } from 'react-router-dom';
import { Header, Dropdown, Button } from 'franklin-sites';
import cn from 'classnames';
import { WithContext, Organization } from 'schema-dts';

import ReleaseInfo from './ReleaseInfo';
import SecondaryItems from './SecondaryItems';

import useNS from '../../hooks/useNS';
import useJobFromUrl from '../../hooks/useJobFromUrl';
import useMatchMedia from '../../hooks/useMatchMedia';
import useStructuredData from '../../hooks/useStructuredData';

import { LocationToPath, Location } from '../../../app/config/urls';

import { Namespace, Searchspace, toolResults } from '../../types/namespaces';

import styles from './styles/uniprot-header.module.scss';

import Logo from '../../../images/uniprot-logo.img.svg';

const SearchContainer = lazy(
  () =>
    import(
      /* webpackChunkName: "search-container" */ '../search/SearchContainer'
    )
);

const toolsLinks = (
  <>
    <li>
      <Link to={LocationToPath[Location.Blast]}>BLAST</Link>
    </li>
    <li>
      <Link to={LocationToPath[Location.Align]}>Align</Link>
    </li>
    <li>
      <Link to={LocationToPath[Location.PeptideSearch]}>Peptide search</Link>
    </li>
    <li>
      <Link to={LocationToPath[Location.IDMapping]}>ID mapping</Link>
    </li>
  </>
);

const sparqlLink = (
  <li>
    {/* eslint-disable-next-line react/jsx-no-target-blank */}
    <a href="https://sparql.uniprot.org/" target="_blank" rel="noopener">
      SPARQL
    </a>
  </li>
);

// just a bit more than "medium" breakpoint in Franklin (640px)
const mediumPlusMediaQuery = 'only screen and (min-width: 840px)';
// just a bit more than the "large" breakpoint in Franklin (1024px)
const largePlusMediaQuery = 'only screen and (min-width: 1100px)';

const HeaderContent = ({ isHomePage }: { isHomePage: boolean }) => {
  const wideScreen = useMatchMedia(largePlusMediaQuery);
  const mediumPlusScreen = useMatchMedia(mediumPlusMediaQuery);
  const location = useLocation();

  return (
    <ul className={cn('no-bullet', styles['main-content'])}>
      {/* If wide screen, or not so wide but home page */}
      {wideScreen || (mediumPlusScreen && isHomePage) ? (
        // display all tools links
        toolsLinks
      ) : (
        // otherwise display all tools links in a dropdown
        <li className={styles['no-small']}>
          <Dropdown
            visibleElement={<Button variant="tertiary">Tools</Button>}
            propChangeToClose={location}
          >
            <ul className="no-bullet">{toolsLinks}</ul>
          </Dropdown>
        </li>
      )}
      {sparqlLink}
    </ul>
  );
};

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
    <Suspense fallback={null}>
      <SearchContainer
        searchspace={selectedSearchspace as Searchspace}
        onSearchspaceChange={(searchspace: Searchspace) => {
          setSelectedSearchspace(searchspace);
        }}
      />
    </Suspense>
  );
};

const organizationSchema: WithContext<Organization> = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  url: 'https://www.uniprot.org',
  logo: ['https://www.uniprot.org/android-chrome-512x512.png', Logo],
};

const UniProtHeader = () => {
  const homeMatch = useRouteMatch(LocationToPath[Location.Home]);

  const isHomePage = Boolean(homeMatch?.isExact);

  useStructuredData(organizationSchema);

  return (
    <Header
      isNegative={isHomePage}
      search={isHomePage ? <ReleaseInfo /> : <SearchContainerWithNamespace />}
      logo={
        <div
          className={cn(styles.logo, {
            [styles.home]: isHomePage,
          })}
          aria-label="UniProt home page"
        />
      }
      secondaryItems={<SecondaryItems />}
    >
      <HeaderContent isHomePage={isHomePage} />
    </Header>
  );
};
export default UniProtHeader;
