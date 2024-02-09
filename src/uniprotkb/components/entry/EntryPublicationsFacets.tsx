import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';

import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';

import { getParamsFromURL } from '../../utils/resultsUtils';
import apiUrls from '../../config/apiUrls/apiUrls';

import ResultsFacets from '../../../shared/components/results/ResultsFacets';
import { FacetObject } from '../../../shared/types/results';

const EntryPublicationsFacets: FC<
  React.PropsWithChildren<{ accession: string }>
> = ({ accession }) => {
  const { search } = useLocation();

  const [{ selectedFacets }] = getParamsFromURL(search);
  const url = apiUrls.publications.entryPublications({
    accession,
    facets: ['types', 'categories', 'is_large_scale'],
    selectedFacets,
    size: 0,
  });

  const dataObject = useDataApiWithStale<{
    facets: FacetObject[];
  }>(url);

  const { status, error } = dataObject;

  if (error) {
    return <ErrorHandler status={status} />;
  }

  return <ResultsFacets dataApiObject={dataObject} />;
};

export default EntryPublicationsFacets;
