import { lazy, Suspense } from 'react';
import { HeroHeader, Loader } from 'franklin-sites';

import SearchContainer from '../../uniprotkb/components/search/SearchContainer';
import ErrorBoundary from '../../shared/components/error-component/ErrorBoundary';

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

const HomePage = () => (
  <>
    <main>
      <ErrorBoundary>
        <HeroHeader title="Find your protein" footer={mission}>
          <section className="uniprot-grid uniprot-grid--centered">
            <SearchContainer className="uniprot-grid-cell--span-12" />
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

export default HomePage;
