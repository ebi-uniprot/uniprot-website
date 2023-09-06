import { CodeBlock, InfoList, LongNumber } from 'franklin-sites';

import { FormParameters } from '../types/asyncDownloadFormParameters';

import styles from './styles/async-download-confirmation.module.scss';

type Props = {
  jobParameters: FormParameters;
  jobName: string;
};

const AsyncDownloadConfirmation = ({ jobParameters, jobName }: Props) => {
  const infoData = [
    {
      title: 'File generation job name',
      content: <CodeBlock lightMode>{jobName}</CodeBlock>,
    },
    {
      title: 'Data source',
      content: <CodeBlock lightMode>{jobParameters.namespace}</CodeBlock>,
    },
    {
      title: 'Query',
      content: <CodeBlock lightMode>{jobParameters.query}</CodeBlock>,
    },
    !!jobParameters.selectedFacets?.length && {
      title: 'Selected facets',
      content: (
        <CodeBlock lightMode>
          {JSON.stringify(jobParameters.selectedFacets)}
        </CodeBlock>
      ),
    },
    {
      title: 'Number of entries',
      content: (
        <CodeBlock lightMode>
          <LongNumber>2323232323</LongNumber>
        </CodeBlock>
      ),
    },
    {
      title: 'File format',
      content: <CodeBlock lightMode>{jobParameters.fileFormat}</CodeBlock>,
    },
  ].filter(Boolean);
  return <InfoList infoData={infoData} className={styles['info-data']} />;
};

export default AsyncDownloadConfirmation;
