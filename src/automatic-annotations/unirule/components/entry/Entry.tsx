import { useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { Loader } from 'franklin-sites';

import HTMLHead from '../../../../shared/components/HTMLHead';
import { SingleColumnLayout } from '../../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';

import Source from './Source';
import TemplateEntries from './TemplateEntries';
import ConditionsAnnotations from '../../../shared/entry/ConditionsAnnotations';
import { MapToDropdown } from '../../../../shared/components/MapTo';
import RelatedResults from '../../../../shared/components/results/RelatedResults';
import EntryDownloadButton from '../../../../shared/components/entry/EntryDownloadButton';
import EntryDownloadPanel from '../../../../shared/components/entry/EntryDownloadPanel';

import useDataApi from '../../../../shared/hooks/useDataApi';

import apiUrls from '../../../../shared/config/apiUrls/apiUrls';
import { getEntryPath } from '../../../../app/config/urls';

import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../../shared/types/namespaces';
import { UniRuleAPIModel } from '../../adapters/uniRuleConverter';

const UniRuleEntry = () => {
  const { accession } = useParams<{ accession: string }>();
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);

  const { data, loading, error, status, progress } =
    useDataApi<UniRuleAPIModel>(
      apiUrls.entry.entry(accession, Namespace.unirule)
    );

  if (loading) {
    return <Loader progress={progress} />;
  }

  if (error || !data) {
    return <ErrorHandler status={status} error={error} fullPage />;
  }

  if (accession !== data.uniRuleId) {
    return <Redirect to={getEntryPath(Namespace.unirule, data.uniRuleId)} />;
  }

  const hasRelated = Boolean(
    data.statistics?.reviewedProteinCount ||
      data.statistics?.unreviewedProteinCount
  );

  const relatedQuery = `(source:${
    data.information.oldRuleNum || data.uniRuleId
  })`;

  const handleToggleDownload = () =>
    setDisplayDownloadPanel(!displayDownloadPanel);

  return (
    <SingleColumnLayout>
      <HTMLHead
        title={[data.uniRuleId, searchableNamespaceLabels[Namespace.unirule]]}
      />
      {/* Here we don't want to use the full label atm */}
      <h1>
        {searchableNamespaceLabels[Namespace.unirule]} - {data.uniRuleId}
      </h1>
      {displayDownloadPanel && (
        <EntryDownloadPanel handleToggle={handleToggleDownload} />
      )}
      <div className="button-group">
        <EntryDownloadButton handleToggle={handleToggleDownload} />

        <MapToDropdown
          statistics={data.statistics}
          accession={data.information.oldRuleNum || data.uniRuleId}
        />
      </div>
      <Source source={data.information.oldRuleNum} />
      <TemplateEntries entries={data.information.uniProtAccessions} />
      <ConditionsAnnotations data={data} />
      {hasRelated && (
        <RelatedResults relatedQuery={relatedQuery} relation="Annotated" />
      )}
    </SingleColumnLayout>
  );
};

export default UniRuleEntry;
