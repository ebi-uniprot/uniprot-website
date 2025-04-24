import { CodeBlock, Loader } from 'franklin-sites';
import { FC } from 'react';

import ErrorHandler from '../../shared/components/error-pages/ErrorHandler';
import useDataApi from '../../shared/hooks/useDataApi';
import toolsURLs from '../config/urls';
import { JobTypes } from '../types/jobTypes';

const TextOutput: FC<
  React.PropsWithChildren<{ id: string; jobType: JobTypes }>
> = ({ id, jobType }) => {
  const { loading, data, error, status } = useDataApi<string>(
    toolsURLs(jobType).resultUrl(id, {
      format: jobType === JobTypes.ALIGN ? 'aln-clustal_num' : 'out',
    })
  );

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <ErrorHandler status={status} error={error} />;
  }

  return <CodeBlock>{data}</CodeBlock>;
};

export default TextOutput;
