import React, { FC } from 'react';
import { Facets } from 'franklin-sites';
import { useHistory } from 'react-router-dom';

import {
  getLocationObjForParams,
  getParamsFromURL,
} from '../../utils/resultsUtils';

import { SelectedFacet } from '../../types/resultsTypes';
import { Facet } from '../../types/responseTypes';

const ResultsFacets: FC<{ facets: Facet[] }> = ({ facets }) => {
  const {
    push,
    location: { search: queryParamFromUrl, pathname },
  } = useHistory();
  const { query, selectedFacets, sortColumn, sortDirection } = getParamsFromURL(
    queryParamFromUrl
  );

  const addFacet = (facetName: string, facetValue: string): void => {
    const facet: SelectedFacet = { name: facetName, value: facetValue };

    push(
      getLocationObjForParams(
        pathname,
        query,
        [...selectedFacets.concat(facet)],
        sortColumn,
        sortDirection
      )
    );
  };

  const removeFacet = (facetName: string, facetValue: string): void => {
    const index = selectedFacets.findIndex(
      (selectedFacet) =>
        selectedFacet.name === facetName && selectedFacet.value === facetValue
    );

    selectedFacets.splice(index, 1);
    push(
      getLocationObjForParams(
        pathname,
        query,
        selectedFacets,
        sortColumn,
        sortDirection
      )
    );
  };

  return (
    <Facets
      data={facets}
      selectedFacets={selectedFacets}
      addFacet={(name: string, value: string) => addFacet(name, value)}
      removeFacet={(name: string, value: string) => removeFacet(name, value)}
    />
  );
};

export default ResultsFacets;
