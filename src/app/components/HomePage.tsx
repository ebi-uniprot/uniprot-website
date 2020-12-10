import React, { lazy, Suspense } from 'react';
import { HeroHeader, Loader } from 'franklin-sites';

import SearchContainer from '../../uniprotkb/components/search/SearchContainer';
import ErrorBoundary from '../../shared/components/error-component/ErrorBoundary';

import '../../shared/components/layouts/styles/home-page-layout.scss';

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
  'The mission of UniProt is to provide the scientific community with a comprehensive, high-quality and freely accessible resource of protein sequence and functional information.';

const HomePage = () => (
  <section className="home-page-layout">
    <main>
      <ErrorBoundary>
        <HeroHeader
          title="Find your protein"
          footer={mission}
          className="uniprot-grid"
        >
          <SearchContainer />
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
  </section>
);

export default HomePage;
