import { lazy, Suspense, useState } from 'react';
import { HeroHeader, Loader } from 'franklin-sites';

import SearchContainer from '../../uniprotkb/components/search/SearchContainer';
import ErrorBoundary from '../../shared/components/error-component/ErrorBoundary';
import useNS from '../../shared/hooks/useNS';
import { Namespace } from '../../shared/types/namespaces';

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
  [Namespace.uniprotkb]: 'protein',
  [Namespace.uniref]: 'protein cluster',
  [Namespace.uniparc]: 'protein sequence',
  [Namespace.proteomes]: 'proteome',
  [Namespace.taxonomy]: 'taxon',
  [Namespace.citations]: 'publication',
  [Namespace.keywords]: 'keyword',
};

const HomePage = () => {
  const namespace = useNS();

  const [selectedNamespace, setSelectedNamespace] = useState(
    namespace || Namespace.uniprotkb
  );

  return (
    <>
      <main>
        <ErrorBoundary>
          <HeroHeader
            title={`Find your ${namespaceFindYour[selectedNamespace]}`}
            footer={mission}
          >
            <section className="uniprot-grid uniprot-grid--centered">
              <SearchContainer
                namespace={selectedNamespace}
                onNamespaceChange={(namespace) =>
                  setSelectedNamespace(namespace)
                }
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
