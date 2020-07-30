import React, { FC, useMemo } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import cn from 'classnames';
import { HistogramFilter, Loader } from 'franklin-sites';

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
} from '../../utils/blastFacetDataUtils';
import { getAccessionsURL } from '../../../../uniprotkb/config/apiUrls';

import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';

import { BlastHit } from '../../types/blastResults';
import { SelectedFacet } from '../../../../uniprotkb/types/resultsTypes';
import Response from '../../../../uniprotkb/types/responseTypes';

import './styles/results-view.scss';

type LocalFacetProps = {
  facet: string;
  bounds: { min: number; max: number };
  facetBounds: { min: number; max: number };
  hitsFilteredByServer: BlastHit[];
  selectedFacets: SelectedFacet[];
  unfilteredValues: number[];
  optimisedBinNumber: number;
};
const LocalFacet: FC<LocalFacetProps> = ({
  facet,
  bounds,
  facetBounds,
  hitsFilteredByServer,
  selectedFacets,
  unfilteredValues,
  optimisedBinNumber,
}) => {
  const history = useHistory();

  // handle modifying querystring to reflect the chosen values in the URL
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
    <li key={facet}>
      <span>{facet}</span>
      <HistogramFilter
        height={50}
        min={bounds.min}
        max={bounds.max}
        nBins={optimisedBinNumber}
        onChange={handleChange}
        selectedRange={selectedRange}
        values={values[facet]}
        unfilteredValues={unfilteredValues}
      />
    </li>
  );
};

const BlastResultLocalFacets: FC<{
  allHits: BlastHit[];
}> = ({ allHits }) => {
  const { search: queryParamFromUrl } = useLocation();

  const { selectedFacets } = getParamsFromURL(queryParamFromUrl);

  // get data from accessions endpoint with facets applied
  const { loading, data, isStale } = useDataApiWithStale<Response['data']>(
    useMemo(
      () =>
        getAccessionsURL(
          allHits.map((hit) => hit.hit_acc),
          {
            selectedFacets,
            facets: [],
          }
        ),
      [allHits, selectedFacets]
    )
  );

  const hitsFilteredByServer = useMemo(() => {
    if (!data) {
      return [];
    }
    const filteredAccessions = new Set(
      data.results.map((entry) => entry.primaryAccession)
    );
    return allHits.filter((hit) => filteredAccessions.has(hit.hit_acc));
  }, [data, allHits]);

  const facetBounds = useMemo(() => getFacetBounds(selectedFacets), [
    selectedFacets,
  ]);

  const [unfilteredValues, bounds, optimisedBinNumber] = useMemo(() => {
    const dataPoints = getDataPoints(allHits);
    return [
      dataPoints,
      getBounds(allHits),
      // see: https://en.wikipedia.org/wiki/Histogram#Square-root_choice
      // We chose the simplest implementation, 𝐤=⌈√𝐧⌉
      Math.ceil(Math.sqrt(dataPoints.score.length)),
    ];
  }, [allHits]);

  if (loading && !isStale) {
    return <Loader />;
  }

  if (!(allHits.length && hitsFilteredByServer.length)) {
    return null;
  }

  return (
    <div className={cn('blast-parameters-facet', isStale && 'is-stale')}>
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
                hitsFilteredByServer={hitsFilteredByServer}
                selectedFacets={selectedFacets}
                unfilteredValues={unfilteredValues[facet]}
                optimisedBinNumber={optimisedBinNumber}
              />
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default BlastResultLocalFacets;
