import { RouteChildrenProps } from 'react-router-dom';
import { Loader, Card, InfoList } from 'franklin-sites';
import cn from 'classnames';

import HTMLHead from '../../../../shared/components/HTMLHead';
import { SingleColumnLayout } from '../../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import EntryDownloadOld from '../../../../shared/components/entry/EntryDownloadOld';
import { MapToDropdown } from '../../../../shared/components/MapTo';
import RelatedResults from '../../../../shared/components/results/RelatedResults';

import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';

import apiUrls from '../../../../shared/config/apiUrls';

import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../../shared/types/namespaces';
import { DatabaseAPIModel } from '../../adapters/databaseConverter';
import DatabaseColumnConfiguration, {
  DatabaseColumn,
} from '../../config/DatabaseColumnConfiguration';

import helper from '../../../../shared/styles/helper.module.scss';
import entryPageStyles from '../../../shared/styles/entry-page.module.scss';

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

  const { data, loading, error, status, progress, isStale } =
    useDataApiWithStale<DatabaseAPIModel>(
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

  const hasRelated = Boolean(
    data.statistics?.reviewedProteinCount ||
      data.statistics?.unreviewedProteinCount
  );

  const relatedQuery = `(database:${data.abbrev})`;

  return (
    <SingleColumnLayout>
      <HTMLHead
        title={[data.abbrev, searchableNamespaceLabels[Namespace.database]]}
      >
        <meta name="description" content={data.name} />
      </HTMLHead>
      {/* Here we don't want to use the full label atm */}
      <h1>Database - {data.abbrev}</h1>
      <Card className={cn(entryPageStyles.card, { [helper.stale]: isStale })}>
        <div className="button-group">
          <EntryDownloadOld />
          {/** Pass the name to be used for the query, it's the only supporting
           *  data using the abbrev field instead of the ID field for the query
           * */}
          <MapToDropdown statistics={data.statistics} accession={data.abbrev} />
        </div>
        <InfoList infoData={infoData} />
      </Card>
      {hasRelated && <RelatedResults relatedQuery={relatedQuery} />}
    </SingleColumnLayout>
  );
};

export default DatabaseEntry;
