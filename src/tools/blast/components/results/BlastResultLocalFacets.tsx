import { FC, useMemo } from 'react';
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
  filterBlastByFacets,
  blastFacetToKeyName,
  blastFacetToNiceName,
} from '../../utils/blastFacetDataUtils';
import { getAccessionsURL } from '../../../../shared/config/apiUrls';

import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';

import { BlastFacet, BlastHit } from '../../types/blastResults';
import { SelectedFacet } from '../../../../uniprotkb/types/resultsTypes';
import Response from '../../../../uniprotkb/types/responseTypes';

import './styles/results-view.scss';

type LocalFacetProps = {
  facet: BlastFacet;
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
  const { pathname } = useLocation();

  // handle modifying querystring to reflect the chosen values in the URL
  const handleChange = ([min, max]: [min: number, max: number]) => {
    const facetsWithoutModified = selectedFacets.filter(
      ({ name }) => name !== facet
    );
    const value = `[${min <= bounds.min ? '*' : min} TO ${
      max >= bounds.max ? '*' : max
    }]`;

    let nextFacets: SelectedFacet[];
    if (value === `[* TO *]`) {
      // it's the same as "don't filter by this facet"
      nextFacets = facetsWithoutModified;
    } else {
      nextFacets = [...facetsWithoutModified, { name: facet, value }];
    }

    history.replace(
      // eslint-disable-next-line uniprot-website/use-config-location
      getLocationObjForParams({ pathname, selectedFacets: nextFacets })
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
        values={values[facet]}
        unfilteredValues={unfilteredValues}
        unfilteredValuesShadow={0.1}
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
  const { data, isStale } = useDataApiWithStale<Response['data']>(
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
      return allHits;
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
      // We chose the simplest implementation for the bin number, 𝐤=⌈√𝐧⌉
      Math.ceil(Math.sqrt(dataPoints[BlastFacet.SCORE].length)),
    ];
  }, [allHits]);

  if (!(allHits.length && hitsFilteredByServer.length)) {
    return null;
  }

  return (
    <div className={isStale ? 'is-stale' : undefined}>
      <span className="facet-name">Blast parameters</span>
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
  );
};

export default BlastResultLocalFacets;
