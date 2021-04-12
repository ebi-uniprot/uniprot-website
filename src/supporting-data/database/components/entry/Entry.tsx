import { RouteChildrenProps } from 'react-router-dom';
import { Loader, Card } from 'franklin-sites';

import SingleColumnLayout from '../../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import RenderColumnsInCard from '../../../../shared/components/results/RenderColumnsInCard';

import useDataApi from '../../../../shared/hooks/useDataApi';

import apiUrls from '../../../../shared/config/apiUrls';

import { Namespace } from '../../../../shared/types/namespaces';
import { DatabaseAPIModel } from '../../adapters/databaseConverter';
import DatabaseColumnConfiguration, {
  DatabaseColumn,
} from '../../config/DatabaseColumnConfiguration';

const DatabaseEntry = (props: RouteChildrenProps<{ accession: string }>) => {
  const accession = props.match?.params.accession;

  const {
    data,
    loading,
    error,
    status,
    progress,
  } = useDataApi<DatabaseAPIModel>(
    apiUrls.entry(accession, Namespace.database)
  );

  if (error || !accession) {
    return <ErrorHandler status={status} />;
  }

  if (loading || !data) {
    return <Loader progress={progress} />;
  }

  return (
    <SingleColumnLayout>
      <h2>Database - {data.abbrev}</h2>
      <Card>
        <RenderColumnsInCard
          renderers={DatabaseColumnConfiguration.get(DatabaseColumn.name)}
          data={data}
        />
        <RenderColumnsInCard
          renderers={DatabaseColumnConfiguration.get(DatabaseColumn.server)}
          data={data}
        />
        <RenderColumnsInCard
          renderers={DatabaseColumnConfiguration.get(DatabaseColumn.dbUrl)}
          data={data}
        />
        <RenderColumnsInCard
          renderers={DatabaseColumnConfiguration.get(DatabaseColumn.linkType)}
          data={data}
        />
        <RenderColumnsInCard
          renderers={DatabaseColumnConfiguration.get(DatabaseColumn.category)}
          data={data}
        />
      </Card>
    </SingleColumnLayout>
  );
};

export default DatabaseEntry;
