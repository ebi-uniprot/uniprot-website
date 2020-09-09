import React, { FC } from 'react';
import { Loader, CodeBlock, InfoList } from 'franklin-sites';

import ErrorHandler from '../../shared/components/error-pages/ErrorHandler';

import { UseDataAPIState } from '../../shared/hooks/useDataApi';

import { PublicServerParameters } from '../types/toolsServerParameters';
import { JobTypes } from '../types/toolsJobTypes';

type Props = {
  id: string;
  inputParamsData: Partial<UseDataAPIState<PublicServerParameters[JobTypes]>>;
};

const InputParameters: FC<Props> = ({ id, inputParamsData }) => {
  const { loading, data, error, status } = inputParamsData;

  if (error || !data) return <ErrorHandler status={status} />;

  return (
    <section>
      <p>
        The job with UUID <code>{id}</code> has been submitted with these raw
        input values:
      </p>
      {loading ? (
        <Loader />
      ) : (
        <InfoList
          infoData={Object.entries(data).map(([key, value]) => ({
            title: key,
            content: <CodeBlock lightMode>{value}</CodeBlock>,
          }))}
        />
      )}
    </section>
  );
};

export default InputParameters;
