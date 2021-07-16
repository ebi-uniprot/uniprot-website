import { useRouteMatch } from 'react-router-dom';
import { Loader, PageIntro } from 'franklin-sites';

import ResultsData from '../results/ResultsData';
import EmptyBasket from './EmptyBasket';
import SideBarLayout from '../layouts/SideBarLayout';
import ResultsFacets from '../results/ResultsFacets';
import ResultsButtons from '../results/ResultsButtons';

import useBasket from '../../hooks/useBasket';
import useItemSelect from '../../hooks/useItemSelect';
import usePagination from '../../hooks/usePagination';
import useNSQuery from '../../hooks/useNSQuery';
import useDataApiWithStale from '../../hooks/useDataApiWithStale';

import {
  LocationToPath,
  Location,
  basketNamespaces,
} from '../../../app/config/urls';
import namespaceToolTitles from '../../config/namespaceToolTitles';

import { Namespace } from '../../types/namespaces';
import Response from '../../../uniprotkb/types/responseTypes';

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
    withColumns: false,
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
          namespaceFallback={namespace}
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
        namespaceFallback={namespace}
        inBasket
      />
      <ResultsData
        resultsDataObject={resultsDataObject}
        selectedEntries={selectedEntries}
        handleEntrySelection={handleEntrySelection}
        namespaceFallback={namespace}
        basketSetter={setBasket}
      />
    </SideBarLayout>
  );
};

export default BasketFullView;
