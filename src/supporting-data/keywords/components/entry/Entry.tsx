import { RouteChildrenProps } from 'react-router-dom';
import { Loader, Card, InfoList } from 'franklin-sites';

import SingleColumnLayout from '../../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';

import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';

import apiUrls from '../../../../shared/config/apiUrls';

import { Namespace } from '../../../../shared/types/namespaces';
import { KeywordsAPIModel } from '../../adapters/keywordsConverter';
import KeywordsColumnConfiguration, {
  KeywordsColumn,
} from '../../config/KeywordsColumnConfiguration';

import helper from '../../../../shared/styles/helper.module.scss';

const columns = [
  KeywordsColumn.definition,
  KeywordsColumn.synonym,
  KeywordsColumn.category,
  KeywordsColumn.geneOntologies,
  KeywordsColumn.parents,
  KeywordsColumn.children,
  KeywordsColumn.sites,
];

const KeywordsEntry = (props: RouteChildrenProps<{ accession: string }>) => {
  const accession = props.match?.params.accession;

  const {
    data,
    loading,
    error,
    status,
    progress,
    isStale,
  } = useDataApiWithStale<KeywordsAPIModel>(
    apiUrls.entry(accession, Namespace.keywords)
  );

  if (error || !accession || (!loading && !data)) {
    return <ErrorHandler status={status} />;
  }

  if (!data) {
    return <Loader progress={progress} />;
  }

  const infoData =
    data &&
    columns.map((column) => {
      const renderer = KeywordsColumnConfiguration.get(column);
      return {
        title: renderer?.label,
        content: renderer?.render(data),
      };
    });

  return (
    <SingleColumnLayout>
      <h2>Keyword - {data.keyword.name}</h2>
      <Card className={isStale ? helper.stale : undefined}>
        {infoData && <InfoList infoData={infoData} isCompact />}
      </Card>
    </SingleColumnLayout>
  );
};

export default KeywordsEntry;
