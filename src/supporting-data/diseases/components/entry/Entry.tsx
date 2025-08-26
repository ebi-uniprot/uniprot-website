import cn from 'classnames';
import { Card, InfoList, Loader } from 'franklin-sites';
import { useState } from 'react';
import { useParams } from 'react-router';

import EntryDownloadButton from '../../../../shared/components/entry/EntryDownloadButton';
import EntryDownloadPanel from '../../../../shared/components/entry/EntryDownloadPanel';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import HTMLHead from '../../../../shared/components/HTMLHead';
import { SingleColumnLayout } from '../../../../shared/components/layouts/SingleColumnLayout';
import { MapToDropdown } from '../../../../shared/components/MapTo';
import MedicalDisclaimer from '../../../../shared/components/MedicalDisclaimer';
import RelatedResults from '../../../../shared/components/results/RelatedResults';
import apiUrls from '../../../../shared/config/apiUrls/apiUrls';
import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';
import helper from '../../../../shared/styles/helper.module.scss';
import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../../shared/types/namespaces';
import entryPageStyles from '../../../shared/styles/entry-page.module.scss';
import { DiseasesAPIModel } from '../../adapters/diseasesConverter';
import DiseasesColumnConfiguration, {
  DiseasesColumn,
} from '../../config/DiseasesColumnConfiguration';

const columns = [
  DiseasesColumn.definition,
  DiseasesColumn.acronym,
  DiseasesColumn.alternativeNames,
  DiseasesColumn.keywords,
  DiseasesColumn.crossReferences,
];

const DiseasesEntry = () => {
  const { accession } = useParams();
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);

  const { data, loading, error, status, progress, isStale } =
    useDataApiWithStale<DiseasesAPIModel>(
      apiUrls.entry.entry(accession, Namespace.diseases)
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
      const renderer = DiseasesColumnConfiguration.get(column);
      return {
        title: renderer?.label,
        content: renderer?.render(data),
      };
    });

  const hasRelated = Boolean(
    data.statistics?.reviewedProteinCount ||
      data.statistics?.unreviewedProteinCount
  );

  const relatedQuery = `(cc_disease:${accession})`;

  const handleToggleDownload = () =>
    setDisplayDownloadPanel(!displayDownloadPanel);

  return (
    <SingleColumnLayout>
      <HTMLHead
        title={[data.name, searchableNamespaceLabels[Namespace.diseases]]}
      >
        <meta name="description" content={data.definition} />
        <link rel="canonical" href={window.location.href} />
      </HTMLHead>
      {/* Here we don't want to use the full label atm */}
      <h1>Disease - {data.name}</h1>
      <Card className={cn(entryPageStyles.card, { [helper.stale]: isStale })}>
        {displayDownloadPanel && (
          <EntryDownloadPanel handleToggle={handleToggleDownload} />
        )}
        <div className="button-group">
          <EntryDownloadButton handleToggle={handleToggleDownload} />
          <MapToDropdown statistics={data.statistics} />
        </div>
        <InfoList infoData={infoData} />
        <MedicalDisclaimer />
      </Card>
      {hasRelated && <RelatedResults relatedQuery={relatedQuery} />}
    </SingleColumnLayout>
  );
};

export default DiseasesEntry;
