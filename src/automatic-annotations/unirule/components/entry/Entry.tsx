import { Loader } from 'franklin-sites';
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
import useDataApi from '../../../../shared/hooks/useDataApi';
import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../../shared/types/namespaces';
import ConditionsAnnotations from '../../../shared/entry/ConditionsAnnotations';
import { UniRuleAPIModel } from '../../adapters/uniRuleConverter';
import Source from './Source';
import TemplateEntries from './TemplateEntries';

const UniRuleEntry = () => {
  const { accession } = useParams();
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
    return (
      <Navigate replace to={getEntryPath(Namespace.unirule, data.uniRuleId)} />
    );
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
