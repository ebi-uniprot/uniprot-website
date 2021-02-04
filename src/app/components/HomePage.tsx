import {
  lazy,
  Suspense,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { HeroHeader, Loader } from 'franklin-sites';

import SearchContainer from '../../uniprotkb/components/search/SearchContainer';
import ErrorBoundary from '../../shared/components/error-component/ErrorBoundary';

import useReducedMotion from '../../shared/hooks/useReducedMotion';

import { Namespace } from '../../shared/types/namespaces';

import './styles/home-page.scss';

const HomePageNonCritical = lazy(
  () =>
    import(
      /* webpackChunkName: "home-page-non-critical" */ './HomePageNonCritical'
    )
);
const UniProtFooter = lazy(
  () =>
    import(
      /* webpackChunkName: "footer" */ '../../shared/components/layouts/UniProtFooter'
    )
);

const mission =
  'UniProt is the world’s leading high-quality, comprehensive and freely accessible resource of protein sequence and functional information.';

const namespaceFindYour: Record<Namespace, string> = {
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
  [Namespace.database]: 'cross-reference database',
  [Namespace.locations]: 'subcellular location',
};

const HomePage = () => {
  const prefersReducedMotion = useReducedMotion();

  const [selectedNamespace, setSelectedNamespace] = useState(
    Namespace.uniprotkb
  );

  const text = namespaceFindYour[selectedNamespace];
  const [displayed, setDisplayed] = useState(text);

  const interval = useRef<number>();

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setDisplayed('');
  }, [selectedNamespace]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayed(text);
      return;
    }
    window.clearInterval(interval.current);
    interval.current = window.setInterval(() => {
      setDisplayed((displayed) => text.substr(0, displayed.length + 1));
    }, 100);
  }, [prefersReducedMotion, text]);

  if (displayed === text) {
    window.clearInterval(interval.current);
  }

  return (
    <>
      <main>
        <ErrorBoundary>
          <HeroHeader
            className="home-page__header"
            title={
              <>
                {'Find your '}
                <button
                  type="button"
                  className="letter-group"
                  tabIndex={-1}
                  onClick={useCallback(() => {
                    const dropdown: HTMLButtonElement | null = document.querySelector(
                      'form.main-search button.dropdown'
                    );
                    dropdown?.focus();
                    dropdown?.click();
                  }, [])}
                >
                  {prefersReducedMotion ? (
                    displayed
                  ) : (
                    <>
                      {displayed.split('').map((letter, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <span key={index} className="letter">
                          {letter}
                        </span>
                      ))}

                      <span className="cursor">|</span>
                    </>
                  )}
                </button>
              </>
            }
            footer={mission}
          >
            <section className="uniprot-grid uniprot-grid--centered">
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
                includeFooter
              />
            </section>
          </HeroHeader>
        </ErrorBoundary>

        <ErrorBoundary>
          <Suspense fallback={<Loader />}>
            <HomePageNonCritical />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Suspense fallback={null}>
        <ErrorBoundary>
          <UniProtFooter />
        </ErrorBoundary>
      </Suspense>
    </>
  );
};

export default HomePage;
