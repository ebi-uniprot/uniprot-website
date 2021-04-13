import { RouteChildrenProps } from 'react-router-dom';
import { Loader, Card, InfoList } from 'franklin-sites';

import SingleColumnLayout from '../../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';

import useDataApiWithStale from '../../../../shared/hooks/useDataApiWithStale';

import apiUrls from '../../../../shared/config/apiUrls';

import { Namespace } from '../../../../shared/types/namespaces';
import { TaxonomyAPIModel } from '../../adapters/taxonomyConverter';
import TaxonomyColumnConfiguration, {
  TaxonomyColumn,
} from '../../config/TaxonomyColumnConfiguration';

import helper from '../../../../shared/styles/helper.module.scss';

const columns = [
  TaxonomyColumn.mnemonic,
  TaxonomyColumn.id,
  TaxonomyColumn.scientificName,
  TaxonomyColumn.commonName,
  TaxonomyColumn.otherNames,
  TaxonomyColumn.synonym,
  TaxonomyColumn.rank,
  TaxonomyColumn.parent,
  TaxonomyColumn.lineage,
  TaxonomyColumn.host,
  TaxonomyColumn.strain,
];

const TaxonomyEntry = (props: RouteChildrenProps<{ accession: string }>) => {
  const accession = props.match?.params.accession;

  const {
    data,
    loading,
    error,
    status,
    progress,
    isStale,
  } = useDataApiWithStale<TaxonomyAPIModel>(
    apiUrls.entry(accession, Namespace.taxonomy)
  );

  if (error || !accession || (!loading && !data)) {
    return <ErrorHandler status={status} />;
  }

  if (!data) {
    return <Loader progress={progress} />;
  }

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
      <h2>
        Taxonomy - {data.scientificName || data.taxonId}{' '}
        <small>({data.rank})</small>
      </h2>
      <Card className={isStale ? helper.stale : undefined}>
        {infoData && <InfoList infoData={infoData} isCompact columns />}
      </Card>
    </SingleColumnLayout>
  );
};

export default TaxonomyEntry;
