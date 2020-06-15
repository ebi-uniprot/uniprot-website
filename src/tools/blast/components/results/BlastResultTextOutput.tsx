import React, { FC } from 'react';
import { Loader } from 'franklin-sites';

import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';

import useDataApi from '../../../../shared/hooks/useDataApi';

import blastUrls from '../../config/blastUrls';

import './styles/blast-result.scss';

const BlastResultTextOutput: FC<{ id: string }> = ({ id }) => {
  const { loading, data, error, status } = useDataApi<string>(
    blastUrls.resultUrl(id, 'out')
  );

  if (loading) return <Loader />;

  if (error || !data) return <ErrorHandler status={status} />;

  return (
    <pre className="code-block">
      <code>{data}</code>
    </pre>
  );
};

export default BlastResultTextOutput;
