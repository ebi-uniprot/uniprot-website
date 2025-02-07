import { FC, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { HistogramFilter } from 'franklin-sites';

import { Facets } from '../../../../shared/components/results/Facets';

import {
  getLocationObjForParams,
  getParamsFromURL,
} from '../../../../uniprotkb/utils/resultsUtils';
import {
  localFacets,
  getBounds,
  getDataPoints,
  getFacetBounds,
  filterBlastByFacets,
  blastFacetToKeyName,
  blastFacetToNiceName,
} from '../../utils/blastFacetDataUtils';
import { getIdKeyForData } from '../../../../shared/utils/getIdKey';
import apiUrls from '../../../../shared/config/apiUrls/apiUrls';

import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';

import { SearchResults } from '../../../../shared/types/results';
import { UniProtkbAPIModel } from '../../../../uniprotkb/adapters/uniProtkbConverter';
import { Namespace } from '../../../../shared/types/namespaces';
import { BlastFacet, BlastHit } from '../../types/blastResults';
import { SelectedFacet } from '../../../../uniprotkb/types/resultsTypes';

import helper from '../../../../shared/styles/helper.module.scss';
import facetsStyles from '../../../../shared/components/results/styles/facets.module.scss';
import './styles/results-view.scss';

type Range = [start: number, end: number];

type LocalFacetProps = {
  facet: BlastFacet;
  bounds: { min: number; max: number };
  facetBounds: { min: number; max: number };
  hitsFilteredByServer: BlastHit[];
  selectedFacets: SelectedFacet[];
  unfilteredValues: Readonly<number[]>;
  optimisedBinNumber: number;
};

const LocalFacet: FC<React.PropsWithChildren<LocalFacetProps>> = ({
  facet,
  bounds,
  facetBounds,
  hitsFilteredByServer,
  selectedFacets,
  unfilteredValues,
  optimisedBinNumber,
}) => {
  const history = useHistory();
  const { pathname } = useLocation();

  // handle modifying querystring to reflect the chosen values in the URL
  const handleChange = (range: Range) => {
    const facetsWithoutModified = selectedFacets.filter(
      ({ name }) => name !== facet
    );
    const value = `[${range[0] <= bounds.min ? '*' : range[0]} TO ${
      range[1] >= bounds.max ? '*' : range[1]
    }]`;

    let nextFacets: SelectedFacet[];
    if (value === `[* TO *]`) {
      // it's the same as "don't filter by this facet"
      nextFacets = facetsWithoutModified;
    } else {
      nextFacets = [...facetsWithoutModified, { name: facet, value }];
    }

    history.replace(
      getLocationObjForParams({ pathname, selectedFacets: nextFacets })
    );
  };

  const selectedRange = useMemo<[start: number, end: number]>(
    () => [
      facetBounds.min === -Infinity ? bounds.min : facetBounds.min,
      facetBounds.max === +Infinity ? bounds.max : facetBounds.max,
    ],
    [bounds, facetBounds]
  );

  const values = useMemo(
    () =>
      getDataPoints(
        hitsFilteredByServer.filter(filterBlastByFacets(selectedFacets, facet))
      ),
    [hitsFilteredByServer, facet, selectedFacets]
  );

  if (bounds.min === bounds.max) {
    // If all values are the same then don't render the histogram
    return null;
  }

  return (
    <li key={facet} className={blastFacetToKeyName[facet]}>
      <span className="blast-parameters-facet__title">
        {blastFacetToNiceName[facet]}
      </span>
      <HistogramFilter
        height={50}
        min={bounds.min}
        max={bounds.max}
        nBins={optimisedBinNumber}
        onChange={handleChange}
        selectedRange={selectedRange}
        values={values[facet] as number[]}
        unfilteredValues={unfilteredValues as number[]}
        unfilteredValuesShadow={0.1}
      />
    </li>
  );
};

const BlastResultLocalFacets: FC<
  React.PropsWithChildren<{
    allHits: BlastHit[];
    namespace: Namespace;
  }>
> = ({ allHits, namespace }) => {
  const { search: queryParamFromUrl } = useLocation();

  const [{ selectedFacets, query }] = getParamsFromURL(queryParamFromUrl);

  // get data from accessions endpoint with facets applied
  const { data, isStale, loading } = useDataApiWithStale<
    SearchResults<UniProtkbAPIModel>
  >(
    useMemo(
      () =>
        // Trying to save network calls:
        // No need to load for UniRef (no facet)
        // No need to load when no facet applied
        namespace !== Namespace.uniref && selectedFacets.length
          ? apiUrls.search.accessions(
              allHits.map((hit) => hit.hit_acc),
              {
                namespace,
                selectedFacets,
                facets: [],
                query,
              }
            )
          : null,
      [allHits, namespace, selectedFacets, query]
    )
  );

  const hitsFilteredByServer = useMemo(() => {
    // If no data (initial load)
    // Or, data, but stale and no loading => no faceted data loading
    if (!data || (data && isStale && !loading)) {
      // Return everything, not filtered
      return allHits;
    }
    const filteredAccessions = new Set(
      data.results.map(getIdKeyForData(data.results[0]))
    );
    return allHits.filter((hit) => filteredAccessions.has(hit.hit_acc));
  }, [data, isStale, loading, allHits]);

  const facetBounds = useMemo(
    () => getFacetBounds(selectedFacets),
    [selectedFacets]
  );

  const [unfilteredValues, bounds, optimisedBinNumber] = useMemo(() => {
    const dataPoints = getDataPoints(allHits);
    return [
      dataPoints,
      getBounds(allHits),
      // see: https://en.wikipedia.org/wiki/Histogram#Square-root_choice
      // We chose the simplest implementation for the bin number, 𝐤=⌈√𝐧⌉
      Math.ceil(Math.sqrt(dataPoints[BlastFacet.SCORE].length)),
    ];
  }, [allHits]);

  if (!(allHits.length && hitsFilteredByServer.length)) {
    return null;
  }

  return (
    <Facets className={loading && isStale ? helper.stale : undefined}>
      {/* div needed in order to make the facet styles understand there is one
      facet below, otherwise each would element would be a different facet */}
      <div>
        <span className={facetsStyles['facet-name']}>Blast parameters</span>
        <ul className="expandable-list no-bullet blast-parameters-facet">
          {localFacets.map((facet) => (
            <LocalFacet
              key={facet}
              facet={facet}
              bounds={bounds[facet]}
              facetBounds={facetBounds[facet]}
              hitsFilteredByServer={hitsFilteredByServer}
              selectedFacets={selectedFacets}
              unfilteredValues={unfilteredValues[facet]}
              optimisedBinNumber={optimisedBinNumber}
            />
          ))}
        </ul>
      </div>
    </Facets>
  );
};

export default BlastResultLocalFacets;
