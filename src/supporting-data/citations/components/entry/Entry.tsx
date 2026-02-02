import { Card, Loader } from 'franklin-sites';
import { useState } from 'react';
import { type RouteChildrenProps } from 'react-router-dom';
import { type SetOptional } from 'type-fest';

import EntryDownloadButton from '../../../../shared/components/entry/EntryDownloadButton';
import EntryDownloadPanel from '../../../../shared/components/entry/EntryDownloadPanel';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import HTMLHead from '../../../../shared/components/HTMLHead';
import { SingleColumnLayout } from '../../../../shared/components/layouts/SingleColumnLayout';
import RelatedResults from '../../../../shared/components/results/RelatedResults';
import apiUrls from '../../../../shared/config/apiUrls/apiUrls';
import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';
import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../../shared/types/namespaces';
import entryPageStyles from '../../../shared/styles/entry-page.module.scss';
import { type CitationsAPIModel } from '../../adapters/citationsConverter';
import LiteratureCitation from '../LiteratureCitation';

const CitationsEntry = (props: RouteChildrenProps<{ accession: string }>) => {
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);

  const accession = props.match?.params.accession;

  const { data, loading, error, status, progress } = useDataApiWithStale<
    SetOptional<CitationsAPIModel, 'statistics'>
  >(apiUrls.entry.entry(accession, Namespace.citations));

  if (error || !accession || (!loading && !data)) {
    return <ErrorHandler status={status} error={error} fullPage />;
  }

  if (!data) {
    return <Loader progress={progress} />;
  }

  const hasRelated = Boolean(
    data.statistics?.reviewedProteinCount ||
    data.statistics?.unreviewedProteinCount ||
    data.statistics?.communityMappedProteinCount ||
    data.statistics?.computationallyMappedProteinCount
  );

  const relatedQuery = `(lit_citation_id:${accession}) OR (computational_pubmed_id:${accession}) OR (community_pubmed_id:${accession})`;

  const handleToggleDownload = () =>
    setDisplayDownloadPanel(!displayDownloadPanel);

  return (
    <SingleColumnLayout>
      <HTMLHead
        title={[
          data.citation.title,
          searchableNamespaceLabels[Namespace.citations],
        ]}
      >
        <meta name="description" content={data.citation.literatureAbstract} />
      </HTMLHead>
      <h1>{searchableNamespaceLabels[Namespace.citations]}</h1>
      <Card className={entryPageStyles.card}>
        {displayDownloadPanel && (
          <EntryDownloadPanel handleToggle={handleToggleDownload} />
        )}
        <div className="button-group">
          <EntryDownloadButton handleToggle={handleToggleDownload} />
        </div>
        <LiteratureCitation data={data} displayAll headingLevel="h2" />
      </Card>
      {hasRelated && <RelatedResults relatedQuery={relatedQuery} />}
    </SingleColumnLayout>
  );
};

export default CitationsEntry;
