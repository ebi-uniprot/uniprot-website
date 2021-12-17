import { RouteChildrenProps } from 'react-router-dom';
import { Loader, Card, InfoList } from 'franklin-sites';
import cn from 'classnames';
import { pick } from 'lodash-es';

import HTMLHead from '../../../../shared/components/HTMLHead';
import SingleColumnLayout from '../../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import EntryDownload from '../../../../shared/components/entry/EntryDownload';
import { MapToDropdown } from '../../../../shared/components/MapTo';

import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';

import apiUrls from '../../../../shared/config/apiUrls';
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

import helper from '../../../../shared/styles/helper.module.scss';
import entryPageStyles from '../../../shared/styles/entry-page.module.scss';

const columns = [
  TaxonomyColumn.mnemonic,
  TaxonomyColumn.id,
  TaxonomyColumn.scientificName,
  TaxonomyColumn.commonName,
  TaxonomyColumn.otherNames,
  TaxonomyColumn.synonyms,
  TaxonomyColumn.rank,
  TaxonomyColumn.parent,
  TaxonomyColumn.lineage,
  TaxonomyColumn.hosts,
  TaxonomyColumn.strains,
  TaxonomyColumn.links,
];

const TaxonomyEntry = (props: RouteChildrenProps<{ accession: string }>) => {
  const accession = props.match?.params.accession;

  const { data, loading, error, status, progress, isStale } =
    useDataApiWithStale<TaxonomyAPIModel>(
      apiUrls.entry(accession, Namespace.taxonomy)
    );

  if (error || !accession || (!loading && !data)) {
    return <ErrorHandler status={status} />;
  }

  if (!data) {
    return <Loader progress={progress} />;
  }

  const proteinStatistics = pick<Partial<Statistics>>(data.statistics, [
    'reviewedProteinCount',
    'unreviewedProteinCount',
  ]);
  const proteomeStatistics = pick<Partial<Statistics>>(data.statistics, [
    'proteomeCount',
    'referenceProteomeCount',
  ]);

  const infoData =
    data &&
    columns.map((column) => {
      const renderer = TaxonomyColumnConfiguration.get(column);
      return {
        title: renderer?.label,
        content: renderer?.render(data),
      };
    });

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
      <Card className={cn(entryPageStyles.card, { [helper.stale]: isStale })}>
        <div className="button-group">
          <EntryDownload />
          <MapToDropdown statistics={proteinStatistics} />
          <MapToDropdown statistics={proteomeStatistics}>
            View proteomes
          </MapToDropdown>
        </div>
        {infoData && <InfoList infoData={infoData} isCompact columns />}
      </Card>
    </SingleColumnLayout>
  );
};

export default TaxonomyEntry;
