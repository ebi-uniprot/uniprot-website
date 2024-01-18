import { useState } from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import { Loader } from 'franklin-sites';

import HTMLHead from '../../../../shared/components/HTMLHead';
import { SingleColumnLayout } from '../../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import ConditionsAnnotations from '../../../shared/entry/ConditionsAnnotations';
import { MapToDropdown } from '../../../../shared/components/MapTo';
import RelatedResults from '../../../../shared/components/results/RelatedResults';
import EntryDownloadPanel from '../../../../shared/components/entry/EntryDownloadPanel';
import EntryDownloadButton from '../../../../shared/components/entry/EntryDownloadButton';

import useDataApi from '../../../../shared/hooks/useDataApi';

import apiUrls from '../../../../shared/config/apiUrls/apiUrls';

import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../../shared/types/namespaces';
import { ARBAAPIModel } from '../../adapters/arbaConverter';

const UniRuleEntry = (props: RouteChildrenProps<{ accession: string }>) => {
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);

  const accession = props.match?.params.accession;

  const { data, loading, error, status, progress } = useDataApi<ARBAAPIModel>(
    apiUrls.entry.entry(accession, Namespace.arba)
  );

  if (loading) {
    return <Loader progress={progress} />;
  }

  if (error || !accession || !data) {
    return <ErrorHandler status={status} />;
  }

  const hasRelated = Boolean(
    data.statistics?.reviewedProteinCount ||
      data.statistics?.unreviewedProteinCount
  );

  const relatedQuery = `(source:${accession})`;

  const handleToggleDownload = () =>
    setDisplayDownloadPanel(!displayDownloadPanel);

  return (
    <SingleColumnLayout>
      <HTMLHead
        title={[data.uniRuleId, searchableNamespaceLabels[Namespace.arba]]}
      />
      {/* Here we don't want to use the full label atm */}
      <h1>
        {searchableNamespaceLabels[Namespace.arba]} - {data.uniRuleId}
      </h1>
      {displayDownloadPanel && (
        <EntryDownloadPanel handleToggle={handleToggleDownload} />
      )}
      <div className="button-group">
        <EntryDownloadButton handleToggle={handleToggleDownload} />
        <MapToDropdown
          statistics={data.statistics}
          accession={data.uniRuleId}
        />
      </div>
      {/* there are no template entries for ARBA rules apparently */}
      <ConditionsAnnotations data={data} />
      {hasRelated && (
        <RelatedResults relatedQuery={relatedQuery} relation="Annotated" />
      )}
    </SingleColumnLayout>
  );
};

export default UniRuleEntry;
