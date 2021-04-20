import { RouteChildrenProps } from 'react-router-dom';
import { Loader, Card, InfoList } from 'franklin-sites';

import SingleColumnLayout from '../../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';

import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';

import apiUrls from '../../../../shared/config/apiUrls';

import { Namespace } from '../../../../shared/types/namespaces';
import { DatabaseAPIModel } from '../../adapters/databaseConverter';
import DatabaseColumnConfiguration, {
  DatabaseColumn,
} from '../../config/DatabaseColumnConfiguration';

import helper from '../../../../shared/styles/helper.module.scss';

const columns = [
  DatabaseColumn.name,
  DatabaseColumn.server,
  DatabaseColumn.dbUrl,
  DatabaseColumn.linkType,
  DatabaseColumn.category,
  DatabaseColumn.doiId,
  DatabaseColumn.pubmedId,
];

const DatabaseEntry = (props: RouteChildrenProps<{ accession: string }>) => {
  const accession = props.match?.params.accession;

  const {
    data,
    loading,
    error,
    status,
    progress,
    isStale,
  } = useDataApiWithStale<DatabaseAPIModel>(
    apiUrls.entry(accession, Namespace.database)
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
      const renderer = DatabaseColumnConfiguration.get(column);
      return {
        title: renderer?.label,
        content: renderer?.render(data),
      };
    });

  return (
    <SingleColumnLayout>
      <h2>Database - {data.abbrev}</h2>
      <Card className={isStale ? helper.stale : undefined}>
        {infoData && <InfoList infoData={infoData} isCompact />}
      </Card>
    </SingleColumnLayout>
  );
};

export default DatabaseEntry;
