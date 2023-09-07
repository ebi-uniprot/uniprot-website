import { keyBy } from 'lodash-es';
import {
  Button,
  Card,
  CodeBlock,
  InfoList,
  Loader,
  LongNumber,
} from 'franklin-sites';
import { InfoListItem } from 'franklin-sites/dist/types/components/info-list';

import useNSQuery from '../../../shared/hooks/useNSQuery';
import useDataApiWithStale from '../../../shared/hooks/useDataApiWithStale';

import { FormParameters } from '../types/asyncDownloadFormParameters';
import { APIModel } from '../../../shared/types/apiModel';
import { FacetObject, SearchResults } from '../../../shared/types/results';
import { SelectedFacet } from '../../../uniprotkb/types/resultsTypes';

import styles from './styles/async-download-confirmation.module.scss';
import '../../styles/ToolsForm.scss';

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

type Props = {
  jobParameters: FormParameters;
  jobName: string;
  count: number;
  onCancel: () => void;
  onConfirm: () => void;
};

const AsyncDownloadConfirmation = ({
  jobParameters,
  jobName,
  count,
  onCancel,
  onConfirm,
}: Props) => {
  // Query for facets in order to create a nice, human readable display
  // of what the user has selected
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

  const infoData: (InfoListItem | false)[] = [
    {
      title: 'File generation job name',
      content: jobName,
    },
    {
      title: 'Data source',
      content: jobParameters.namespace,
    },
    !!jobParameters.query && {
      title: 'Query',
      content: jobParameters.query,
    },
    !!jobParameters.selectedFacets &&
      !!data?.facets && {
        title: 'Selected facets',
        content: getFacetString(data.facets, jobParameters.selectedFacets),
      },
    {
      title: 'Number of entries',
      content: <LongNumber>{count}</LongNumber>,
    },
    {
      title: 'File format',
      content: jobParameters.fileFormat,
    },
    !!jobParameters.columns?.length && {
      title: 'Columns',
      content: jobParameters.columns?.join(', ') || '',
    },
  ];
  return (
    <Card
      header={<h4>Review your file generation request</h4>}
      className={styles['confirm-async-download']}
    >
      <InfoList
        infoData={infoData
          .filter((d): d is InfoListItem => !!d)
          .map(({ title, content }) => ({
            title,
            content: <CodeBlock lightMode>{content}</CodeBlock>,
          }))}
        className={styles['info-list']}
      />
      <section className="tools-form-section tools-form-section--right button-group tools-form-section__buttons">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button className="button primary" type="submit" onClick={onConfirm}>
          Submit
        </Button>
      </section>
    </Card>
  );
};

export default AsyncDownloadConfirmation;
