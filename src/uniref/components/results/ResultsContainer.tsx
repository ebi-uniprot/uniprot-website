import React from 'react';
import { useLocation } from 'react-router-dom';

import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import { getAPIQueryUrl } from '../../config/apiUrls';
import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';
import Response from '../../types/responseTypes';
import { getParamsFromURL } from '../../utils/resultsUtils';

export const Results = () => {
  const { search: queryParamFromUrl } = useLocation();
  const { query } = getParamsFromURL(queryParamFromUrl);

  const initialApiUrl = getAPIQueryUrl(query);

  const {
    data,
    error,
    loading,
    headers,
    status,
    isStale,
  } = useDataApiWithStale<Response['data']>(initialApiUrl);

  if (error || !(loading || data)) {
    return <ErrorHandler status={status} />;
  }

  return <h2>uniref results</h2>;
};

export default Results;
