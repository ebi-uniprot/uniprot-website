import cn from 'classnames';
import { Card, InfoList, Loader } from 'franklin-sites';
import { useState } from 'react';
import { Navigate, useParams } from 'react-router';

import { getEntryPath } from '../../../../app/config/urls';
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
import { LocationsAPIModel } from '../../adapters/locationsConverter';
import LocationsColumnConfiguration, {
  LocationsColumn,
} from '../../config/LocationsColumnConfiguration';

const columns = [
  LocationsColumn.definition,
  LocationsColumn.synonyms,
  LocationsColumn.category,
  LocationsColumn.geneOntologies,
  LocationsColumn.content,
  LocationsColumn.isA,
  LocationsColumn.partOf,
  LocationsColumn.keyword,
  LocationsColumn.links,
  LocationsColumn.note,
  LocationsColumn.references,
];

const LocationsEntry = () => {
  const { accession } = useParams();
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);

  const { data, loading, error, status, progress, isStale } =
    useDataApiWithStale<LocationsAPIModel>(
      apiUrls.entry.entry(accession, Namespace.locations)
    );

  if (error || (!loading && !data)) {
    return <ErrorHandler status={status} error={error} fullPage />;
  }

  if (!data) {
    return <Loader progress={progress} />;
  }

  const infoData =
    data &&
    columns.map((column) => {
      const renderer = LocationsColumnConfiguration.get(column);
      return {
        title: renderer?.label,
        content: renderer?.render(data),
      };
    });

  const hasRelated = Boolean(
    data.statistics?.reviewedProteinCount ||
      data.statistics?.unreviewedProteinCount
  );

  const relatedQuery = `(cc_scl_term:${accession})`;

  const handleToggleDownload = () =>
    setDisplayDownloadPanel(!displayDownloadPanel);

  return (
    <SingleColumnLayout>
      <HTMLHead
        title={[data.name, searchableNamespaceLabels[Namespace.locations]]}
      >
        <meta name="description" content={data.definition} />
        <link rel="canonical" href={window.location.href} />
      </HTMLHead>
      {/* Here we don't want to use the exact label atm */}
      <h1>Cellular component - {data.name}</h1>
      <Card className={cn(entryPageStyles.card, { [helper.stale]: isStale })}>
        {displayDownloadPanel && (
          <EntryDownloadPanel handleToggle={handleToggleDownload} />
        )}
        <div className="button-group">
          <EntryDownloadButton handleToggle={handleToggleDownload} />
          <MapToDropdown statistics={data.statistics} />
        </div>
        <InfoList infoData={infoData} />
      </Card>
      {hasRelated && <RelatedResults relatedQuery={relatedQuery} />}
    </SingleColumnLayout>
  );
};

export default LocationsEntry;
