import cn from 'classnames';
import { Button, Dropdown, Header } from 'franklin-sites';
import { lazy, Suspense, useEffect, useState } from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { Organization, WithContext } from 'schema-dts';

import description from '../../../app/config/description';
import * as socialUrls from '../../../app/config/socialUrls';
import { Location, LocationToPath } from '../../../app/config/urls';
import Logo from '../../../images/uniprot-logo.img.svg';
import useJobFromUrl from '../../hooks/useJobFromUrl';
import useMatchMedia from '../../hooks/useMatchMedia';
import useNS from '../../hooks/useNS';
import useStructuredData from '../../hooks/useStructuredData';
import { Namespace, Searchspace, toolResults } from '../../types/namespaces';
import ReleaseInfo from './ReleaseInfo';
import SecondaryItems from './SecondaryItems';
import styles from './styles/uniprot-header.module.scss';

const SearchContainer = lazy(
  () =>
    import(
      /* webpackChunkName: "search-container" */ '../search/SearchContainer'
    )
);

const toolsLinks = (
  <>
    <li>
      <Link to={LocationToPath[Location.Blast]} translate="no">
        BLAST
      </Link>
    </li>
    <li>
      <Link to={LocationToPath[Location.Align]} translate="no">
        Align
      </Link>
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
    <a
      href="https://sparql.uniprot.org/"
      target="_blank"
      rel="noopener"
      translate="no"
    >
      SPARQL
    </a>
  </li>
);

// just a bit more than "medium" breakpoint in Franklin (640px)
const mediumPlusMediaQuery = 'only screen and (min-width: 840px)';
// just a bit more than the "large" breakpoint in Franklin (1024px)
const largePlusMediaQuery = 'only screen and (min-width: 1100px)';

const visibleElement = (onClick: () => unknown) => (
  <Button variant="tertiary" onClick={onClick}>
    Tools
  </Button>
);

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
            visibleElement={visibleElement}
            propChangeToClose={location}
          >
            <ul className="no-bullet">{toolsLinks}</ul>
          </Dropdown>
        </li>
      )}
      {/* If wide screen, or home page */}
      {(wideScreen || isHomePage) && sparqlLink}
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
  name: 'UniProt',
  description,
  sameAs: Object.values(socialUrls),
  contactPoint: {
    '@type': 'ContactPoint',
    url: 'https://www.uniprot.org/contact',
  },
};

const UniProtHeader = () => {
  const homeMatch = useRouteMatch(LocationToPath[Location.Home]);

  const isHomePage = Boolean(homeMatch?.isExact);

  useStructuredData(organizationSchema);

  return (
    <Header
      isNegative={isHomePage}
      search={isHomePage ? <ReleaseInfo /> : <SearchContainerWithNamespace />}
      homepageLink={
        <Link to={LocationToPath[Location.Home]}>
          <div
            className={cn(styles.logo, {
              [styles.home]: isHomePage,
            })}
            aria-label="UniProt home page"
          />
        </Link>
      }
      secondaryItems={<SecondaryItems />}
    >
      <HeaderContent isHomePage={isHomePage} />
    </Header>
  );
};
export default UniProtHeader;
