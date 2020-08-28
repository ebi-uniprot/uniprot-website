import React, { FC } from 'react';
import { Loader, CodeBlock } from 'franklin-sites';

import ErrorHandler from '../../shared/components/error-pages/ErrorHandler';

import { UseDataAPIState } from '../../shared/hooks/useDataApi';

import toolsURLs from '../config/urls';

import { PublicServerParameters } from '../types/toolsServerParameters';
import { JobTypes } from '../types/toolsJobTypes';

// black list data that is just there as information and cannot be set
const blacklist = new Map<JobTypes, string[]>([
  [JobTypes.ALIGN, ['program', 'version']],
]);

const documentation = new Map<JobTypes, string>([
  [
    JobTypes.ALIGN,
    'https://www.ebi.ac.uk/seqdb/confluence/display/JDSAT/Clustal+Omega+Help+and+Documentation#ClustalOmegaHelpandDocumentation-RESTAPI',
  ],
  [
    JobTypes.BLAST,
    'https://www.ebi.ac.uk/seqdb/confluence/pages/viewpage.action?pageId=94147939#NCBIBLAST+HelpandDocumentation-RESTAPI',
  ],
]);

function inputToCurl<T extends JobTypes>(
  input: Partial<PublicServerParameters[T]>,
  jobType: T
) {
  const bl = blacklist.get(jobType) || [];
  let command = "curl -F 'email=<enter your email here>' \\\n";
  for (const [key, value] of Object.entries(input)) {
    if (!bl.includes(key)) {
      command += `     -F '${key}=${value}' \\\n`;
    }
  }
  command += `     ${toolsURLs(jobType).runUrl}`;
  return command;
}

type Props = {
  inputParamsData: Partial<UseDataAPIState<PublicServerParameters[JobTypes]>>;
  jobType: JobTypes;
};

const APIRequest: FC<Props> = ({ inputParamsData, jobType }) => {
  const { loading, data, error, status } = inputParamsData;

  if (error || !data) return <ErrorHandler status={status} />;

  return (
    <section>
      <p>
        Using{' '}
        <a
          href="https://curl.haxx.se/"
          target="_blank"
          rel="noreferrer noopener"
        >
          curl
        </a>
        , you could run a new job on the command line with the same input as
        this job by running:
      </p>
      {loading ? (
        <Loader />
      ) : (
        <CodeBlock lightMode>{inputToCurl(data, jobType)}</CodeBlock>
      )}
      {data.sequence.includes("'") && (
        <p>
          <small>
            You might need to escape the sequence as it contains special
            characters
          </small>
        </p>
      )}
      <p>
        You can refer to the documentation for these values on the{' '}
        <a
          target="_blank"
          rel="noreferrer noopener"
          href={documentation.get(jobType)}
        >
          API documentation page
        </a>
      </p>
    </section>
  );
};

export default APIRequest;
