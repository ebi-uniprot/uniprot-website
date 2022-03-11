import { Loader, CodeBlock, InfoList } from 'franklin-sites';

import ErrorHandler from '../../shared/components/error-pages/ErrorHandler';
import { ResubmitButton } from './ResultButtons';

import { UseDataAPIState } from '../../shared/hooks/useDataApi';

import { PublicServerParameters } from '../types/toolsServerParameters';
import { JobTypes } from '../types/toolsJobTypes';
import { FinishedJob } from '../types/toolsJob';

type InputParametersProps = {
  id: string;
  // No public endpoint to expose this for peptide search, so for now replace
  // with a "possible" job object in the case it's the same user that created it
  inputParamsData:
    | Partial<UseDataAPIState<PublicServerParameters[JobTypes]>>
    | FinishedJob<JobTypes.PEPTIDE_SEARCH>
    | null;
  jobType: JobTypes;
};

const fieldsToHide = new Set(['redirectURL']);

const InputParameters = ({
  id,
  inputParamsData,
  jobType,
}: InputParametersProps) => {
  if (
    inputParamsData &&
    // This is for TS to typeguard, after that we're sure it's not a local job
    !('type' in inputParamsData) &&
    // We now have a data payload for sure, check for errors normally
    (inputParamsData.error || !inputParamsData.data)
  ) {
    return <ErrorHandler status={inputParamsData.status} />;
  }

  if (!inputParamsData) {
    if (jobType === JobTypes.PEPTIDE_SEARCH) {
      return (
        <section>
          <p>
            Unable to retrieve the input values for the job with ID{' '}
            <code>{id}</code>.<br />
            It looks like this job hasn&apos;t been submitted from this browser.
            Please ask the person that submitted this job for this information.
          </p>
        </section>
      );
    }
    return <ErrorHandler />;
  }

  const inputParameters =
    'parameters' in inputParamsData
      ? inputParamsData.parameters
      : inputParamsData.data;

  return (
    <>
      {inputParameters && (
        <ResubmitButton inputParamsData={inputParameters} jobType={jobType} />
      )}
      <section>
        <p>
          The job with ID <code>{id}</code> has been submitted with these raw
          input values:
        </p>
        {'loading' in inputParamsData && inputParamsData.loading ? (
          <Loader />
        ) : (
          <InfoList
            infoData={Object.entries(inputParameters || {})
              .filter(([key, value]) => !fieldsToHide.has(key) && value)
              .map(([key, value]) => ({
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
