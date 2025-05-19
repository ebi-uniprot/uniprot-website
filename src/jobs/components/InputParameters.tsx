import { CodeBlock, InfoList, Loader } from 'franklin-sites';

import ErrorHandler from '../../shared/components/error-pages/ErrorHandler';
import { UseDataAPIState } from '../../shared/hooks/useDataApi';
import { FormParameters as PeptideSearchFormParameters } from '../peptide-search/types/peptideSearchFormParameters';
import { SelectedTaxon } from '../types/jobsFormData';
import { PublicServerParameters } from '../types/jobsServerParameters';
import { JobTypes } from '../types/jobTypes';
import { ResubmitButton } from './ResultButtons';
import styles from './styles/extra-tabs.module.css';

type InputParametersProps = {
  id: string;
  // No public endpoint to expose this for peptide search, so for now replace
  // with a "possible" job object in the case it's the same user that created it
  inputParamsData?:
    | Partial<UseDataAPIState<PublicServerParameters[JobTypes]>>
    | PeptideSearchFormParameters
    | null;
  jobType: JobTypes;
};

const fieldsToHide = new Set(['redirectURL', 'taxidlist']);

const InputParameters = ({
  id,
  inputParamsData,
  jobType,
}: InputParametersProps) => {
  if (
    inputParamsData &&
    // This is for TS to typeguard, after that we're sure it's not a local job
    !('peps' in inputParamsData) &&
    // We now have a data payload for sure, check for errors normally
    (inputParamsData.error || !inputParamsData.data)
  ) {
    return (
      <ErrorHandler
        status={inputParamsData.status}
        error={inputParamsData.error}
      />
    );
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
    'peps' in inputParamsData ? inputParamsData : inputParamsData.data;

  return (
    <>
      {inputParameters && (
        <ResubmitButton inputParamsData={inputParameters} jobType={jobType} />
      )}
      <section className={styles.container}>
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
              .map(([key, value]) => {
                if (key === 'taxIds' && Array.isArray(value)) {
                  return {
                    title: key,
                    content: (
                      <CodeBlock lightMode>
                        {(value as SelectedTaxon[])
                          .map((taxon) => taxon.id)
                          .join(',')}
                      </CodeBlock>
                    ),
                  };
                }
                return {
                  title: key,
                  content: <CodeBlock lightMode>{`${value}`}</CodeBlock>,
                };
              })}
          />
        )}
      </section>
    </>
  );
};

export default InputParameters;
