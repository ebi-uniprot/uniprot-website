import { Card, InfoList, Loader } from 'franklin-sites';
import { useState } from 'react';
import { useParams } from 'react-router';

import EntryDownloadButton from '../../../../shared/components/entry/EntryDownloadButton';
import EntryDownloadPanel from '../../../../shared/components/entry/EntryDownloadPanel';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import HTMLHead from '../../../../shared/components/HTMLHead';
import { SingleColumnLayout } from '../../../../shared/components/layouts/SingleColumnLayout';
import { MapToDropdown } from '../../../../shared/components/MapTo';
import RelatedResults from '../../../../shared/components/results/RelatedResults';
import apiUrls from '../../../../shared/config/apiUrls/apiUrls';
import useDataApi from '../../../../shared/hooks/useDataApi';
import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../../shared/types/namespaces';
import entryPageStyles from '../../../shared/styles/entry-page.module.scss';
import { KeywordsAPIModel } from '../../adapters/keywordsConverter';
import KeywordsColumnConfiguration, {
  KeywordsColumn,
} from '../../config/KeywordsColumnConfiguration';

const columns = [
  KeywordsColumn.definition,
  KeywordsColumn.synonyms,
  KeywordsColumn.category,
  KeywordsColumn.geneOntologies,
  KeywordsColumn.parents,
  KeywordsColumn.children,
  KeywordsColumn.links,
  KeywordsColumn.graphical,
];

const KeywordsEntry = () => {
  const { accession } = useParams();
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);

  const { data, loading, error, status, progress } =
    useDataApi<KeywordsAPIModel>(
      apiUrls.entry.entry(accession, Namespace.keywords)
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
      const renderer = KeywordsColumnConfiguration.get(column);
      return {
        title: renderer?.label,
        content: renderer?.render(data),
      };
    });

  const hasRelated = Boolean(
    data.statistics?.reviewedProteinCount ||
      data.statistics?.unreviewedProteinCount
  );

  const relatedQuery = `(keyword:${accession})`;

  const handleToggleDownload = () =>
    setDisplayDownloadPanel(!displayDownloadPanel);

  return (
    <SingleColumnLayout>
      <HTMLHead
        title={[
          data.keyword.name,
          searchableNamespaceLabels[Namespace.keywords],
        ]}
      >
        <meta name="description" content={data.definition} />
        <link rel="canonical" href={window.location.href} />
      </HTMLHead>
      <h1>
        {searchableNamespaceLabels[Namespace.keywords]} - {data.keyword.name} (
        {data.keyword.id})
      </h1>
      <Card className={entryPageStyles.card}>
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

export default KeywordsEntry;
