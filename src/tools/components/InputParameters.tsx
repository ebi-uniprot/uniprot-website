import { FC } from 'react';
import { Loader, CodeBlock, InfoList } from 'franklin-sites';

import ErrorHandler from '../../shared/components/error-pages/ErrorHandler';
import { ResubmitButton } from './ResultButtons';

import { UseDataAPIState } from '../../shared/hooks/useDataApi';

import { PublicServerParameters } from '../types/toolsServerParameters';
import { JobTypes } from '../types/toolsJobTypes';

type InputParametersProps = {
  id: string;
  inputParamsData: Partial<UseDataAPIState<PublicServerParameters[JobTypes]>>;
  jobType: JobTypes;
};

const InputParameters: FC<InputParametersProps> = ({
  id,
  inputParamsData,
  jobType,
}) => {
  const { loading, data, error, status } = inputParamsData;

  if (error || !data) {
    return <ErrorHandler status={status} />;
  }

  return (
    <>
      <ResubmitButton
        inputParamsData={inputParamsData.data}
        jobType={jobType}
      />
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
              content: <CodeBlock lightMode>{`${value}`}</CodeBlock>,
            }))}
          />
        )}
      </section>
    </>
  );
};

export default InputParameters;
