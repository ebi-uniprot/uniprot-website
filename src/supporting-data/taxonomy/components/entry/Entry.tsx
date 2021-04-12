import { RouteChildrenProps } from 'react-router-dom';
import { Loader, Card } from 'franklin-sites';

import SingleColumnLayout from '../../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import RenderColumnsInCard from '../../../../shared/components/results/RenderColumnsInCard';

import useDataApi from '../../../../shared/hooks/useDataApi';

import apiUrls from '../../../../shared/config/apiUrls';

import { Namespace } from '../../../../shared/types/namespaces';
import { TaxonomyAPIModel } from '../../adapters/taxonomyConverter';
import TaxonomyColumnConfiguration, {
  TaxonomyColumn,
} from '../../config/TaxonomyColumnConfiguration';

const TaxonomyEntry = (props: RouteChildrenProps<{ accession: string }>) => {
  const accession = props.match?.params.accession;

  const {
    data,
    loading,
    error,
    status,
    progress,
  } = useDataApi<TaxonomyAPIModel>(
    apiUrls.entry(accession, Namespace.taxonomy)
  );

  if (error || !accession) {
    return <ErrorHandler status={status} />;
  }

  if (loading || !data) {
    return <Loader progress={progress} />;
  }

  return (
    <SingleColumnLayout>
      <h2>
        Taxonomy - {data.scientificName || data.taxonId}{' '}
        <small>({data.rank})</small>
      </h2>
      <Card>
        <RenderColumnsInCard
          renderers={TaxonomyColumnConfiguration.get(TaxonomyColumn.mnemonic)}
          data={data}
        />
        <RenderColumnsInCard
          renderers={TaxonomyColumnConfiguration.get(TaxonomyColumn.id)}
          data={data}
        />
        <RenderColumnsInCard
          renderers={TaxonomyColumnConfiguration.get(
            TaxonomyColumn.scientificName
          )}
          data={data}
        />
        <RenderColumnsInCard
          renderers={TaxonomyColumnConfiguration.get(TaxonomyColumn.commonName)}
          data={data}
        />
        <RenderColumnsInCard
          renderers={TaxonomyColumnConfiguration.get(TaxonomyColumn.synonym)}
          data={data}
        />
        <RenderColumnsInCard
          renderers={TaxonomyColumnConfiguration.get(TaxonomyColumn.rank)}
          data={data}
        />
        <RenderColumnsInCard
          renderers={TaxonomyColumnConfiguration.get(TaxonomyColumn.lineage)}
          data={data}
        />
        <RenderColumnsInCard
          renderers={TaxonomyColumnConfiguration.get(TaxonomyColumn.parent)}
          data={data}
        />
      </Card>
    </SingleColumnLayout>
  );
};

export default TaxonomyEntry;
