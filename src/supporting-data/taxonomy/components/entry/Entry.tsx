import { RouteChildrenProps } from 'react-router-dom';
import { Loader, Card, InfoList } from 'franklin-sites';
import { pick } from 'lodash-es';

import HTMLHead from '../../../../shared/components/HTMLHead';
import SingleColumnLayout from '../../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import EntryDownload from '../../../../shared/components/entry/EntryDownload';
import { MapToDropdown } from '../../../../shared/components/MapTo';
import ChildNavigation from './ChildNavigation';

import useDataApi from '../../../../shared/hooks/useDataApi';

import apiUrls, { getAPIQueryUrl } from '../../../../shared/config/apiUrls';
import generatePageTitle from '../../adapters/generatePageTitle';

import {
  Namespace,
  searchableNamespaceLabels,
} from '../../../../shared/types/namespaces';
import { TaxonomyAPIModel } from '../../adapters/taxonomyConverter';
import TaxonomyColumnConfiguration, {
  TaxonomyColumn,
} from '../../config/TaxonomyColumnConfiguration';
import { Statistics } from '../../../../shared/types/apiModel';
import { SearchResults } from '../../../../shared/types/results';

import entryPageStyles from '../../../shared/styles/entry-page.module.scss';

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
  const accession = props.match?.params.accession;

  const mainData = useDataApi<TaxonomyAPIModel>(
    apiUrls.entry(accession, Namespace.taxonomy)
  );
  const childrenData = useDataApi<SearchResults<TaxonomyAPIModel>>(
    getAPIQueryUrl({
      namespace: Namespace.taxonomy,
      query: `parent:${accession}`,
      columns: [TaxonomyColumn.scientificName, TaxonomyColumn.commonName],
      facets: null,
      size: 5, // Match the "ExpandableList" default count
    })
  );

  if (mainData.error || !accession || (!mainData.loading && !mainData.data)) {
    return <ErrorHandler status={mainData.status} />;
  }

  if (childrenData.error || (!childrenData.loading && !childrenData.data)) {
    return <ErrorHandler status={childrenData.status} />;
  }

  const { data } = mainData;

  if (!(data && childrenData.data)) {
    return <Loader progress={mainData.progress || childrenData.progress} />;
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
        <div className="button-group">
          <EntryDownload />
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
    </SingleColumnLayout>
  );
};

export default TaxonomyEntry;
