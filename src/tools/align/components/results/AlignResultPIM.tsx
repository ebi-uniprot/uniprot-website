import React, { FC } from 'react';
import { Loader } from 'franklin-sites';

import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';

import useDataApi from '../../../../shared/hooks/useDataApi';

import toolsURLs from '../../../config/urls';

import { JobTypes } from '../../../types/toolsJobTypes';

const alignURLs = toolsURLs(JobTypes.ALIGN);

const AlignResultPIM: FC<{ id: string }> = ({ id }) => {
  const { loading, data, error, status } = useDataApi<string>(
    alignURLs.resultUrl(id, 'pim')
  );

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <ErrorHandler status={status} />;
  }

  return <p>{data}</p>;
};

export default AlignResultPIM;
