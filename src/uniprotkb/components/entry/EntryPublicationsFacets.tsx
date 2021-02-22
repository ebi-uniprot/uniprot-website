import { FC } from 'react';
import { Facets, Loader } from 'franklin-sites';
import { useLocation } from 'react-router-dom';

import { getUniProtPublicationsQueryUrl } from '../../../shared/config/apiUrls';

import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';

import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';

import { getParamsFromURL } from '../../utils/resultsUtils';

import { FacetObject } from '../../types/responseTypes';

import './styles/entry-publications-facets.scss';

const EntryPublicationsFacets: FC<{ accession: string }> = ({ accession }) => {
  const { search } = useLocation();

  const { selectedFacets } = getParamsFromURL(search);
  const url = getUniProtPublicationsQueryUrl({
    accession,
    selectedFacets,
    size: 0,
  });

  const { loading, data, status, error, isStale } = useDataApiWithStale<{
    facets: FacetObject[];
  }>(url);

  if (error) {
    return <ErrorHandler status={status} />;
  }

  if (loading && !data) {
    return <Loader />;
  }

  if (error || !data?.facets) {
    return <ErrorHandler status={status} />;
  }

  return (
    <Facets data={data.facets} className={isStale ? 'is-stale' : undefined} />
  );
};

export default EntryPublicationsFacets;
