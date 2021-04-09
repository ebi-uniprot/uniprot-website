import { RouteChildrenProps } from 'react-router-dom';
import { Loader, Card } from 'franklin-sites';

import SingleColumnLayout from '../../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import RenderColumnsInCard from '../../../../shared/components/results/RenderColumnsInCard';

import useDataApi from '../../../../shared/hooks/useDataApi';

import apiUrls from '../../../../shared/config/apiUrls';

import { Namespace } from '../../../../shared/types/namespaces';
import { KeywordsAPIModel } from '../../adapters/keywordsConverter';
import KeywordsColumnConfiguration, {
  KeywordsColumn,
} from '../../config/KeywordsColumnConfiguration';

const KeywordsEntry = (props: RouteChildrenProps<{ accession: string }>) => {
  const accession = props.match?.params.accession;

  const {
    data,
    loading,
    error,
    status,
    progress,
  } = useDataApi<KeywordsAPIModel>(
    apiUrls.entry(accession, Namespace.keywords)
  );

  if (error || !accession) {
    return <ErrorHandler status={status} />;
  }

  if (loading || !data) {
    return <Loader progress={progress} />;
  }

  return (
    <SingleColumnLayout>
      <h2>Keyword - {data.keyword.name}</h2>
      <Card>
        <RenderColumnsInCard
          renderers={KeywordsColumnConfiguration.get(
            KeywordsColumn.description
          )}
          data={data}
        />
        <RenderColumnsInCard
          renderers={KeywordsColumnConfiguration.get(KeywordsColumn.synonym)}
          data={data}
        />
        <RenderColumnsInCard
          renderers={KeywordsColumnConfiguration.get(KeywordsColumn.category)}
          data={data}
        />
        <RenderColumnsInCard
          renderers={KeywordsColumnConfiguration.get(
            KeywordsColumn.geneOntology
          )}
          data={data}
        />
      </Card>
    </SingleColumnLayout>
  );
};

export default KeywordsEntry;
