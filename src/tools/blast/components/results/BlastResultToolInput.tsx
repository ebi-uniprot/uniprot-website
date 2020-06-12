import React, { FC } from 'react';
import { Loader } from 'franklin-sites';

import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';

import useDataApi from '../../../../shared/hooks/useDataApi';

import blastUrls from '../../config/blastUrls';

const BlastResultToolInput: FC<{ id: string }> = ({ id }) => {
  const { loading, data, error, status } = useDataApi<string>(
    blastUrls.resultUrl(id, 'parameters')
  );

  if (loading) return <Loader />;

  if (error || !data) return <ErrorHandler status={status} />;

  // TODO: replace with a franklin component
  return (
    <pre
      style={{
        background: 'black',
        color: 'white',
        padding: '1ch',
        display: 'inline-block',
      }}
    >
      <code>{data}</code>
    </pre>
  );
};

export default BlastResultToolInput;
