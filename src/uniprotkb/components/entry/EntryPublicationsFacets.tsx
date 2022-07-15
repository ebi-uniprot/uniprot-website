import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { getUniProtPublicationsQueryUrl } from '../../../shared/config/apiUrls';

import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';

import ResultsFacets from '../../../shared/components/results/ResultsFacets';

import { getParamsFromURL } from '../../utils/resultsUtils';

import { FacetObject } from '../../../shared/types/results';

const EntryPublicationsFacets: FC<{ accession: string }> = ({ accession }) => {
  const { search } = useLocation();

  const [{ selectedFacets }] = getParamsFromURL(search);
  const url = getUniProtPublicationsQueryUrl({
    accession,
    facets: ['types', 'categories', 'is_large_scale'],
    selectedFacets,
    size: 0,
  });

  const dataObject = useDataApiWithStale<{
    facets: FacetObject[];
  }>(url);

  return <ResultsFacets dataApiObject={dataObject} />;
};

export default EntryPublicationsFacets;
