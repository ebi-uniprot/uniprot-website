import {
  memo,
  lazy,
  Suspense,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { generatePath, Link } from 'react-router-dom';
import { HeroHeader, Loader, CitedIcon } from 'franklin-sites';

import SearchContainer from '../../../shared/components/search/SearchContainer';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import useReducedMotion from '../../../shared/hooks/useReducedMotion';

import { LocationToPath, Location } from '../../config/urls';
import {
  Namespace,
  SearchableNamespace,
} from '../../../shared/types/namespaces';

import helper from '../../../shared/styles/helper.module.scss';
import './styles/home-page.scss';

const HomePageNonCritical = lazy(
  () => import(/* webpackChunkName: "home-page-non-critical" */ './NonCritical')
);

const mission = (
  <>
    UniProt is the world’s leading high-quality, comprehensive and freely
    accessible resource of protein sequence and functional information.{' '}
    {/* TODO: update link */}
    <Link
      to={generatePath(LocationToPath[Location.HelpEntry], {
        accession: 'publications',
      })}
      className="cite-us"
    >
      Cite{' '}
      <span className={helper['no-wrap']}>
        UniProt&nbsp;
        <sup>
          <CitedIcon width="1em" />
        </sup>
      </span>
    </Link>
  </>
);

const namespaceFindYour: Record<SearchableNamespace, string> = {
  // Main data
  [Namespace.uniprotkb]: 'protein',
  [Namespace.uniref]: 'protein cluster',
  [Namespace.uniparc]: 'protein sequence',
  [Namespace.proteomes]: 'proteome',
  // Supporting data
  [Namespace.taxonomy]: 'taxon',
  [Namespace.keywords]: 'keyword',
  [Namespace.citations]: 'publication',
  [Namespace.diseases]: 'disease',
  [Namespace.database]: 'cross-referenced database',
  [Namespace.locations]: 'subcellular location',
  // Annotations
  [Namespace.unirule]: 'curated UniRule rule',
  [Namespace.arba]: 'generated ARBA rule',
};

const HomePageHeader = memo(() => {
  const prefersReducedMotion = useReducedMotion();

  const [selectedNamespace, setSelectedNamespace] =
    useState<SearchableNamespace>(Namespace.uniprotkb);

  const text = namespaceFindYour[selectedNamespace];

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    }
  }, [selectedNamespace]);

  return (
    <HeroHeader
      className="home-page__header"
      title={
        <>
          {'Find your '}
          {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
          <span
            className="letter-group"
            onClick={useCallback(() => {
              const dropdown: HTMLButtonElement | null = document.querySelector(
                'form.main-search button.dropdown'
              );
              dropdown?.focus();
              dropdown?.click();
            }, [])}
          >
            {prefersReducedMotion ? (
              text
            ) : (
              <>
                {text.split('').map((letter, index, { length }) => (
                  <span
                    // mess up the keys in order to force new elements to render
                    key={Math.random()}
                    className="letter"
                    style={{
                      animationDelay: firstRender.current
                        ? '0s'
                        : `${(index * 0.5) / length}s`,
                    }}
                  >
                    {letter}
                  </span>
                ))}
              </>
            )}
          </span>
        </>
      }
      footer={mission}
    >
      <div className="uniprot-grid uniprot-grid--centered">
        <SearchContainer
          namespace={selectedNamespace}
          onNamespaceChange={useCallback((namespace) => {
            setSelectedNamespace(namespace);
            const textInput: HTMLInputElement | null = document.querySelector(
              'form.main-search input[type="text"]'
            );
            textInput?.focus();
          }, [])}
          className="uniprot-grid-cell--span-12"
          isOnHomePage
        />
      </div>
    </HeroHeader>
  );
});

const HomePage = () => (
  <main>
    <h1 className="visually-hidden">UniProt website home page</h1>
    <ErrorBoundary>
      <HomePageHeader />
    </ErrorBoundary>
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <HomePageNonCritical />
      </Suspense>
    </ErrorBoundary>
  </main>
);

export default HomePage;
