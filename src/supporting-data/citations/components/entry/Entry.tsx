import { RouteChildrenProps } from 'react-router-dom';
import { Loader, Card } from 'franklin-sites';
import { SetOptional } from 'type-fest';

import SingleColumnLayout from '../../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import LiteratureCitation from '../LiteratureCitation';

import useDataApi from '../../../../shared/hooks/useDataApi';

import apiUrls from '../../../../shared/config/apiUrls';

import { Namespace } from '../../../../shared/types/namespaces';
import { CitationsAPIModel } from '../../adapters/citationsConverter';

const CitationsEntry = (props: RouteChildrenProps<{ accession: string }>) => {
  const accession = props.match?.params.accession;

  const { data, loading, error, status, progress } = useDataApi<
    SetOptional<CitationsAPIModel, 'statistics'>
  >(apiUrls.entry(accession, Namespace.citations));

  if (error || !accession) {
    return <ErrorHandler status={status} />;
  }

  if (loading || !data) {
    return <Loader progress={progress} />;
  }

  return (
    <SingleColumnLayout>
      <Card>
        <LiteratureCitation data={data} displayAll />
      </Card>
    </SingleColumnLayout>
  );
};

export default CitationsEntry;
