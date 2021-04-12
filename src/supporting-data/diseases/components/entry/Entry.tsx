import { RouteChildrenProps } from 'react-router-dom';
import { Loader, Card } from 'franklin-sites';

import SingleColumnLayout from '../../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import RenderColumnsInCard from '../../../../shared/components/results/RenderColumnsInCard';

import useDataApi from '../../../../shared/hooks/useDataApi';

import apiUrls from '../../../../shared/config/apiUrls';

import { Namespace } from '../../../../shared/types/namespaces';
import { DiseasesAPIModel } from '../../adapters/diseasesConverter';
import DiseasesColumnConfiguration, {
  DiseasesColumn,
} from '../../config/DiseasesColumnConfiguration';

const DiseasesEntry = (props: RouteChildrenProps<{ accession: string }>) => {
  const accession = props.match?.params.accession;

  const {
    data,
    loading,
    error,
    status,
    progress,
  } = useDataApi<DiseasesAPIModel>(
    apiUrls.entry(accession, Namespace.diseases)
  );

  if (error || !accession) {
    return <ErrorHandler status={status} />;
  }

  if (loading || !data) {
    return <Loader progress={progress} />;
  }

  return (
    <SingleColumnLayout>
      <h2>Disease - {data.name}</h2>
      <Card>
        <RenderColumnsInCard
          renderers={DiseasesColumnConfiguration.get(DiseasesColumn.definition)}
          data={data}
        />
        <RenderColumnsInCard
          renderers={DiseasesColumnConfiguration.get(DiseasesColumn.acronym)}
          data={data}
        />
        <RenderColumnsInCard
          renderers={DiseasesColumnConfiguration.get(
            DiseasesColumn.crossReferences
          )}
          data={data}
        />
        <p>
          <h3>Disclaimer</h3>
          Any medical or genetic information present in this entry is provided
          for research, educational and informational purposes only. It is not
          in any way intended to be used as a substitute for professional
          medical advice, diagnosis, treatment or care. Our staff consists of
          biologists and biochemists that are not trained to give medical
          advice.
        </p>
      </Card>
    </SingleColumnLayout>
  );
};

export default DiseasesEntry;
