import { FC } from 'react';
import { useLocation } from 'react-router';

import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import ResultsFacets from '../../../shared/components/results/ResultsFacets';
import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';
import { FacetObject } from '../../../shared/types/results';
import apiUrls from '../../config/apiUrls/apiUrls';
import { getParamsFromURL } from '../../utils/resultsUtils';

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
    return <ErrorHandler status={status} error={error} noReload />;
  }

  return <ResultsFacets dataApiObject={dataObject} />;
};

export default EntryPublicationsFacets;
