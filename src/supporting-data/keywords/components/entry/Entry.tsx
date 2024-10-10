import { useState } from 'react';
import { Loader, Card, InfoList } from 'franklin-sites';
import { Redirect, RouteChildrenProps } from 'react-router-dom';
import { LocationDescriptor } from 'history';

import HTMLHead from '../../../../shared/components/HTMLHead';
import { SingleColumnLayout } from '../../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import { MapToDropdown } from '../../../../shared/components/MapTo';
import RelatedResults from '../../../../shared/components/results/RelatedResults';
import EntryDownloadPanel from '../../../../shared/components/entry/EntryDownloadPanel';
import EntryDownloadButton from '../../../../shared/components/entry/EntryDownloadButton';

import useDataApi from '../../../../shared/hooks/useDataApi';

import apiUrls from '../../../../shared/config/apiUrls/apiUrls';
import { getEntryPathFor } from '../../../../app/config/urls';

import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../../shared/types/namespaces';
import { KeywordsAPIModel } from '../../adapters/keywordsConverter';
import KeywordsColumnConfiguration, {
  KeywordsColumn,
} from '../../config/KeywordsColumnConfiguration';

import entryPageStyles from '../../../shared/styles/entry-page.module.scss';

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

const reNumber = /^\d+$/;

const KeywordsEntry = ({
  match,
}: RouteChildrenProps<{ accession: string }>) => {
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);

  const accession = match?.params.accession;

  let redirectTo: LocationDescriptor | null = null;
  // If the accession is a number not prefixed with "KW-"
  if (accession && reNumber.test(accession)) {
    redirectTo = {
      pathname: getEntryPathFor(Namespace.keywords)(
        `KW-${accession.padStart(4, '0')}`
      ),
    };
  }

  const { data, loading, error, status, progress } =
    useDataApi<KeywordsAPIModel>(
      redirectTo
        ? undefined
        : apiUrls.entry.entry(accession, Namespace.keywords)
    );

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  if (error || !accession || (!loading && !data)) {
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
