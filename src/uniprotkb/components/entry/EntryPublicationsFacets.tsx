import React, { FC } from 'react';
import { Facets, Loader } from 'franklin-sites';
import { useLocation } from 'react-router-dom';

import { getUniProtPublicationsQueryUrl } from '../../config/apiUrls';

import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';

import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';

import { getParamsFromURL } from '../../utils/resultsUtils';

import { Facet } from '../../types/responseTypes';

import './styles/entry-publications-facets.scss';

const EntryPublicationsFacets: FC<{ accession: string }> = ({ accession }) => {
  const { search } = useLocation();

  const { selectedFacets } = getParamsFromURL(search);
  const url = getUniProtPublicationsQueryUrl({
    accession,
    selectedFacets,
    size: 1, // TODO: change to 0 whenever the API accepts it
  });

  const { loading, data, status, error, isStale } = useDataApiWithStale<{
    facets: Facet[];
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
    <div className={isStale ? 'is-stale' : undefined}>
      <Facets data={data.facets} />
    </div>
  );
};

export default EntryPublicationsFacets;
