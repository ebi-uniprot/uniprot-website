import cn from 'classnames';
import { CodeBlock, Loader } from 'franklin-sites';
import { FC } from 'react';

import ErrorHandler from '../../shared/components/error-pages/ErrorHandler';
import ExternalLink from '../../shared/components/ExternalLink';
import { UseDataAPIState } from '../../shared/hooks/useDataApi';
import toolsURLs from '../config/urls';
import { FormParameters as PeptideSearchFormParameters } from '../peptide-search/types/peptideSearchFormParameters';
import { SelectedTaxon } from '../types/jobsFormData';
import { PublicServerParameters } from '../types/jobsServerParameters';
import { JobTypes } from '../types/jobTypes';
import styles from './styles/extra-tabs.module.css';

// exclude data that is just there as information and cannot be set
const exclude = new Map<JobTypes, string[]>([
  [JobTypes.ALIGN, ['program', 'version']],
  [JobTypes.ID_MAPPING, ['redirectURL', 'warnings']],
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
  [JobTypes.PEPTIDE_SEARCH, 'https://peptidesearch.uniprot.org/asyncrest/'],
  [
    JobTypes.ASYNC_DOWNLOAD,
    `${API_PREFIX}/docs/?urls.primaryName=asyncdownload#/job/submitJob`, // TODO: determine final URL
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
  const possibleQuotes = jobType === JobTypes.ID_MAPPING ? '"' : '';
  let command = 'curl';

  let first = true;
  for (const [key, value] of inputEntries) {
    if (jobType === JobTypes.PEPTIDE_SEARCH) {
      // Peptide Search doesn't support form data, needs to be in URL encoded
      // append key/value to the URL string
      if (key === 'peps' && value === '<enter_your_peptide_or_peptides_here>') {
        command += `${first ? ' --data "' : '&'}${key}=${value}`;
      } else if (key === 'taxIds' && Array.isArray(value)) {
        command += `${first ? ' --data "' : '&'}${key}=${(
          value as SelectedTaxon[]
        )
          .map((taxon) => taxon.id)
          .join(',')}`;
      } else {
        command += `${first ? ' --data "' : '&'}${key}=${encodeURIComponent(
          value
        )}`;
      }
    } else {
      // Add indentation if needed, and key/value
      command += `${
        first ? '' : '    '
      } --form '${key}=${possibleQuotes}${value}${possibleQuotes}' \\\n`;
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

const APIRequest: FC<React.PropsWithChildren<APIRequestProps>> = ({
  inputParamsData,
  jobType,
}) => {
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

  const documentationURL = documentation.get(jobType);

  const data =
    inputParamsData &&
    ('peps' in inputParamsData ? inputParamsData : inputParamsData.data);

  return (
    <section className={cn(styles.container, styles['api-request'])}>
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
          Refer to the{' '}
          <ExternalLink url={documentationURL}>API documentation</ExternalLink>{' '}
          for information about parameters and instructions to retrieve the
          results.
        </p>
      )}
    </section>
  );
};

export default APIRequest;
