import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { HistogramFilter } from 'franklin-sites';
import {
  getLocationObjForParams,
  getParamsFromURL,
} from '../../../../uniprotkb/utils/resultsUtils';
import { BlastHitFacetParameters } from '../../utils/blastFacetDataUtils';
import { BlastFacet } from '../../types/blastResults';

import './styles/results-view.scss';

const blastFacetToString = {
  [BlastFacet.SCORE]: 'Score',
  [BlastFacet.IDENTITY]: 'Identity',
  [BlastFacet.EVALUE]: 'E-Value',
};

const BlastResultsParametersFacets: FC<{
  parameters: BlastHitFacetParameters;
  isStale: boolean;
}> = ({ parameters, isStale }) => {
  const {
    push,
    location: { search: queryParamFromUrl, pathname },
  } = useHistory();
  const { query, selectedFacets, sortColumn, sortDirection } = getParamsFromURL(
    queryParamFromUrl
  );

  const findFacet = (facetName: string): number => {
    const index = selectedFacets.findIndex(
      (selectedFacet) => selectedFacet.name === facetName
    );

    return index;
  };

  const hasFacet = (facetName: string): boolean => {
    const facetIndex = findFacet(facetName);

    if (facetIndex > -1) {
      return true;
    }

    return false;
  };

  const updateFacet = (facetName: string, facetValue: string): void => {
    const facetIndex = findFacet(facetName);

    selectedFacets[facetIndex].value = facetValue;

    push(
      getLocationObjForParams(
        pathname,
        query,
        selectedFacets,
        sortColumn,
        sortDirection,
        facetName
      )
    );
  };

  const addFacet = (facetName: string, facetValue: string): void => {
    const facet = { name: facetName, value: facetValue };

    if (hasFacet(facetName)) {
      updateFacet(facetName, facetValue);
      return;
    }

    push(
      getLocationObjForParams(
        pathname,
        query,
        [...selectedFacets.concat(facet)],
        sortColumn,
        sortDirection,
        facetName
      )
    );
  };

  const onBlastParamChange = (paramName: string, values: number[]) => {
    addFacet(paramName, values.join('-'));
  };

  const selectedMinMaxValues = {
    [BlastFacet.SCORE]: {
      min: parameters.score.min,
      max: parameters.score.max,
    },
    [BlastFacet.IDENTITY]: {
      min: parameters.identity.min,
      max: parameters.identity.max,
    },
    [BlastFacet.EVALUE]: {
      min: parameters.evalue.min,
      max: parameters.evalue.max,
    },
  };

  Object.keys(selectedMinMaxValues).forEach((facet) => {
    const index = findFacet(facet);

    if (index > -1) {
      const [min, max] = selectedFacets[index].value.split('-');

      selectedMinMaxValues[facet as BlastFacet] = {
        min: Number(min),
        max: Number(max),
      };
    }
  });

  return (
    <div className={`blast-parameters-facet${isStale ? ' is-stale' : ''}`}>
      <ul className="no-bullet">
        <li>
          <span className="facet-name">Blast parameters</span>
          <ul className="expandable-list no-bullet">
            {Object.entries(parameters).map(
              ([blastFacet, { min, max, values }]) =>
                // If all values are the same then don't render the histogram
                min !== max && (
                  <li key={blastFacet}>
                    <span>{blastFacetToString[blastFacet as BlastFacet]}</span>
                    <HistogramFilter
                      height={50}
                      max={max}
                      min={min}
                      nBins={30}
                      onChange={(e: number[]) =>
                        onBlastParamChange(blastFacet, e)
                      }
                      selectedRange={[
                        selectedMinMaxValues[blastFacet as BlastFacet].min,
                        selectedMinMaxValues[blastFacet as BlastFacet].max,
                      ]}
                      values={values}
                    />
                  </li>
                )
            )}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default BlastResultsParametersFacets;
