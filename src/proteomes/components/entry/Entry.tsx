import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { Loader } from 'franklin-sites';

import { Namespace } from '../../../shared/types/namespaces';

import EntryTitle from '../../../shared/components/entry/EntryTitle';
import Overview from './Overview';
import EntryMain from './EntryMain';

import SingleColumnLayout from '../../../shared/components/layouts/SingleColumnLayout';
import ErrorHandler from '../../../shared/components/error-pages/ErrorHandler';
import ErrorBoundary from '../../../shared/components/error-component/ErrorBoundary';

import { LocationToPath, Location } from '../../../app/config/urls';
import apiUrls from '../../../shared/config/apiUrls';

import useDataApi from '../../../shared/hooks/useDataApi';

import proteomesConverter, {
  ProteomesAPIModel,
} from '../../adapters/proteomesConverter';

import '../../../shared/components/entry/styles/entry-page.scss';

const Entry: FC = () => {
  const match = useRouteMatch<{ accession: string }>(
    LocationToPath[Location.ProteomesEntry]
  );

  const accession = match?.params.accession;

  const baseURL = apiUrls.entry(accession, Namespace.proteomes);
  const { loading, data, status, error } = useDataApi<ProteomesAPIModel>(
    baseURL
  );

  if (error || !accession) {
    return <ErrorHandler status={status} />;
  }

  if (loading || !data) {
    return <Loader />;
  }

  const transformedData = proteomesConverter(data);

  return (
    <SingleColumnLayout
      className="entry-page"
      title={
        <ErrorBoundary>
          <h2>
            <EntryTitle mainTitle="UniRef" optionalTitle={transformedData.id} />
          </h2>
          <Overview transformedData={transformedData} />
        </ErrorBoundary>
      }
    >
      <EntryMain transformedData={transformedData} />
    </SingleColumnLayout>
  );
};

export default Entry;
