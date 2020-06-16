import React, { FC } from 'react';
import { Loader, CodeBlock } from 'franklin-sites';

import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';

import useDataApi from '../../../../shared/hooks/useDataApi';

import blastUrls from '../../config/blastUrls';

const BlastResultToolInput: FC<{ id: string }> = ({ id }) => {
  const { loading, data, error, status } = useDataApi<string>(
    blastUrls.resultUrl(id, 'parameters')
  );

  if (loading) return <Loader />;

  if (error || !data) return <ErrorHandler status={status} />;

  return <CodeBlock>{data}</CodeBlock>;
};

export default BlastResultToolInput;
