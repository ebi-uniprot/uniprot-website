import {
  Button,
  Card,
  CodeBlock,
  InfoList,
  Loader,
  LongNumber,
} from 'franklin-sites';
import { keyBy } from 'lodash-es';

import useNSQuery from '../../../shared/hooks/useNSQuery';
import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';

import { FormParameters } from '../types/asyncDownloadFormParameters';
import { APIModel } from '../../../shared/types/apiModel';
import { FacetObject, SearchResults } from '../../../shared/types/results';
import { SelectedFacet } from '../../../uniprotkb/types/resultsTypes';

import styles from './styles/async-download-confirmation.module.scss';
import '../../styles/ToolsForm.scss';

type Props = {
  jobParameters: FormParameters;
  jobName: string;
  count: number;
};

export const getFacetString = (
  facetData: FacetObject<string>[],
  selectedFacets: SelectedFacet[]
) => {
  const nameToFacet = keyBy(facetData, 'name');
  return selectedFacets
    .map((selectedFacet) => {
      const facet = nameToFacet[selectedFacet.name];
      return `${facet.label}: ${
        facet.values?.find(({ value }) => value === selectedFacet.value)
          ?.label || selectedFacet.value
      }`;
    })
    .join(', ');
};

const AsyncDownloadConfirmation = ({
  jobParameters,
  jobName,
  count,
}: Props) => {
  // Query for facets
  const initialApiFacetUrl = useNSQuery(
    jobParameters.selectedFacets?.length
      ? {
          size: 0,
          withFacets: true,
          withColumns: false,
        }
      : undefined
  );
  const { loading, data } =
    useDataApiWithStale<SearchResults<APIModel>>(initialApiFacetUrl);

  if (loading) {
    return <Loader />;
  }

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
    jobParameters.selectedFacets &&
      data?.facets && {
        title: 'Selected facets',
        content: (
          <CodeBlock lightMode>
            {getFacetString(data.facets, jobParameters.selectedFacets)}
          </CodeBlock>
        ),
      },
    {
      title: 'Number of entries',
      content: (
        <CodeBlock lightMode>
          <LongNumber>{count}</LongNumber>
        </CodeBlock>
      ),
    },
    {
      title: 'File format',
      content: <CodeBlock lightMode>{jobParameters.fileFormat}</CodeBlock>,
    },
  ].filter(Boolean);
  return (
    <Card
      header={<h4>Review your file generation request</h4>}
      className={styles['confirm-async-download']}
    >
      <InfoList infoData={infoData} className={styles['info-list']} />
      <section className="tools-form-section tools-form-section--right button-group tools-form-section__buttons">
        <Button variant="secondary" onClick={() => console.log('cancel')}>
          Cancel
        </Button>
        <Button
          className="button primary"
          type="submit"
          onClick={() => {
            console.log('submit');
          }}
        >
          Submit
        </Button>
      </section>
    </Card>
  );
};

export default AsyncDownloadConfirmation;
