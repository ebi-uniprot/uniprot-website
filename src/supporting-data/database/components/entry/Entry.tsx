import cn from 'classnames';
import { Card, InfoList, Loader } from 'franklin-sites';
import { useState } from 'react';
import { RouteChildrenProps } from 'react-router-dom';

import EntryDownloadButton from '../../../../shared/components/entry/EntryDownloadButton';
import EntryDownloadPanel from '../../../../shared/components/entry/EntryDownloadPanel';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import HTMLHead from '../../../../shared/components/HTMLHead';
import { SingleColumnLayout } from '../../../../shared/components/layouts/SingleColumnLayout';
import { MapToDropdown } from '../../../../shared/components/MapTo';
import RelatedResults from '../../../../shared/components/results/RelatedResults';
import apiUrls from '../../../../shared/config/apiUrls/apiUrls';
import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';
import helper from '../../../../shared/styles/helper.module.scss';
import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../../shared/types/namespaces';
import entryPageStyles from '../../../shared/styles/entry-page.module.scss';
import { DatabaseAPIModel } from '../../adapters/databaseConverter';
import DatabaseColumnConfiguration, {
  DatabaseColumn,
} from '../../config/DatabaseColumnConfiguration';

const columns = [
  DatabaseColumn.name,
  DatabaseColumn.servers,
  DatabaseColumn.dbUrl,
  DatabaseColumn.linkType,
  DatabaseColumn.category,
  DatabaseColumn.doiId,
  DatabaseColumn.pubmedId,
];

const DatabaseEntry = (props: RouteChildrenProps<{ accession: string }>) => {
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);

  const accession = props.match?.params.accession;

  const { data, loading, error, status, progress, isStale } =
    useDataApiWithStale<DatabaseAPIModel>(
      apiUrls.entry.entry(accession, Namespace.database)
    );

  if (error || !accession || (!loading && !data)) {
    return <ErrorHandler status={status} error={error} fullPage />;
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

  const handleToggleDownload = () =>
    setDisplayDownloadPanel(!displayDownloadPanel);

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
        {displayDownloadPanel && (
          <EntryDownloadPanel handleToggle={handleToggleDownload} />
        )}
        <div className="button-group">
          <EntryDownloadButton handleToggle={handleToggleDownload} />
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
