import React, { lazy, Suspense } from 'react';
import { HeroHeader, Loader } from 'franklin-sites';

import SearchContainer from '../../uniprotkb/components/search/SearchContainer';

const HomePageNonCritical = lazy(() =>
  import(
    /* webpackChunkName: "home-page-non-critical" */ './HomePageNonCritical'
  )
);

const mission =
  'The mission of UniProt is to provide the scientific community with a comprehensive, high-quality and freely accessible resource of protein sequence and functional information.';

const HomePage = () => (
  <main>
    <HeroHeader title="Find your protein" footer={mission}>
      <SearchContainer />
    </HeroHeader>

    <Suspense fallback={<Loader />}>
      <HomePageNonCritical />
    </Suspense>
  </main>
);

export default HomePage;
