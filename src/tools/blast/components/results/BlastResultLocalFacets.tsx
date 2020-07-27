import React, { FC, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { HistogramFilter } from 'franklin-sites';
import {
  getLocationObjForParams,
  getParamsFromURL,
} from '../../../../uniprotkb/utils/resultsUtils';
import {
  localFacets,
  getBounds,
  getDataPoints,
  getFacetBounds,
} from '../../utils/blastFacetDataUtils';

import { BlastHit } from '../../types/blastResults';
import { SelectedFacet } from '../../../../uniprotkb/types/resultsTypes';

import './styles/results-view.scss';
import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';

type LocalFacetProps = {
  facet: string;
  bounds: { min: number; max: number };
  facetBounds: { min: number; max: number };
  dataPoints: number[];
  selectedFacets: SelectedFacet[];
};
const LocalFacet: FC<LocalFacetProps> = ({
  facet,
  bounds,
  facetBounds,
  dataPoints,
  selectedFacets,
}) => {
  const history = useHistory();

  const handleChange = ([min, max]: [number, number]) => {
    const facetsWithoutModified = selectedFacets.filter(
      ({ name }) => name !== facet
    );
    const value = `[${min === bounds.min ? '*' : min} TO ${
      max === bounds.max ? '*' : max
    }]`;
    let nextFacets: SelectedFacet[];
    if (value === `[* TO *]`) {
      // it's the same as "don't filter by this facet"
      nextFacets = facetsWithoutModified;
    } else {
      nextFacets = [...facetsWithoutModified, { name: facet, value }];
    }
    history.replace(
      getLocationObjForParams({
        pathname: history.location.pathname,
        selectedFacets: nextFacets,
      })
    );
  };

  const selectedRange = useMemo(
    () => [
      facetBounds.min === -Infinity ? bounds.min : facetBounds.min,
      facetBounds.max === +Infinity ? bounds.max : facetBounds.max,
    ],
    [bounds, facetBounds]
  );

  if (bounds.min === bounds.max) {
    // If all values are the same then don't render the histogram
    return null;
  }

  return (
    <li key={facet}>
      <span>{facet}</span>
      <HistogramFilter
        height={50}
        min={bounds.min}
        max={bounds.max}
        nBins={30}
        onChange={handleChange}
        selectedRange={selectedRange}
        values={dataPoints}
      />
    </li>
  );
};

const BlastResultLocalFacets: FC<{
  allHits: BlastHit[];
  hitsFilteredByServer: BlastHit[];
  isStale?: boolean;
}> = ({ allHits, hitsFilteredByServer }) => {
  const { search: queryParamFromUrl } = useLocation();

  // get data from accessions endpoint with facets applied
  const {
    loading: accessionsLoading,
    data: accessionsData,
    isStale,
  } = useDataApiWithStale<Response['data']>(
    useMemo(
      () =>
        getAccessionsURL(accessionsFilteredByLocalFacets, {
          selectedFacets: urlParams.selectedFacets,
        }),
      [accessionsFilteredByLocalFacets, urlParams.selectedFacets]
    )
  );

  const { selectedFacets } = getParamsFromURL(queryParamFromUrl);

  const bounds = useMemo(() => getBounds(allHits), [allHits]);

  const dataPoints = useMemo(() => getDataPoints(hitsFilteredByServer), [
    hitsFilteredByServer,
  ]);

  const facetBounds = useMemo(() => getFacetBounds(selectedFacets), [
    selectedFacets,
  ]);

  console.log({
    bounds,
    facetBounds,
    dataPoints,
    selectedFacets,
    hitsFilteredByServer,
  });

  if (!(allHits.length && hitsFilteredByServer.length)) {
    return null;
  }

  return (
    <div className={`blast-parameters-facet${isStale ? ' is-stale' : ''}`}>
      <ul className="no-bullet">
        <li>
          <span className="facet-name">Blast parameters</span>
          <ul className="expandable-list no-bullet">
            {localFacets.map((facet) => (
              <LocalFacet
                key={facet}
                facet={facet}
                bounds={bounds[facet]}
                facetBounds={facetBounds[facet]}
                dataPoints={dataPoints[facet]}
                selectedFacets={selectedFacets}
              />
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default BlastResultLocalFacets;
