import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { HistogramFilter } from 'franklin-sites';
import {
  getLocationObjForParams,
  getParamsFromURL,
} from '../../../../uniprotkb/utils/resultsUtils';

export type BlastParamFacet = {
  score: number[];
  identity: number[];
  evalue: number[];
};

type Props = { params: BlastParamFacet; binSize: number };

const BlastResultsParametersFacets: FC<Props> = ({ params, binSize }) => {
  const { score, identity, evalue } = params;

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

  const scoreFacetIndex = findFacet('score');
  let scoreFacetValue;
  let selectedScoreMin;
  let selectedScoreMax;

  if (scoreFacetIndex > -1) {
    [selectedScoreMin, selectedScoreMax] = selectedFacets[
      scoreFacetIndex
    ].value.split('-');
  }

  const identityFacetIndex = findFacet('identity');
  let scoreIdentityValue;
  let selectedIdentityMin;
  let selectedIdentityMax;

  if (identityFacetIndex > -1) {
    [selectedIdentityMin, selectedIdentityMax] = selectedFacets[
      identityFacetIndex
    ].value.split('-');
  }

  return (
    <div className="blast-parameters-facet">
      <ul className="no-bullet">
        <li>
          <span className="facet-name">Blast parameters</span>
          <ul className="expandable-list no-bullet">
            <li>
              <span className="">Score</span>
              <HistogramFilter
                height={50}
                max={score.max}
                min={score.min}
                nBins={30}
                onChange={(e: number[]) => onBlastParamChange('score', e)}
                selectedRange={[
                  selectedScoreMin || score.min,
                  selectedScoreMax || score.max,
                ]}
                values={score.values}
              />
            </li>
            <li>
              <span className="">Identity</span>
              <HistogramFilter
                height={50}
                max={identity.max}
                min={identity.min}
                nBins={30}
                onChange={(e: number[]) => onBlastParamChange('identity', e)}
                selectedRange={[
                  selectedIdentityMin || identity.min,
                  selectedIdentityMax || identity.max,
                ]}
                values={identity.values}
              />
            </li>
            <li>
              <span className="">E-value</span>
              <HistogramFilter
                height={50}
                max={evalue.max}
                min={evalue.min}
                nBins={30}
                onChange={(e: number[]) => onBlastParamChange('evalue', e)}
                selectedRange={[evalue.min, evalue.max]}
                values={evalue.values}
              />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default BlastResultsParametersFacets;
