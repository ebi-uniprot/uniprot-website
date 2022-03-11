import { FC } from 'react';
import { Loader, CodeBlock, ExternalLink } from 'franklin-sites';

import ErrorHandler from '../../shared/components/error-pages/ErrorHandler';

import { UseDataAPIState } from '../../shared/hooks/useDataApi';

import toolsURLs from '../config/urls';

import { PublicServerParameters } from '../types/toolsServerParameters';
import { JobTypes } from '../types/toolsJobTypes';
import { FormParameters as PeptideSearchFormParameters } from '../peptide-search/types/peptideSearchFormParameters';

import styles from './styles/extra-tabs.module.css';

// exclude data that is just there as information and cannot be set
const exclude = new Map<JobTypes, string[]>([
  [JobTypes.ALIGN, ['program', 'version']],
  [JobTypes.ID_MAPPING, ['redirectURL']],
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
  [
    JobTypes.ID_MAPPING,
    `${API_PREFIX}/docs/?urls.primaryName=idmapping#/job/submitJob`,
  ],
  [
    JobTypes.PEPTIDE_SEARCH,
    'https://research.bioinformatics.udel.edu/peptidematchws/',
  ],
]);

function inputToCurl<T extends JobTypes>(
  jobType: T,
  input?:
    | Partial<PublicServerParameters[T]>
    | PeptideSearchFormParameters
    | null
) {
  const excluded = exclude.get(jobType) || [];
  const inputEntries = Object.entries(input || {}).filter(
    ([key, value]) => !excluded.includes(key) && value !== undefined
  );
  if (jobType === JobTypes.ALIGN || jobType === JobTypes.BLAST) {
    inputEntries.unshift(['email', '<enter_your_email_here>']);
  }
  if (jobType === JobTypes.PEPTIDE_SEARCH && !input) {
    inputEntries.push(['peps', '<enter_your_peptide_or_peptides_here>']);
  }
  let command = 'curl';

  let first = true;
  for (const [key, value] of inputEntries) {
    if (jobType === JobTypes.PEPTIDE_SEARCH) {
      // Peptide Search doesn't support form data, needs to be in URL encoded
      // append key/value to the URL string
      if (key === 'peps' && value === '<enter_your_peptide_or_peptides_here>') {
        command += `${first ? ' --data "' : '&'}${key}=${value}`;
      } else {
        command += `${first ? ' --data "' : '&'}${key}=${encodeURIComponent(
          value
        )}`;
      }
    } else {
      // Add indentation if needed, and key/value
      command += `${first ? '' : '    '} --form '${key}=${value}' \\\n`;
    }
    first = false;
  }

  if (jobType === JobTypes.PEPTIDE_SEARCH) {
    // Peptide Search doesn't support form data, needs to be in URL encoded
    command += '" \\\n     --verbose \\\n';
  }
  command += `     ${toolsURLs(jobType).runUrl}`;
  return command;
}

type APIRequestProps = {
  // No public endpoint to expose this for peptide search, so for now replace
  // with a "possible" job object in the case it's the same user that created it
  inputParamsData?:
    | Partial<UseDataAPIState<PublicServerParameters[JobTypes]>>
    | PeptideSearchFormParameters
    | null;
  jobType: JobTypes;
};

const APIRequest: FC<APIRequestProps> = ({ inputParamsData, jobType }) => {
  if (
    inputParamsData &&
    // This is for TS to typeguard, after that we're sure it's not a local job
    !('peps' in inputParamsData) &&
    // We now have a data payload for sure, check for errors normally
    (inputParamsData.error || !inputParamsData.data)
  ) {
    return <ErrorHandler status={inputParamsData.status} />;
  }

  const documentationURL = documentation.get(jobType);

  const data =
    inputParamsData &&
    ('peps' in inputParamsData ? inputParamsData : inputParamsData.data);

  return (
    <section className={styles.container}>
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
      {inputParamsData &&
      'loading' in inputParamsData &&
      inputParamsData.loading ? (
        <Loader />
      ) : (
        <CodeBlock lightMode>{inputToCurl(jobType, data)}</CodeBlock>
      )}
      {jobType === JobTypes.PEPTIDE_SEARCH && (
        <p>
          <small>
            The URL with your job result will be listed in the{' '}
            <code>Location</code> response header
          </small>
        </p>
      )}
      {data && 'sequence' in data && data.sequence.includes("'") && (
        <p>
          <small>
            You might need to escape the sequence as it contains special
            characters
          </small>
        </p>
      )}
      {documentationURL && (
        <p>
          You can refer to the documentation for these values on the{' '}
          <ExternalLink url={documentationURL}>
            API documentation page
          </ExternalLink>
        </p>
      )}
    </section>
  );
};

export default APIRequest;
