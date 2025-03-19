import { Card, InfoList, Loader } from 'franklin-sites';
import { pick } from 'lodash-es';
import { useEffect, useState } from 'react';
import { RouteChildrenProps, useHistory } from 'react-router-dom';
import { frame } from 'timing-functions';

import { getEntryPath } from '../../../../app/config/urls';
import { addMessage } from '../../../../messages/state/messagesActions';
import {
  MessageFormat,
  MessageLevel,
  MessageTag,
} from '../../../../messages/types/messagesTypes';
import EntryDownloadButton from '../../../../shared/components/entry/EntryDownloadButton';
import EntryDownloadPanel from '../../../../shared/components/entry/EntryDownloadPanel';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import HTMLHead from '../../../../shared/components/HTMLHead';
import { SingleColumnLayout } from '../../../../shared/components/layouts/SingleColumnLayout';
import { MapToDropdown } from '../../../../shared/components/MapTo';
import RelatedResults from '../../../../shared/components/results/RelatedResults';
import apiUrls from '../../../../shared/config/apiUrls/apiUrls';
import useDataApi from '../../../../shared/hooks/useDataApi';
import useMessagesDispatch from '../../../../shared/hooks/useMessagesDispatch';
import { Statistics } from '../../../../shared/types/apiModel';
import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../../shared/types/namespaces';
import { SearchResults } from '../../../../shared/types/results';
import entryPageStyles from '../../../shared/styles/entry-page.module.scss';
import generatePageTitle from '../../adapters/generatePageTitle';
import { TaxonomyAPIModel } from '../../adapters/taxonomyConverter';
import TaxonomyColumnConfiguration, {
  TaxonomyColumn,
} from '../../config/TaxonomyColumnConfiguration';
import ChildNavigation from './ChildNavigation';

const firstColumns = [
  TaxonomyColumn.mnemonic,
  TaxonomyColumn.id,
  TaxonomyColumn.scientificName,
  TaxonomyColumn.parent,
];

const lastColumns = [
  TaxonomyColumn.commonName,
  TaxonomyColumn.synonyms,
  TaxonomyColumn.otherNames,
  TaxonomyColumn.rank,
  TaxonomyColumn.lineage,
  TaxonomyColumn.hosts,
  TaxonomyColumn.strains,
  TaxonomyColumn.links,
];

const TaxonomyEntry = (props: RouteChildrenProps<{ accession: string }>) => {
  const dispatch = useMessagesDispatch();
  const history = useHistory();
  const [displayDownloadPanel, setDisplayDownloadPanel] = useState(false);

  const accession = props.match?.params.accession;

  const mainData = useDataApi<TaxonomyAPIModel>(
    apiUrls.entry.entry(accession, Namespace.taxonomy)
  );
  const childrenData = useDataApi<SearchResults<TaxonomyAPIModel>>(
    apiUrls.search.search({
      namespace: Namespace.taxonomy,
      query: `parent:${accession}`,
      columns: [TaxonomyColumn.scientificName, TaxonomyColumn.commonName],
      facets: null,
      size: 5, // Match the "ExpandableList" default count
    })
  );

  // Redirect to new entry when obsolete and merged into one
  useEffect(() => {
    if (mainData.redirectedTo) {
      const split = new URL(mainData.redirectedTo).pathname.split('/');
      const newEntry = split[split.length - 1];
      dispatch(
        addMessage({
          id: 'accession-merge',
          content: (
            <>
              {accession} has been merged into {newEntry}. You have
              automatically been redirected.
            </>
          ),
          format: MessageFormat.IN_PAGE,
          level: MessageLevel.SUCCESS,
          tag: MessageTag.REDIRECT,
        })
      );
      frame().then(() =>
        history.replace(getEntryPath(Namespace.taxonomy, newEntry))
      );
    }
    // (I hope) I know what I'm doing here, I want to stick with whatever value
    // match?.params.subPage had when the component was mounted.
    // eslint-disable-next-line reactHooks/exhaustive-deps
  }, [dispatch, mainData.redirectedTo]);

  if (mainData.error || !accession || (!mainData.loading && !mainData.data)) {
    return (
      <ErrorHandler status={mainData.status} error={mainData.error} fullPage />
    );
  }

  if (childrenData.error || (!childrenData.loading && !childrenData.data)) {
    return (
      <ErrorHandler
        status={childrenData.status}
        error={childrenData.error}
        fullPage
      />
    );
  }

  const { data } = mainData;

  if (!(data && childrenData.data)) {
    return <Loader progress={mainData.progress || childrenData.progress} />;
  }

  if (data.inactiveReason) {
    return (
      <SingleColumnLayout>
        <HTMLHead
          title={[data.taxonId, searchableNamespaceLabels[Namespace.taxonomy]]}
        >
          <meta name="robots" content="noindex" />
        </HTMLHead>
        <h1>
          {searchableNamespaceLabels[Namespace.taxonomy]} - {data.taxonId}{' '}
          (obsolete)
        </h1>
      </SingleColumnLayout>
    );
  }

  const proteinStatistics = pick<Partial<Statistics>>(data.statistics, [
    'reviewedProteinCount',
    'unreviewedProteinCount',
  ]);
  const proteomeStatistics = pick<Partial<Statistics>>(data.statistics, [
    'proteomeCount',
    'referenceProteomeCount',
  ]);

  const infoDataRenderer = (column: TaxonomyColumn) => {
    const renderer = TaxonomyColumnConfiguration.get(column);
    return {
      title: renderer?.label,
      content: renderer?.render(data),
    };
  };

  const infoData = [
    ...firstColumns.map(infoDataRenderer),
    {
      title: 'Children',
      content: childrenData.data.results.length ? (
        <ChildNavigation
          childTaxons={childrenData.data.results}
          total={+(childrenData.headers?.['x-total-results'] || 0)}
          taxonId={data.taxonId}
        />
      ) : null,
    },
    ...lastColumns.map(infoDataRenderer),
  ];

  const hasRelated = Boolean(
    data.statistics?.reviewedProteinCount ||
      data.statistics?.unreviewedProteinCount
  );

  const relatedQuery = `(taxonomy_id:${accession})`;

  const handleToggleDownload = () =>
    setDisplayDownloadPanel(!displayDownloadPanel);

  return (
    <SingleColumnLayout>
      <HTMLHead
        title={[
          generatePageTitle(data),
          searchableNamespaceLabels[Namespace.taxonomy],
        ]}
      />
      <h1>
        {searchableNamespaceLabels[Namespace.taxonomy]} -{' '}
        {data.scientificName || data.taxonId} <small>({data.rank})</small>
      </h1>
      <Card className={entryPageStyles.card}>
        {displayDownloadPanel && (
          <EntryDownloadPanel handleToggle={handleToggleDownload} />
        )}
        <div className="button-group">
          <EntryDownloadButton handleToggle={handleToggleDownload} />
          <MapToDropdown statistics={proteinStatistics} />
          <MapToDropdown
            statistics={proteomeStatistics}
            // NOTE: inconsistent field search compared with the protein searches
            fieldNameOverride="organism_id"
          >
            View proteomes
          </MapToDropdown>
        </div>
        <InfoList infoData={infoData} columns />
      </Card>
      {hasRelated && <RelatedResults relatedQuery={relatedQuery} />}
    </SingleColumnLayout>
  );
};

export default TaxonomyEntry;
