import { useRouteMatch } from 'react-router-dom';
import { Loader, PageIntro } from 'franklin-sites';

import HTMLHead from '../shared/components/HTMLHead';
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

import { reIds } from '../tools/utils/urls';

import { LocationToPath, Location, basketNamespaces } from '../app/config/urls';

import {
  Namespace,
  searchableNamespaceLabels,
  namespaceAndToolsLabels,
} from '../shared/types/namespaces';
import { SearchResults } from '../shared/types/results';
import { APIModel } from '../shared/types/apiModel';

const BasketFullView = () => {
  // Basket specific data
  const [basket, setBasket] = useBasket();
  const fullViewMatch = useRouteMatch<{
    namespace: typeof basketNamespaces[number];
  }>(LocationToPath[Location.Basket]);

  const namespace = fullViewMatch?.params.namespace || Namespace.uniprotkb;
  const subBasket = basket.get(namespace) || new Set();
  const accessions = Array.from(subBasket);
  const subsetsMap = new Map();
  accessions.forEach((acc) => {
    const { id } = acc.match(reIds)?.groups || {};
    if (id) {
      subsetsMap.set(acc, id);
    } else {
      subsetsMap.set(acc, acc);
    }
  });

  // Below here similar (but not identical) to the Results component
  const [selectedEntries, setSelectedItemFromEvent, setSelectedEntries] =
    useItemSelect();

  // Query for facets
  const initialApiFacetUrl = useNSQuery({
    accessions: Array.from(subsetsMap.values()),
    overrideNS: namespace,
    withFacets: true,
    withColumns: false,
  });
  const facetApiObject =
    useDataApiWithStale<SearchResults<APIModel>>(initialApiFacetUrl);

  const {
    loading: facetInitialLoading,
    headers: facetHeaders,
    isStale: facetHasStaleData,
  } = facetApiObject;
  const facetTotal = facetHeaders?.['x-total-results'];

  // Query for basket data
  const initialApiUrl = useNSQuery({
    accessions: Array.from(subsetsMap.values()),
    overrideNS: namespace,
    withFacets: false,
  });
  const resultsDataObject = usePagination(initialApiUrl);
  const {
    initialLoading: resultsDataInitialLoading,
    total: resultsDataTotal,
    progress: resultsDataProgress,
  } = resultsDataObject;

  if (!accessions.length) {
    return (
      <>
        <HTMLHead title="My basket">
          <meta name="robots" content="noindex" />
        </HTMLHead>
        <EmptyBasket />
      </>
    );
  }

  let total: undefined | number = accessions.length;
  if (facetTotal !== undefined) {
    total = +facetTotal;
  }
  if (resultsDataTotal !== undefined) {
    total = +resultsDataTotal;
  }

  if (facetInitialLoading && resultsDataInitialLoading && !facetHasStaleData) {
    return <Loader progress={resultsDataProgress} />;
  }

  if (resultsDataObject.allResults.length) {
    resultsDataObject.allResults.forEach((r, index) => {
      if (namespace == Namespace.uniprotkb) {
        r.primaryAccession = accessions[index];
      }
    });
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
      <HTMLHead
        title={[
          `My entries in ${searchableNamespaceLabels[namespace]}${
            total !== undefined ? ` (${total})` : ''
          }`,
          'My basket',
        ]}
      >
        <meta name="robots" content="noindex" />
      </HTMLHead>
      <PageIntro
        title={namespaceAndToolsLabels[namespace]}
        titlePostscript={<small> in your basket</small>}
        resultsCount={total}
      />
      <ResultsButtons
        total={total}
        loadedTotal={accessions.length}
        selectedEntries={selectedEntries}
        setSelectedEntries={setSelectedEntries}
        accessions={accessions}
        namespaceOverride={namespace}
        subsetsMap={subsetsMap}
        inBasket
      />
      <ResultsData
        resultsDataObject={resultsDataObject}
        setSelectedEntries={setSelectedEntries}
        setSelectedItemFromEvent={setSelectedItemFromEvent}
        namespaceOverride={namespace}
        basketSetter={setBasket}
      />
    </SideBarLayout>
  );
};

export default BasketFullView;
