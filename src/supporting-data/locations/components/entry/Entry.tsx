import { RouteChildrenProps } from 'react-router-dom';
import { Loader, Card } from 'franklin-sites';

import SingleColumnLayout from '../../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import RenderColumnsInCard from '../../../../shared/components/results/RenderColumnsInCard';

import useDataApi from '../../../../shared/hooks/useDataApi';

import apiUrls from '../../../../shared/config/apiUrls';

import { Namespace } from '../../../../shared/types/namespaces';
import { LocationsAPIModel } from '../../adapters/locationsConverter';
import LocationsColumnConfiguration, {
  LocationsColumn,
} from '../../config/LocationsColumnConfiguration';

const LocationsEntry = (props: RouteChildrenProps<{ accession: string }>) => {
  const accession = props.match?.params.accession;

  const {
    data,
    loading,
    error,
    status,
    progress,
  } = useDataApi<LocationsAPIModel>(
    apiUrls.entry(accession, Namespace.locations)
  );

  if (error || !accession) {
    return <ErrorHandler status={status} />;
  }

  if (loading || !data) {
    return <Loader progress={progress} />;
  }

  return (
    <SingleColumnLayout>
      <h2>Cellular component - {data.name}</h2>
      <Card>
        <RenderColumnsInCard
          renderers={LocationsColumnConfiguration.get(
            LocationsColumn.definition
          )}
          data={data}
        />
        <RenderColumnsInCard
          renderers={LocationsColumnConfiguration.get(LocationsColumn.synonyms)}
          data={data}
        />
        <RenderColumnsInCard
          renderers={LocationsColumnConfiguration.get(LocationsColumn.category)}
          data={data}
        />
        <RenderColumnsInCard
          renderers={LocationsColumnConfiguration.get(
            LocationsColumn.geneOntologies
          )}
          data={data}
        />
      </Card>
    </SingleColumnLayout>
  );
};

export default LocationsEntry;
