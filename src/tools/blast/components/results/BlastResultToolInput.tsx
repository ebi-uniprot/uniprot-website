import React, { FC } from 'react';
import { Loader } from 'franklin-sites';

import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';

import useDataApi from '../../../../shared/hooks/useDataApi';

import blastUrls from '../../config/blastUrls';

import './styles/blast-result.scss';

const BlastResultToolInput: FC<{ id: string }> = ({ id }) => {
  const { loading, data, error, status } = useDataApi<string>(
    blastUrls.resultUrl(id, 'parameters')
  );

  if (loading) return <Loader />;

  if (error || !data) return <ErrorHandler status={status} />;

  return (
    <pre className="code-block">
      <code>{data}</code>
    </pre>
  );
};

export default BlastResultToolInput;
