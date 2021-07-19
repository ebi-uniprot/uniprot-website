import { useRouteMatch } from 'react-router-dom';
import { Loader, PageIntro } from 'franklin-sites';

import ResultsData from '../shared/components/results/ResultsData';
import EmptyBasket from './EmptyBasket';
import SideBarLayout from '../shared/components/layouts/SideBarLayout';
import ResultsFacets from '../shared/components/results/ResultsFacets';
import ResultsButtons from '../shared/components/results/ResultsButtons';

import useBasket from '../shared/hooks/useBasket';
import useItemSelect from '../shared/hooks/useItemSelect';
import usePagination from '../shared/hooks/usePagination';
import useNSQuery from '../shared/hooks/useNSQuery';
import useDataApiWithStale from '../shared/hooks/useDataApiWithStale';

import { LocationToPath, Location, basketNamespaces } from '../app/config/urls';
import namespaceToolTitles from '../shared/config/namespaceToolTitles';

import { Namespace } from '../shared/types/namespaces';
import Response from '../uniprotkb/types/responseTypes';

const BasketFullView = () => {
  // Basket specific data
  const [basket, setBasket] = useBasket();
  const fullViewMatch = useRouteMatch<{
    namespace: typeof basketNamespaces[number];
  }>(LocationToPath[Location.Basket]);

  const namespace = fullViewMatch?.params.namespace || Namespace.uniprotkb;
  const subBasket = basket.get(namespace) || new Set();
  const accessions = Array.from(subBasket);

  // Below here similar (but not identical) to the Results component
  const [selectedEntries, handleEntrySelection] = useItemSelect();

  // Query for facets
  const initialApiFacetUrl = useNSQuery({
    accessions,
    overrideNS: namespace,
    withFacets: true,
    withColumns: false,
  });
  const facetApiObject =
    useDataApiWithStale<Response['data']>(initialApiFacetUrl);

  const { loading: facetInitialLoading, isStale: facetHasStaleData } =
    facetApiObject;

  // Query for basket data
  const initialApiUrl = useNSQuery({
    accessions,
    overrideNS: namespace,
    withFacets: false,
  });
  const resultsDataObject = usePagination(initialApiUrl);
  const {
    initialLoading: resultsDataInitialLoading,
    progress: resultsDataProgress,
  } = resultsDataObject;

  if (!accessions.length) {
    return <EmptyBasket />;
  }

  if (facetInitialLoading && resultsDataInitialLoading && !facetHasStaleData) {
    return <Loader progress={resultsDataProgress} />;
  }

  return (
    <SideBarLayout
      sidebar={
        <ResultsFacets
          dataApiObject={facetApiObject}
          namespaceOverride={namespace}
        />
      }
    >
      <PageIntro
        title={namespaceToolTitles[namespace]}
        titlePostscript={<small> in your basket</small>}
        resultsCount={accessions.length}
      />
      <ResultsButtons
        total={accessions.length}
        selectedEntries={selectedEntries}
        accessions={accessions}
        namespaceOverride={namespace}
        inBasket
      />
      <ResultsData
        resultsDataObject={resultsDataObject}
        selectedEntries={selectedEntries}
        handleEntrySelection={handleEntrySelection}
        namespaceOverride={namespace}
        basketSetter={setBasket}
      />
    </SideBarLayout>
  );
};

export default BasketFullView;
