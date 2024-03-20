import { useRouteMatch } from 'react-router-dom';
import { Loader, PageIntro } from 'franklin-sites';

import HTMLHead from '../shared/components/HTMLHead';
import ResultsData from '../shared/components/results/ResultsData';
import EmptyBasket from './EmptyBasket';
import { SidebarLayout } from '../shared/components/layouts/SideBarLayout';
import ResultsFacets from '../shared/components/results/ResultsFacets';
import ResultsButtons from '../shared/components/results/ResultsButtons';

import useBasket from '../shared/hooks/useBasket';
import useItemSelect from '../shared/hooks/useItemSelect';
import usePagination from '../shared/hooks/usePagination';
import useNSQuery from '../shared/hooks/useNSQuery';
import useDataApiWithStale from '../shared/hooks/useDataApiWithStale';

import { reIds } from '../tools/utils/urls';
import { updateResultsWithAccessionSubsets } from './BasketMiniView';

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

  const subsetsMap = new Map(
    accessions.map((accession) => {
      const { id } = accession.match(reIds)?.groups || { id: accession };
      return [accession, id];
    })
  );

  // Query for facets
  const initialApiFacetUrl = useNSQuery({
    // Passing accessions without modifications in case of subsets
    accessions: Array.from(new Set(subsetsMap.values())),
    overrideNS: namespace,
    withFacets: true,
    withColumns: false,
    size: 0,
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
    // Passing accessions without modifications in case of subsets
    accessions: Array.from(new Set(subsetsMap.values())),
    overrideNS: namespace,
    withFacets: false,
  });
  const resultsDataObject = usePagination(initialApiUrl);
  const {
    initialLoading: resultsDataInitialLoading,
    total: resultsDataTotal,
    progress: resultsDataProgress,
  } = resultsDataObject;

  // Below here similar (but not identical) to the Results component
  const [selectedEntries, setSelectedItemFromEvent, setSelectedEntries] =
    useItemSelect(resultsDataObject.initialLoading);

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
  if (facetTotal !== undefined && !subsetsMap) {
    total = +facetTotal;
  }
  if (resultsDataTotal !== undefined && !subsetsMap) {
    total = +resultsDataTotal;
  }

  if (facetInitialLoading && resultsDataInitialLoading && !facetHasStaleData) {
    return <Loader progress={resultsDataProgress} />;
  }

  // Replacing the full accession including subsets in the resultsData
  resultsDataObject.allResults = updateResultsWithAccessionSubsets(
    resultsDataObject.allResults,
    namespace,
    accessions
  );

  return (
    <SidebarLayout
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
    </SidebarLayout>
  );
};

export default BasketFullView;
